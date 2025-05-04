export class InputCommand {
  constructor(value) {
    this.value = value;
    this.initialData = null;
  }

  execute(data, isCalculatedOperand) {
    let { leftOperand, rightOperand, operator, error } = data;
    this.initialData = { ...data };
    if (error) {
      return { ...data };
    }

    if (this.value === '.' && !operator) {
      if (!leftOperand.toString().includes('.')) {
        leftOperand = !isCalculatedOperand ? leftOperand + '.' : '0' + '.';
      } else {
        if (isCalculatedOperand) {
          leftOperand = '0' + '.';
        }
      }
    }

    if (this.value === '.' && operator) {
      if (!rightOperand.toString().includes('.')) {
        rightOperand = rightOperand === '' ? '0' + '.' : rightOperand + '.';
      }
    }

    if (!isNaN(this.value) && !operator) {
      if (leftOperand === '' || leftOperand === '0') {
        leftOperand = this.value;
      } else {
        leftOperand = !isCalculatedOperand ? leftOperand + this.value : this.value;
      }
    }

    if (!isNaN(this.value) && operator) {
      if (rightOperand === '' || rightOperand === '0') {
        rightOperand = this.value;
      } else {
        rightOperand = rightOperand + this.value;
      }
    }

    if (
      (this.value === '+' ||
        this.value === '-' ||
        this.value === 'x' ||
        this.value === '/' ||
        this.value === '^' ||
        this.value === 'rt-degree:') &&
      leftOperand !== ''
    ) {
      operator = this.value;
      if (leftOperand.toString().at(-1) === '.') {
        leftOperand = leftOperand.slice(0, -1);
      }
    }

    return { leftOperand, rightOperand, operator, error: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class SignCommand {
  constructor() {
    this.initialData = null;
  }
  execute(operand, data) {
    this.initialData = { ...data };
    if (operand !== '' && operand != '0') {
      return operand * -1;
    }
    return operand;
  }
  undo() {
    return this.initialData;
  }
}

export class AddCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    let result = +leftOperand + +rightOperand;
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(6));
    }
    return { ...data, leftOperand: result, rightOperand: '', operator: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class MultiplyCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    let result = leftOperand * rightOperand;
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(6));
    }

    return { ...data, leftOperand: result, rightOperand: '', operator: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class DivideCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    let result = leftOperand / rightOperand;
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(6));
    }
    if (rightOperand === '0') throw new Error('Invalid operation!');
    return { leftOperand: result, rightOperand: '', operator: '', error: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class SubtractCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    let result = leftOperand - rightOperand;
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(6));
    }
    return { ...data, leftOperand: result, rightOperand: '', operator: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class PercentCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    const BASE = 100;
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = (rightOperand / BASE) * leftOperand;
    } else if (data.operator && rightOperand === '') {
      rightOperand = (leftOperand * leftOperand) / BASE;
    } else {
      leftOperand = '0';
      data.operator = '';
    }

    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }

  undo() {
    return this.initialData;
  }
}

export class SquareCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    const BASE = 2;
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = rightOperand ** BASE;
    } else if (data.operator && rightOperand === '') {
      rightOperand = leftOperand ** BASE;
    } else {
      leftOperand = leftOperand ** BASE;
      data.operator = '';
    }
    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }
  undo() {
    return this.initialData;
  }
}

export class CubeCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    const BASE = 3;
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = rightOperand ** BASE;
    } else if (data.operator && rightOperand === '') {
      rightOperand = leftOperand ** BASE;
    } else {
      leftOperand = leftOperand ** BASE;
      data.operator = '';
    }
    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }
  undo() {
    return this.initialData;
  }
}

export class PowerCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    return { ...data, leftOperand: leftOperand ** rightOperand, rightOperand: '', operator: '' };
  }

  undo() {
    return this.initialData;
  }
}

export class PowerOfTenCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    const NUMBER = 10;
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = NUMBER ** rightOperand;
    } else if (data.operator && rightOperand === '') {
      rightOperand = NUMBER ** leftOperand;
    } else {
      leftOperand = NUMBER ** leftOperand;
      data.operator = '';
    }

    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }

  undo() {
    return this.initialData;
  }
}

export class ReciprocalCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = this.getReciprocal(rightOperand);
    } else if (data.operator && rightOperand === '') {
      rightOperand = this.getReciprocal(leftOperand);
    } else {
      leftOperand = this.getReciprocal(leftOperand);
      data.operator = '';
    }

    return { leftOperand, rightOperand, operator: data.operator, error: '' };
  }

  getReciprocal(num) {
    if (num == '0') throw new Error('Invalid operation!');
    return 1 / num;
  }

  undo() {
    return this.initialData;
  }
}

export class SquareRootCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = this.root(rightOperand);
    } else if (data.operator && rightOperand === '') {
      rightOperand = this.root(leftOperand);
    } else {
      leftOperand = this.root(leftOperand);
      data.operator = '';
    }
    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }

  root(num) {
    if (num < 0) throw new Error('Invalid operation!');
    return num ** (1 / 2);
  }

  undo() {
    return this.initialData;
  }
}

export class CubeRootCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = this.root(rightOperand);
    } else if (data.operator && rightOperand === '') {
      rightOperand = this.root(leftOperand);
    } else {
      leftOperand = this.root(leftOperand);
      data.operator = '';
    }
    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }

  root(num) {
    let cbrt = num / 3;
    let temp = 0;
    while (cbrt !== temp) {
      temp = cbrt;
      cbrt = (num / (temp * temp) + temp * 2) / 3;
    }
    return cbrt;
  }

  undo() {
    return this.initialData;
  }
}

export class NthRootCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    leftOperand = this.root(leftOperand, rightOperand);
    return { ...data, leftOperand, rightOperand: '', operator: '' };
  }

  root(num, base) {
    if ((base % 2 === 0 && num < 0) || base == 0) throw new Error('Invalid operation!');
    let cbrt = num / base;
    let temp = 0;
    while (cbrt !== temp) {
      temp = cbrt;
      cbrt = (num / temp ** (base - 1) + temp * (base - 1)) / base;
    }
    return cbrt;
  }

  undo() {
    return this.initialData;
  }
}

export class FactorialCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data) {
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      rightOperand = this.calculateFactorial(rightOperand);
    } else if (data.operator && rightOperand === '') {
      rightOperand = this.calculateFactorial(leftOperand);
    } else {
      leftOperand = this.calculateFactorial(leftOperand);
      data.operator = '';
    }
    return { ...data, leftOperand, rightOperand, operator: data.operator };
  }

  calculateFactorial(num) {
    if (num < 0 || !Number.isInteger(+num)) {
      throw new Error('Invalid operation!');
    }
    if (num === 0) return 1;

    let result = BigInt(1);
    for (let i = 1; i <= num; i++) {
      result *= BigInt(i);
    }
    return result.toString();
  }

  undo() {
    return this.initialData;
  }
}

export class CalculateCommand {
  constructor() {
    this.initialData = null;
  }
  execute(leftOperand, rightOperand, data, prevCommand) {
    this.initialData = { ...data };
    if (data.operator && rightOperand !== '') {
      return prevCommand.execute(leftOperand, rightOperand, data);
    } else if (data.operator && rightOperand === '') {
      return prevCommand.execute(leftOperand, leftOperand, data);
    }
    return this.initialData;
  }

  undo() {
    return this.initialData;
  }
}
