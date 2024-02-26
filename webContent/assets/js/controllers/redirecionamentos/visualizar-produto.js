// função usada para redirecionar página à visualização de produtos
// ao clicar no cartão do produto no "painel mercado online"
function RedirecionarVisualizarProduto(cartaoProduto) {
	window.location.href = "visualizar-produto.jsp?uuid-produto="
						  + cartaoProduto.dataset.uuidProduto
						  + "&idioma="
						  + localStorage.getItem('language'); 
}