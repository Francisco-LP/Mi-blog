function buscarComandos() {
  let input = document.getElementById("searchComandos").value.toLowerCase();
  let items = document.querySelectorAll(".comandos-list li");

  items.forEach(item => {
    let texto = item.textContent.toLowerCase();
    item.style.display = texto.includes(input) ? "" : "none";
  });
}