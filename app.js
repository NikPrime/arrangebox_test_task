import {MainControl} from './MainControl.js';
import {ListElement} from "./ListElement.js";

let mainContainerId = document.getElementById('main_container_id');
let buttonAddingControl = document.createElement('button');
buttonAddingControl.id = 'button_add_new_control_id';
buttonAddingControl.textContent = 'Added new control';
mainContainerId.append(buttonAddingControl);

new MainControl();

buttonAddingControl.addEventListener("click", function () {
    let random1 = [], random2 = [];
    for (let i = 0; i < Math.round(Math.random() * 100); i++) {
        let str = Math.random().toString(36).substring(7);
        random1.push(new ListElement(str, Math.round(Math.random() * 10000)))
        str = Math.random().toString(36).substring(7);
        random2.push(new ListElement());
    }
    new MainControl(random1, random2);
});








