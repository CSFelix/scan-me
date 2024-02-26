/* modals */
var modalVisualizarProduto = document.getElementById("modalVisualizarProduto");
var modalQRCodeVisualizarProduto = document.getElementById("modalQRCodeVisualizarProduto");

/* Close Span */
var spanModalVisualizarProduto = document.getElementsByClassName("close")[0];
var spanQRCodeVisualizarProduto = document.getElementsByClassName("close")[1];

/* Botões e Triggers */
var foto_selecionada = document.getElementById("fotoProdutoSelecionada");
var botaoQRCodeVisualizarProduto = document.getElementById("botaoQRCodeVisualizarProduto");

/* abrir modal ao clicar em alguma imagem.
 * ao clicar, sistema captura imagem e anexa no modal também */
function AbrirModalVisualizarProduto(imagem) {
	
	// captura da imagem
	foto_selecionada.src = imagem.src;
	
	// exibição do modal
	modalVisualizarProduto.style.display = "block";
}

/* abertura do modal para visualizar QR Code */
function AbrirModalVisualizarProdutoQRCode(botaoQRCode) {
	botaoQRCodeVisualizarProduto.addEventListener("click", () => { modalQRCodeVisualizarProduto.style.display = "block"; });
	gerarQRCodePainelProduto(botaoQRCode);
}

/* fechar modal ao clicar no 'x' */
spanModalVisualizarProduto.addEventListener("click", () => { modalVisualizarProduto.style.display = "none"; });
spanQRCodeVisualizarProduto.addEventListener("click", () => { modalQRCodeVisualizarProduto.style.display = "none"; });

/* fechar modal ao clicar em qualquer parte fora dele */
window.onclick = function(event) { 
	if (event.target == modalVisualizarProduto) { modalVisualizarProduto.style.display = "none"; }
	else if (event.target == modalQRCodeVisualizarProduto) { modalQRCodeVisualizarProduto.style.display = "none"; }
}