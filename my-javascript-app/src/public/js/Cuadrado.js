class Cuadrado extends Figura{
    lado=0;
    /**
     * Constructor Cuadrado
     * @param {Punto2D} o: origen 
     * @param {int} l: lado del cuadrado. 
     */
    constructor(o,l)
    {
        super(o);
        this.lado=l;
    }
/**
 * Calcula el área del cuadrado.
 * @returns int: area
 */
    calcularArea()
    {
        return this.lado*this.lado;
    }

    getLado()
    {
        return this.lado;
    }

    setLado(l)
    {
        this.lado=l;
    }
    /**
     * Información sobre el cuadrado
     * @returns string
     */
    toString()
    {
        return `Origen: ${this.origen} Lado: ${this.lado}`;
    }
    /**
     * Dibuja un Cuadrado.
     * @param {Context} ct: contexto del Canvas. 
     */
    dibujar(ct)
    {
        ct.fillStyle=this.getColor();
        
        ct.strokeStyle=this.getColorBorde();
        ct.lineWidth=this.getAnchoBorde();

        let pto=this.getOrigen();

        if(this.getBorde())
            ct.strokeRect(pto.getX(),pto.getY(),this.lado,this.lado);

        if(this.getRelleno())
            ct.fillRect(pto.getX(),pto.getY(),this.lado,this.lado);
    }
}