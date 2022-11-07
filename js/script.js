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
    return usuarioLogueado;
}

function pedirCantidad(AConsiderarDecimales) {
    let aux;
    if (AConsiderarDecimales) {
        aux = parseFloat(prompt("Ingrese la cantidad"));
    }
    else {
        aux = parseInt(prompt("Ingrese la cantidad"));
    }
    if (aux == NaN) {
        aux = 0;
    }
    return aux;
}

class Producto {
    constructor(AId, ADescripcion, ACantidad, APrecio) {
        this.id = AId;
        this.descripcion = ADescripcion;
        this.cantidad = ACantidad;
        this.precio = APrecio;
    }
    ObtenerTotalProducto(){
        return this.precio * this.cantidad;
    }
}

function obtenerTotalPedido() {
    let total = 0;
    productosSeleccionados.forEach((producto) => {
        total = total + producto.ObtenerTotalProducto();
    }
    );
    return total + ".";
}

function obtenerListaProductos() {
    let listaProductos = "";
    productosSeleccionados.forEach((producto) => {
        listaProductos = listaProductos + " * " + producto.descripcion + ": Cantidad = " + producto.cantidad + ", precio = " + producto.precio + ", Importe = " + (producto.precio * producto.cantidad) + ".\n";
    }
    );
    return listaProductos;
}

function ProductoYaElegido(AId) {
    const encontrado = productosSeleccionados.find((producto) => {
        return producto.id === AId;
    })
    if (encontrado === undefined) {
        return false;
    }
    else {
        return true;
    }
}

function SumarCantidadAProducto(AId, ACantidad)
{
    const producto = productosSeleccionados.find((producto) => {
        return producto.id === AId;
    })
    if (producto != undefined) {
        producto.cantidad = producto.cantidad + ACantidad;
    }
}

function EliminarProducto(AId)
{
    productosSeleccionados.splice(AId, 1);
}

function ProponerEliminacionProductos()
{
    let eliminaProducto = parseInt(prompt("¿Quiere verificar la lista para eliminar algún producto?\n\n1 - Si\n2 - No"));
    if ((eliminaProducto != NaN) & (eliminaProducto == 1))
    {
        let Listado = "";
        productosSeleccionados.forEach(element => {
            Listado = Listado + element.id + " - " + element.descripcion + "\n";
        });
        let id = parseInt(prompt("Elija un producto a eliminar\n" + Listado));
        if (id != NaN)
        { 
            for (let index = 0; index < productosSeleccionados.length; index++) {
                const element = productosSeleccionados[index];
                if (parseInt(element.id) == id)
                {
                    EliminarProducto(index);
                    break;
                }
                
            }
        }
    }
}

if (loguear()) {
    let seguirComprado = true;
    let auxProducto = "";
    let auxCantidad = 0;
    let tieneProductos = false;
    let producto;

    while (seguirComprado) {
        auxProducto = prompt("Elija un producto: \n1 - Vacío ($ 1.550,00)\n2 - Entraña ($ 2.190,00)\n3 - Tapa de asado ($1.150,00)\n4 - Matambre ($1.290,00)\n5 - Finalizar");
        if ((auxProducto == "1") || (auxProducto == "2") || (auxProducto == "3") || (auxProducto == "4")) {
            auxCantidad = pedirCantidad(true);
            if (auxCantidad > 0) {
                if (ProductoYaElegido(auxProducto))
                {
                    SumarCantidadAProducto(auxProducto, auxCantidad);
                }
                else{
                    switch (auxProducto) {
                    case "1":
                        producto = new Producto("1", "Vacío", auxCantidad, 1550);
                        break;
                    case "2":
                        producto = new Producto("2", "Entraña", auxCantidad, 2190);
                        break;
                    case "3":
                        producto = new Producto("3", "Tapa de asado", auxCantidad, 1150);
                        break;
                    case "4":
                        producto = new Producto("4", "Matambre", auxCantidad, 1290);
                        break;
                    }
                    productosSeleccionados.push(producto);
                }                
                tieneProductos = tieneProductos || ((auxCantidad > 0));
            }
        } else if (auxProducto == "5") {
            seguirComprado = false;
        }
    }
    if (tieneProductos) {
        ProponerEliminacionProductos();
        if (productosSeleccionados.length > 0)
        {
            alert("Gracias por su pedido,\nSu lista de productos es la siguiente:\n" + obtenerListaProductos() + "El total a abonar es: " + obtenerTotalPedido());
        }
        else
        {
            alert("Su lista de productos está vacía.");
        }
    }
}