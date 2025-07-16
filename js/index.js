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
      const seccion = link.dataset.seccion;
      const href = link.getAttribute("href");

      // Siempre cerrar el menú al hacer clic
      sideMenu.classList.remove("show");

      if (seccion) {
        // Si el enlace tiene data-seccion → cargar contenido dinámico
        e.preventDefault();
        fetch(`proyectos/${seccion}/index.html`)
          .then(res => res.ok ? res.text() : Promise.reject("Error"))
          .then(html => {
            contenido.innerHTML = html;
            window.scrollTo(0, 0);
          })
          .catch(() => {
            contenido.innerHTML = "<p>Error al cargar la sección.</p>";
          });
      } else if (href.startsWith("#")) {
        // Si el enlace tiene un ancla (#) → scroll suave
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Carga inicial del contenido
  fetch("proyectos/inicio/index.html")
    .then(res => res.ok ? res.text() : Promise.reject("Error"))
    .then(html => {
      contenido.innerHTML = html;
    })
    .catch(() => {
      contenido.innerHTML = "<p>Error al cargar el contenido inicial.</p>";
    });
});
