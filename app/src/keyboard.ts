import {
  go,
} from './chess';
import {
  getBoard,
} from './chessboard';
import {
  holdingCtrlOrCmd,
  isEditable,
  isModifierPressed,
  postMessage,
} from './utils';
import {
  Nullable,
} from './types';
import { i18n } from './i18n';

const AUTO_HIDE_CLASSNAME = 'ccHelper-wrapper--autoHide';
const AUTO_HIDE_STORAGE_KEY = 'ccHelper-autoHide';
const HIDE_COMMAND = '/hide';

const KEY_CODES = {
  enter: 13,
  leftArrow: 37,
  topArrow: 38,
  rightArrow: 39,
  bottomArrow: 40,
  escape: 27,
};

/**
 * Bind hotkeys connected with focusing of the input
 */
export function bindInputFocus(input: HTMLInputElement) {
  input.addEventListener('blur', () => {
    if (input.value) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (isModifierPressed(e)) {
      // prevent native events from being prevented
      // e.g. Ctrl + C
      return;
    }

    if (e.keyCode === KEY_CODES.escape && e.target !== input) {
      setTimeout(() => {
        if (document.activeElement) {
          const activeElement = <HTMLElement>document.activeElement;
          activeElement.blur();
        }
      });
    } else if (
      /^[iі]$/i.test(e.key) &&
      e.target !== input &&
      !isEditable(<Nullable<Element>>e.target)
    ) {
      e.preventDefault();
      input.focus();
    }
  });
}

/**
 * Handle keyDown event on the input
 * Responsible for submitting move, backward/forward moves, etc.
 */
export function bindInputKeyDown(input: HTMLInputElement) {
  let lastJKeyDownAt = 0;
  const wrapper = input.closest('.ccHelper-wrapper');
  const completion = wrapper && wrapper.querySelector<HTMLElement>('.ccHelper-completion');

  const completeHideCommand = () => {
    input.value = HIDE_COMMAND;
    input.setSelectionRange(HIDE_COMMAND.length, HIDE_COMMAND.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const updateCompletion = () => {
    if (!completion) {
      return;
    }

    const value = input.value.trim().toLowerCase();
    const isVisible = value.length > 0 &&
      value !== HIDE_COMMAND &&
      HIDE_COMMAND.startsWith(value);
    completion.hidden = !isVisible;
    input.setAttribute('aria-expanded', String(isVisible));
  };

  if (wrapper) {
    wrapper.classList.toggle(AUTO_HIDE_CLASSNAME, getAutoHidePreference());
  }

  input.addEventListener('input', updateCompletion);
  input.addEventListener('blur', updateCompletion);
  completion && completion.addEventListener('mousedown', (e) => e.preventDefault());
  completion && completion.addEventListener('click', completeHideCommand);

  input.addEventListener('keydown', (e) => {
    e.stopPropagation();

    if (completion && !completion.hidden) {
      if (e.key === 'Tab') {
        completeHideCommand();
        e.preventDefault();
        return;
      }

      if (e.keyCode === KEY_CODES.enter) {
        completeHideCommand();
      }
    }

    const cursor = input.selectionStart;
    const isJkSequence = (
      e.key === 'k' &&
      Date.now() - lastJKeyDownAt < 600 &&
      cursor !== null &&
      cursor === input.selectionEnd &&
      input.value[cursor - 1] === 'j'
    );

    if (isJkSequence && cursor !== null) {
      input.blur();
      lastJKeyDownAt = 0;
      e.preventDefault();
      return;
    }

    lastJKeyDownAt = e.key === 'j' ? Date.now() : 0;

    if (e.keyCode === KEY_CODES.enter) {
      if (!input.value) {
        return;
      }

      if (input.value.trim().toLowerCase() === HIDE_COMMAND && wrapper) {
        const autoHideEnabled = !wrapper.classList.contains(AUTO_HIDE_CLASSNAME);
        wrapper.classList.toggle(AUTO_HIDE_CLASSNAME, autoHideEnabled);
        setAutoHidePreference(autoHideEnabled);
        postMessage(i18n(autoHideEnabled ? 'autoHideOn' : 'autoHideOff'));
        input.value = '';
        input.blur();
        e.preventDefault();
        return;
      }

      const board = getBoard();

      if (board) {
        const success = go(board, input.value);
        board && board.clearMarkedArrows();

        if (success) {
          input.value = '';
        }
      }
    } else if (e.keyCode === KEY_CODES.escape) {
      input.blur();
      e.preventDefault();
    } else if (holdingCtrlOrCmd(e)) {
      if (e.keyCode === KEY_CODES.leftArrow) {
        const sel = `
          .move-list-buttons .icon-chevron-left,
          .control-group .icon-chevron-left,
          .move-list-buttons-component .icon-chevron-left
        `;
        const potentialElement = document.querySelector(sel);
        if (potentialElement) {
          const clickTarget = <HTMLElement>potentialElement;
          clickTarget.click();
        }
      } else if (e.keyCode === KEY_CODES.rightArrow) {
        const sel = `
          .move-list-buttons .icon-chevron-right,
          .control-group .icon-chevron-right,
          .move-list-buttons-component .icon-chevron-right
        `;
        const potentialElement = document.querySelector(sel);
        if (potentialElement) {
          const clickTarget = <HTMLElement>potentialElement;
          clickTarget.click();
        }
      }
    }
  });
}

function getAutoHidePreference() : boolean {
  try {
    return localStorage.getItem(AUTO_HIDE_STORAGE_KEY) !== 'false';
  } catch (e) {
    return true;
  }
}

function setAutoHidePreference(enabled: boolean) : void {
  try {
    localStorage.setItem(AUTO_HIDE_STORAGE_KEY, String(enabled));
  } catch (e) {
    // Keep the setting for this page when storage is unavailable.
  }
}
