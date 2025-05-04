/* eslint-env mocha */
import {
  AddCommand,
  SignCommand,
  MultiplyCommand,
  DivideCommand,
  SubtractCommand,
  PercentCommand,
  SquareCommand,
  CubeCommand,
  PowerCommand,
  PowerOfTenCommand,
  ReciprocalCommand,
  SquareRootCommand,
  CubeRootCommand,
  NthRootCommand,
  FactorialCommand,
} from './commands';

//tests for AddCommand cases
describe('AddCommand', () => {
  test('add integer numbers', () => {
    const result = new AddCommand().execute(3, 8).leftOperand;
    expect(result).toBe(11);
  });
  test('add decimal numbers', () => {
    const result = new AddCommand().execute(3.003, 0.004).leftOperand;
    const expectedResult = parseFloat((3.003 + 0.004).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('add values of string type', () => {
    const result = new AddCommand().execute('1', '3').leftOperand;
    expect(result).toBe(4);
  });
});
//tests for SignCommand cases
describe('SignCommand', () => {
  test('change sign of value of zero', () => {
    const result = new SignCommand().execute(0);
    expect(result).toBe(0);
  });
  test('change sign for value-absent case', () => {
    const result = new SignCommand().execute('');
    expect(result).toBe('');
  });
  test('change sign of negative value', () => {
    const result = new SignCommand().execute(-1);
    expect(result).toBe(1);
  });
  test('change sign of positive value', () => {
    const result = new SignCommand().execute(1);
    expect(result).toBe(-1);
  });
});
//tests for MultiplyCommand cases
describe('MultiplyCommand', () => {
  let a, b;
  beforeEach(() => {
    a = Math.random();
    b = Math.random();
  });
  test('multiply random numbers', () => {
    const result = new MultiplyCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a * b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('multiply random numbers', () => {
    const result = new MultiplyCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a * b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('multiply random numbers', () => {
    const result = new MultiplyCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a * b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('multiply negative numbers', () => {
    const result = new MultiplyCommand().execute(-2, 4).leftOperand;
    expect(result).toBe(-8);
  });
  test('multiply decimal numbers', () => {
    const result = new MultiplyCommand().execute(2.03, 4.7).leftOperand;
    expect(result).toBe(9.541);
  });
  test('multiply values of string type', () => {
    const result = new MultiplyCommand().execute('2', '3').leftOperand;
    expect(result).toBe(6);
  });
});
//tests for DivideCommand cases
describe('DivideCommand', () => {
  let a, b;
  beforeEach(() => {
    a = Math.random();
    b = Math.random();
  });
  test('divide random numbers', () => {
    const result = new DivideCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a / b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('divide random numbers', () => {
    const result = new DivideCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a / b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('divide random numbers', () => {
    const result = new DivideCommand().execute(a, b).leftOperand;
    const expectedResult = parseFloat((a / b).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('divide negative numbers', () => {
    const result = new DivideCommand().execute(-8, 4).leftOperand;
    expect(result).toBe(-2);
  });
  test('divide decimal numbers', () => {
    const result = new DivideCommand().execute(4.56, 2.2).leftOperand;
    const expectedResult = parseFloat((4.56 / 2.2).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('divide values of string type', () => {
    const result = new DivideCommand().execute('6', '3').leftOperand;
    expect(result).toBe(2);
  });
  test('divide by zero case', () => {
    expect(() => new DivideCommand().execute('6', '0')).toThrow('Invalid operation!');
  });
});
//tests for PercentCommand cases
describe('PercentCommand', () => {
  test('get percent from right operand', () => {
    const result = new PercentCommand().execute(10, 2, { operator: '+' }).rightOperand;
    expect(result).toBe(0.2);
  });
  test('get percent from left operand in case operator from prevCommand is present', () => {
    const result = new PercentCommand().execute(10, '', { operator: '-' }).rightOperand;
    expect(result).toBe(1);
  });
  test('get percent  in case operator from prevCommand is absent', () => {
    const result = new PercentCommand().execute(10, '', { operator: '' }).leftOperand;
    expect(result).toBe('0');
  });
});
//tests for SubtractCommand cases
describe('SubtractCommand', () => {
  test('substract integer numbers', () => {
    const result = new SubtractCommand().execute(3, 8).leftOperand;
    expect(result).toBe(-5);
  });
  test('substract decimal numbers', () => {
    const result = new SubtractCommand().execute(3.003, 0.004).leftOperand;
    const expectedResult = parseFloat((3.003 - 0.004).toFixed(6));
    expect(result).toBe(expectedResult);
  });
  test('substract values of string type', () => {
    const result = new SubtractCommand().execute('1', '3').leftOperand;
    expect(result).toBe(-2);
  });
});
//tests for SquareCommand cases
describe('SquareCommand', () => {
  test('get square from right operand', () => {
    const result = new SquareCommand().execute(10, 2, { operator: '+' }).rightOperand;
    expect(result).toBe(4);
  });
  test('get square from left operand in case operator from prevCommand is present', () => {
    const result = new SquareCommand().execute(10, '', { operator: '-' }).rightOperand;
    expect(result).toBe(100);
  });
  test('get square from left operand in case operator from prevCommand is absent', () => {
    const result = new SquareCommand().execute(10, '', { operator: '' }).leftOperand;
    expect(result).toBe(100);
  });
});
//tests for CubeCommand cases
describe('CubeCommand', () => {
  test('get cube from right operand', () => {
    const result = new CubeCommand().execute(10, 2, { operator: '+' }).rightOperand;
    expect(result).toBe(8);
  });
  test('get cube from left operand in case operator from prevCommand is present', () => {
    const result = new CubeCommand().execute(10, '', { operator: '-' }).rightOperand;
    expect(result).toBe(1000);
  });
  test('get cube from left operand in case operator from prevCommand is absent', () => {
    const result = new CubeCommand().execute(10, '', { operator: '' }).leftOperand;
    expect(result).toBe(1000);
  });
});
//tests for PowerCommand cases
describe('PowerCommand', () => {
  let a, b;
  beforeEach(() => {
    a = Math.random();
    b = Math.random();
  });
  test('get power of random number', () => {
    const result = new PowerCommand().execute(a, b).leftOperand;
    expect(result).toBe(a ** b);
  });
  test('get power of random number', () => {
    const result = new PowerCommand().execute(a, b).leftOperand;
    expect(result).toBe(a ** b);
  });
  test('get power of negative number', () => {
    const result = new PowerCommand().execute(-5, -3).leftOperand;
    expect(result).toBe((-5) ** -3);
  });
});
//tests for PowerOfTenCommand cases
describe('PowerOfTenCommand', () => {
  test('get power from right operand', () => {
    const result = new PowerOfTenCommand().execute(7, 4, { operator: '+' }).rightOperand;
    expect(result).toBe(10000);
  });
  test('get power from left operand in case operator from prevCommand is present', () => {
    const result = new PowerOfTenCommand().execute(5, '', { operator: '-' }).rightOperand;
    expect(result).toBe(100000);
  });
  test('get power from left operand in case operator from prevCommand is absent', () => {
    const result = new PowerOfTenCommand().execute(2, '', { operator: '' }).leftOperand;
    expect(result).toBe(100);
  });
});
//tests for ReciprocalCommand cases
describe('ReciprocalCommand', () => {
  test('get reciprocal from right operand', () => {
    const result = new ReciprocalCommand().execute(7, 4, { operator: '+' }).rightOperand;
    expect(result).toBe(1 / 4);
  });
  test('get reciprocal from left operand in case operator from prevCommand is present', () => {
    const result = new ReciprocalCommand().execute(5, '', { operator: '-' }).rightOperand;
    expect(result).toBe(1 / 5);
  });
  test('get reciprocal from left operand in case operator from prevCommand is absent', () => {
    const result = new ReciprocalCommand().execute(2, '', { operator: '' }).leftOperand;
    expect(result).toBe(1 / 2);
  });
  test('get reciprocal in case operand is zero', () => {
    expect(() => new ReciprocalCommand().getReciprocal('0')).toThrow('Invalid operation!');
  });
});
//tests for SquareRootCommand cases
describe('SquareRootCommand', () => {
  test('get squareroot from right operand', () => {
    const result = new SquareRootCommand().execute(7, 4, { operator: '+' }).rightOperand;
    expect(result).toBe(4 ** (1 / 2));
  });
  test('get squareroot from left operand in case operator from prevCommand is present', () => {
    const result = new SquareRootCommand().execute(5, '', { operator: '-' }).rightOperand;
    expect(result).toBe(5 ** (1 / 2));
  });
  test('get squareroot from left operand in case operator from prevCommand is absent', () => {
    const result = new SquareRootCommand().execute(9, '', { operator: '' }).leftOperand;
    expect(result).toBe(9 ** (1 / 2));
  });
  test('get squareroot in case operand is negative', () => {
    expect(() => new SquareRootCommand().root(-16)).toThrow('Invalid operation!');
  });
});
//tests for CubeRootCommand cases
describe('CubeRootCommand', () => {
  test('get cuberoot from right operand', () => {
    const result = new CubeRootCommand().execute(7, 64, { operator: '+' }).rightOperand;
    expect(result).toBe(4);
  });
  test('get cuberoot from left operand in case operator from prevCommand is present', () => {
    const result = new CubeRootCommand().execute(125, '', { operator: '-' }).rightOperand;
    expect(result).toBe(5);
  });
  test('get cuberoot from left operand in case operator from prevCommand is absent', () => {
    const result = new CubeRootCommand().execute(27, '', { operator: '' }).leftOperand;
    expect(result).toBe(3);
  });
});
//tests for NthRootCommand cases
describe('NthRootCommand', () => {
  test('get nth root ', () => {
    const result = new NthRootCommand().execute(27, 3, { operator: '+' }).leftOperand;
    expect(result).toBe(3);
  });
  test('get nth root in case operand is negative and base is even', () => {
    expect(() => new NthRootCommand().root(-16, 2)).toThrow('Invalid operation!');
  });
  test('get nth root in case base is zero', () => {
    expect(() => new NthRootCommand().root(16, 0)).toThrow('Invalid operation!');
  });
});
//tests for FactorialCommand cases
describe('FactorialCommand', () => {
  test('get factorial from right operand', () => {
    const result = new FactorialCommand().execute(7, 4, { operator: '+' }).rightOperand;
    expect(result).toBe('24');
  });
  test('get factorial from left operand in case operator from prevCommand is present', () => {
    const result = new FactorialCommand().execute(5, '', { operator: '-' }).rightOperand;
    expect(result).toBe('120');
  });
  test('get factorial from left operand in case operator from prevCommand is absent', () => {
    const result = new FactorialCommand().execute(9, '', { operator: '' }).leftOperand;
    expect(result).toBe('362880');
  });
  test('get factorial in case operand is negative', () => {
    expect(() => new FactorialCommand().calculateFactorial(-16)).toThrow('Invalid operation!');
  });
  test('get factorial in case operand is decimal', () => {
    expect(() => new FactorialCommand().calculateFactorial(3.5)).toThrow('Invalid operation!');
  });
});
