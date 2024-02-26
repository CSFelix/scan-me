// elementos
const tabelaProdutos = document.getElementById("tabelaProdutos");

const botaoAtualizarTabelaProdutos = document.getElementById("botaoAtualizarTabelaProdutos");
const botaoPaginaAnterior = document.getElementById("botaoPaginaAnterior");
const botaoPaginaPosterior = document.getElementById("botaoPaginaPosterior");
const identificadorPaginaProduto = document.getElementById("identificadorPaginaProduto");

const inputNomeProdutoPesquisaFiltro = document.getElementById("inputNomeProdutoPesquisa");

const textoPaginaAtual = document.getElementById("textoPaginaAtual");
const textoPaginaFinal = document.getElementById("textoPaginaFinal");

// controladores da paginação
const pagina_inicial = 1;
var pagina_final;
var pagina_atual = 1;

// ################################################################
// ################################################################
// ################################################################

// trigger clique nos botões de página anterior e posterior
botaoPaginaAnterior.addEventListener("click", () => {
	
	// Página Atual somente é alterada caso for maior
	// do que o índex da Primeira Página (1)
	if (pagina_atual > pagina_inicial) {
		
		// Incrementação da Página Atual
		pagina_atual -= 1;
		identificadorPaginaProduto.innerText = pagina_atual;
		textoPaginaAtual.innerText = pagina_atual;
		
		// Busca dos Produtos
		BuscarListaTabelaProdutos();
	}
});

botaoPaginaPosterior.addEventListener("click", () => {
	
	// Página Atual somente é alterada caso for menor
	// do que o índex da Última Página 
	// floor(qnt_produtos / qnt_produtos_pagina) + 1
	if (pagina_atual < pagina_final) {
		
		// Incrementação da Página Atual
		pagina_atual += 1;
		identificadorPaginaProduto.innerText = pagina_atual;
		textoPaginaAtual.innerText = pagina_atual;
		
		// Busca dos Produtos
		BuscarListaTabelaProdutos();
	}
});

// trigger clique no botão atualizador da tabela de produtos
botaoAtualizarTabelaProdutos.addEventListener("click", () => { 
	
	// reset do campo de filtro
	inputNomeProdutoPesquisaFiltro.value = "";
	
	// paginação atual é resatada a fim da atualização da página web
	// buscar os produtos iniciando no índice 1
	pagina_atual = 1;
	BuscarListaTabelaProdutos(); 
});

// ################################################################
// ################################################################
// ################################################################

//Busca dos Produtos
function BuscarListaTabelaProdutos() {
	
	// Params
	params = inputNomeProdutoPesquisaFiltro.value == "" ? 
			("paginaAtual=" + pagina_atual) 
			: ("paginaAtual=" + pagina_atual + "&nomeProdutoPesquisa=" + inputNomeProdutoPesquisaFiltro.value);
	
	// AJAX
	req = new XMLHttpRequest();
	
	// caso input de nome do produto não estiver preenchido ao clicar nos ícones de paginação, é feito busca sem filtro por nome
	if (inputNomeProdutoPesquisaFiltro.value == "") { req.open("POST", "java/processamento-java/processamento-buscar-lista-tabela-produtos.jsp", true); }
	
	// caso contrário, produtos são buscados aplicando filtro por nome
	else { req.open("POST", "java/processamento-java/processamento-buscar-lista-tabela-produtos-por-nome.jsp", true); }
	
	
	
	req.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Transformação dos Dados da Tabela (tradução dos conteúdos de acordo com o idioma selecionado)
			tabelaProdutos.innerHTML = this.responseText
														// títulos tabela
														.replace("{{ trEditarAtiva }}",  vuePainelProdutos.trEditarAtiva)
														.replace("{{ trNomeAtiva }}",    vuePainelProdutos.trNomeAtiva)
														.replace("{{ trEstoqueAtiva }}", vuePainelProdutos.trEstoqueAtiva)
														.replace("{{ trPrecoAtiva }}",   vuePainelProdutos.trPrecoAtiva)
														.replace("{{ trStatusAtiva }}",  vuePainelProdutos.trStatusAtiva)
														.replace("{{ trTipoAtiva }}",    vuePainelProdutos.trTipoAtiva)
														
														// botão alterar e status
														.replaceAll("{{ botaoAlterarAtiva }}",   vuePainelProdutos.botaoAlterarAtiva)
														.replaceAll("{{ statusPendenteAtiva }}", vuePainelProdutos.statusPendenteAtiva)
														.replaceAll("{{ statusVendaAtiva }}",    vuePainelProdutos.statusVendaAtiva)
														.replaceAll("{{ statusVendidoAtiva }}",  vuePainelProdutos.statusVendidoAtiva)
														
														// tipos produtos
														.replaceAll("{{ tipoDocesAtiva }}",            vuePainelProdutos.tipoDocesAtiva)
														.replaceAll("{{ tipoSalgadosAtiva }}",         vuePainelProdutos.tipoSalgadosAtiva)
														.replaceAll("{{ tipoOutrosAlimentosAtiva }}",  vuePainelProdutos.tipoOutrosAlimentosAtiva)
														.replaceAll("{{ tipoCelularesAtiva }}",        vuePainelProdutos.tipoCelularesAtiva)
														.replaceAll("{{ tipoInformaticaAtiva }}",      vuePainelProdutos.tipoInformaticaAtiva)
														
														.replaceAll("{{ tipoGamesAtiva }}",       vuePainelProdutos.tipoGamesAtiva)
														.replaceAll("{{ tipoLivrosAtiva }}",      vuePainelProdutos.tipoLivrosAtiva)
														.replaceAll("{{ tipoMangasAtiva }}",      vuePainelProdutos.tipoMangasAtiva)
														.replaceAll("{{ tipoBrinquedosAtiva }}",  vuePainelProdutos.tipoBrinquedosAtiva)
														.replaceAll("{{ tipoDecoracaoAtiva }}",   vuePainelProdutos.tipoDecoracaoAtiva)
														
														.replaceAll("{{ tipoRoupasAtiva }}",            vuePainelProdutos.tipoRoupasAtiva)
														.replaceAll("{{ tipoPerfumariaAtiva }}",        vuePainelProdutos.tipoPerfumariaAtiva)
														.replaceAll("{{ tipoEletrodomesticosAtiva }}",  vuePainelProdutos.tipoEletrodomesticosAtiva)
														.replaceAll("{{ tipoMoveisAtiva }}",            vuePainelProdutos.tipoMoveisAtiva)
														.replaceAll("{{ tipoEmpresariaisAtiva }}",      vuePainelProdutos.tipoEmpresariaisAtiva)
														
														.replaceAll("{{ tipoCarrosAtiva }}",        vuePainelProdutos.tipoCarrosAtiva)
														.replaceAll("{{ tipoMotosAtiva }}",         vuePainelProdutos.tipoMotosAtiva)
														.replaceAll("{{ tipoCaminhoesAtiva }}",     vuePainelProdutos.tipoCaminhoesAtiva)
														.replaceAll("{{ tipoCaminhonetesAtiva }}",  vuePainelProdutos.tipoCaminhonetesAtiva)
														.replaceAll("{{ tipoOutrosAtiva }}",        vuePainelProdutos.tipoOutrosAtiva);
		
			// Busca da Quantidade de Páginas que pode
			// ser exibida no painel
			BuscarQntPaginas();
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send(params);
}

// Busca da Quantidade Total de Páginas
function BuscarQntPaginas() {
	
	// Params
	params =  inputNomeProdutoPesquisaFiltro.value == "" ?
			  ""
			  : "nomeProdutoPesquisa=" + inputNomeProdutoPesquisa.value;
	
	// AJAX
	req = new XMLHttpRequest();
	
	// caso input de nome do produto não estiver preenchido ao clicar nos ícones de paginação, é feito busca sem filtro por nome
	if (inputNomeProdutoPesquisaFiltro.value == "") { req.open("POST", "java/processamento-java/processamento-buscar-quantidade-paginas-produto.jsp", true); }
	
	// caso contrário, produtos são buscados aplicando filtro por nome
	else { req.open("POST", "java/processamento-java/processamento-buscar-quantidade-paginas-produtos-por-nome.jsp", true); }
	
	
	req.onreadystatechange = function() { 
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Definição da Quantidade de Páginas
			pagina_final = parseInt(this.responseText);
			
			// Exibição do Índex da Página Atual e Final
			identificadorPaginaProduto.innerText = pagina_atual;
			textoPaginaAtual.innerText = pagina_atual;
			textoPaginaFinal.innerText = pagina_final;
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send(params);
}

// Abertura do modal de QR Codes na tabela de produtos
function aberturaModalQRCode(botaoQRCode) {
	/*
	 * Ao clicar em qualquer botãod e QR Code, modal deste é aberto
	 * contendo nome do produto, qr code e opção de estar salvando-o no computador
	 * */
	
	// Capturando nome do produto
	var nomeProduto = document.getElementById("nomeProdutoQRCode");
	nomeProduto.innerText = "📦 " + botaoQRCode.dataset.nomeProduto + " 📦";
	
	// Geração do QR Code
	gerarQRCodePainelProduto(botaoQRCode);
	
	// exibir modal
	var modalQRCodePainelTabelaProduto = document.getElementById("modalQRCodePainelTabelaProduto");
	modalQRCodePainelTabelaProduto.style.display = "block";
}