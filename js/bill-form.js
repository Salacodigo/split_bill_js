import {
    splitBillProcess,
} from '../index.js';

import {
    formatNumber,
    formatCurrency,
} from './currency-format.js';

import {
    saveLocalStorage
} from './localStorage.js';

import { 
    makeVisible,
    activateNavLink
} from './header.js';

import{ 
    aportantes,
    pagoPorPersona,
 } from './data.js';

import { printList } from './proporcion.js'


document.addEventListener('DOMContentLoaded', (e) => {
    addBillEventListeners();
    updateDate();
})

// constantes -inputs -botones
const formSendButton = document.getElementById("send-button");
const formResetButton = document.getElementById("reset-button");
const previousBtn = document.getElementById("previous-button");



const inputAgua = document.getElementById("valor-agua");
const inputGas = document.getElementById("valor-gas");
const inputLuz = document.getElementById("valor-luz");

const errorBox = document.getElementById('error-bill-box');
const resultsBox = document.getElementById('results-box');
const aportantesBox = document.getElementById('aportantes-actuales')

const dateBox = document.getElementById('date-info');


// Event Listeners
function addBillEventListeners(){
    if( !formSendButton && !formResetButton){ return; }
    formSendButton.addEventListener( "click", (e) => {
        e.preventDefault;
        sendForm();
    })
    formResetButton.addEventListener("click", (e) => {
        e.preventDefault;
        resetForm();
    })
    document.addEventListener("keyup", (e) => {
        if (e.code === 'Enter') {
            e.preventDefault;
            sendForm()
        }
    });

    let inputArray = [inputAgua, inputGas, inputLuz];

    inputArray.forEach( inputElement => {
        inputElement.addEventListener("keyup", (e) => {
            e.preventDefault;
            formatCurrency( inputElement, blur);
        })
        inputElement.addEventListener("focusout", (e) => {
            e.preventDefault;
            formatCurrency( inputElement, blur);
        })
    })

    previousBtn.addEventListener("click", (e) => {
        e.preventDefault();
        previousBtnAction();
    })

}


function sendForm(){
    let values = getInputValues();
    let hasErrors = validateForm(values);
    if(hasErrors){ return };
    splitBillProcess(values);
    printResults(pagoPorPersona);
    saveLocalStorage( "bill", pagoPorPersona );
}

function previousBtnAction(){
    makeVisible("aportante-nav");
    const navLinkAportante = document.getElementById('aportante-nav');
    activateNavLink(navLinkAportante);
    printList();
}

function getCurrentMonth(){
    let todayDate = new Date();
    let opcionesFecha = { month: 'long', year: 'numeric'};
    let currentMonth = todayDate.toLocaleString('es-ES', opcionesFecha);
    return currentMonth;
}
function updateDate(){

    let currentMonth = getCurrentMonth();
    dateBox.innerHTML = `
        <p>
        ${currentMonth}
        </p>
    `;
};

function resetForm(){
    inputAgua.value = "";
    inputGas.value = "";
    inputLuz.value = "";
    
}

// Obtain form Values
function getInputValues(){
    const aguaValue = formatCurrencyToNumber(inputAgua.value);
    const gasValue = formatCurrencyToNumber(inputGas.value);
    const luzValue = formatCurrencyToNumber(inputLuz.value);

    const values = {
        aguaValue,
        gasValue,
        luzValue
    }
    return values;
}

function formatCurrencyToNumber( currencyText ){
    let cadenaSinComasYPuntos = currencyText.replace(/[$,.]/g, '');
    return cadenaSinComasYPuntos;
}

// Validate Form
function validateForm(values){
    let errors = [];
    let hasErrors = false;
    let errorsString = '';

    for( let position in values){
        let errorMessages = [];
        let value =  Number(values[position]);

        if( value < 0 ){
            errorMessages.push('El valor debe ser mayor o igual a cero');
        }
        if( value >= 100_000_000 ){
            errorMessages.push('El consumo excede los lìmites');
        }
        if (errorMessages.length > 0 ){
            let errorObject = {};
            errorObject[position] = errorMessages;
            errors.push( errorObject );
            hasErrors = true;

            errorsString += position + ': ';

            errorMessages.forEach( (errorObject) => {
                errorsString += JSON.stringify(errorObject);
            })
            errorsString += '<br>';
        }
    }
    errorBox.innerHTML = errorsString;
    return hasErrors;
}


function cleanContainer( container ){
    if(!container){ return }
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
};

function capitalizeFirst( word ){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function printAportantesActuales(){

    cleanContainer(aportantesBox);
    
    let keys = Object.keys(aportantes);

    
    keys.forEach( (key) => {
        let nameP = document.createElement('p');
        nameP.innerHTML = `${capitalizeFirst(key)},`;
        aportantesBox.append(nameP);
    })

}

function printResults( aportantes ){
    
    cleanContainer(aportantesBox);
    cleanContainer(resultsBox);

    
    let container = document.createElement("div");
    container.className = "result-container";

    let dateInfo = document.createElement("p");
    let dateMonth = getCurrentMonth();
    dateInfo.className = "current-month"
    dateInfo.innerHTML =`
        ${dateMonth}
    `;
    container.appendChild(dateInfo);
    
    for(let person in aportantes){
        let personBox = document.createElement("div");
        let amount = formatNumber(String(aportantes[person]))
        personBox.className = 'result-row';
        personBox.innerHTML=`
            <strong>${capitalizeFirst( person )}</strong> : $${amount} COP
        `;
        container.append(personBox);
    }
    resultsBox.append(container);
}

export {
    cleanContainer,
    capitalizeFirst,
    printAportantesActuales,
    printResults,
    sendForm,
}
