import appStore from "@/store/appStore.ts";
import tempStore from "@/store/tempStore.ts";
import getCyberpunkColors from "@/utils/colors/getCyberpunkColors.ts";
import getMaterialColors from "@/utils/colors/getMaterialColors.ts";
import getOrCreateStyle from "@/utils/dom/getOrCreateStyle.ts";

const CYBERPUNK_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap";

function setCyberpunkFonts(enabled: boolean) {
  const style = getOrCreateStyle("cyberpunk-fonts");
  style.textContent = enabled ? `@import url("${CYBERPUNK_FONTS_URL}");` : "";
}

const DEFAULT_ACCENT_COLOR = "#1ed760";
const MAX_CACHE_SIZE = 10;

let lastCacheKey = "";
const colorCache: Map<string, string> = new Map();

export default function setColors() {
  const { mode, isDark, isTinted, accentColor } = appStore.getState().color;

  const isCyberpunk = mode === "cyberpunk";

  document.documentElement.setAttribute("theme", isCyberpunk || isDark ? "dark" : "light");
  document.body.setAttribute("theme", isCyberpunk || isDark ? "dark" : "light");
  document.documentElement.toggleAttribute("cyberpunk", isCyberpunk);
  setCyberpunkFonts(isCyberpunk);

  let color = DEFAULT_ACCENT_COLOR;
  if (mode === "custom") {
    color = accentColor ?? DEFAULT_ACCENT_COLOR;
  } else if (mode === "dynamic") {
    color = tempStore.getState().player?.current?.colors?.colorRaw?.hex ?? DEFAULT_ACCENT_COLOR;
  }

  const cacheKey = isCyberpunk
    ? "cyberpunk"
    : `${color}-${isDark ? "dark" : "light"}-${isTinted ? "tint" : "no-tint"}`;
  if (cacheKey === lastCacheKey) {
    return;
  }

  const css = isCyberpunk ? getCyberpunkColors() : getCachedColorCSS(color, isDark, isTinted);
  lastCacheKey = cacheKey;

  const style = getOrCreateStyle("lucid-colors");

  style.textContent = css;
  console.debug(`[Lucid] setColors -> Applied CSS for color: ${color}, mode: ${mode}`);
}

function getCachedColorCSS(color: string, isDark: boolean, isTinted: boolean): string {
  const cacheKey = `${color}-${isDark ? "dark" : "light"}-${isTinted ? "tint" : "no-tint"}`;

  if (colorCache.has(cacheKey)) {
    console.debug(`[Lucid] Color Cache -> Hit: ${cacheKey}`);
    return colorCache.get(cacheKey) as string;
  }

  console.debug(`[Lucid] Color Cache -> Miss: ${cacheKey}`);
  const css = getMaterialColors(color, isDark, isTinted);

  if (colorCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = colorCache.keys().next().value;
    if (oldestKey) {
      colorCache.delete(oldestKey);
    }
  }

  colorCache.set(cacheKey, css);
  console.debug(`[Lucid] Color Cache -> Stored: ${cacheKey}`);
  return css;
}

appStore.subscribe((state) => state.color, setColors);
tempStore.subscribe((state) => {
  if (appStore.getState().color.mode !== "dynamic") return null;
  return state.player?.current?.colors?.colorRaw?.hex;
}, setColors);

export function cacheColorInBackground(color: string, isDark = false, isTinted = false) {
  getCachedColorCSS(color, isDark, isTinted);
}
