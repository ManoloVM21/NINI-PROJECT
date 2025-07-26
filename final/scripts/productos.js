import { nav } from "./nav.mjs";
nav();
import { footer } from "./footer.mjs";
footer();
import { carrito, agregarCarrito, eliminarDelCarrito,actualizarContador, mostrarCarrito, carritoAccion} from "./carrito.mjs";
let pagina = 0;
const cantidad = 4;
let todosLosPasteles = [];
mostrarCarrito();
actualizarContador();
async function Cards() {
    try{
        const response = await fetch("data/pasteles.json");
        todosLosPasteles = await response.json();
        mostrarSiguienteLote();
    } catch(error){
        console.log(error);
    }
    
}
Cards()
const secpasteles = document.querySelector("#pasteles");
function mostrarSiguienteLote(){
    const inicio = pagina * cantidad;
    const fin = inicio + cantidad;
    const lote = todosLosPasteles.slice(inicio,fin);
    lote.forEach(item => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const description = document.createElement("p");
        const button = document.createElement("button");

        img.src = `${item.imagen}`;
        img.setAttribute("alt",`${item.name}`);
        img.setAttribute("loading","lazy");
        h3.innerHTML = `${item.name}`;
        description.innerHTML = `${item.description}`;
        button.innerHTML = "Ver Detalles";
        button.addEventListener("click", ()=>{dialog.showModal()});
        div.setAttribute("class",`cards ${item.name}`);
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(description);
        div.appendChild(button);
        secpasteles.appendChild(div);
        div.addEventListener("mouseenter", () => {
        div.style.backgroundColor = `${item.color}`;
        });
        div.addEventListener("mouseleave", () => {
        div.style.backgroundColor = "#ffffff";
        });

        const dialog = document.createElement("dialog");
        const dH2 = document.createElement("h2");
        dH2.style.backgroundColor = `${item.color}`;
        const price = document.createElement("p");
        const dDescription = document.createElement("p");
        const dNutrition = document.createElement("p");
        const agregar = document.createElement("button");
        agregar.setAttribute("class","agregar");
        agregar.textContent = `Agregar al Carrito`;
        agregar.addEventListener("click", ()=>{
            agregarCarrito(item);
        });
        const dButton = document.createElement("button");
        dButton.innerHTML = "X";
        dButton.setAttribute("class","x");
        dH2.innerHTML=`${item.name}`;
        price.innerHTML = `<strong>Precio:</strong> s/.${item.precio}`;
        dDescription.innerHTML = `<strong>Description: </strong>${item.description}`;
        dNutrition.innerHTML = `<strong>Nutritional Value: </strong>${item.nutritional}`;
        dialog.appendChild(dH2);
        dialog.appendChild(dButton);
        dialog.appendChild(price);
        dialog.appendChild(dDescription);
        dialog.appendChild(dNutrition);
        dialog.appendChild(agregar);
        secpasteles.appendChild(dialog);
        div.addEventListener("click",()=>{
            dialog.showModal();
            dialog.querySelector("h2").focus();
        });
        dButton.addEventListener("click",()=>{dialog.close()});
    });
    const verMas = document.querySelector("#verMas1");
    pagina++;
    if (pagina * cantidad >= todosLosPasteles.length){
        verMas.style.display = "none";
    }
    verMas.addEventListener("click", () =>mostrarSiguienteLote());
}

let pagina2 = 0;
const cantidad2 = 2;
let todosLosPostres = [];

async function Cards2() {
    try{
        const response = await fetch("data/postres.json");
        todosLosPostres = await response.json();
        mostrarSiguienteLote2();
    } catch(error){
        console.log(error);
    }
    
}
Cards2()

const secpostres = document.querySelector("#galletas");
function mostrarSiguienteLote2() {
    const inicio = pagina2 * cantidad2;
    const fin = inicio + cantidad2;
    const lote = todosLosPostres.slice(inicio, fin);
    
    lote.forEach(item => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const description = document.createElement("p");
        const button = document.createElement("button");

        // Configurar tarjeta
        img.src = item.imagen;
        img.alt = item.name;
        img.loading = "lazy";
        h3.textContent = item.name;
        description.textContent = item.description;
        button.textContent = "Ver Detalles";
        div.className = `cards ${item.name.replace(/\s+/g, '-').toLowerCase()}`;

        // Efectos hover
        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = item.color;
        });
        div.addEventListener("mouseleave", () => {
            div.style.backgroundColor = "#ffffff";
        });

        // Crear diálogo con carrusel
        const dialog = document.createElement("dialog");
        const dH2 = document.createElement("h2");
        dH2.textContent = item.name;
        dH2.style.backgroundColor = item.color;
        dialog.appendChild(dH2);
        
        const dButton = document.createElement("button");
        dButton.className = "x";
        dButton.textContent = "X";

        // Contenedor del carrusel (igual que en displayCards2)
        const carruselContainer = document.createElement("div");
        carruselContainer.className = "carrusel-container";
        
        // Contenedor de imágenes
        const carrusel = document.createElement("div");
        carrusel.className = "carrusel";
        
        // Botones de navegación
        const prevButton = document.createElement("button");
        prevButton.className = "carrusel-button prev";
        prevButton.innerHTML = "&lt;";
        
        const nextButton = document.createElement("button");
        nextButton.className = "carrusel-button next";
        nextButton.innerHTML = "&gt;";

        // Crear imágenes del carrusel (igual que en displayCards2)
        const carruselImages = item.carrusel ? Object.values(item.carrusel) : [];
        
        carruselImages.forEach((imagenSrc, index) => {
            // Verificar si es un video
            if (imagenSrc.endsWith('.mp4')) {
                const videoElement = document.createElement("video");
                videoElement.src = imagenSrc;
                videoElement.controls = true;
                videoElement.className = "carrusel-item";
                if (index === 0) videoElement.classList.add("active");
                carrusel.appendChild(videoElement);
            } else {
                const imgElement = document.createElement("img");
                imgElement.src = imagenSrc;
                imgElement.alt = `${item.name} - Imagen ${index + 1}`;
                imgElement.className = "carrusel-item";
                if (index === 0) imgElement.classList.add("active");
                carrusel.appendChild(imgElement);
            }
        });

        // Navegación del carrusel (igual que en displayCards2)
        let currentIndex = 0;
        const items = carrusel.querySelectorAll('.carrusel-item');

        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.toggle("active", i === index);
            });
            currentIndex = index;
        }

        prevButton.addEventListener("click", (e) => {
            e.stopPropagation();
            showItem((currentIndex - 1 + items.length) % items.length);
        });

        nextButton.addEventListener("click", (e) => {
            e.stopPropagation();
            showItem((currentIndex + 1) % items.length);
        });

        // Agregar elementos al carrusel
        if (carruselImages.length > 1) {
            carruselContainer.appendChild(prevButton);
            carruselContainer.appendChild(carrusel);
            carruselContainer.appendChild(nextButton);
        } else {
            carruselContainer.appendChild(carrusel);
        }
        dialog.appendChild(carruselContainer);
        // Mostrar precios (manteniendo tu formato original)
        const precioContainer = document.createElement("div");
        precioContainer.className = "precio-container";

        // Crear select para tipos de precio
        const precioSelect = document.createElement("select");
        precioSelect.className = "precio-select";

        for (const [tipo, valor] of Object.entries(item.precio)) {
            const option = document.createElement("option");
            option.value = tipo;
            option.textContent = `${tipo}: s/.${valor}`;
            precioSelect.appendChild(option);
        }

        precioContainer.appendChild(precioSelect);
        dialog.appendChild(precioContainer);

        // Descripción y nutrición (manteniendo tu formato original)
        const dDescription = document.createElement("p");
        dDescription.innerHTML = `<strong>Description: </strong>${item.description}`;

        const dNutrition = document.createElement("p");
        dNutrition.innerHTML = `<strong>Nutritional Value: </strong>${item.nutritional}`;

        // Botón agregar al carrito (manteniendo tu formato original)
        const agregar = document.createElement("button");
        agregar.className = "agregar";
        agregar.textContent = "Agregar al Carrito";
        agregar.addEventListener("click", () => {
        const tipoSeleccionado = precioSelect.value;
        agregarCarrito(item, tipoSeleccionado);
        dialog.close();
});

        // Ensamblar diálogo (combinando ambos enfoques)
        dialog.append(
            dButton,
            dDescription,
            dNutrition,
            agregar
        );

        // Eventos (manteniendo tus funcionalidades)
        button.addEventListener("click", () => dialog.showModal());
        dButton.addEventListener("click", () => dialog.close());
        div.addEventListener("click", () => {
            dialog.showModal();
            dialog.querySelector("h2").focus();
        });

        // Cerrar diálogo al hacer clic fuera del contenido
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });

        // Ensamblar tarjeta
        div.append(img, h3, description, button);
        secpostres.append(div, dialog);
    });

    // Manejo del botón "Ver Más" (manteniendo tu lógica original)
    const verMas2 = document.querySelector("#verMas2");
    pagina2++;
    if (pagina2 * cantidad2 >= todosLosPostres.length) {
        verMas2.style.display = "none";
    }
    verMas2.addEventListener("click", mostrarSiguienteLote2);
}
carritoAccion();

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.classList.remove("transparent");
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    header.classList.add("transparent");
  }
});