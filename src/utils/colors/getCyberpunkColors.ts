import { hexToRGB } from "@/utils/colors/convert.ts";

/**
 * Cyberpunk Edgerunners palette mapped onto the Material Design 3 token
 * contract emitted by getMaterialColors, so every downstream style keeps
 * working without changes. Night City surfaces + neon accents.
 */
const CYBERPUNK_PALETTE: Record<string, string> = {
  // Surfaces — deep purple Night City stack
  surface: "#070013",
  "surface-1": "#110826",
  "surface-2": "#160830",
  "surface-3": "#1d0d3d",
  "surface-4": "#2a1450",

  background: "#070013",
  "on-background": "#e6f4ff",
  "on-surface": "#e6f4ff",
  "on-surface-1": "#e6f4ff",
  "surface-variant": "#241245",
  "on-surface-variant": "#8a8a9e",

  // Primary — neon yellow, always dark text on top (CP2077 rule)
  primary: "#fcee0a",
  "on-primary": "#0d0221",
  "primary-container": "#3d3805",
  "on-primary-container": "#fff9ad",
  "inverse-primary": "#6b6404",

  // Secondary — electric cyan
  secondary: "#00f0ff",
  "on-secondary": "#001416",
  "secondary-container": "#003c44",
  "on-secondary-container": "#a2f4fb",

  // Tertiary — neon purple
  tertiary: "#b026ff",
  "on-tertiary": "#22043a",
  "tertiary-container": "#45106b",
  "on-tertiary-container": "#ecd4ff",

  // Error — shock magenta
  error: "#ff2a6d",
  "on-error": "#33000f",
  "error-container": "#5c0025",
  "on-error-container": "#ffb9cc",

  outline: "#4a4458",
  "outline-variant": "#2a1450",
  shadow: "#000000",
  scrim: "#000000",
  "inverse-surface": "#e6f4ff",
  "inverse-on-surface": "#1a0b2e",
};

export default function getCyberpunkColors(): string {
  const cssVariables: string[] = [];

  for (const [token, color] of Object.entries(CYBERPUNK_PALETTE)) {
    cssVariables.push(`--clr-${token}: ${color};`);
    cssVariables.push(`--clr-${token}-rgb: ${hexToRGB(color)};`);
  }

  return `:root{\n${cssVariables.join("\n")}\n}`;
}
