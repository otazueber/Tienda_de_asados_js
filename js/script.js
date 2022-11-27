class Producto {
    constructor(id, imagen, descripcion, unidadMedida, precio) {
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.unidadMedida = unidadMedida;
        this.precio = precio;
    }
}
let vacunos = [];
let almacen = [];
let vinos = [];

function crearHtml(productos, contenedor) {
    let html = "";
    let contador = 0;
    productos.forEach((producto) => {
        const { id, imagen, descripcion, unidadMedida, precio } = producto;
        contador++;
        if (contador == 1) {
            html = html + '<div class="row row-producto">';
        }
        html = html + `<div class="col-12 col-lg-3" id="${id}"><img class="producto ps-5" src="${imagen}" alt="Photo"><p>${descripcion}<br>Precio por ${unidadMedida} ${precio}</p></div>`;
        if (contador == 4) {
            html = html + '</div>';
            contador = 0;
        }
    }
    );
    if (contador < 4) {
        html = html + '</div>';
    }
    contenedor.innerHTML += html;
}

async function obtenerProductos() {
    var response;
    response = await fetch('./assets/json/almacen.json');
    almacen = await response.json();
    console.log(almacen);
    response = await fetch('./assets/json/vacunos.json');
    vacunos = await response.json();
    console.log(vacunos);
    response = await fetch('./assets/json/vinos.json');
    vinos = await response.json();
    console.log(vinos);
}


obtenerProductos()

let contenedor = document.getElementById("productos-vacunos");

if (contenedor != null) {
    crearHtml(vacunos, contenedor);
}

contenedor = document.getElementById("productos-vinos");
if (contenedor != null) {
    crearHtml(vinos, contenedor);
}

contenedor = document.getElementById("productos-almacen");
if (contenedor != null) {
    crearHtml(almacen, contenedor);
}

let person = document.getElementById("person");
let usuarioLogueado = false;
const htmlUsuarioNoLogueado = '<a href="pages/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" /></svg></a>';
const htmlUsuarioLogueado = '<a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/></svg></a>';

function leerCredenciales() {
    let usuario = JSON.parse(sessionStorage.getItem("credenciales"));

    if (usuario == null) {
        person.innerHTML = htmlUsuarioNoLogueado;
    } else {
        person.innerHTML = htmlUsuarioLogueado;
        usuarioLogueado = true;
    }

}

leerCredenciales();

function LoguearDeslogearse() {
    if (usuarioLogueado) {
        sessionStorage.clear();
        person.innerHTML = htmlUsuarioNoLogueado;
        usuarioLogueado = false;
    } else {
        window.location.assign("./pages/login.html");
    }

}

person.addEventListener("click", (e) => {
    e.preventDefault();
    LoguearDeslogearse();
}
);

function agregarAlCarrito() {
    console.log("Agregado"); //a desarrollar para la entrega final
}
/* a desarrollar para la entrega final
producto.addEventListener("click", (e) => {
    e.preventDefault();
    agregarAlCarrito();
}
);
*/




/*
let user = "";
let pass = "";
let usuarioLogueado = false;
let productosSeleccionados = [];

function loguear() {
    let salir = false;
    while ((!usuarioLogueado) & (!salir)) {
        // por ahora tomo cualquier usuario y cualquier contraseña como válida
        // más adelante veré como validar el nombre de usuario y la contraseña
        user = prompt("Ingrese el nombre de usuario");
        if (user != "") {
            pass = prompt("Ingrese la contraseña");
            if (pass != "") {
                usuarioLogueado = true;
            }
            else if (pass === null) {
                salir = true;
            }
        }
        else if (aux === null) {
            salir = true;
        }
    }
}

function pedirCantidad(AConsiderarDecimales) {
    if (AConsiderarDecimales) {
        let aux = parseFloat(prompt("Ingrese la cantidad"));
    }
    else {
        let aux = parseInt(prompt("Ingrese la cantidad"));
    }
    if (aux == NaN) {
        aux = 0;
    }
    return aux;
}

function Producto(ADescripcion, ACantidad, APrecio) {
    this.descripcion = ADescripcion;
    this.cantidad = ACantidad;
    this.precio = APrecio;
}

function obtenerTotal(){
    let total = 0;
    productosSeleccionados.forEach((producto)=>{
        total = total + (precio.precio * producto.cantidad);
    }
    );
    return total;
}

function obtenerListaProductos(){
    let listaProductos = "";
    productosSeleccionados.forEach((producto)=>{
        listaProductos = listaProductos + precio.descripcion + " Cantidad: " + producto.cantidad + " precio: " + precio.precio + " Importe: " + (precio.precio * producto.cantidad) + "\n";
    }
    );
    return listaProductos;
}

if (loguear()) {
    let seguirComprado = true;
    let auxProducto = "";
    let auxCantidad = 0;
    let tieneProductos = false;
    let total = 0;

    while (seguirComprado) {
        auxProducto = prompt("Elija un producto: \n1 - Vacío ($ 1.550,00)\n2 - Entraña ($ 2.190,00)\n3 - Tapa de asado ($1.150,00)\n4 - Matambre ($1.290,00)\n5 - Finalizar");
        if ((auxProducto == "1") || (auxProducto == "2") || (auxProducto == "3") || (auxProducto == "4")) {
            auxCantidad = pedirCantidad(true);
            if (auxCantidad > 0) {
                switch (auxProducto) {
                    case "1":
                        productosSeleccionados.push(new Producto("Vacío", auxCantidad, 1550));
                        break;
                    case "2":
                        productosSeleccionados.push(new Producto("Entraña", auxCantidad, 2190));
                        break;
                    case "3":
                        productosSeleccionados.push(new Producto("Tapa de asado", auxCantidad, 1150));
                        break;
                    case "4":
                        productosSeleccionados.push(new Producto("Matambre", auxCantidad, 1290));
                        break;
                }
                tieneProductos = tieneProductos || ((auxCantidad > 0));
            }
        } else if (auxProducto == "5") {
            seguirComprado = false;
        }
    }
    if (tieneProductos) {
        alert("Gracias por su pedido, el total a abonar es: " + obtenerTotal() + "\nSu lista de productos es la siguiente:\n" + obtenerListaProductos());
    }

}
*/