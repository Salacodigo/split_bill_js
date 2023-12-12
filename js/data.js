
let pagoPorPersona = {};

// Informacion Por Persona
let aportantes = {
    lilia : {
        proporcion  : 1,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,
    },
    ligia : {
        proporcion  : 1,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,
    },
    gladys : {
        proporcion  : 2,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,
    },
    hernando : {
        proporcion  : 1,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,
    },
    santiago : {
        proporcion  : 1,
        pagoTotal   : 0,
        aporteAgua  : 0,
        aporteGas   : 0,
        aporteLuz   : 0,

    },
}

function replaceAportantes( newAportantes ){
    aportantes = newAportantes;
}

function clearPagoPorPersona(){
    pagoPorPersona = {};
}

export {
    pagoPorPersona,
    aportantes,
    replaceAportantes,
    clearPagoPorPersona,
}