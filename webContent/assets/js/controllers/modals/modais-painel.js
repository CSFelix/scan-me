/* Modals */
var modalAlteracaoDadosUsuarioPainelInfo = document.getElementById("modalAlteracaoDadosUsuarioPainelInfo");
var modalQRCodePainelTabelaProduto = document.getElementById("modalQRCodePainelTabelaProduto");

/* Botões */
var botaoModalAlteracaoDadosUsuarioPainelInfo = document.getElementById("botaoModalAlteracaoDadosUsuarioPainelInfo");

// botaoModalQRCodePainelTabelaProduto encontra-se definido em: assets/js/ajax/ajax-buscar-tabela-produtos.js
// dentro do código ajax após os dados serem coletados do banco de dados

/* Close Span */
var spanModalAlteracaoDadosUsuarioPainelInfo = document.getElementById("closeModalAlteracaoDadosUsuarioPainelInfo");
var spanModalQRCodePainelTabelaProduto = document.getElementById("closeModalQRCodePainelTabelaProduto");

/* Abertura modal ao clicar no botão */
botaoModalAlteracaoDadosUsuarioPainelInfo.addEventListener("click", () => { modalAlteracaoDadosUsuarioPainelInfo.style.display = "block"; });

// abertura do modal QRCodePainelTabelaProduto encontra-se definido em: assets/js/ajax/ajax-buscar-tabela-produtos.js
// dentro do código ajax após os dados serem coletados do banco de dados

/* Fechamento Modal ao clicar no Close Span */
spanModalAlteracaoDadosUsuarioPainelInfo.addEventListener("click", () => { modalAlteracaoDadosUsuarioPainelInfo.style.display = "none"; });
spanModalQRCodePainelTabelaProduto.addEventListener("click", () => { modalQRCodePainelTabelaProduto.style.display = "none"; });

/* Fechamento Modal ao clicar em qualquer parte fora dele */
window.onclick = function(event) { 
	if (event.target == modalAlteracaoDadosUsuarioPainelInfo) { modalAlteracaoDadosUsuarioPainelInfo.style.display = "none"; }
	else if (event.target == modalQRCodePainelTabelaProduto) { modalQRCodePainelTabelaProduto.style.display = "none"; }
}