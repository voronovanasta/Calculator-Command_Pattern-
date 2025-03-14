export class CalcView {
    constructor (model, container) {
        this.model = model;
        this.container = container;
        this.wrapper = null;
        this.keysContainer = null;
        this.inputContainer = null;
        this.outputContainer = null;
        this.themeMode = null;
    }
    
    init () {
        this.drawCalculator();
        this.outputContainer.value = 0;
    }

    drawCalculator () {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'keyboard-wrapper';

    this.inputContainer = document.createElement('input');
    this.inputContainer.className = 'display';
    this.inputContainer.id = 'input';
    this.inputContainer.maxLength = 20;

    this.outputContainer = document.createElement('input');
    this.outputContainer.id = 'output'
    this.outputContainer.className = 'display';
    this.outputContainer.maxLength = 20;

    const themeModeContainer = document.createElement('div');
    this.themeMode = document.createElement('a');
    this.themeMode.className = 'theme-mode'
    this.themeMode.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
    themeModeContainer.id = 'theme';
    this.themeMode.href = '#';
    themeModeContainer.append(this.themeMode)

    this.keysContainer = document.createElement('div');
    this.keysContainer.className = 'keyboard-keys';
    this.keysContainer.append(this.createKeys());
    this.wrapper.append(this.inputContainer, this.outputContainer, this.keysContainer);
    this.container.append(this.wrapper, themeModeContainer);

    }

    createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = ["AC", "%", "+/-", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ',', "="]; 
    
        keyLayout.forEach(key=>{
          const keyBtn = document.createElement('button');
          keyBtn.setAttribute('type', 'button')
          keyBtn.classList.add('keyboard-key');
          const newLine = ["/", "x", "-", "+", "="].indexOf(key)
          keyBtn.innerHTML = key;
          if(key === 0) {
            keyBtn.classList.add('zero-key')
          }
          fragment.append(keyBtn)
          if(newLine>=0){
            fragment.append(document.createElement('br'))
          }
        })
        return fragment    
    }

    clear() {
        this.inputContainer.value = '';
        this.outputContainer.value = 0;
    }

    updateCurrentValue(currentValue) {
        this.outputContainer.value = currentValue;
    }

    updateResultRow(resultRow) {
        this.inputContainer.value = resultRow.join(' ');
    }

    updateDisplaySize() {
        this.inputContainer.style.fontSize = "25px";
        this.outputContainer.style.fontSize = "50px";
    }

    resize(max, min, el) {

        const minFontSize = min; 
        const maxFontSize = max; 
        
        let currentFontSize = maxFontSize;
    
        while (el.scrollWidth > el.clientWidth && currentFontSize > minFontSize) {
            currentFontSize--;
            el.style.fontSize = `${currentFontSize}px`;
        }
        
        while (el.scrollWidth <= el.clientWidth && currentFontSize < maxFontSize) {
            currentFontSize++;
            el.style.fontSize = `${currentFontSize}px`;
        }
    }
}