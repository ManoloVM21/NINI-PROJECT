import { nav } from "./nav.mjs";
import { footer } from "./footer.mjs";
import { carrito,carritoAccion,mostrarCarrito,actualizarContador } from "./carrito.mjs";
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
function displayCards(data){
    data.forEach(item => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const button = document.createElement("button");

        img.src = `${item.imagen}`;
        img.setAttribute("alt",`${item.name}`);
        h3.innerHTML = `${item.name}`;
        p.innerHTML = `${item.description}`;
        button.innerHTML = "Ver Detalles";
        button.addEventListener("click", ()=>{dialog.showModal()});
        div.setAttribute("class",`cards ${item.name}`);
        div.addEventListener("mouseenter", () => {
        div.style.backgroundColor = `${item.color}`;
        });
        div.addEventListener("mouseleave", () => {
        div.style.backgroundColor = "#ffffff";
        });
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);
        secpasteles.appendChild(div);
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
    const verMas = document.createElement("button");
    verMas.innerHTML = "Ver Más";
    verMas.setAttribute("class","verMas");
    verMas.addEventListener("click", ()=>{window.open("productos#pasteles.html","_self")})
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
function displayCards2(data){
    data.forEach(item => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const button = document.createElement("button");

        img.src = `${item.imagen}`;
        img.setAttribute("alt",`${item.name}`);
        h3.innerHTML = `${item.name}`;
        p.innerHTML = `${item.description}`;
        button.innerHTML = "Ver Detalles";
        button.addEventListener("click", ()=>{dialog.showModal()});
        div.setAttribute("class",`cards ${item.name}`);
        div.addEventListener("mouseenter", () => {
        div.style.backgroundColor = `${item.color}`;
        });
        div.addEventListener("mouseleave", () => {
        div.style.backgroundColor = "#ffffff";
        });
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);
        secPostres.appendChild(div);
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
        secPostres.appendChild(dialog);
        div.addEventListener("click",()=>{
            dialog.showModal();
            dialog.querySelector("h2").focus();
        });
        dButton.addEventListener("click",()=>{dialog.close()});
    });
    const verMas = document.createElement("button");
    verMas.innerHTML = "Ver Más";
    verMas.setAttribute("class","verMas");
    verMas.addEventListener("click", ()=>{window.open("productos#galletas.html","_self")})
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

