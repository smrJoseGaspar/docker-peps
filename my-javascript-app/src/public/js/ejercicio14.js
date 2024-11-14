/**
 * Calcula la media de los valores
 * @param {*} v 
 * @returns media
 * @author: Autor/a
 */
function calcularMedia(v)
{
    // Implementa
    let suma=0;

    if(v.length==0)
        return 0;

    for(let e of v)
        suma+=e;

    return suma/v.length;
}
/**
 * Obtiene la nota mínima
 * @param {*} v 
 * @returns minima
 */
function calcularMinimo(v)
{
    let minima=(v.length>=1)?v[0]:0;
    
    for(nota of v)
        if(nota<minima)
            minima=nota;

    return minima;
}
/**
 * Obtiene la nota Máxima
 * @param {*} v 
 * @returns maxima
 */
function calcularMaximo(v)
{
    let maxima=(v.length>=1)?v[0]:0;
    
    for(nota of v)
        if(nota>maxima)
            maxima=nota;

    return maxima;
}
/**
 * Cuenta el número de aprobados
 * @param {*} v 
 * @returns aprobados: número de aprobados.
 */
function contarAprobados(v)
{
    let aprobados=0;

    for(let i=0; i<v.length;i++)
        if(v[i]>=5)
            aprobados++;
    return aprobados;
}
/**
 * Cuenta el número de suspensos
 * @param {*} v 
 * @returns suspensos: número de suspensos.
 */
function contarSuspensos(v)
{
    let suspensos=0;
    for(e of v)
        if(e<5) 
            suspensos++;


    return suspensos;
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