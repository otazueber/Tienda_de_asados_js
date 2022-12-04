class Producto {
    constructor(idProducto, imagen, descripcion, unidadMedida, precio) {
        this.idProducto = idProducto;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.unidadMedida = unidadMedida;
        this.precio = precio;
        this.cantidad = 0;
    }
};

var productos = [];
var carrito = [];

function crearHtml(arrayProductos, contenedor) {
    let html = "";
    let contador = 0;
    arrayProductos.forEach((producto) => {
        const { idProducto, imagen, descripcion, unidadMedida, precio } = producto;

        contador++;
        if (contador == 1) {
            html = html + '<div class="row row-producto">';
        }
        html = html + ` <div class="col-12 col-lg-3 box_producto">
                            <img id="${idProducto}" class="producto ps-5" src="${imagen}" alt="Photo">
                            <p>${descripcion}<br>Precio por ${unidadMedida} ${precio}</p>
                        </div>`;
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
    asignarEventoAgregarAlCarrito();
}

async function obtenerYCargarProductos() {
    var response;
    var vacunos = [];
    var vinos = [];
    var almacen = [];

    response = await fetch("../assets/json/vacunos.json");
    vacunos = await response.json();
    productos = productos.concat(vacunos);

    response = await fetch("../assets/json/vinos.json");
    vinos = await response.json();
    productos = productos.concat(vinos);

    response = await fetch("../assets/json/almacen.json");
    almacen = await response.json();
    productos = productos.concat(almacen);

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
}

function leerCarrito() {
    let jsonCarrito = localStorage.getItem("carrito");
    if (jsonCarrito != null) {
        carrito = JSON.parse(jsonCarrito);
    }
}

leerCarrito();

obtenerYCargarProductos()

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

function obtenerDirectorioRaiz() {
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var archivoHtml = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length - 5);
    if (archivoHtml == "index") {
        return "";
    }
    else {
        return "..";
    }
}

function loguearDeslogearse() {
    if (usuarioLogueado) {
        sessionStorage.clear();
        person.innerHTML = htmlUsuarioNoLogueado;
        usuarioLogueado = false;
    } else {
        window.location.assign(ObtenerDirectorioRaiz() + "/pages/login.html");
    }
}

person.addEventListener("click", (e) => {
    e.preventDefault();
    loguearDeslogearse();
}
);

function linkearCarrito() {
    var carrito = document.getElementById("carrito");
    if (carrito != null) {
        carrito.href = obtenerDirectorioRaiz() + "/pages/carrito.html";
    }
}

linkearCarrito();

function encontrar(arr, id) {
    return arr.find(el => el.idProducto == id);
}
function agregarAlCarrito(id) {
    if (parseInt(id) > 0) {
        let productoEncontrado = encontrar(carrito, id);
        if (productoEncontrado == undefined) {
            carrito.push(encontrar(productos, id));
            actualizarCantidadEnCarrito();
        }
        else {
            productoEncontrado.cantidad++;
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("fechaCarrito", Date.now);
    }
}

function mostrarMensajeProductoAgregado()
{
    Swal.fire({
        position: 'top-end',
        title: 'Producto agregado exitosamente al carrito!!!',
        showConfirmButton: false,
        timer: 2000
    })
}

function asignarEventoAgregarAlCarrito() {
    const productos = document.getElementsByClassName("box_producto");
    for (let producto of productos) {
        producto.addEventListener("click", (e) => {
            agregarAlCarrito(e.target.id)
            mostrarMensajeProductoAgregado();
        })
    }
};

function actualizarCantidadEnCarrito() {
    const span = document.getElementById('cart-count');
    if (carrito.length == 0) {
        span.textContent = "";
    }
    else {
        span.textContent = carrito.length;
    }
}

actualizarCantidadEnCarrito();