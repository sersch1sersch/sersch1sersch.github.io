import lang from './translate.js';

const DEFAULT_LANG = 'en';
let langOn = localStorage.getItem('language') || DEFAULT_LANG;

let keyCapsLock = false;

let cursorInput = 0;
let entryFieldTexts = '';

const body = document.querySelector('body');

function allContent() {
  const htmlContent = `<div class="container">
                        <textarea name="textarea" class="textarea" autofocus></textarea>
                        <div class="keyboards">
                            <div class="row-1">
                                <div class="key letter_key symbol" data-lg="backquote" id='Backquote'>\`</div>
                                <div class="key digit" id="Digit1">1</div>
                                <div class="key digit" id="Digit2">2</div>
                                <div class="key digit" id="Digit3">3</div>
                                <div class="key digit" id="Digit4">4</div>
                                <div class="key digit" id="Digit5">5</div>
                                <div class="key digit" id="Digit6">6</div>
                                <div class="key digit" id="Digit7">7</div>
                                <div class="key digit" id="Digit8">8</div>
                                <div class="key digit" id="Digit9">9</div>
                                <div class="key digit" id="Digit0">0</div>
                                <div class="key symbol" id="Minus">-</div>
                                <div class="key symbol" id="Equal">=</div>
                                <div class="key control-key centr backspace" id="Backspace">backspace</div>
                            </div>
                            <div class="row-2">
                                <div class="key control-key tab" id="Tab">tab</div>
                                <div class="key letter_key" data-lg="q" id="KeyQ">q</div>
                                <div class="key letter_key" data-lg="w" id="KeyW">w</div>
                                <div class="key letter_key" data-lg="e" id="KeyE">e</div>
                                <div class="key letter_key" data-lg="r" id="KeyR">r</div>
                                <div class="key letter_key" data-lg="t" id="KeyT">t</div>
                                <div class="key letter_key" data-lg="y" id="KeyY">y</div>
                                <div class="key letter_key" data-lg="u" id="KeyU">u</div>
                                <div class="key letter_key" data-lg="i" id="KeyI">i</div>
                                <div class="key letter_key" data-lg="o" id="KeyO">o</div>
                                <div class="key letter_key" data-lg="p" id="KeyP">p</div>
                                <div class="key letter_key symbol" data-lg="[" id="BracketLeft">[</div>
                                <div class="key letter_key symbol" data-lg="]" id="BracketRight">]</div>
                                <div class="key symbol" id="Backslash">\\</div>
                                <div class="key control-key del" id="Delete">del</div>
                            </div>
                            <div class="row-3">
                                <div class="key control-key centr capslock" id="CapsLock">caps lock</div>
                                <div class="key letter_key" data-lg="a" id="KeyA">a</div>
                                <div class="key letter_key" data-lg="s" id="KeyS">s</div>
                                <div class="key letter_key" data-lg="d" id="KeyD">d</div>
                                <div class="key letter_key" data-lg="f" id="KeyF">f</div>
                                <div class="key letter_key" data-lg="g" id="KeyG">g</div>
                                <div class="key letter_key" data-lg="h" id="KeyH">h</div>
                                <div class="key letter_key" data-lg="j" id="KeyJ">j</div>
                                <div class="key letter_key" data-lg="k" id="KeyK">k</div>
                                <div class="key letter_key" data-lg="l" id="KeyL">l</div>
                                <div class="key letter_key symbol" data-lg=";" id="Semicolon">;</div>
                                <div class="key letter_key symbol" data-lg="quotes" id="Quote">'</div>
                                <div class="key control-key centr enter" id="Enter">enter</div>
                            </div>
                            <div class="row-4">
                                <div class="key control-key centr shift" id="ShiftLeft">shift</div>
                                <div class="key letter_key" data-lg="z" id="KeyZ">z</div>
                                <div class="key letter_key" data-lg="x" id="KeyX">x</div>
                                <div class="key letter_key" data-lg="c" id="KeyC">c</div>
                                <div class="key letter_key" data-lg="v" id="KeyV">v</div>
                                <div class="key letter_key" data-lg="b" id="KeyB">b</div>
                                <div class="key letter_key" data-lg="n" id="KeyN">n</div>
                                <div class="key letter_key" data-lg="m" id="KeyM">m</div>
                                <div class="key letter_key symbol" data-lg="comma" id="Comma">,</div>
                                <div class="key letter_key symbol" data-lg="period" id="Period">.</div>
                                <div class="key symbol" data-lg="slash" id="Slash">/</div>
                                <div class="key control-key arrow-up arrow" id="ArrowUp">▲</div>
                                <div class="key control-key centr shift" id="ShiftRight">shift</div>
                            </div>
                            <div class="row-5">
                                <div class="key control-key" id="ControlLeft">ctrl</div>
                                <div class="key control-key" id="MetaLeft">win</div>
                                <div class="key control-key" id="AltLeft">alt</div>
                                <div class="key space" id="Space"> </div>
                                <div class="key control-key" id="AltRight">alt</div>
                                <div class="key control-key arrow" id="ArrowLeft">◄</div>
                                <div class="key control-key arrow" id="ArrowDown">▼</div>
                                <div class="key control-key arrow" id="ArrowRight">►</div>
                                <div class="key control-key" id="ControlRight">ctrl</div>
                            </div>
                        </div>
                        <div class="addition">
                            <p>Смена языка: ctrl + alt</p>
                        </div>
                    </div>`;

  body.insertAdjacentHTML('afterbegin', htmlContent);
}
allContent();

const data_lang = document.querySelectorAll('[data-lg]');
const allLetters = document.querySelectorAll('.letter_key');
const digit = document.querySelectorAll('.digit');
const symvol = document.querySelectorAll('.symbol');
const shift = document.querySelectorAll('.shift');

const controlLefts = document.querySelector('#ControlLeft');
const altLefts = document.querySelector('#AltLeft');
const controlRights = document.querySelector('#ControlRight');
const altRights = document.querySelector('#AltRight');

const entry_field = document.querySelector('.textarea');
const keyboards = document.querySelector('.keyboards');

function lsSave() {
  localStorage.setItem('language', langOn);
}

function Translate() {
  data_lang.forEach((el) => {
    const elem = el;
    elem.textContent = lang[langOn][elem.dataset.lg];
  });
}

function symvolShift() {
  const [one, two, three, four, five, six, seven, eight, nine, zero] = digit;
  const [
    backquote,
    minus,
    equal,
    bracketleft,
    bracketright,
    backslash,
    semicolon,
    quote,
    comma,
    period,
    slash,
  ] = symvol;
  if (langOn == 'en') {
    one.textContent = '!';
    two.textContent = '@';
    three.textContent = '#';
    four.textContent = '$';
    five.textContent = '%';
    six.textContent = '^';
    seven.textContent = '&';
    eight.textContent = '*';
    nine.textContent = '(';
    zero.textContent = ')';
    backquote.textContent = '~';
    minus.textContent = '_';
    equal.textContent = '+';
    bracketleft.textContent = '{';
    bracketright.textContent = '}';
    backslash.textContent = '|';
    semicolon.textContent = ':';
    quote.textContent = '"';
    comma.textContent = '<';
    period.textContent = '>';
    slash.textContent = '?';
  } else if (langOn == 'ru') {
    one.textContent = '!';
    two.textContent = '"';
    three.textContent = '№';
    four.textContent = ';';
    five.textContent = '%';
    six.textContent = ':';
    seven.textContent = '?';
    eight.textContent = '*';
    nine.textContent = '(';
    zero.textContent = ')';
    minus.textContent = '_';
    equal.textContent = '+';
    backslash.textContent = '/';
    slash.textContent = ',';
  }
}

function symvolUnshift() {
  const [one, two, three, four, five, six, seven, eight, nine, zero] = digit;
  const [
    backquote,
    minus,
    equal,
    bracketleft,
    bracketright,
    backslash,
    semicolon,
    quote,
    comma,
    period,
    slash,
  ] = symvol;
  one.textContent = '1';
  two.textContent = '2';
  three.textContent = '3';
  four.textContent = '4';
  five.textContent = '5';
  six.textContent = '6';
  seven.textContent = '7';
  eight.textContent = '8';
  nine.textContent = '9';
  zero.textContent = '0';
  minus.textContent = '-';
  equal.textContent = '=';
  if (langOn == 'en') {
    backquote.textContent = '`';
    bracketleft.textContent = '[';
    bracketright.textContent = ']';
    backslash.textContent = '\\';
    semicolon.textContent = ';';
    quote.textContent = "'";
    comma.textContent = ',';
    period.textContent = '.';
    slash.textContent = '/';
  } else if (langOn == 'ru') {
    backslash.textContent = '\\';
    slash.textContent = '.';
  }
}

function updateLetter() {
  if (keyCapsLock) {
    allLetters.forEach((l) => {
      const letter_key = l;
      letter_key.textContent = letter_key.textContent.toLowerCase();
    });
  } else if (!keyCapsLock) {
    allLetters.forEach((l) => {
      const letter_key = l;
      letter_key.textContent = letter_key.textContent.toUpperCase();
    });
  }
}

function delTextarea() {
  if (cursorInput > 0) {
    entryFieldTexts = entryFieldTexts.substring(0, entry_field.selectionStart - 1)
      + entryFieldTexts.substring(entry_field.selectionEnd);
    cursorInput -= 1;
  }
}

function delTextareaLs() {
  entryFieldTexts = entryFieldTexts.substring(0, entry_field.selectionStart)
    + entryFieldTexts.substring(entry_field.selectionEnd + 1);
}

entry_field.addEventListener('click', () => {
  cursorInput = entry_field.selectionStart;
});

function entryFieldText(text) {
  entryFieldTexts = entryFieldTexts.substring(0, cursorInput)
    + text
    + entryFieldTexts.substring(cursorInput);
  cursorInput += text.length;
}

function updateTextarea() {
  entry_field.textContent = entryFieldTexts;
  entry_field.selectionStart = cursorInput;
  entry_field.focus();
}

function caseKey(key) {
  if (keyCapsLock) {
    key.classList.remove('capslock-active');
    key.classList.remove('active');
    key.classList.remove('active-background');
    allLetters.forEach((l) => {
      const letter_key = l;
      letter_key.textContent = letter_key.textContent.toLowerCase();
    });
    keyCapsLock = false;
  } else if (!keyCapsLock) {
    allLetters.forEach((l) => {
      const letter_key = l;
      letter_key.textContent = letter_key.textContent.toUpperCase();
    });
    key.classList.add('capslock-active');
    key.classList.add('active');
    key.classList.add('active-background');
    keyCapsLock = true;
  }
}

function languageOn() {
  if (langOn === 'ru') {
    langOn = 'en';
  } else if (langOn === 'en') {
    langOn = 'ru';
  }
  lsSave();
  if (keyCapsLock) {
    data_lang.forEach((el) => {
      const elem = el;
      elem.textContent = lang[langOn][elem.dataset.lg].toUpperCase();
    });
  } else if (!keyCapsLock) {
    data_lang.forEach((el) => {
      const elem = el;
      elem.textContent = lang[langOn][elem.dataset.lg].toLowerCase();
    });
  }
}

function defineInput(key) {
  if (key.classList.contains('key') && !key.classList.contains('control-key')) {
    entryFieldText(key.textContent);
  }
  if (key.classList.contains('arrow')) {
    entryFieldText(key.textContent);
  }
  if (key.classList.contains('capslock')) {
    caseKey(key);
  }
  if (key.classList.contains('enter')) {
    entryFieldText('\n');
  }
  if (key.classList.contains('tab')) {
    entryFieldText('\t');
  }
  if (key.classList.contains('backspace')) {
    delTextarea();
  }
  if (key.classList.contains('del')) {
    delTextareaLs();
  }
  updateTextarea();
}

function inputKey(e) {
  const key = document.querySelector(`#${e.code}`);
  if (key) {
    if (key.classList.contains('key')) {
      e.preventDefault();
    }
    if (key.classList.contains('control-key')) {
      key.classList.add('active-background');
    }
    key.classList.add('active');
    if (key.classList.contains('shift')) {
      symvolShift();
      updateLetter();
    }
    defineInput(key);
  }
  if (
    controlLefts.classList.contains('active')
    && altLefts.classList.contains('active')
  ) {
    languageOn();
  }
  if (
    controlRights.classList.contains('active')
    && altRights.classList.contains('active')
  ) {
    languageOn();
  }
  if (
    controlRights.classList.contains('active')
    && altLefts.classList.contains('active')
  ) {
    languageOn();
  }
  if (
    controlLefts.classList.contains('active')
    && altRights.classList.contains('active')
  ) {
    languageOn();
  }
}

function defineKey(key) {
  if (key.classList.contains('shift')) {
    if (!keyCapsLock) {
      allLetters.forEach((l) => {
        const letter_key = l;
        letter_key.textContent = letter_key.textContent.toLowerCase();
      });
    } else if (keyCapsLock) {
      allLetters.forEach((l) => {
        const letter_key = l;
        letter_key.textContent = letter_key.textContent.toUpperCase();
      });
    }
    symvolUnshift();
  }
}

function replacementKey(e) {
  const key = document.querySelector(`#${e.code}`);
  if (key) {
    if (
      key.classList.contains('control-key')
      && !key.classList.contains('capslock')
    ) {
      key.classList.remove('active-background');
    }
    if (!key.classList.contains('capslock')) {
      key.classList.remove('active');
    }
    defineKey(key);
  }
}

document.addEventListener('keydown', inputKey);
document.addEventListener('keyup', replacementKey);

shift.forEach((shift) => shift.addEventListener('mousedown', () => {
  symvolShift();
  updateLetter();
}));

shift.forEach((shift) => shift.addEventListener('mouseup', (e) => {
  const key = e.target;
  defineKey(key);
}));

function idKey(e) {
  const key = e.target;
  defineInput(key);
}

keyboards.addEventListener('click', idKey);

Translate();
