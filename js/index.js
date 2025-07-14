
document.addEventListener("DOMContentLoaded", () => {
  const contenido = document.getElementById("contenido");
  const hamburger = document.getElementById("hamburger");
  const closeMenu = document.getElementById("close-menu");
  const sideMenu = document.getElementById("side-menu");

  // Toggle menú lateral con botón hamburguesa
  hamburger.addEventListener("click", () => {
    sideMenu.classList.toggle("show");
  });

  // Cerrar menú con botón de cierre (X)
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("show");
    });
  }

  // Manejar clics en enlaces del menú lateral
  document.querySelectorAll("#side-menu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      sideMenu.classList.remove("show");

      const seccion = link.dataset.seccion;
      if (seccion) {
        fetch(`proyectos/${seccion}/index.html`)
          .then(res => res.ok ? res.text() : Promise.reject("Error"))
          .then(html => {
            contenido.innerHTML = html;
            window.scrollTo(0, 0);
          })
          .catch(() => {
            contenido.innerHTML = "<p>Error al cargar la sección.</p>";
          });
      }
    });
  });

  // Carga inicial
  fetch("proyectos/inicio/index.html")
    .then(res => res.ok ? res.text() : Promise.reject("Error"))
    .then(html => {
      contenido.innerHTML = html;
    })
    .catch(() => {
      contenido.innerHTML = "<p>Error al cargar el contenido inicial.</p>";
    });
});
