# vim4chess

<img width="500" height="500" alt="ChatGPT_Image_Sep_10__2026__04_20_38_PM-removebg-preview" src="https://github.com/user-attachments/assets/de754257-3c3d-48b6-9792-67b5cbf41b31" />

Play on [Chess.com](https://www.chess.com/) without leaving the keyboard. vim4chess adds a Vim-inspired move field with algebraic and coordinate notation and live move previews.

https://github.com/user-attachments/assets/ba1fd39b-4bdb-4b37-b9e2-fb77554a2034

> vim4chess is a fork of [everyonesdesign/Chess-Helper](https://github.com/everyonesdesign/Chess-Helper).

## Features

- Enter moves without reaching for the mouse.
- Use algebraic notation such as `Nf3` and `O-O`.
- Use coordinate notation such as `e2e4`, `e2 e4`, and `e2-e4`.
- Preview candidate moves on the board as you type.
- Hide the move field automatically to keep the board uncluttered.

## Controls

| Key | Action |
| --- | --- |
| `I` | Focus the move field |
| `Enter` | Submit the current move |
| `Esc` or `jk` | Leave the move field |
| `Ctrl/Cmd + Left` | Go to the previous move |
| `Ctrl/Cmd + Right` | Go to the next move |

Type `/hide` in the move field to toggle automatic hiding. The preference is saved in your browser.

## Install from Source

You need [Node.js](https://nodejs.org/), npm, and a Chromium-based browser or Firefox 140 or newer.

```sh
npm install
npm run build
```

The build is written to `app/`.

### Chromium

For Chrome, Edge, Brave, or Opera:

1. Open the browser's extensions page.
2. Enable developer mode.
3. Select **Load unpacked**.
4. Choose the `app/` directory.

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Select **Load Temporary Add-on**.
3. Choose `app/manifest.json`.

Firefox removes temporary extensions when the browser restarts.

## Development

```sh
npm run build       # Build once
npm run watch       # Rebuild on file changes
npm test            # Run unit tests
npm run e2e         # Run Cypress end-to-end tests
npm run pack         # Create a production archive
```

## Support

<a href="https://ko-fi.com/L2J826QE4N"><img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Support me on Ko-fi" width="25%"></a>

## Disclaimer

This extension is provided as-is and may contain bugs. You are responsible for any moves, game outcomes, or interruptions caused by its use.

vim4chess is not intended to violate the [Chess.com User Agreement](https://www.chess.com/legal/user-agreement). Do not use it for engine assistance, automation, or any other prohibited activity.

## License

Licensed under the [MIT License](LICENSE). The original copyright notice is retained.
