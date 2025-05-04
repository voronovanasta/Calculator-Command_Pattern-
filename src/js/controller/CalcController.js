import {
  AddCommand,
  CalculateCommand,
  CubeCommand,
  CubeRootCommand,
  DivideCommand,
  FactorialCommand,
  InputCommand,
  MultiplyCommand,
  NthRootCommand,
  PercentCommand,
  PowerCommand,
  PowerOfTenCommand,
  ReciprocalCommand,
  SignCommand,
  SquareCommand,
  SquareRootCommand,
  SubtractCommand,
} from '../commands.js';

export class CalcController {
  constructor(model, container) {
    this.model = model;
    this.container = container;
    this.keys = null;
    this.advancedKeys = null;
  }

  init() {
    this.eventHandler();
  }

  darkThemeOn() {
    if (localStorage.getItem('dark') === '1') {
      document.querySelector('html').classList.remove('light');
      localStorage.setItem('dark', 0);
      document.querySelector('.theme-mode span').textContent = `light_mode`;
    } else {
      localStorage.setItem('dark', 1);
      document.querySelector('html').classList.add('light');
      document.querySelector('.theme-mode span').textContent = 'settings_night_sight';
    }
  }

  eventHandler() {
    const themeMode = this.container.querySelector('#theme');
    themeMode.addEventListener('click', () => {
      this.darkThemeOn();
    });

    this.keys = this.container.querySelectorAll('.keyboard-key:not([data-value])');
    this.keys.forEach((el) => {
      el.addEventListener('click', (e) => {
        this.model.setButtonsNotDisable();
        const value = e.target.textContent;
        switch (value) {
          case '+':
            this.model.executeCommandWithTwoOperands(new AddCommand());
            this.model.executeInput(new InputCommand(value));
            break;
          case '-':
            this.model.executeCommandWithTwoOperands(new SubtractCommand());
            this.model.executeInput(new InputCommand(value));
            break;
          case '/':
            this.model.executeCommandWithTwoOperands(new DivideCommand());
            this.model.executeInput(new InputCommand(value));
            break;
          case 'x':
            this.model.executeCommandWithTwoOperands(new MultiplyCommand());
            this.model.executeInput(new InputCommand(value));
            break;
          case '=':
            this.model.calculate(new CalculateCommand());
            break;
          case '+/-':
            this.model.changeSign(new SignCommand());
            break;
          case '%':
            this.model.executeCommandWithOneOperand(new PercentCommand());
            break;
          case 'AC':
            this.model.clear();
            break;
          case 'MC':
            this.model.clearMemory();
            break;
          case 'M+':
            this.model.memoryAdd();
            break;
          case 'M-':
            this.model.memorySubtract();
            break;
          case 'MR':
            this.model.memoryRecall();
            break;
          case 'undo':
            this.model.undo();
            break;
          case '1/x':
            this.model.executeCommandWithOneOperand(new ReciprocalCommand());
            break;
          case 'n!':
            this.model.executeCommandWithOneOperand(new FactorialCommand());
            break;
          default:
            this.model.executeInput(new InputCommand(value));
            break;
        }
      });
    });

    this.advancedKeys = this.container.querySelectorAll('[data-value]');
    this.advancedKeys.forEach((el) => {
      el.addEventListener('click', (e) => {
        this.model.setButtonsNotDisable();
        const value =
          e.target === 'button' ? e.target.dataset.value : e.currentTarget.dataset.value;
        switch (value) {
          case 'x^2':
            this.model.executeCommandWithOneOperand(new SquareCommand());
            break;
          case 'x^3':
            this.model.executeCommandWithOneOperand(new CubeCommand());
            break;
          case 'x^y':
            this.model.executeCommandWithTwoOperands(new PowerCommand());
            this.model.executeInput(new InputCommand('^'));
            break;
          case '10^x':
            this.model.executeCommandWithOneOperand(new PowerOfTenCommand());
            break;
          case '2√x':
            this.model.executeCommandWithOneOperand(new SquareRootCommand());
            break;
          case '3√x':
            this.model.executeCommandWithOneOperand(new CubeRootCommand());
            break;
          case 'y√x':
            this.model.executeCommandWithTwoOperands(new NthRootCommand());
            this.model.executeInput(new InputCommand('rt-degree:'));
            break;
        }
      });
    });
  }
}
