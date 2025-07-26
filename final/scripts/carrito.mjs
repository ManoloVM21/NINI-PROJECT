export const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const totalTexto = document.querySelector("#total");

export function agregarCarrito(producto, tipoSeleccionado = "unidad") {
    // Crear un nuevo objeto con el precio seleccionado
    const productoConPrecio = {
        ...producto,
        precioSeleccionado: producto.precio[tipoSeleccionado] || producto.precio.unidad,
        tipoSeleccionado: tipoSeleccionado
    };
    
    carrito.push(productoConPrecio);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
}

export function mostrarCarrito() {
    const seccionCarrito = document.querySelector("#carrito");
    seccionCarrito.innerHTML = "";
    let total = 0;
    
    if (carrito.length === 0) {
        const minip = document.createElement("p");
        minip.textContent = "El carrito está vacío.";
        seccionCarrito.appendChild(minip);
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <span>${item.name} (${item.tipoSeleccionado}) - s/.${item.precioSeleccionado.toFixed(2)}</span>
                <button data-index="${index}">X</button>
            `;
            seccionCarrito.appendChild(div);
            div.querySelector("button").addEventListener("click", () => eliminarDelCarrito(index));
            total += item.precioSeleccionado;
        });
        
        if (total > 0) {
            const pagar = document.createElement("div");
            pagar.innerHTML = `<img src="images/whatsapp.svg" alt="whatsapp" height=30> <p>Hacer Pedido</p>`;
            seccionCarrito.appendChild(pagar);
            pagar.setAttribute("id", "pagar");
            pagar.addEventListener("click", () => { window.open("pideya.html", "_self") });
        }
    }
    
    totalTexto.textContent = `Total s/. ${total.toFixed(2)}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function eliminarDelCarrito(index){
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
}
export function carritoAccion(){
    const carritoimg = document.querySelector("#carroimg");
    const carroStuff = document.querySelector("#carrostuff")
    carritoimg.addEventListener("click", ()=>{
        carroStuff.classList.toggle("hidden");
    })
}

export function actualizarContador(){
    const contador = document.querySelector("#contador-carrito");
    contador.textContent = carrito.length;
}