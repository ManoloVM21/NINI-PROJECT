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
function mostrarSiguienteLote2(){
    const inicio = pagina2 * cantidad2;
    const fin = inicio + cantidad2;
    const lote = todosLosPostres.slice(inicio,fin);
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
        secpostres.appendChild(div);
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
        secpostres.appendChild(dialog);
        div.addEventListener("click",()=>{
            dialog.showModal();
            dialog.querySelector("h2").focus();
            });
        dButton.addEventListener("click",()=>{
            dialog.close();
        });
    });
    const verMas2 = document.querySelector("#verMas2");
    pagina2++;
    if (pagina2 * cantidad2 >= todosLosPostres.length){
        verMas2.style.display = "none";
    }
    verMas2.addEventListener("click", () =>mostrarSiguienteLote2());
}
carritoAccion();

console.log(carrito);