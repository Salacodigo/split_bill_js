import {
    aportantes,
    replaceAportantes,
} from '../js/data.js';

import {
    cleanContainer,
    capitalizeFirst,
    printAportantesActuales,
    sendForm
} from './bill-form.js';

import { makeVisible } from './header.js';

import{
    saveLocalStorage,
} from './localStorage.js'





document.addEventListener('DOMContentLoaded', () => {
    addProporcionEventListeners();
})

const inputName = document.getElementById('nombre');
const inputProporcion = document.getElementById('proporcion');

const addBtn = document.getElementById('add-button');
const clearBtn = document.getElementById('clear-button');

const listBox = document.getElementById('list-box');
const nextBtn = document.getElementById('next-button');


function addProporcionEventListeners(){
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addAportante();
    })

    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        clearAportanteForm();
    })
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        makeVisible("bill-nav");
        printAportantesActuales();
        sendForm();
    })
    
}

function clearAportanteForm(){
    inputName.value = "";
    inputProporcion.value = "";
}

function addAportante(){
    let inputValues = getInputValues();
    if( !isValidForm( inputValues )){ return }
    addAportanteData(inputValues);
    saveLocalStorage( "aportantes",aportantes );
    printList();
}

function getInputValues(){
    let name = inputName.value;
    let proporcion = inputProporcion.value;
    let inputValues = [name, proporcion];

    return inputValues;
}

function isValidForm( personData ){
    let name = personData[0];
    let proporcion = Number(personData[1]);

    if(name !== "" && proporcion > 0 && proporcion <= 1_000_000){ return true }
    return false;
}

function addAportanteData( personData ){
    let name = personData[0].toLowerCase();
    let proporcion = Number(personData[1]);

    let data = {
        proporcion,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,
    };
    aportantes[name] = data;

}

function printList(){

    cleanContainer(listBox);

    let keys = Object.keys(aportantes);

    let listContainer = document.createElement('div');
    listContainer.className = 'result-container';
    listContainer.id = 'list-container';

    let headerRow = document.createElement('div');
    headerRow.className = 'result-row';
    headerRow.innerHTML = `
        <div class="name">
        Nombre:
        </div>
        <div class="proporcion">
        Proporcion:
        </div>
        <div class="">
        Eliminar
        </div>
    `;
    listContainer.append(headerRow);

    // Dibuja los datos en la UI
    keys.forEach( (key) => {

        let row = document.createElement('div');
        row.className = 'result-row';

        row.innerHTML=`
            <div class="name">
            ${capitalizeFirst(key)}
            </div>
            <div class="proporcion">
            ${aportantes[key].proporcion}
            </div>
        `;

        let xitem = document.createElement('div');
        xitem.classList.add('delete-item');
        xitem.id = key;
        xitem.addEventListener("click", (e) => {
            e.preventDefault();
            deletePerson(key);
        })
        xitem.innerHTML=`delete`;
        row.append(xitem);

        listContainer.append(row);
        
    })

    listBox.append(listContainer);

}


function deletePerson(key){
    
    let newAportantes = { };
    let objectKeys = Object.keys(aportantes);

    for( let position in objectKeys){
        let person = objectKeys[position];
        if(person !== key){
            newAportantes[person] = aportantes[person];
        }
    }
    replaceAportantes(newAportantes);
    printList();
}

export {
    printList
}
