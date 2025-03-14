function calculateResult (arr) {
    let result = 0;
    switch(arr[1]) {
        case '+':
            result =  Number(arr[0]) + Number(arr[2]);
            break;
        case '-':
            result = arr[0] - arr[2];
            break;
        case 'x':
            result = arr[0] * arr[2];
            break;
        case '/':
            if(arr[2] === 0) return 'Wrong!'
            result = arr[0] / arr[2];
            break;
    }
    if(Number.isInteger(result)) return result;
    return result.toFixed(3);
}

export class CalcModel {
    constructor(){
        this.currentValue = 0;
        this.operator = '';
        this.resultRow = [];
        this.view = null;
        this.pointState = false;
        this.isPercentSignActive = false;
        this.changeSignActive = false;
        this.isFloatNumber = false;
    }

    init(view) {
        this.view = view;
    }

    calculateOperation (operator) {
            if(operator === '=') {
                this.equal();
            } else {
                this.implementOperator(operator);
        }
        this.view.updateCurrentValue(this.currentValue);
        this.view.updateResultRow(this.resultRow);
        this.view.resize(50, 25, output);
        this.view.resize(25, 3, input);
        this.updateDisplaySize();
}

updateDisplaySize () {
    if (this.resultRow.length === 0) {
        this.view.updateDisplaySize()
    }
}

    updateCurrentValue (value) {
        if(Number.isInteger(+this.currentValue) && this.isFloatNumber) {
            this.currentValue += '.';
            
        } else if (this.currentValue !== 0){
            this.currentValue = this.changeSignActive? (-1)*value : value;
        }
       
        if (this.resultRow.length === 2 && this.resultRow[1] !== '=') {
            this.resultRow.push(this.currentValue);
        } else if (this.resultRow[1] === '=') {
            this.resultRow.length = 0;
            this.resultRow.push(this.currentValue);
        } else if (this.resultRow.length === 3 && !this.changeSignActive && !this.isPercentSignActive && !this.isFloatNumber){
            value = `${this.resultRow[this.resultRow.length - 1]}${value}`;
            this.resultRow[this.resultRow.length - 1] = value;
            this.currentValue = value;
        } else if (this.resultRow.length <=1 && !this.changeSignActive && !this.isPercentSignActive && !this.isFloatNumber){
            value = this.resultRow[0]? `${this.resultRow[0]}${value}`: value;
            this.resultRow[0] = value;
            this.currentValue = value;
        } else if (this.isPercentSignActive) {
            this.resultRow[this.resultRow.length - 1] = value;
            this.currentValue = value;
        } else if (this.changeSignActive && this.currentValue !== 0) {
            value = `${(-1)*this.resultRow[this.resultRow.length - 1]}`;
            this.resultRow[this.resultRow.length - 1] = value;
            this.currentValue = value;
        } else if (this.changeSignActive && this.currentValue === 0) {
            this.currentValue = 0;
        }else if (this.isFloatNumber) {
            if(this.resultRow.length === 0) {
                this.resultRow[0] = this.currentValue;
            } else {
                this.resultRow[this.resultRow.length - 1] = this.currentValue;
            }
            this.resultRow[this.resultRow.length - 1] = this.currentValue;
        } else {
            this.resultRow.length = 0;
            this.resultRow.push(this.currentValue);
        }

        this.view.updateCurrentValue(this.currentValue);
        this.view.updateResultRow(this.resultRow);

        this.changeSignActive = false;
        this.isPercentSignActive = false;
        this.isFloatNumber = false;

        this.view.resize(50, 25, output);
        this.view.resize(25, 10, input);
        this.updateDisplaySize();
       
    }

    updateSign() {
        this.changeSignActive = true;
        this.updateCurrentValue(this.currentValue);
        
    }

    calculatePercentage () {
        this.isPercentSignActive = true;
        let newValue = 0;
        if (this.resultRow.length === 3) {
            newValue = this.currentValue / 100 * this.resultRow[0];  
        }
        this.updateCurrentValue(newValue);
    }

    implementOperator(operator) {
        if(this.resultRow.length === 0) {
            this.resultRow.push(0, operator)
        } else if (this.resultRow.length === 1) {
            this.resultRow.push(operator)
        } else if (this.resultRow.length === 2) {
            if(this.resultRow[1] === operator) return;
            this.resultRow[1] = operator;
        } else if (this.resultRow.length === 3) {
            const result = calculateResult(this.resultRow);
            this.currentValue = result;
            this.resultRow.length = 0;
            this.resultRow.push(result, operator);
        } else {
            this.resultRow.length = 0;
            this.resultRow.push(this.currentValue, operator);
        }
    }

    equal(){
        if(this.resultRow.length === 0) {
            this.resultRow.push(0, '=')
        } else if (this.resultRow.length === 1) {
            this.resultRow.push('=')
        } else if (this.resultRow.length === 2 && this.resultRow[1] !== "=") {
                this.resultRow.push(this.resultRow[0]);
                const result = calculateResult(this.resultRow);
                this.currentValue = result;
                this.resultRow.push('=', result);
            
        } else if (this.resultRow.length === 3) {
            const result = calculateResult(this.resultRow);
            this.currentValue = result;
            this.resultRow.push('=', result);
        } else {
            this.resultRow.length = 0;
            this.currentValue = 0;
        }
    }

    setFloatNumber() {
        this.isFloatNumber = true;
        this.updateCurrentValue(this.currentValue);
    }

    clear() {
        this.resultRow.length = 0;
        this.view.clear();
        this.updateDisplaySize();
    }   
}