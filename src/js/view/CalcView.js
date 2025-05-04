export class CalcView {
  constructor(model, container) {
    this.model = model;
    this.container = container;
    this.wrapper = null;
    this.keysContainer = null;
    this.inputContainer = null;
    this.themeMode = null;
  }

  init() {
    this.drawCalculator();
    this.inputContainer = this.container.querySelector('#input');
    this.inputContainer.value = '0';
    this.keysOnError = this.container.querySelectorAll('.error');
  }

  drawCalculator() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'keyboard-wrapper';

    this.inputContainer = document.createElement('input');
    this.inputContainer.className = 'display';
    this.inputContainer.id = 'input';
    this.inputContainer.readonly = true;

    const themeModeContainer = document.createElement('div');
    this.themeMode = document.createElement('a');
    this.themeMode.className = 'theme-mode';
    this.themeMode.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
    themeModeContainer.id = 'theme';
    this.themeMode.href = '#';
    themeModeContainer.append(this.themeMode);

    this.keysContainer = document.createElement('div');
    this.keysContainer.className = 'keyboard-keys';
    this.keysContainer.append(this.createKeys());
    this.wrapper.append(this.inputContainer, this.keysContainer);
    this.container.append(this.wrapper, themeModeContainer);
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const wrapper1 = document.createElement('div');
    const wrapper2 = document.createElement('div');
    const keyLayout = [
      'AC',
      '%',
      '+/-',
      '/',
      7,
      8,
      9,
      'x',
      4,
      5,
      6,
      '-',
      1,
      2,
      3,
      '+',
      0,
      '.',
      '=',
    ];

    const advancedKeyLayout = [
      'MC',
      'M+',
      'undo',
      'MR',
      'M-',
      'x^2',
      'x^3',
      'x^y',
      '10^x',
      '1/x',
      '2√x',
      '3√x',
      'y√x',
      'n!',
    ];

    keyLayout.forEach((key) => {
      const keyBtn = document.createElement('button');
      keyBtn.setAttribute('type', 'button');
      keyBtn.classList.add('keyboard-key');
      const newLine = ['/', 'x', '-', '+', '='].indexOf(key);
      keyBtn.innerHTML = key;
      if (key === 0) {
        keyBtn.classList.add('zero-key');
      }
      wrapper1.append(keyBtn);
      if (newLine >= 0) {
        wrapper1.append(document.createElement('br'));
      }
      if (typeof key !== 'number' && key !== 'AC') {
        keyBtn.classList.add('error');
      }
    });
    advancedKeyLayout.forEach((key) => {
      const keyBtn = document.createElement('button');
      keyBtn.setAttribute('type', 'button');
      keyBtn.classList.add('keyboard-key');
      keyBtn.classList.add('advanced');

      if (['x^2', 'x^3', 'x^y', '10^x'].indexOf(key) !== -1) {
        const numberPart = document.createElement('span');
        const basePart = document.createElement('span');
        basePart.classList.add('base');
        keyBtn.dataset.value = key;
        const elements = key.split('^');
        numberPart.innerHTML = elements[0];
        basePart.innerHTML = elements[1];
        keyBtn.append(numberPart, basePart);
      } else if (['2√x', '3√x', 'y√x'].indexOf(key) !== -1) {
        const numberPart = document.createElement('span');
        const basePart = document.createElement('span');
        keyBtn.dataset.value = key;
        basePart.classList.add('base-root');
        const elements = key.split('√');
        basePart.innerHTML = elements[0];
        numberPart.innerHTML = '√' + elements[1];
        keyBtn.append(basePart, numberPart);
      } else {
        keyBtn.innerHTML = key;
      }

      wrapper2.append(keyBtn);

      const newLine = ['undo', 'x^2', '10^x', '3√x'].indexOf(key);
      if (newLine >= 0) {
        wrapper2.append(document.createElement('br'));
      }
      if (key !== 'undo') {
        keyBtn.classList.add('error');
      }
    });
    fragment.append(wrapper2, wrapper1);
    return fragment;
  }

  updateDisplay({ leftOperand, rightOperand, operator, error }) {
    const content = error ? error : leftOperand + ' ' + operator + ' ' + rightOperand;
    this.inputContainer.value = content === '' ? '0' : content;
  }

  setButtonsDisable() {
    this.keysOnError.forEach((key) => {
      key.setAttribute('disabled', 'true');
    });
  }
  setButtonsNotDisable() {
    this.keysOnError.forEach((key) => {
      key.removeAttribute('disabled');
    });
  }
}
