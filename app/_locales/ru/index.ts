import {
  TLocaleSet,
} from '../../src/types';

const translations : TLocaleSet = {
  inputHint: 'Введите ход...',
  focusHint: 'Нажмите I для ввода хода...',
  focusHintFromOther: 'Нажмите Esc + I для ввода хода...',
  ambiguousMove: '$move: найдено более 1 хода',
  incorrectMove: 'Некорректный ход: $move',
  illegalMove: 'Невозможно сделать ход $move',
  blindFoldPeekHint: 'Наведите курсор сюда или нажмите $key чтобы увидеть доску',
  blindFoldOn: 'Режим игры вслепую включен',
  blindfoldToggleHint: 'Нажмите сюда, чтобы переключить режим игры вслепую',
  _test: 'Test content',
  _test_1_placeholder: 'Test content $name1',
  _test_2_placeholders: 'Test content $name1 $name2',
};

export default translations;
