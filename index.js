import {
    pagoPorPersona,
    aportantes,
    clearPagoPorPersona,
} from './js/data.js'

// Valor de los servicios

// Total de personas en el hogar
let totalDePersonas = 0;
let pagoPorCabeza = 0;

// Valores de las facturas
let valorAPagar = {
    aporteAgua: 0,
    aporteGas : 0,
    aporteLuz : 0,
}


class PagoDeServiciosPublicos {

    constructor(){}

    // Ingresar valores de las facturas
    ingresarValoresAPagar( values ){
        if(!values){
            valorAPagar.aporteAgua = 250_000;
            valorAPagar.aporteGas = 120_000;
            valorAPagar.aporteLuz = 190_000;
        } else {
            valorAPagar.aporteAgua = Number(values["aguaValue"]);
            valorAPagar.aporteGas = Number(values["gasValue"]);
            valorAPagar.aporteLuz = Number(values["luzValue"]);
        }
    }

    // Suma de todas las facturas
    calcularValorTotal(){
        let sumaTotal = 0;
        for( let servicio in valorAPagar ){
            sumaTotal += valorAPagar[servicio];
        }
        return sumaTotal;
    }

    // Aportes totales por persona
    calcularAportesTotales(valorAPagar) {
        if( valorAPagar < 0) return;
        totalDePersonas = 0;
        
        // Calculo del valor a pagar por cabeza
        for(let posicion in aportantes){
            let participacion = aportantes[posicion].proporcion;
            totalDePersonas += participacion;
        }

        pagoPorCabeza = valorAPagar / totalDePersonas;

        for(let posicion in aportantes){
            aportantes[posicion].pagoTotal = Number((aportantes[posicion].proporcion * pagoPorCabeza).toFixed(0));
        }
        return pagoPorCabeza;

    }

    // Aportes por servicio por persona
    calcularAportePorServicio(){
        // Obtiene el valor de cada servicio
        for(let posicion in valorAPagar){
            let valorServicio = valorAPagar[posicion];
            
            for(let persona in aportantes){
                let proporcion = aportantes[persona].proporcion;
                aportantes[persona][posicion] = Number((valorServicio/totalDePersonas * proporcion).toFixed(2));
            }
        }
    }

    imprimeAportesPorPersona(){
        clearPagoPorPersona();
        for (let nombre in aportantes){
            let pagoTotal = aportantes[nombre].pagoTotal;
            pagoPorPersona[nombre] = pagoTotal;
        }
    }


}

function splitBillProcess(values){
    let instanciaPagos = new PagoDeServiciosPublicos();
    instanciaPagos.ingresarValoresAPagar(values);
    let totalAPagar = instanciaPagos.calcularValorTotal();
    instanciaPagos.calcularAportesTotales(totalAPagar);
    instanciaPagos.calcularAportePorServicio();
    instanciaPagos.imprimeAportesPorPersona();
}

export {
    aportantes,
    splitBillProcess,
    pagoPorPersona,
}