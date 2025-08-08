import { nav } from "./nav.mjs";
import { footer } from "./footer.mjs";
import { agregarCarrito,carritoAccion,mostrarCarrito,actualizarContador } from "./carrito.mjs";
nav();
footer();
mostrarCarrito();
carritoAccion();

const info = new URLSearchParams(window.location.search);

document.querySelector("#thankyou").innerHTML = `💕GRACIAS, ${info.get('nombre').toUpperCase()}!💕`;
console.log(info.get('fname'));
document.querySelector("#info").innerHTML = `Para confirmar, tu telefono es +${info.get("telefono")}' y tu correo es '${info.get("email")}'`;

const name = info.get("nombre").toUpperCase();
localStorage.setItem("nombre",name);
