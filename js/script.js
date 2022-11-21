let desloguear = document.getElementById("desloguear");
let producto = document.getElementById("producto");

function leerCredenciales() {
    let usuario = JSON.parse(sessionStorage.getItem("credenciales"));
    if (usuario == null) {
        document.getElementById("person").style.visibility = "visible";
        desloguear.innerText = "";
    } else {
        document.getElementById("person").style.visibility = "hidden";
        desloguear.innerText = "Cerrar seción";
    }
}

leerCredenciales();

function deslogearse() {
    sessionStorage.clear();
    document.getElementById("person").style.visibility = "visible";
    desloguear.innerText = "";
}

desloguear.addEventListener("click", (e) => {
    e.preventDefault();
    deslogearse();
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