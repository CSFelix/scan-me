const botaoNomeProdutoPesquisa = document.getElementById("botaoNomeProdutoPesquisa");
const inputNomeProdutoPesquisa = document.getElementById("inputNomeProdutoPesquisa");

// trigger de clique no botão de pesquisa para filtro de produtos por nome
botaoNomeProdutoPesquisa.addEventListener("click", function() {
	
	// consulta é efetuada somente quando campo de nome está preenchido
	if (inputNomeProdutoPesquisa.value != "") {
		
		// paginação atual é resatada a fim da nova busca por nome
		// buscar os produtos iniciando no índice 1
		pagina_atual = 1;
		
		// Params
		params = "nomeProdutoPesquisa=" + inputNomeProdutoPesquisa.value
			   + "&paginaAtual=" + 1;
		
		// AJAX
		req = new XMLHttpRequest();
		req.open("POST", "java/processamento-java/processamento-buscar-lista-tabela-produtos-por-nome.jsp", true);
		
		req.onreadystatechange = function() {
			
			// (3) Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) { }
			
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

				// Busca da Quantidade de Páginas que pode ser exibida no painel
				BuscarQntPaginas();
			}
		};
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(params);
	}
});