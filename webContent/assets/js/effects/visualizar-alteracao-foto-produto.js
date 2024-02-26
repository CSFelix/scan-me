/*
	* realiza visualização da foto de perfil durante a alteração do cadastro do usuário
	* Assintótica: O(1)
* */
function readURL(input, labelId, botaoId) {
	if (input.files && input.files[0]) {
		var produtoVisualizacao = document.getElementById(labelId);
		var botaoProdutoVisualizacao = document.querySelector("#" + botaoId + " i");
		var reader = new FileReader();
		
		reader.onload = function(e) { 
			produtoVisualizacao.style.backgroundImage = "url(" + e.target.result + ")";
			
			try {  
				botaoProdutoVisualizacao.classList.remove('fa-plus');
				botaoProdutoVisualizacao.classList.add('fa-trash-alt');
			}
			catch (e) { }
		}
		reader.readAsDataURL(input.files[0]); // converte imagem para base 64
	}
}

// selecionando inputs de fotos
const selecionarFotoProduto1 = document.getElementById("fotoProduto1");
const selecionarFotoProduto2 = document.getElementById("fotoProduto2");
const selecionarFotoProduto3 = document.getElementById("fotoProduto3");
const selecionarFotoProduto4 = document.getElementById("fotoProduto4");
const selecionarFotoProduto5 = document.getElementById("fotoProduto5");
const selecionarFotoProduto6 = document.getElementById("fotoProduto6");

// configurando alteração e exibição da foto
selecionarFotoProduto1.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao1", "botaoFotoProduto1"); });
selecionarFotoProduto2.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao2", "botaoFotoProduto2"); });
selecionarFotoProduto3.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao3", "botaoFotoProduto3"); });
selecionarFotoProduto4.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao4", "botaoFotoProduto4"); });
selecionarFotoProduto5.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao5", "botaoFotoProduto5"); });
selecionarFotoProduto6.addEventListener("change", function() { readURL(this, "fotoProdutoVisualizacao6", "botaoFotoProduto6"); });

/*********************************************************************************************************************************/

/*
 * realiza a inclusão/exclusão das fotos de perfis ao clicar no botão de cada uma delas
 * 
 */

function cliqueBotaoFotoProduto(botaoId, labelId) {
	const produtoVisualizacao = document.getElementById(labelId);
	
	// adicionar nova foto
	if (botaoId.classList.contains("fa-plus")) {
		produtoVisualizacao.click();
		
		botaoId.classList.remove("fa-plus");
		botaoId.classList.add("fa-trash-alt");
	}
	
	// excluir foto
	else {
		produtoVisualizacao.style.backgroundImage = "";
		
		botaoId.classList.remove("fa-trash-alt");
		botaoId.classList.add("fa-plus");
	}
}

// selecionando botões
const botaoProdutoVisualizacao1 = document.querySelector("#botaoFotoProduto1 i");
const botaoProdutoVisualizacao2 = document.querySelector("#botaoFotoProduto2 i");
const botaoProdutoVisualizacao3 = document.querySelector("#botaoFotoProduto3 i");
const botaoProdutoVisualizacao4 = document.querySelector("#botaoFotoProduto4 i");
const botaoProdutoVisualizacao5 = document.querySelector("#botaoFotoProduto5 i");
const botaoProdutoVisualizacao6 = document.querySelector("#botaoFotoProduto6 i");

// configurando clique nos botões
botaoProdutoVisualizacao1.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao1"); });
botaoProdutoVisualizacao2.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao2"); });
botaoProdutoVisualizacao3.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao3"); });
botaoProdutoVisualizacao4.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao4"); });
botaoProdutoVisualizacao5.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao5"); });
botaoProdutoVisualizacao6.addEventListener("click", function() { cliqueBotaoFotoProduto(this, "fotoProdutoVisualizacao6"); });