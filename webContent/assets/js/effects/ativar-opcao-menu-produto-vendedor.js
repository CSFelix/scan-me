// botões do menu
const dashboard = document.getElementById("dashboard"); // painel foco 1
const produtos = document.getElementById("produtos"); // painel foco 2
const relatorios = document.getElementById("relatorios"); // painel foco 3
const lojas = document.getElementById("lojas"); // painel foco 4
const scanner = document.getElementById("scanner"); // painel foco 5
const configuracoes = document.getElementById("configuracoes"); // painel foco 6

// ativação painel dashboard
dashboard.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "1");
	window.location.href = "painel.jsp";
});

// ativação painel produtos
produtos.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "2");
	window.location.href = "painel.jsp";
});

// ativação painel relatórios
relatorios.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "3");
	window.location.href = "painel.jsp";
});

// ativação painel loja
lojas.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "4");
	window.location.href = "painel.jsp";
});

//ativação painel scan
scanner.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "5");
	window.location.href = "painel.jsp";
});

// ativação painel configurações
configuracoes.addEventListener("click", () => { 
	sessionStorage.setItem("painel_foco", "6");
	window.location.href = "painel.jsp";
});