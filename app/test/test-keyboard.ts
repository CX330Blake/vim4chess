import jsDomGlobal from 'jsdom-global';
import assert from 'assert';

jsDomGlobal();

import { bindInputFocus, bindInputKeyDown } from '../src/keyboard';

describe('Keyboard input', function() {
  it('clears and leaves the move field on Escape', function() {
    const input = document.createElement('input');
    input.value = 'Nf3';
    document.body.appendChild(input);
    bindInputKeyDown(input);
    bindInputFocus(input);
    input.focus();

    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    }));

    assert.equal(input.value, '');
    assert.notEqual(document.activeElement, input);
    input.remove();
  });

  it('focuses the move field with i', function() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    bindInputFocus(input);

    document.body.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'i',
      keyCode: 73,
      bubbles: true,
      cancelable: true,
    }));

    assert.equal(document.activeElement, input);
    input.remove();
  });

  it('clears and leaves the move field with jk', function() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    bindInputKeyDown(input);
    bindInputFocus(input);
    input.focus();

    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'j',
      keyCode: 74,
      bubbles: true,
    }));
    input.value = 'Nfj';
    input.setSelectionRange(3, 3);
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'k',
      keyCode: 75,
      bubbles: true,
      cancelable: true,
    }));

    assert.equal(input.value, '');
    assert.notEqual(document.activeElement, input);
    input.remove();
  });

  it('clears the move field when focus moves elsewhere', function() {
    const input = document.createElement('input');
    input.value = 'e4';
    document.body.appendChild(input);
    bindInputFocus(input);
    input.focus();

    input.blur();

    assert.equal(input.value, '');
    input.remove();
  });

  it('toggles input auto-hide with /hide', function() {
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    wrapper.className = 'ccHelper-wrapper ccHelper-wrapper--autoHide';
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);
    bindInputKeyDown(input);
    input.focus();
    input.value = '/hide';

    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    }));

    assert.equal(wrapper.classList.contains('ccHelper-wrapper--autoHide'), false);
    assert.equal(input.value, '');
    assert.notEqual(document.activeElement, input);
    wrapper.remove();
  });

  it('autocompletes /hide with Tab', function() {
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    const completion = document.createElement('button');
    wrapper.className = 'ccHelper-wrapper';
    completion.className = 'ccHelper-completion';
    completion.hidden = true;
    wrapper.appendChild(input);
    wrapper.appendChild(completion);
    document.body.appendChild(wrapper);
    bindInputKeyDown(input);
    input.value = '/h';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    assert.equal(completion.hidden, false);
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      keyCode: 9,
      bubbles: true,
      cancelable: true,
    }));

    assert.equal(input.value, '/hide');
    assert.equal(completion.hidden, true);
    wrapper.remove();
  });
});
