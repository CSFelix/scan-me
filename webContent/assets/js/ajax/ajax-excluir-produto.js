function excluirProduto(botaoExcluir) {
	
	const idioma = localStorage.getItem("language");
	
	// quando status produto == 3 (vendido)
	// nã oserá possível excluir o produto
	// pois já teve relacionamento com algum comprador
	if (botaoExcluir.dataset.statusProduto == "3") {
		
		// Alerta em Português - Brasil
		if (idioma == "1") { alert("Não é possível excluir produto que já se encontra vendido."); }
		
		// Alerta em Inglês - USA
		else { alert("Can\'t delete a sold product."); }
	}
	
	// caso contrário, é encaminhada mensagem de confirmação
	// se usuário deseja mesmo cancelar o produto
	else {
		
		/* Mensagem de confirmação da exclusão */
		var confirmacaoExclusao;
		
		// Mensagem de Confirmação em Português - Brasil
		if (idioma == "1") { confirmacaoExclusao = confirm("Deseja mesmo excluir o produto?"); }
		
		// Mensagem de Confirmação em Inglês - USA
		else { confirmacaoExclusao = confirm("Would you like to delete the product?"); }
		
		/* Processamento da resposta da mensagem */
		
		// usuário deseja excluir
		if (confirmacaoExclusao) {
			// AJAX
			var req = new XMLHttpRequest();
			
			var params = "uuidProduto=" + botaoExcluir.dataset.uuidProduto;
			
			req.open("POST", "java/processamento-java/processamento-excluir-produto.jsp", true);
			req.onreadystatechange = function() {
				
				// Servidor Fora do Ar
				if (req.readyState != 4 || req.status != 200) { }
				
				// Produto excluído com sucesso
				// Recarregamento da página sem o produto listado
				else { 
					
					// Alerta em Português - Brasil
					if (idioma == "1") { alert("Produto excluído com sucesso."); }
					
					// Alerta em Inglês - USA
					else { alert("The product was successfully deleted."); }
					
					// Recarregamento da página para atualizar tabela e relatórios sem o produto deletado
					window.location.href = "painel.jsp"; 
				}
			}
			
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(params);
		}
	}
}