import { nav } from "./nav.mjs";
nav();
import { footer } from "./footer.mjs";
footer();
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



/*LISTA | ELIMINAR*/
function mostrarLista(){
    finalLista.innerHTML="";
    lista.forEach((item,index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${item.name} - s/.${item.precio.toFixed(2)}</span>
        <button type="button" data-index="${index}" class="eliminar">X</button>
        `;
        finalLista.appendChild(li);
        li.querySelector("button").addEventListener("click",()=>eliminarElemento(index));
});
}

function eliminarElemento(index) {
    lista.splice(index,1);
    localStorage.setItem("carrito", JSON.stringify(lista));
    mostrarLista();
}

/* LISTA | AGREGAR */
let productos = [];
const resultadosBusqueda = document.getElementById("resultadosBusqueda");
const buscador = document.getElementById("buscador");

// Cargar productos desde archivo JSON
fetch("data/pasteles.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
  });
fetch("data/postres.json")
  .then(res => res.json())
  .then(data => {
    productos = productos.concat(data);
  });
// Escuchar escritura en buscador
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = productos.filter(prod => prod.name.toLowerCase().includes(texto));
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
    li.innerHTML = `
      ${prod.name} - s/.${prod.precio.toFixed(2)}
      <button type="button">Agregar</button>
    `;
    li.querySelector("button").addEventListener("click", () => agregarCarrito(prod));
    resultadosBusqueda.appendChild(li);
  });
}

function agregarCarrito(producto) {
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

/*ENVIAR WHATSAPP*/
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

  carrito.forEach((producto, index) => {
    mensaje += `• ${producto.name} - s/.${producto.precio.toFixed(2)}\n`;
  });

  mensaje += `\nTeléfono: ${telefono}\nEmail: ${email}`;

  // Codificar mensaje
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Número de destino (incluye código de país, sin "+")
  const numeroDestino = "51956392163"; // ← cambia este por el tuyo

  // Crear URL de WhatsApp
  const url = `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`;

  // Abrir WhatsApp
  window.open(url, "_blank");
});
