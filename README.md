# Cyberpunk Theme for Spicetify

**Cyberpunk** is a Spicetify theme with a fixed Night City neon palette inspired
by Cyberpunk: Edgerunners — neon yellow, electric cyan and shock magenta over
deep-purple surfaces — while keeping the dynamic album-art background that makes
every track feel like its own scene.

Fork of [spicetify-lucid](https://github.com/sanoojes/spicetify-lucid) by
[Sachu](https://gitlab.com/sanoojes). All of Lucid's customization (backgrounds,
player layouts, fonts, sidebar modes) still works — this fork adds a new color
mode on top.

## Features

- **Cyberpunk color mode** (default): a hand-tuned Edgerunners palette mapped
  onto the Material Design 3 token contract Lucid uses, so every component picks
  it up automatically:

  | Role | Color | |
  |---|---|---|
  | Primary | `#fcee0a` | Neon Yellow — always with dark text on top |
  | Secondary | `#00f0ff` | Electric Cyan |
  | Tertiary | `#b026ff` | Neon Purple |
  | Error / Alert | `#ff2a6d` | Shock Magenta |
  | Surfaces | `#070013` → `#2a1450` | Night City purple stack |

- **Dynamic album-art background preserved** — the blurred/animated cover
  backdrop from Lucid keeps changing with the music; only the UI palette is
  fixed neon.
- **Neon layer**: Orbitron (titles) + Rajdhani (body) typography, hover glow on
  play buttons and links, neon scrollbar and selection, card borders that light
  up on hover.
- **Everything from Lucid**: the other color modes (Default / Dynamic / Custom)
  remain available in *Cyberpunk Settings* if you want to switch back.

## Install

Requires [Spicetify](https://spicetify.app/) and [Bun](https://bun.sh/).

```sh
git clone https://github.com/the-eduardo/spicetify-cyberpunk.git
cd spicetify-cyberpunk
bun install
bun run build:theme   # builds and copies user.css + theme.js to your Themes folder
```

Copy `color.ini` next to the built files, then apply:

```sh
# Windows: %APPDATA%\spicetify\Themes\cyberpunk
cp color.ini "$(spicetify path userdata)/Themes/cyberpunk/"
spicetify config current_theme cyberpunk
spicetify apply
```

Open Spotify and hit the **Cyberpunk Settings** gear (top bar) to tweak
backgrounds, player layout and more. The Cyberpunk color mode is enabled by
default; switch it under *Colors → Color Theme*.

## How it works

Lucid generates its whole color scheme at runtime: a seed color (album art or
user pick) goes through Material Design 3 and comes out as `--clr-*` CSS tokens.
This fork adds a `cyberpunk` mode that skips the MD3 generation and injects a
static token map instead ([`getCyberpunkColors.ts`](src/utils/colors/getCyberpunkColors.ts)),
plus a scoped neon CSS layer ([`styles/cyberpunk.css`](styles/cyberpunk.css))
that only activates while the mode is on.

## License

Licensed under the [AGPLv3 License](LICENSE), same as upstream Lucid.

Upstream development happens on [GitLab](https://gitlab.com/sanoojes/spicetify-lucid) —
for issues with this fork's cyberpunk mode, use this repo's issue tracker.
