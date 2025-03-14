import { CalcModel } from './model/CalcModel.js';
import { CalcView } from './view/CalcView.js';
import { CalcController } from './controller/CalcController.js';

const container = document.createElement('div');
container.id = 'calculator';
document.body.append(container);

const model = new CalcModel();
const view = new CalcView(model, container);
const controller = new CalcController(model, container);

view.init();
model.init(view);
controller.init();
