// botões do menu
const lojas = document.getElementById("lojas"); // painel foco 1
const scanner = document.getElementById("scanner"); // painel foco 2
const configuracoes = document.getElementById("configuracoes"); // painel foco 3

// identificador de qual botão do menu está ativo
var opcaoAtiva;

// painéis
const painelLoja = document.getElementById("painelLoja");
const painelScanner = document.getElementById("painelScanner");
const painelInfo = document.getElementById("painelInfo");

// exibição do painel foco ao carregar/recarregar a página

// painel loja
if (sessionStorage.getItem("painel_foco") == "4") { 
	painelLoja.style.display = "block";
	botaoAtualizarLojaProdutos.click();
	ativarOpcaoMenu(lojas);
}

// painel scanner
else if (sessionStorage.getItem("painel_foco") == "5") { 
	painelScanner.style.display = "block";
	ativarOpcaoMenu(scanner); 
}

// painel info
else { 
	painelInfo.style.display = "block";
	ativarOpcaoMenu(configuracoes); 
}

// função de ativação da opção do menu
function ativarOpcaoMenu(opcaoClicada) {
	opcaoAtiva = document.querySelectorAll(".active");
	opcaoAtiva[0].classList.remove("active");
	opcaoClicada.classList.add("active");
}

// ativação painel loja
lojas.addEventListener("click", () => { 
	
	// busca dos dados dos produtos
	botaoAtualizarLojaProdutos.click();
	
	// ocultar painel ativo
	painelScanner.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelLoja.style.display = "block";
	ativarOpcaoMenu(lojas); 
	
	// session
	sessionStorage.setItem("painel_foco", "4");
});

// ativação painel scanner
scanner.addEventListener("click", () => { 
	
	// ocultar painel ativo
	painelLoja.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelScanner.style.display = "block";
	ativarOpcaoMenu(scanner); 
	
	// session
	sessionStorage.setItem("painel_foco", "5");
});

// ativação painel configurações
configuracoes.addEventListener("click", () => { 
	
	// ocultar painel ativo
	painelLoja.style.display = "none";
	painelScanner.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelInfo.style.display = "block";
	ativarOpcaoMenu(configuracoes); 
	
	// session
	sessionStorage.setItem("painel_foco", "6");
});