// função usada para redirecionar página à alteração de produtos
// ao clicar no botã o"aklterar" na "painel produto"
function RedirecionarAlterarProduto(botaoAlterarProduto) {
	window.location.href = "alterar-produto.jsp?uuid-produto="
						  + botaoAlterarProduto.dataset.uuidProduto
						  + "&idioma="
						  + localStorage.getItem('language'); 
}