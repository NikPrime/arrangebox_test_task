import {AvailableValuesControl} from "./AvailableValuesControl.js";
import {SelectedValuesControl} from "./SelectedValuesControl.js";

export class MainControl {

    constructor(valuesList, selectedList) {
        this.availableValuesControl = new AvailableValuesControl(valuesList);
        this.selectedValuesControl = new SelectedValuesControl(selectedList);
        this.id = MainControl.incrementId();
        this.initializeControl();
    }

    static incrementId() {
        return this.latestId = !this.latestId ? 1 : this.latestId + 1;
    }

    initializeControl() {
        let main_container_id = document.getElementById('main_container_id');
        let div = document.createElement('div');

        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.className = 'main_div_class';
        div.id = 'main_div_' + this.id;
        main_container_id.append(div);

        this.availableValuesControl.initializeControl();
        this._displayButtons();
        this.selectedValuesControl.initializeControl();
    }
    updateControl() {
        this.availableValuesControl.updateList();
        this.selectedValuesControl.updateList();
    }

    _displayButtons() {
        let buttonType = {
            0: ['left', 0x27f5],
            1: ['all_left', 0x27f8],
            2: ['right', 0x27f6],
            3: ['all_right', 0x27f9],
            4: ['reset', 0x21bb]
        };

        let main_div = document.getElementById('main_container_id').lastChild;
        let div = document.createElement('div');
        div.id = 'buttons_main_' + this.id + '_id';
        main_div.append(div);

        for (let index = 0; index < 5; ++index) {
            let button = document.createElement('button');
            button.id = 'button_' + this.id + buttonType[index][0] + '_id';
            button.className = 'main_button_class';
            button.innerText = String.fromCharCode(buttonType[index][1]);
            div.append(button);
            document.querySelector('#' + button.id).addEventListener('click', _button_handler.bind(this, button.id));
        }

        function _button_handler(button_id) {
            switch (button_id) {
                case 'button_' + this.id + 'left_id':
                    this.moveSelectElems_Left();
                    break;
                case 'button_' + this.id + 'all_left_id':
                    this.moveAllElems_Left();
                    break;
                case 'button_' + this.id + 'right_id':
                    this.moveSelectElems_Right();
                    break;
                case 'button_' + this.id + 'all_right_id':
                    this.moveAllElems_Right();
                    break;
                case 'button_' + this.id + 'reset_id':
                    this.reset();
                    break;
            }
        }
    }

    moveSelectElems_Right() {
        let availableControlList = this.availableValuesControl.list;
        let selectedControlList = this.selectedValuesControl.list;

        let activeElems = availableControlList.filter(elem => elem.isActive);
        let availableElems = availableControlList.filter(elem => !elem.isActive)

        activeElems.forEach(elem => elem.isActive = false);

        this.selectedValuesControl.list = selectedControlList.concat(activeElems);
        this.availableValuesControl.list = availableElems;

        this.updateControl();

    }
    moveAllElems_Right() {
        this.availableValuesControl.list.forEach(elem => elem.isActive = false);
        this.selectedValuesControl.list = this.selectedValuesControl.list.concat(this.availableValuesControl.list);
        this.availableValuesControl.list = [];

        this.updateControl();
    }
    moveSelectElems_Left() {
        let availableControlList = this.availableValuesControl.list;
        let selectedControlList = this.selectedValuesControl.list;

        let activeElems = selectedControlList.filter(elem => elem.isActive);
        let selectedList = selectedControlList.filter(elem => !elem.isActive);

        activeElems.forEach(elem => elem.isActive = false);

        this.availableValuesControl.list = availableControlList.concat(activeElems);
        this.selectedValuesControl.list = selectedList;

        this.updateControl();
    }
    moveAllElems_Left() {
        this.selectedValuesControl.list.forEach(elem => elem.isActive = false);
        this.availableValuesControl.list = this.availableValuesControl.list.concat(this.selectedValuesControl.list);
        this.selectedValuesControl.list = [];

        this.updateControl();
    }

    reset() {
        this.availableValuesControl.reset();
        this.selectedValuesControl.reset();
        this.updateControl();
    }
}