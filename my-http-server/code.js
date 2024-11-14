class Usuario {
    constructor(id,nombre,apellidos,rol,activo){
        this._id=id;
        this._nombre=nombre;
        this._apellidos=apellidos;
        this._rol=rol;
        this._activo=activo;
    }
    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre=nombre;
    }
    get apellidos(){
        return this._apellidos;

    }
    set apellidos(apellidos){
        this._apellidos=apellidos;
    }
    get rol(){
        return this._rol;
    }
    set rol(rol){
        this._rol=rol;
    }
    get activo(){
        return this._activo;
    }
    set activo(rol){
        this._activo=activo;
    }
}
class Item{
    constructor(){
        this._usuario=null;
        this._nodo=null;
    }
    get usuario(){
        return this._usuario;
    }
    set usuario(usuario){
        this._usuario=usuario;
    }
    get nodo(){
        return this._nodo;
    }
    set nodo(nodo){
        this._nodo=nodo;
    }
}
class Service{
    constructor(){
        this._tabla="";
        this._items=new Map();
        this.contador=1;
    }
    get tabla(){
        return this._tabla;
    }
    set tabla(item){
        this._tabla=item;
    }
    createFila(item){
        item.nodo=this._tabla.insertRow();
        item.nodo.id=item.usuario.id;
        var celdaid = item.nodo.insertCell(0);
        celdaid.innerHTML = item.usuario.id;
        var celdanombre = item.nodo.insertCell(1);
        celdanombre.innerHTML = item.usuario.nombre;
        var celdaapellidos = item.nodo.insertCell(2);
        celdaapellidos.innerHTML = item.usuario.apellidos;
        var celdarol = item.nodo.insertCell(3);
        celdarol.innerHTML = item.usuario.rol;
        var celdaactivo = item.nodo.insertCell(4);
        celdaactivo.innerHTML = item.usuario.activo;
        var celdaborrar = item.nodo.insertCell(5);
        var boton= document.createElement("button");
        boton.innerHTML="Borrar";
        boton.classList.add('btn');
        boton.classList.add('btn-danger');
        var self=this;
        boton.onclick=function(){
            self.removeItem(item.usuario.id) 
        }
        celdaborrar.appendChild(boton);
        this.contador++;
    }
    addItem(usuario){
        var tempo= new Usuario(this.contador,usuario.nombre,usuario.apellidos,usuario.rol,usuario.activo===undefined?"No":"Si");
        var item= new Item();
        item.usuario=tempo;
        this.createFila(item);
        this._items.set(item.usuario.id,item)   
    }
    removeItem(id){
        
        var item=this._items.get(id);
        if(item!=null && item!=undefined){
            item.nodo.parentElement.removeChild(item.nodo)
            this._items.delete(id);
        }else{
            throw "No existe el usuario"
        }
        
    }
}