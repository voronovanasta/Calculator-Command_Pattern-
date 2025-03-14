export class CalcController {
    constructor(model, container) {
        this.model = model;
        this.container = container;
        this.keys = null;
    }

    init (){        
      this.eventHandler();  
    }

    darkThemeOn() {
            if(localStorage.getItem('dark') === '1'){
              document.querySelector('html').classList.remove('light')
              localStorage.setItem('dark', 0);
              document.querySelector('.theme-mode span').textContent = `light_mode` ;
            }
            else{
              localStorage.setItem('dark', 1);
              document.querySelector('html').classList.add('light');
              document.querySelector('.theme-mode span').textContent = 'settings_night_sight';
          
            }
    }

    eventHandler(){
        const themeMode = this.container.querySelector('#theme');
        const input = this.container.querySelector('#input');
        const output = this.container.querySelector('#output');

        themeMode.addEventListener('click', ()=>{
            this.darkThemeOn();
        })

        this.keys = this.container.querySelectorAll('.keyboard-key');

        this.keys.forEach(el => {
            el.addEventListener('click', (e)=> {
                const value  = e.target.textContent;
                switch(value) {
                    case '+':
                    case '-':
                    case '/':
                    case 'x': 
                    case '=': 
                      this.model.calculateOperation(value);
                      break;
                    case '+/-':
                        this.model.updateSign();
                        break;
                    case '%':
                        this.model.calculatePercentage();
                        break;
                    case 'AC':
                        this.model.clear();
                        break;
                    case ',':
                        this.model.setFloatNumber();
                        break;
                    default:
                        this.model.updateCurrentValue(+value, input, output);
                        break;
                } 
            }) 
        });
   
    }

    
}