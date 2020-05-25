// Una clase es una estructura que define a los objetos a partir de lo que tienen y lo que hacen

class Producto { // Lo ideal siempre es tener separada la clase

    constructor(nombre, stock, precio, imagen, marca){
        this.nombre = nombre
        this.stock = stock
        this.precio = precio
        this.imagen = imagen
        this.marca = marca
    }

    Mostrar(){ // Metodo de instancia: Ya que para usar este metodo debo crear el objeto
        const ficha = document.createElement("article") // Cuando se ejecuta el createElement solo le ponemos el nombre de la etiqueta
        ficha.classList.add("col-4")
        ficha.innerHTML = `<div class="card h-100">
                            <a href="#">
                                <img class="card-img-top img-fluid" src=${this.imagen} alt="">
                            </a>
                            <div class="card-body">
                                <h4 class="card-title"><a href="#">${this.marca} - ${this.nombre}</a> <span class="badge badge-pill badge-success float-right">$${this.precio.toFixed(2)}</span></h4>
                                <p class="card-textr">${this.stock} unid.</p>
                                <button class="btn btn-primary float-right">Comprar</button>
                            </div>
                        </div>`

        document.querySelector("#productos-destacados").appendChild(ficha)

    }

    Descuento(cupon){
        if(cupon == "UH7XTU78I"){
            this.precio -= (this.precio * 0.15) // Se pone -= que significa que le resta
        }
    }

    //////////////////////////
    static armarCatalogo(objetos){ // Método estático: No es necesario crear el objeto
        let productos = objetos.map( ({Nombre, Stock, Precio, Imagen, Marca}) => new Producto(Nombre, Stock, Precio, Imagen, Marca) )
        let resultado = productos.filter (producto => producto.precio > 249 && producto.stock > 100)
        return resultado
    }

}
