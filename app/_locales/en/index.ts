import {
  TLocaleSet,
} from '../../src/types';

const translations : TLocaleSet = {
  inputHint: 'Enter your move. Press <esc> or <jk> to leave.',
  focusHint: 'Press <i> to focus move field...',
  focusHintFromOther: 'Press Esc + I to focus move field...',
  ambiguousMove: 'Ambiguous move: $move',
  incorrectMove: 'Incorrect move: $move',
  illegalMove: 'Move $move is illegal',
  blindFoldPeekHint: 'Hover here or hold $key to peek',
  blindFoldOn: 'Blindfold mode is on',
  blindfoldToggleHint: 'Click here to toggle blindfold mode',
  autoHideOn: 'Input auto-hide is on',
  autoHideOff: 'Input auto-hide is off',
  hideCommandHint: 'Toggle input auto-hide',
  _test: 'Test content',
  _test_1_placeholder: 'Test content $name1',
  _test_2_placeholders: 'Test content $name1 $name2',
};

export default translations;
