const menu = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");
const btnTodos = document.querySelector(".todos");
const btnEnsaladas = document.querySelector(".ensaladas");
const btnPasta = document.querySelector(".pasta");
const btnPizza = document.querySelector(".pizza");
const btnPostres = document.querySelector(".postres");
const contenedorPlatos = document.querySelector(".platos");

document.addEventListener("DOMContentLoaded", () => {
  eventos();
  platos();
});

const eventos = () => {
  menu.addEventListener("click", () => {
    navegacion.classList.toggle("ocultar");
    if (!navegacion.classList.contains("ocultar")) {
      // Si se muestra la navegación, agregamos el botón de cierre
      mostrarBotonCerrar();
    } else {
      // Si se oculta la navegación, removemos el botón de cierre
      removerBotonCerrar();
    }
  });

  // Agregamos un event listener para cada enlace de la navegación
  document.querySelectorAll(".navegacion a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      navegacion.classList.add("ocultar");
      removerBotonCerrar();
    });
  });
};

const mostrarBotonCerrar = () => {
  if (document.querySelector(".btn-cerrar")) return;

  const btnCerrar = document.createElement("p");
  const overlay = document.createElement("div");

  // Verifica si el menú está cerrado antes de agregar la clase
  if (navegacion.classList.contains("ocultar")) {
    overlay.classList.add("pantalla-completa");
    const body = document.querySelector("body");
    if (document.querySelectorAll(".pantalla-completa").length > 0) return;
    body.appendChild(overlay);
  }

  btnCerrar.textContent = "x";
  btnCerrar.classList.add("btn-cerrar");
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
};

const removerBotonCerrar = () => {
  const btnCerrar = document.querySelector(".btn-cerrar");
  const overlay = document.querySelector(".pantalla-completa");
  if (btnCerrar) {
    btnCerrar.remove();
  }
  if (overlay) {
    overlay.remove();
  }
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

imagenes.forEach((imagen) => {
  observer.observe(imagen);
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

const platos = () => {
  let platosArreglo = [];
  const platos = document.querySelectorAll(".plato");

  platos.forEach((plato) => (platosArreglo = [...platosArreglo, plato]));

  const ensaladas = platosArreglo.filter(
    (ensalada) => ensalada.getAttribute("data-plato") === "ensalada"
  );

  const pastas = platosArreglo.filter(
    (pasta) => pasta.getAttribute("data-plato") === "pasta"
  );

  const pizzas = platosArreglo.filter(
    (pizza) => pizza.getAttribute("data-plato") === "pizza"
  );

  const postres = platosArreglo.filter(
    (postre) => postre.getAttribute("data-plato") === "postre"
  );

  mostrarPlatos(ensaladas, pastas, pizzas, postres, platosArreglo);
};

const mostrarPlatos = (ensaladas, pastas, pizzas, postres, todos) => {
  const botonesCategorias = document.querySelectorAll(".botones-platos .btn");

  botonesCategorias.forEach((btnCategoria) => {
    btnCategoria.addEventListener("click", () => {
      botonesCategorias.forEach((btn) => {
        btn.classList.remove("active");
      });

      btnCategoria.classList.add("active");

      limpiarHtml(contenedorPlatos);

      switch (btnCategoria.getAttribute("data-categoria")) {
        case "ensaladas":
          ensaladas.forEach((ensalada) =>
            contenedorPlatos.appendChild(ensalada)
          );
          break;
        case "pasta":
          pastas.forEach((pasta) => contenedorPlatos.appendChild(pasta));
          break;
        case "pizza":
          pizzas.forEach((pizza) => contenedorPlatos.appendChild(pizza));
          break;
        case "postres":
          postres.forEach((postre) => contenedorPlatos.appendChild(postre));
          break;
        default:
          todos.forEach((todo) => contenedorPlatos.appendChild(todo));
          break;
      }

      navegacion.classList.add("ocultar");
      removerBotonCerrar();
    });
  });
};

const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};
