import {initializationArray} from "./initialization_default_data.js";

export class AvailableValuesControl {
    _buttonType = {0: ['up', 0x2191], 1: ['full_up', 0x21D1], 2: ['low', 0x2193], 3: ['full_low', 0x21D3]};

    constructor(valuesList = [...initializationArray]) {
      this.valuesList = valuesList;
      this.controlName = 'available';
      this.startedValueList = valuesList;
      this.inputField = '';

        if (this.__proto__ === AvailableValuesControl.prototype) {
            this.id = AvailableValuesControl.incrementId();
        }
    }

    static incrementId() {
        return this.latestAvailableId = !this.latestAvailableId ? 1 : this.latestAvailableId + 1;
    }

    get list() {
        return this.valuesList;
    }
    set list(valuesList) {
        this.valuesList = valuesList;
    }

    initializeControl() {
        this._createControl();
        this._addButtonEventClick();
        this._addListEventClick();
        this._addInputEvent();
    };

    _createControl() {
        let main_div = document.getElementById('main_container_id').lastChild;

        let outerDiv = document.createElement('div');
        outerDiv.className = 'div_outer';
        outerDiv.id = 'div_outer_' + this.controlName + this.id + '_id';

        let firstDiv = document.createElement('div');
        firstDiv.className = 'list_buttons_div';
        outerDiv.append(firstDiv);
        main_div.append(outerDiv);

        for(let i = 0; i < 4; ++i) {
            let button = document.createElement('button');
            button.id = 'button_' + this.controlName + this.id + '_' + this._buttonType[i][0];
            button.className = 'list_buttons_class';
            button.innerText = String.fromCharCode(this._buttonType[i][1]);
            firstDiv.append(button);
        }

        let input_div = document.createElement('div');
        let input = document.createElement('input');
        input.id = 'input_' + this.controlName + this.id;
        input.className = 'input_class';
        input.type ='text';
        input.placeholder = 'Search by name';

        input_div.append(input);

        let secondDiv = document.createElement('div');
        secondDiv.innerHTML = `<div class='div_control_name' id=${'div_' + this.controlName}>${this.controlName}</div>`;
        secondDiv.append(input_div);

        let ul_div = document.createElement('div');
        ul_div.id = 'div_' + this.controlName + this.id;
        ul_div.className = 'div_list';

        ul_div.append(this._createAndReturnList(this.valuesList));
        secondDiv.append(ul_div);

        outerDiv.append(secondDiv);
    }

    selectListElement(elem, index) {
        let valueElem = this.isInputFieldEmpty() ? this.valuesList[index] : this.valuesList.filter(elem => elem.name.includes(this.inputField))[index];
        valueElem.isActive ?  this._setUnactive(elem, valueElem) : this._setActive(elem, valueElem);
    }

    updateList(list) {
        let valuesList;

        if (list)
            valuesList = list;
        else
            valuesList = !this.isInputFieldEmpty() ? this.valuesList.filter(elem => elem.name.includes(this.inputField)) : this.valuesList;

        let ul_div = document.createElement('div');
        ul_div.id = 'div_' + this.controlName + this.id;
        ul_div.className = 'div_list'

        let div = document.getElementById('div_' + this.controlName + this.id);
        let ul = this._createAndReturnList(valuesList);
        div.innerHTML = ul.outerHTML;

        this._addListEventClick();
    }

    _createAndReturnList(valueList) {
        let ul = document.createElement('ul');
        ul.className = 'ul_class';
        ul.id = 'ul_' + this.controlName + this.id;

        ul.innerHTML = '';
        valueList.forEach(elem => {
            let list_id = 'li_' + this.controlName + this.id + '_' + elem.id;
            let li_div = `<div class='list_elem_div'> <div class='div_list_item_name'>${elem.name}</div> <div class='div_list_item_price'> price: ${elem.price} </div> </div>`
            ul.innerHTML += `<li class=${elem.isActive ? 'list_elem_active' : 'list_elem'} id=${list_id}> ${li_div} </li>`
        });
        return ul;
    }

    _addListEventClick() {
        let ul = document.getElementById('ul_' + this.controlName + this.id);
        ul.onclick = (e) => {
            let index = e.target.tagName === 'LI' ? Array.prototype.indexOf.call(ul.childNodes, e.target) : -1;

            if (index >= 0)
                this.selectListElement(e.target, index);
        };

    }
    _addButtonEventClick() {
        for(let index = 0; index < 4; ++index) {
            let id = 'button_' + this.controlName + this.id + '_' + this._buttonType[index][0];
            document.querySelector('#' + id).addEventListener('click', () => {
                switch (id) {
                    case 'button_' + this.controlName + this.id + '_up':
                        this.moveSelectElems_Up();
                        break;
                    case 'button_' + this.controlName + this.id + '_full_up':
                        this.moveSelectElems_Full_Up();
                        break;
                    case 'button_' + this.controlName + this.id + '_low':
                        this.moveSelectElems_Low();
                        break;
                    case 'button_' + this.controlName + this.id + '_full_low':
                        this.moveSelectElems_Full_Low();
                        break;
                }
            });
        }
    }
    _addInputEvent() {
        let inputField = document.getElementById('input_' + this.controlName + this.id);
        inputField.oninput = e => this._changeInputValue(e.currentTarget.value);
    }

    _changeInputValue(value) {
        let valuesList;
        this.inputField = value;

        if(this.inputField === '') {
            valuesList = this.valuesList;
            this._enableButtons();
        } else {
            valuesList = this.valuesList.filter(elem => elem.name.includes(this.inputField));
            this._disableButtons();
        }
        this.updateList(valuesList);
    }

    _disableButtons() {
       for(let i = 0; i < 4; i++) {
           let button = document.getElementById('button_' + this.controlName + this.id + '_' + this._buttonType[i][0])
           button.disabled = true;
           button.style.backgroundColor = '#8c8c8c';
       }
    }
    _enableButtons() {
        for(let i = 0; i < 4; i++) {
            let button = document.getElementById('button_' + this.controlName + this.id + '_' + this._buttonType[i][0])
            button.disabled = false;
            button.style.backgroundColor = '#60a3bc';
        }
    }

    isInputFieldEmpty() {
       return this.inputField === '' ? true : false;
    }

    moveSelectElems_Up() {
        for(let i = 0; i < this.valuesList.length; i++) {
            let valueElem = this.valuesList[i];

            if(valueElem.isActive) {
                if(i - 1 < 0)
                    return this.updateList();

                let deletedValue = this.valuesList.splice(i, 1)[0];
                this.valuesList.splice(i - 1, 0, deletedValue);
            }

        }
        this.updateList();
    };
    moveSelectElems_Low() {
        for(let i = this.valuesList.length - 1; i >= 0; i--) {
            let valueElem = this.valuesList[i];

            if(valueElem.isActive) {
                if(i + 1 >= this.valuesList.length)
                    return this.updateList();

                let deletedValue = this.valuesList.splice(i, 1)[0];
                this.valuesList.splice(i + 1, 0, deletedValue);
            }

        }
        this.updateList();
    };
    moveSelectElems_Full_Up() {
        let iterations_count = 0, movingStep = 1;
        for (let i = 0; i < this.valuesList.length; i++) {
            let valueElem = this.valuesList[i];

            if (valueElem.isActive) {
                if (i - 1 < 0)
                    return this.updateList();

               if(!iterations_count)
                   movingStep = i;

                ++iterations_count;
                let deletedValue = this.valuesList.splice(i, 1)[0];
                this.valuesList.splice(i - movingStep, 0, deletedValue);
            }

        }
        this.updateList();
    }
    moveSelectElems_Full_Low() {
        let iterations_count = 0, movingStep = 1;
        for(let i = this.valuesList.length - 1; i >= 0; i--) {
            let valueElem = this.valuesList[i];

            if(valueElem.isActive) {
                if(i + 1 >= this.valuesList.length)
                    return this.updateList();

                if(!iterations_count)
                    movingStep = this.valuesList.length - 1 - i;

                ++iterations_count;
                let deletedValue = this.valuesList.splice(i, 1)[0];
                this.valuesList.splice(i + movingStep, 0, deletedValue);
            }
        }
        this.updateList();
    }

    _setActive(li_elem, valueListElem) {
        valueListElem.isActive = true;
        li_elem.className += '_active';
    }
    _setUnactive(li_elem, valueListElem) {
        valueListElem.isActive = false;
        li_elem.className = 'list_elem';
    }

    reset() {
        this.valuesList = this.startedValueList;
    }
}