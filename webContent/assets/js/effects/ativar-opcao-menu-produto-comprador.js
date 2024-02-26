// botões do menu
const lojas = document.getElementById("lojas"); // painel foco 4
const scanner = document.getElementById("scanner"); // painel foco 5
const configuracoes = document.getElementById("configuracoes"); // painel foco 6

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