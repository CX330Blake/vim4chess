import {
  drawMovesOnBoard,
} from './chess';
import {
  getBoard,
} from './chessboard';
import {
  bindInputKeyDown,
  bindInputFocus,
} from './keyboard';
import {
  onDocumentReady,
  isEditable,
  buildMessagesMarkup,
  createInitialElements,
  startUpdatingAriaHiddenElements,
  markExtentionInit,
} from './utils';
import { i18n } from './i18n';

/**
 * Prepare the extension code and run
 */
function init() {
  const selector = `
    .analysis-diagram .chess_viewer,
    .main-board .board,
    #chessboard,
    #live-app .main-board-component,
    #chess_com_tactics_board,
    #board-layout-main,
    [id^=chess_com_chessmentor_board_],
    chess-board
  `;
  const boardElement = document.querySelector(selector);
  if (boardElement) {
    const {
      wrapper,
      input,
      unfocusedLabel,
    } = createInitialElements();

    bindInputKeyDown(input);
    bindInputFocus(input);
    document.body.appendChild(wrapper);

    startUpdatingAriaHiddenElements();

    document.addEventListener('ccHelper-draw', () => {
      const board = getBoard();
      if (board) {
        drawMovesOnBoard(board, input.value);
      }
    });

    input.addEventListener('input', () => {
      try {
        const board = getBoard();

        if (board) {
          drawMovesOnBoard(board, input.value);
        }
      } catch (e) {
        console.error(e);
      }
    });

    updatePlaceholder(unfocusedLabel);
    ['focusin', 'focusout'].forEach((e) => {
      document.addEventListener(
        e,
        () => updatePlaceholder(unfocusedLabel)
      );
    });

    buildMessagesMarkup();
  }

  markExtentionInit();
}

/**
 * Handle focusin/focusout events on page
 * to show relevant placeholder in the input
 *
 * Unfocused placeholder is synthesised by
 * an additional element for a11y reasons
 * (to keep placeholder in the same state always)
 */
function updatePlaceholder(unfocusedLabel: HTMLElement) {
  const active = document.activeElement;
  const text = isEditable(active)
    ? i18n('focusHintFromOther')
    : i18n('focusHint');

  unfocusedLabel.textContent = text;

  const wrapper = unfocusedLabel.closest<HTMLElement>('.ccHelper-wrapper');
  const context = document.createElement('canvas').getContext('2d');
  if (wrapper && context) {
    context.font = getComputedStyle(unfocusedLabel).font;
    const width = Math.ceil(context.measureText(text).width + 70);
    wrapper.style.setProperty('--ccHelper-normal-width', `${width}px`);
  }
}

onDocumentReady(() => {
  setTimeout(init, 500);
});
