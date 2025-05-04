export class CalcModel {
  constructor() {
    this.history = [];
    this.data = {
      leftOperand: '0',
      rightOperand: '',
      operator: '',
      error: '',
    };
    this.memorizedValue = '0';
    this.prevCommand = null;
    this.isError = false;
    this.isCalculatedOperand = false;
  }

  init(view) {
    this.view = view;
    this.view.updateDisplay(this.data);
  }

  update() {
    this.view.updateDisplay(this.data);
  }

  clearMemory() {
    this.memorizedValue = '0';
  }

  memoryRecall() {
    if (this.data.operator) {
      this.data.rightOperand = this.memorizedValue;
    } else {
      this.data.leftOperand = this.memorizedValue;
    }
    this.update();
  }

  memoryAdd() {
    if (this.data.operator && this.data.rightOperand !== '') {
      this.memorizedValue = +this.memorizedValue + +this.data.rightOperand;
    } else if (!this.data.operator) {
      this.memorizedValue = +this.memorizedValue + +this.data.leftOperand;
    }
  }

  memorySubtract() {
    if (this.data.operator && this.data.rightOperand !== '') {
      this.memorizedValue = this.memorizedValue - this.data.rightOperand;
    } else if (!this.data.operator) {
      this.memorizedValue = this.memorizedValue - this.data.leftOperand;
    }
  }

  clear() {
    this.history.length = 0;
    this.prevCommand = null;
    this.data.operator = '';
    this.data.rightOperand = '';
    this.data.leftOperand = '0';
    this.data.error = '';
    this.isError = false;
    this.update();
  }

  executeCommandWithTwoOperands(command) {
    if (this.data.leftOperand !== '' && this.data.rightOperand !== '') {
      try {
        this.data = this.prevCommand.execute(
          this.data.leftOperand,
          this.data.rightOperand,
          this.data
        );
        this.isCalculatedOperand = true;
      } catch (err) {
        this.isError = true;
        this.data = {
          leftOperand: '',
          rightOperand: '',
          operator: '',
          error: err.message,
        };
        this.view.setButtonsDisable();
      }
      this.history.push(this.prevCommand);
    }
    this.update();
    this.prevCommand = command;
  }

  calculate(command) {
    try {
      this.data = command.execute(
        this.data.leftOperand,
        this.data.rightOperand,
        this.data,
        this.prevCommand
      );
      this.isCalculatedOperand = true;
    } catch (err) {
      this.isError = true;
      this.data = {
        leftOperand: '',
        rightOperand: '',
        operator: '',
        error: err.message,
      };
      this.view.setButtonsDisable();
    }
    this.update();
    this.history.push(this.prevCommand);
    this.data.error = '';
  }

  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      this.data = command.undo();
    } else {
      this.data = {
        leftOperand: '0',
        rightOperand: '',
        operator: '',
      };
    }
    this.update();
  }

  executeInput(command) {
    this.history.push(command);
    this.data = command.execute(this.data, this.isCalculatedOperand);
    this.update();
    this.data.error = '';
    this.isCalculatedOperand = false;
  }

  changeSign(command) {
    if (this.data.leftOperand && !this.data.operator) {
      this.data.leftOperand = command.execute(this.data.leftOperand, this.data);
    } else {
      this.data.rightOperand = command.execute(this.data.rightOperand, this.data);
    }
    this.history.push(command);
    this.update();
  }

  executeCommandWithOneOperand(command) {
    try {
      this.isCalculatedOperand = true;
      this.data = command.execute(this.data.leftOperand, this.data.rightOperand, this.data);
    } catch (err) {
      this.isError = true;
      this.data = {
        leftOperand: '',
        rightOperand: '',
        operator: '',
        error: err.message,
      };
      this.view.setButtonsDisable();
    }
    this.history.push(command);
    this.update();
    this.data.error = '';
  }

  setButtonsNotDisable() {
    this.view.setButtonsNotDisable();
  }
}
