var modal = document.getElementById("modalEsqueceuSenha");
var span = document.getElementsByClassName("close")[0];

span.addEventListener("click", () => { modal.style.display = "none"; });

window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }