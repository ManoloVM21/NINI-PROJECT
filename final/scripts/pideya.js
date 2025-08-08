import { nav } from "./nav.mjs";
import { footer } from "./footer.mjs";
import {carritoAccion,mostrarCarrito,} from "./carrito.mjs";
nav();
footer();
mostrarCarrito();
carritoAccion();

// Cargar carrito desde localStorage
let lista;
try {
  const raw = JSON.parse(localStorage.getItem("carrito"));
  lista = Array.isArray(raw) ? raw : [];
} catch {
  lista = [];
}

console.log(lista);

const finalLista = document.querySelector("#listaPedido");
mostrarLista();

/* LISTA | ELIMINAR */
function mostrarLista() {
    finalLista.innerHTML = "";
    let total = 0;
    
    if (lista.length === 0) {
        finalLista.innerHTML = "<li>El carrito está vacío</li>";
        return;
    }

    lista.forEach((item, index) => {
        const li = document.createElement("li");
        // Manejar tanto la estructura antigua (precio numérico) como la nueva (precio objeto)
        const precio = typeof item.precio === 'object' ? item.precioSeleccionado : item.precio;
        const tipo = item.tipoSeleccionado ? `(${item.tipoSeleccionado}) ` : '';
        
        li.innerHTML = `
        <span>${item.name} ${tipo}- s/.${precio.toFixed(2)}</span>
        <button type="button" data-index="${index}" class="eliminar">X</button>
        `;
        finalLista.appendChild(li);
        li.querySelector("button").addEventListener("click", () => eliminarElemento(index));
        
        total += precio;
    });

    // Mostrar total
    const totalElement = document.createElement("li");
    totalElement.innerHTML = `<strong>Total: s/.${total.toFixed(2)}</strong>`;
    totalElement.style.fontWeight = "bold";
    totalElement.style.marginTop = "10px";
    finalLista.appendChild(totalElement);
}

function eliminarElemento(index) {
    lista.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(lista));
    mostrarLista();
}

/* LISTA | AGREGAR */
let productos = [];
const resultadosBusqueda = document.getElementById("resultadosBusqueda");
const buscador = document.getElementById("buscador");

// Cargar productos desde archivos JSON
Promise.all([
    fetch("data/pasteles.json").then(res => res.json()),
    fetch("data/postres.json").then(res => res.json())
])
.then(([pasteles, postres]) => {
    productos = [...pasteles, ...postres];
})
.catch(error => {
    console.error("Error cargando productos:", error);
});

// Escuchar escritura en buscador
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(prod => 
        prod.name.toLowerCase().includes(texto)
    );
    mostrarResultados(filtrados);
});

function mostrarResultados(lista) {
    resultadosBusqueda.innerHTML = "";

    if (lista.length === 0) {
        resultadosBusqueda.innerHTML = "<li>No encontrado</li>";
        return;
    }

    lista.forEach(prod => {
        const li = document.createElement("li");
        // Mostrar precios disponibles
        let precioTexto = typeof prod.precio === 'object' ? 
            Object.entries(prod.precio).map(([tipo, valor]) => `${tipo}: s/.${valor}`).join(' | ') :
            `s/.${prod.precio.toFixed(2)}`;
        
        li.innerHTML = `
            ${prod.name} - ${precioTexto}
            ${typeof prod.precio === 'object' ? 
                '<select class="precio-select"></select>' : 
                ''}
            <button type="button">Agregar</button>
        `;
        
        // Si hay múltiples precios, crear opciones
        if (typeof prod.precio === 'object') {
            const select = li.querySelector(".precio-select");
            for (const [tipo, valor] of Object.entries(prod.precio)) {
                const option = document.createElement("option");
                option.value = tipo;
                option.textContent = `${tipo} - s/.${valor}`;
                select.appendChild(option);
            }
        }
        
        li.querySelector("button").addEventListener("click", () => {
            if (typeof prod.precio === 'object') {
                const tipoSeleccionado = li.querySelector(".precio-select").value;
                const precioSeleccionado = prod.precio[tipoSeleccionado];
                agregarCarritoL({
                    ...prod,
                    precioSeleccionado,
                    tipoSeleccionado
                });
            } else {
                agregarCarritoL(prod);
            }
        });
        
        resultadosBusqueda.appendChild(li);
    });
}

function agregarCarritoL(producto) {
    let listaActual;
    try {
        const raw = JSON.parse(localStorage.getItem("carrito"));
        listaActual = Array.isArray(raw) ? raw : [];
    } catch {
        listaActual = [];
    }

    listaActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(listaActual));
    lista = listaActual;
    mostrarLista();

    resultadosBusqueda.innerHTML = "";
    buscador.value = "";
}

/* ENVIAR WHATSAPP */
document.getElementById("enviarWhatsapp").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nombre || !telefono || !email) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Armar mensaje
    let mensaje = `Hola, soy ${nombre}. Quiero hacer un pedido:\n\n`;
    let total = 0;

    carrito.forEach((producto) => {
        const precio = typeof producto.precio === 'object' ? 
            producto.precioSeleccionado : producto.precio;
        const tipo = producto.tipoSeleccionado ? ` (${producto.tipoSeleccionado})` : '';
        
        mensaje += `• ${producto.name}${tipo} - s/.${precio.toFixed(2)}\n`;
        total += precio;
    });

    mensaje += `\nTotal: s/.${total.toFixed(2)}`;
    mensaje += `\n\nTeléfono: ${telefono}\nEmail: ${email}`;

    // Codificar mensaje
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Número de destino (incluye código de país, sin "+")
    const numeroDestino = "51956392163"; // ← cambia este por el tuyo

    // Crear URL de WhatsApp
    const url = `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(url, "_blank");
});