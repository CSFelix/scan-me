var modal = document.getElementById("modalCadastroInicial");
var botaoModal = document.getElementById("botaoModalCadastroInicial");
var span = document.getElementsByClassName("close")[0];

botaoModal.addEventListener("click", () => { modal.style.display = "block"; });
span.addEventListener("click", () => { modal.style.display = "none"; });

window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }