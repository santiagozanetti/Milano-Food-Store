const menu = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");

document.addEventListener("DOMContentLoaded", () => {
  eventos();
});

const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  botonCerrar();
};

const botonCerrar = () => {
  const btnCerrar = document.createElement("p");
  const overlay = document.createElement("div");
  overlay.classList.add("pantalla-completa");
  const body = document.querySelector("body");
  if (document.querySelectorAll(".pantalla.completa").length > 0) return;
  body.appendChild(overlay);
  btnCerrar.textContent = "x";
  btnCerrar.classList.add("btn-cerrar");
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
};



// Asigna el valor del atributo 'data-src' al atributo 'src' de cada imagen en el array 'imagenes'
imagenes.forEach((imagen) => {
  imagen.src = imagen.dataset.src;
});

const cerrarMenu = (boton, overlay) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    overlay.remove();
    boton.remove();
  });

  overlay.onclick = function () {
    overlay.remove();
    navegacion.classList.add("ocultar");
    boton.remove();
  };
};
