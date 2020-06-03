// Una clase es una estructura que define a los objetos a partir de lo que tienen y lo que hacen

class Producto { // Lo ideal siempre es tener separada la clase

    constructor(nombre, stock, precio, imagen, marca){
        this.nombre = nombre
        this.stock = stock
        this.precio = precio
        this.imagen = imagen
        this.marca = marca
        this.estado = false
        this.vDOM = document.createElement("article")
    }

    Mostrar(){ // Metodo de instancia: Ya que para usar este metodo debo crear el objeto
        //const ficha = document.createElement("article") // Cuando se ejecuta el createElement solo le ponemos el nombre de la etiqueta
        // Lo de arriba ya no es necesario debido a que ya defini el createElement arriba con el virtual DOM

        this.vDOM.classList.add("col-4")
        this.vDOM.innerHTML = `<div class="card h-100">
                            <a href="#">
                                <img class="card-img-top img-fluid" src=${this.imagen} alt="">
                            </a>
                            <div class="card-body">
                                <h4 class="card-title"><a href="#">${this.marca} - ${this.nombre}</a> <span class="badge badge-pill badge-success float-right">$${parseFloat(this.precio).toFixed(2)}</span></h4>
                                <p class="card-textr">${parseInt(this.stock)} unid.</p>
                                <button class="btn btn-warning btn-editar float-left ${ ( auth2 && auth2.isSignedIn.get() == true) ? "d-block" : "d-none" }">Editar</button>
                                <button class="btn btn-primary btn-comprar float-right">Comprar</button>
                            </div>
                        </div>`
        
        // Con esto voy a decirle que si el estado es falso entonces me haga un appendchild y sino que no me haga nada
        if (!this.estado){ // Es como decir this.estado = false. 
            document.querySelector("#productos-destacados").appendChild(this.vDOM)
            this.estado = true
        }


        this.vDOM.querySelector(".btn-editar").onclick = (evento) => { // Si yo utilizara function y no arrow el this seria el boton editar por lo que no me traeria el objeto sino el boton
            
            console.log("Está logueado??")
            console.log(auth2.isSignedIn.get())
            
        if (auth2.isSignedIn.get()) {
            //1) Editar el producto
            this.marca = prompt("Ingrese nueva marca: ", this.marca)
            this.nombre = prompt("Ingrese nuevo nombre: ", this.nombre)
            this.stock = prompt("Ingrese nuevo stock: ", this.stock)
            this.precio = prompt("Ingrese nuevo precio: ", this.precio)
            this.imagen = prompt("Ingrese nueva url: ", this.imagen)

            //2) Re-reenderizar la interfaz
            this.Mostrar() // Hasta aca lo que hice fue reutilizar informacion pero para crear un nuevo article, yo quiero que me lo reemplace

            //3) Enviar los nuevos datos al servidor
            //Aca voy a enviar los nuevos datos al servidor...
            let datos = new FormData()
            datos.append("marca", this.marca)
            datos.append("nombre", this.nombre)
            datos.append("stock", this.stock)
            datos.append("precio", this.precio)
            datos.append("imagen", this.imagen)

            let config  = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : datos
            }
            fetch("https://webhook.site/08984cf8-0c9b-4115-bad4-da50123a865c", config)

            console.log(this) // El this es el objeto producto con el que se armó la interfaz
        } else {
            alert ("ACCESO DENEGADO")
        }
            
        }


    }

    Descuento(cupon){
        if(cupon == "UH7XTU78I"){
            this.precio -= (this.precio * 0.15) // Se pone -= que significa que le resta
        }
    }

    //////////////////////////
    static armarCatalogo(objetos, rango){ // Método estático: No es necesario crear el objeto
        let productos = objetos.map( ({Nombre, Stock, Precio, Imagen, Marca}) => new Producto(Nombre, Stock, Precio, Imagen, Marca) )
        let resultado = rango ? productos.filter (producto => producto.precio > rango.min && producto.precio < rango.max) : productos // El ? reemplaza al if y el : reemplaza al else. Significa que si existe rango me devuelva esos productos y si no existe me devuelva todos. Esto es un operador ternario
        return resultado
    }

}
