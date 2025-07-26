import { nav } from "./nav.mjs";
import { footer } from "./footer.mjs";
import { agregarCarrito,carritoAccion,mostrarCarrito,actualizarContador } from "./carrito.mjs";
nav();
footer();
mostrarCarrito();
carritoAccion();
actualizarContador();

/*CARDS*/
async function Cards() {
    try{
        const response = await fetch("data/pasteles.json");
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 2);
        displayCards(shuffled);
    } catch(error){
        console.log(error);
    }
    
}
Cards()
const secpasteles = document.querySelector("#pastelitos");
function displayCards(data) {
    data.forEach(item => {
        // Crear elementos de la tarjeta
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const button = document.createElement("button");

        // Configurar tarjeta
        img.src = item.imagen;
        img.alt = item.name;
        h3.textContent = item.name;
        p.textContent = item.description;
        button.textContent = "Ver Detalles";
        div.className = `cards ${item.name.replace(/\s+/g, '-').toLowerCase()}`;

        // Efectos hover
        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = item.color;
        });
        div.addEventListener("mouseleave", () => {
            div.style.backgroundColor = "#ffffff";
        });

        // Crear diálogo
        const dialog = document.createElement("dialog");
        const dH2 = document.createElement("h2");
        dH2.textContent = item.name;
        dH2.style.backgroundColor = item.color;
        dialog.appendChild(dH2);
        
        const dButton = document.createElement("button");
        dButton.className = "x";
        dButton.textContent = "X";

        // Contenedor del carrusel
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

        // Crear imágenes del carrusel
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

        // Navegación del carrusel
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

         // Selector de precios - NUEVO
        const precioContainer = document.createElement("div");
        precioContainer.className = "precio-container";

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

        // Descripción y nutrición
        const dDescription = document.createElement("p");
        dDescription.innerHTML = `<strong>Descripción: </strong>${item.description}`;

        const dNutrition = document.createElement("p");
        dNutrition.innerHTML = `<strong>Valor Nutricional: </strong>${item.nutritional}`;

        // Botón agregar al carrito (manteniendo tu formato original)
                const agregar = document.createElement("button");
                agregar.className = "agregar";
                agregar.textContent = "Agregar al Carrito";
                agregar.addEventListener("click", () => {
                const tipoSeleccionado = precioSelect.value;
                agregarCarrito(item, tipoSeleccionado);
                dialog.close();
        });

        // Ensamblar diálogo
        dialog.append( dButton, dDescription, dNutrition, agregar);

        // Eventos
        button.addEventListener("click", () => dialog.showModal());
        dButton.addEventListener("click", () => dialog.close());
        div.addEventListener("click", () => dialog.showModal());

        // Cerrar diálogo al hacer clic fuera del contenido
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }})

        // Ensamblar tarjeta
        div.append(img, h3, p, button);
        secpasteles.append(div, dialog);
    });

    // Botón Ver Más
    const verMas = document.createElement("button");
    verMas.className = "verMas";
    verMas.textContent = "Ver Más";
    verMas.addEventListener("click", () => {
        window.open("productos#galletas.html", "_self");
    });
    secpasteles.appendChild(verMas);
}

async function Cards2() {
    const response = await fetch("data/postres.json");
    const data = await response.json();
    const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 2);
    displayCards2(shuffled);
}
Cards2()
const secPostres = document.querySelector("#postrecitos");
function displayCards2(data) {
    data.forEach(item => {
        // Crear elementos de la tarjeta
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const button = document.createElement("button");

        // Configurar tarjeta
        img.src = item.imagen;
        img.alt = item.name;
        h3.textContent = item.name;
        p.textContent = item.description;
        button.textContent = "Ver Detalles";
        div.className = `cards ${item.name.replace(/\s+/g, '-').toLowerCase()}`;

        // Efectos hover
        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = item.color;
        });
        div.addEventListener("mouseleave", () => {
            div.style.backgroundColor = "#ffffff";
        });

        // Crear diálogo
        const dialog = document.createElement("dialog");
        const dH2 = document.createElement("h2");
        dH2.textContent = item.name;
        dH2.style.backgroundColor = item.color;
        dialog.appendChild(dH2);
        
        const dButton = document.createElement("button");
        dButton.className = "x";
        dButton.textContent = "X";

        // Contenedor del carrusel
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

        // Crear imágenes del carrusel
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

        // Navegación del carrusel
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

         // Selector de precios - NUEVO
        const precioContainer = document.createElement("div");
        precioContainer.className = "precio-container";

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

        // Descripción y nutrición
        const dDescription = document.createElement("p");
        dDescription.innerHTML = `<strong>Descripción: </strong>${item.description}`;

        const dNutrition = document.createElement("p");
        dNutrition.innerHTML = `<strong>Valor Nutricional: </strong>${item.nutritional}`;

        // Botón agregar al carrito (manteniendo tu formato original)
                const agregar = document.createElement("button");
                agregar.className = "agregar";
                agregar.textContent = "Agregar al Carrito";
                agregar.addEventListener("click", () => {
                const tipoSeleccionado = precioSelect.value;
                agregarCarrito(item, tipoSeleccionado);
                dialog.close();
        });

        // Ensamblar diálogo
        dialog.append( dButton, dDescription, dNutrition, agregar);

        // Eventos
        button.addEventListener("click", () => dialog.showModal());
        dButton.addEventListener("click", () => dialog.close());
        div.addEventListener("click", () => dialog.showModal());

        // Cerrar diálogo al hacer clic fuera del contenido
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }})

        // Ensamblar tarjeta
        div.append(img, h3, p, button);
        secPostres.append(div, dialog);
    });

    // Botón Ver Más
    const verMas = document.createElement("button");
    verMas.className = "verMas";
    verMas.textContent = "Ver Más";
    verMas.addEventListener("click", () => {
        window.open("productos#galletas.html", "_self");
    });
    secPostres.appendChild(verMas);
}

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

