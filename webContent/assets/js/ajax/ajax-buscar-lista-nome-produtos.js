const botaoAtualizarListaProdutos = document.getElementById("atualizarListaProdutos");
const listaNomeProdutos = document.getElementById("produtoSelecionadoPainelRelatorio");

// trigger de clique no botão
botaoAtualizarListaProdutos.addEventListener("click", () => { BuscarListaNomeProdutos(); });

// função de busca dos dados
function BuscarListaNomeProdutos() {
	
	// AJAX
	req = new XMLHttpRequest();
	req.open("POST", "java/processamento-java/processamento-buscar-lista-nome-produtos.jsp", true);
	
	req.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { listaNomeProdutos.innerHTML = this.responseText; }
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send();
}