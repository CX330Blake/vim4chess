# key2chess

> This project is a fork of [everyonesdesign/Chess-Helper](https://github.com/everyonesdesign/Chess-Helper).

[![Test CI](https://github.com/CX330Blake/key2chess/actions/workflows/test.yml/badge.svg)](https://github.com/CX330Blake/key2chess/actions/workflows/test.yml)

Use your keyboard to make moves on [Chess.com](https://www.chess.com/). This fork streamlines the original extension with Vim-style input controls and an auto-hiding move field.

![Chess keyboard input](https://i.imgur.com/ehN2pfT.png)

## Features

- Enter moves without reaching for the mouse.
- Use algebraic notation, such as `Nf3` or `O-O`.
- Use coordinate notation, such as `e2e4`, `e2 e4`, or `e2-e4`.
- Preview candidate moves directly on the board while typing.
- Play in blindfold mode and temporarily reveal the board when needed.
- Hide the move field automatically for a less distracting interface.

## Keyboard Controls

| Key | Action |
| --- | --- |
| `I` | Focus the move field |
| `Enter` | Submit the current move |
| `Esc` or `jk` | Leave the move field |
| `Ctrl/Cmd + Left` | Go to the previous move |
| `Ctrl/Cmd + Right` | Go to the next move |
| Hold `Ctrl` | Peek at the board in blindfold mode |

Enter `/hide` to toggle automatic hiding of the move field. The preference is saved in your browser.

## Install from Source

Requirements:

- Node.js
- npm
- A Chromium-based browser or Firefox

Install dependencies and build the extension:

```sh
npm install
npm run build
```

The unpacked extension is generated in `app/`.

### Chrome, Edge, Brave, or Opera

1. Open the browser's extensions page.
2. Enable developer mode.
3. Choose **Load unpacked**.
4. Select the `app/` directory.

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Select **Load Temporary Add-on**.
3. Choose `app/manifest.json`.

Temporary Firefox extensions are removed when the browser restarts.

## Development

Build once:

```sh
npm run build
```

Rebuild when files change:

```sh
npm run watch
```

Run unit tests:

```sh
npm test
```

Run end-to-end tests with Cypress:

```sh
npm run e2e
```

Create a production zip archive:

```sh
npm run pack
```

## Support

[![Support me on Ko-fi](https://storage.ko-fi.com/cdn/kofi2.png?v=3)](https://ko-fi.com/L2J826QE4N)

## Disclaimer

This extension is provided as-is and may contain bugs. You are responsible for any moves, game outcomes, or interruptions caused by its use.

The project is not intended to violate the [Chess.com User Agreement](https://www.chess.com/legal/user-agreement). Do not use it for engine assistance, automation, or any other prohibited activity.

## License

Licensed under the [MIT License](LICENSE). The original copyright notice is retained.
