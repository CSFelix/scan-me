// ativar verificação sempre que a página for recarregada a fim de evitar problemas
// caso o campo de email ou algu outro salve o que o usuário digitou,
// com isto, não haverá perigo da label estar por cima do conteúdo salvo caso a página
// seja recarregada
window.onload = () => {
	checkLabel('labelNomeProduto', document.getElementById('inputNomeProduto'));
	checkLabel('labelValorProduto', document.getElementById('inputValorProduto'));
	checkLabel('labelEstoqueProduto', document.getElementById('inputEstoqueProduto'));
	checkLabel('labelDescricaoProduto', document.getElementById('inputDescricaoProduto'));
};