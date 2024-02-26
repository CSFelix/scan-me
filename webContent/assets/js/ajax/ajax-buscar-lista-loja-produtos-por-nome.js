// elementos
const botaoBuscarProdutoFiltroNomeLoja = document.getElementById("botaoBuscarProdutoFiltroNomeLoja");

//################################################################
//################################################################
//################################################################

//trigger de clique no botão de pesquisa para filtro de produtos por nome
botaoBuscarProdutoFiltroNomeLoja.addEventListener("click", function() {
	
	// consulta é efetuada somente quando campo de nome está preenchido
	if (inputProdutoFiltroNomeLoja.value != "") {
		
		// paginação atual é resatada a fim da nova busca por nome
		// buscar os produtos iniciando no índice 1
		pagina_atual_loja = 1;
		
		// Params
		params = "nomeProdutoPesquisa=" + inputProdutoFiltroNomeLoja.value
			   + "&paginaAtual=" + 1
			   + "&idioma=" + localStorage.getItem('language');
		
		// AJAX
		req = new XMLHttpRequest();
		req.open("POST", "java/processamento-java/processamento-buscar-lista-produtos-loja-por-nome.jsp", true);
		
		req.onreadystatechange = function() {
			
			// (3) Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) { }
			
			// Busca Efetuada com Sucesso
			else { 
				
				// Transformação dos Dados da Tabela (tradução dos conteúdos de acordo com o idioma selecionado)
				listaProdutosLoja.innerHTML = this.responseText;

				// Busca da Quantidade de Páginas que pode ser exibida no painel
				BuscarQntPaginasLoja();
			}
		};
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(params);
	}
});