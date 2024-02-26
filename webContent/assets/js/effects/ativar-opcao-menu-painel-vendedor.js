// botões do menu
const dashboard = document.getElementById("dashboard"); // painel foco 1
const produtos = document.getElementById("produtos"); // painel foco 2
const relatorios = document.getElementById("relatorios"); // painel foco 3
const lojas = document.getElementById("lojas"); // painel foco 4
const scanner = document.getElementById("scanner"); // painel foco 5
const configuracoes = document.getElementById("configuracoes"); // painel foco 6

// identificador de qual botão do menu está ativo
var opcaoAtiva;

// painéis
const painelDashboard = document.getElementById("painelDashboard");
const painelProdutos = document.getElementById("painelProdutos");
const painelRelatorios = document.getElementById("painelRelatorios");
const painelLoja = document.getElementById("painelLoja");
const painelScanner = document.getElementById("painelScanner");
const painelInfo = document.getElementById("painelInfo");

// exibição do painel foco ao carregar/recarregar a página

// painel dashboard
if (sessionStorage.getItem("painel_foco") == "1") { 
	painelDashboard.style.display = "block";
	botaoAtualizarDashboard.click();
	ativarOpcaoMenu(dashboard);
}

// painel produtos
else if (sessionStorage.getItem("painel_foco") == "2") { 
	painelProdutos.style.display = "block";
	botaoAtualizarTabelaProdutos.click();
	ativarOpcaoMenu(produtos); 
}

// painel relatórios
else if (sessionStorage.getItem("painel_foco") == "3") { 
	painelRelatorios.style.display = "block";
	botaoAtualizarListaProdutos.click();
	ativarOpcaoMenu(relatorios); 
}

// painel loja
else if (sessionStorage.getItem("painel_foco") == "4") { 
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

// ativação painel dashboard
dashboard.addEventListener("click", () => {
	
	// clique no botão para sistema ir buscando os dados dos produtos
	botaoAtualizarDashboard.click();
	
	// ocultar painel ativo
	painelProdutos.style.display = "none";
	painelRelatorios.style.display = "none";
	painelLoja.style.display = "none";
	painelScanner.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelDashboard.style.display = "block";
	ativarOpcaoMenu(dashboard);
	
	// session
	sessionStorage.setItem("painel_foco", "1");
});

// ativação painel produtos
produtos.addEventListener("click", () => { 
	
	// clique no botão para sistema ir buscando os dados dos produtos
	botaoAtualizarTabelaProdutos.click();
	
	// ocultar painel ativo
	painelDashboard.style.display = "none";
	painelRelatorios.style.display = "none";
	painelLoja.style.display = "none";
	painelScanner.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelProdutos.style.display = "block";
	ativarOpcaoMenu(produtos); 
	
	// session
	sessionStorage.setItem("painel_foco", "2");
});

// ativação painel relatórios
relatorios.addEventListener("click", () => { 
	
	// clique no botão para sistema ir buscando os dados dos produtos
	botaoAtualizarListaProdutos.click();
	
	// ocultar painel ativo
	painelDashboard.style.display = "none";
	painelProdutos.style.display = "none";
	painelLoja.style.display = "none";
	painelScanner.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelRelatorios.style.display = "block";
	ativarOpcaoMenu(relatorios); 
	
	// session
	sessionStorage.setItem("painel_foco", "3");
});

// ativação painel loja
lojas.addEventListener("click", () => { 
	
	// busca dos dados dos produtos
	botaoAtualizarLojaProdutos.click();
	
	// ocultar painel ativo
	painelDashboard.style.display = "none";
	painelProdutos.style.display = "none";
	painelRelatorios.style.display = "none";
	painelScanner.style.display = "none";
	painelInfo.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelLoja.style.display = "block";
	ativarOpcaoMenu(lojas); 
	
	// session
	sessionStorage.setItem("painel_foco", "4");
});

//ativação painel scanner
scanner.addEventListener("click", () => { 
	
	// ocultar painel ativo
	painelDashboard.style.display = "none";
	painelProdutos.style.display = "none";
	painelRelatorios.style.display = "none";
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
	painelDashboard.style.display = "none";
	painelProdutos.style.display = "none";
	painelRelatorios.style.display = "none";
	painelLoja.style.display = "none";
	painelScanner.style.display = "none";
	
	// ativar painel e foco na opção do menu vertical
	painelInfo.style.display = "block";
	ativarOpcaoMenu(configuracoes); 
	
	// session
	sessionStorage.setItem("painel_foco", "6");
});