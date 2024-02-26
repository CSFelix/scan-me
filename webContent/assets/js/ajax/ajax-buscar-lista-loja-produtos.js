// elementos
const listaProdutosLoja = document.getElementById("listaProdutosLoja");

const botaoAtualizarLojaProdutos = document.getElementById("botaoAtualizarLojaProdutos");
const botaoPaginaAnteriorLoja = document.getElementById("botaoPaginaAnteriorLoja");
const botaoPaginaPosteriorLoja = document.getElementById("botaoPaginaPosteriorLoja");

const inputProdutoFiltroNomeLoja = document.getElementById("inputProdutoFiltroNomeLoja");

const identificadorPaginaProdutoLoja = document.getElementById("identificadorPaginaProdutoLoja");
const textoPaginaAtualLoja = document.getElementById("textoPaginaAtualLoja");
const textoPaginaFinalLoja = document.getElementById("textoPaginaFinalLoja");

// controladores da paginação
const pagina_inicial_loja = 1;
var pagina_final_loja;
var pagina_atual_loja = 1;

//################################################################
//################################################################
//################################################################

// trigger clique nos botões de página anterior e posterior
botaoPaginaAnteriorLoja.addEventListener("click", () => {
	
	// Página Atual somente é alterada caso for maior
	// do que o índex da Primeira Página (1)
	if (pagina_atual_loja > pagina_inicial_loja) {
		
		// Incrementação da Página Atual
		pagina_atual_loja -= 1;
		identificadorPaginaProdutoLoja.innerText = pagina_atual_loja;
		textoPaginaAtualLoja.innerText = pagina_atual_loja;
		
		// Busca dos Produtos
		BuscarListaProdutosLoja();
	}
});

botaoPaginaPosteriorLoja.addEventListener("click", () => {
	
	// Página Atual somente é alterada caso for menor
	// do que o índex da Última Página 
	// floor(qnt_produtos / qnt_produtos_pagina) + 1
	if (pagina_atual_loja < pagina_final_loja) {
		
		// Incrementação da Página Atual
		pagina_atual_loja += 1;
		identificadorPaginaProdutoLoja.innerText = pagina_atual_loja;
		textoPaginaAtualLoja.innerText = pagina_atual_loja;
		
		// Busca dos Produtos
		BuscarListaProdutosLoja();
	}
});

// trigger clique no botão para recarregar lista de produtos
botaoAtualizarLojaProdutos.addEventListener("click", () => {

	// reset do input de filtro
	inputProdutoFiltroNomeLoja.value = "";
	
	// paginação atual é resatada a fim da atualização da página web
	// buscar os produtos iniciando no índice 1
	pagina_atual_loja = 1;
	BuscarListaProdutosLoja();
});

//################################################################
//################################################################
//################################################################

// Busca dos Produtos
function BuscarListaProdutosLoja() {
	
	// Params
	params = inputProdutoFiltroNomeLoja.value == "" ? 
			("paginaAtual=" + pagina_atual_loja + "&idioma=" + localStorage.getItem('language')) 
			: ("paginaAtual=" + pagina_atual_loja + "&nomeProdutoPesquisa=" + inputProdutoFiltroNomeLoja.value + "&idioma=" + localStorage.getItem('language'));
	
	// AJAX
	req = new XMLHttpRequest();
	
	// caso input de nome do produto não estiver preenchido ao clicar nos ícones de paginação, é feito busca sem filtro por nome
	if (inputProdutoFiltroNomeLoja.value == "") { req.open("POST", "java/processamento-java/processamento-buscar-lista-produtos-loja.jsp", true); }
	
	// caso contrário, produtos são buscados aplicando filtro por nome
	else { req.open("POST", "java/processamento-java/processamento-buscar-lista-produtos-loja-por-nome.jsp", true); }
	
	
	
	req.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Transformação dos Dados
			listaProdutosLoja.innerHTML = this.responseText;
		
			// Busca da Quantidade de Páginas que pode
			// ser exibida no painel
			BuscarQntPaginasLoja();
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send(params);
}

//################################################################
//################################################################
//################################################################

//Busca da Quantidade Total de Páginas
function BuscarQntPaginasLoja() {
	
	// Params
	params =  inputProdutoFiltroNomeLoja.value == "" ?
			  ""
			  : "nomeProdutoPesquisa=" + inputProdutoFiltroNomeLoja.value;
	
	// AJAX
	req = new XMLHttpRequest();
	
	// caso input de nome do produto não estiver preenchido ao clicar nos ícones de paginação, é feito busca sem filtro por nome
	if (inputProdutoFiltroNomeLoja.value == "") { req.open("POST", "java/processamento-java/processamento-buscar-quantidade-paginas-produto-loja.jsp", true); }
	
	// caso contrário, produtos são buscados aplicando filtro por nome
	else { req.open("POST", "java/processamento-java/processamento-buscar-quantidade-paginas-produtos-loja-por-nome.jsp", true); }
	
	
	req.onreadystatechange = function() { 
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Definição da Quantidade de Páginas
			pagina_final_loja = parseInt(this.responseText);
			
			// Exibição do Índex da Página Atual e Final
			identificadorPaginaProdutoLoja.innerText = pagina_atual_loja;
			textoPaginaAtualLoja.innerText = pagina_atual_loja;
			textoPaginaFinalLoja.innerText = pagina_final_loja;
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send(params);
}