const inputEmailEnviarEmail = document.getElementById("inputEmail");
const botaoEnviarEmail = document.getElementById("botaoEnviarEmail");
const toastMessageEsqueceuSenha = document.getElementById("toast");

const botaoModal = document.getElementById("botaoModalVoltarAoLogin");
var mensagemErro;

// clique no botão de enviar email
botaoEnviarEmail.addEventListener("click", () => {
	
	// input não preenchido
	if (inputEmailEnviarEmail.value == "") {
		inputEmailEnviarEmail.style.borderBottom = "4px solid red";
		
		ExibirToastMessage(1);
	}
	
	// input preenchido
	else {
		
		// AJAX
		var req = new XMLHttpRequest();
		var params;
		
		if (localStorage.getItem('language') != null) {
			params = "email=" + inputEmailEnviarEmail.value
			 		 + "&idioma=" + localStorage.getItem('language');
		}
		
		else {
			params = "email=" + inputEmailEnviarEmail.value
			 		 + "&idioma=2";
		}
		
					 
		req.open("POST", "java/processamento-java/processamento-solicitacao-alteracao-senha.jsp", true);
		
		req.onreadystatechange = function() {
			
			// Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) {  }
			
			// Email não cadastrado
			// ou solicitação efetuada com sucesso
			else {
				
				// Email não cadastrado
				if (this.responseText.includes("0")) {
					inputEmailEnviarEmail.style.borderBottom = "4px solid red";
					
					ExibirToastMessage(10);
				}
				
				// Solicitação Efetuada com Sucesso
				else {
					inputEmailEnviarEmail.style.borderBottom = "4px solid var(--style-terciary-color)";
					modal.style.display = "block";
					
					// Exibição de Notificação
					var titulo;
					var texto;
					
					// e identificação do idioma escolhido e tradução do modo ativado
			        if (localStorage.getItem('language') == '1') { 
			        	titulo = '🎉 Solicitação Aprovada!';
			        	texto = 'Sua solicitação de alteração de senha foi aprovada e em breve te encaminharemos um email com as instruções.';
			        }
			        else { 
			        	titulo = '🎉 Request Approved!';
			        	texto = 'Your password change request has been approved and we will send you an email with the instructions shortly.';
			        }
			        
					ExibirNotificacao(titulo, texto);
				}
			}
		};
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(params);
	}
});

// clique no botao de voltar ao login do modal
botaoModal.addEventListener("click", () => { window.location.href = "index.jsp"; });