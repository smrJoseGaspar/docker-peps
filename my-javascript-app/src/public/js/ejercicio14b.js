/**
 * Calcula la media de los valores
 * @param {*} v 
 * @returns media
 * @author: Autor/a
 */
function calcularMedia(v)
{
    if(v.length==0)
        return 0;
    else{
        // Implementa
        let suma=v.reduce(function(acumulador,siguiente){
            return acumulador+siguiente;
        },0);
        return suma/v.length;
    }
}
/**
 * Obtiene la nota mínima
 * @param {*} v 
 * @returns minima
 */
function calcularMinimo(v)
{
    return ((v.length==0)?0:v.reduce(function(min,n){
        return ((n<min)?n:min);
    }));
}
/**
 * Obtiene la nota Máxima
 * @param {*} v 
 * @returns maxima
 */
function calcularMaximo(v)
{
    return ((v.length==0)?0:v.reduce(function(max,n){
        return ((n>max)?n:max);
    }));
}
/**
 * Cuenta el número de aprobados
 * @param {*} v 
 * @returns aprobados: número de aprobados.
 */
function contarAprobados(v)
{
    let aprobados=v.filter(function(n){
        return n>=5;
    });

    return aprobados.length;
}
/**
 * Cuenta el número de suspensos
 * @param {*} v 
 * @returns suspensos: número de suspensos.
 */
function contarSuspensos(v)
{
    let ret=v.filter(function(n){
        return n<5;
    });

    return ret.length;
}



/**
 * Aplicacion principal Ejercicio14
 * @author: José Gaspar Sánchez García
 */

function appMain(){

    // Indique cuantas notas desea introducir
    let numeroNotas=parseInt(prompt("¿Cuantas notas desea introdurcir?"));
    let notas=new Array();
    var n=-1;
    // Leemos notas desde teclado
    console.info(`Leemos ${numeroNotas} Notas desde teclado.`)
    for(let i=0; i<numeroNotas;i++)
    {
        do{
            n=parseFloat(prompt("Introduzca la nota número "+(i+1)+": "));
        }while(n<0 || n>10)
        notas[i]=n;
        console.log(`notas[${i}]: ${notas[i]}`);
    }


    console.log("La nota media es "+calcularMedia(notas));
    console.log("La nota mínima es "+calcularMinimo(notas));
    console.log("La nota máxima es "+calcularMaximo(notas));
    console.log("Aprobados: "+contarAprobados(notas));
    console.log("Suspensos: "+contarSuspensos(notas));
    return 0;
}

// Exportamos las funciones para poder realizar el Testing
module.exports={
    calcularMedia,
    calcularMaximo,
    calcularMinimo,
    contarAprobados,
    contarSuspensos,
};