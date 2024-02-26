const botaoDeslogar = document.getElementById("opcaoDeslogar");

botaoDeslogar.addEventListener("click", () => {
	
	// AJAX
	var req = new XMLHttpRequest();
	req.open("POST", "java/processamento-java/processamento-deslogar.jsp", true);
	req.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) { }
		
		// Usuário deslogado com sucesso
		else { 
			// destruição das sessions
			sessionStorage.removeItem("usuario_nickname");
			sessionStorage.removeItem("usuario_email");
			sessionStorage.removeItem("usuario_whatsapp");
			sessionStorage.removeItem("usuario_telegram");
			sessionStorage.removeItem("usuario_uuid");
			
			window.location.href = "index.jsp"; 
		}
	}
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send();
});