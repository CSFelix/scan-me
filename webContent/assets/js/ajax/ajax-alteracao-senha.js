// elementos
const botaoNovoCodigo = document.getElementById("botaoNovoCodigo");
const botaoAlterarSenha = document.getElementById("botaoAlterarSenha");
const inputNovaSenhaAlteracao = document.getElementById("inputSenha");
const inputConfirmarNovaSenhaAlteracao = document.getElementById("inputConfirmarSenha");
const inputCodigoAlteracao = document.getElementById("inputCodigo");
const toastMessageAlteracao = document.getElementById("toast");

const botaoModal = document.getElementById("botaoModalVoltarAoLogin");

const regexSenha = new RegExp("^[a-zA-Z0-9]{5,60}$");
const regexCodigo = new RegExp("^[0-9]{6,6}$");

var params_novo_codigo;
var params_alteracao;
var req_novo_codigo;
var req_alteracao;

// geração de novo código para alteracação de senha
botaoNovoCodigo.addEventListener("click", () => {
	
	// AJAX
	var params_novo_codigo;
	
	if (localStorage.getItem('language') != null) { params_novo_codigo = "idioma=" + localStorage.getItem('language'); }
	else { params_novo_codigo = "idioma=2"; }
	
	req_novo_codigo = new XMLHttpRequest();
	req_novo_codigo.open("POST", "java/processamento-java/processamento-novo-codigo-alteracao-senha.jsp", true);
	req_novo_codigo.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req_novo_codigo.readyState != 4 || req_novo_codigo.status != 200) {  }
		
		// código alterado
		else {
			ExibirToastMessage(11);
			
			// Exibição de Notificação
			var titulo;
			var texto;
			
			// e identificação do idioma escolhido e tradução do modo ativado
	        if (localStorage.getItem('language') == '1') { 
	        	titulo = '🎉 Novo Código Solicitado!';
	        	texto = 'Novo código para alteração de senha foi solicitado, em breve encaminharemos um email para você com os dados.';
	        }
	        else { 
	        	titulo = '🎉 New Code Requested!';
	        	texto = 'New code for changing password has been requested, soon we will forward an email to you with the datas.';
	        }
	        
			ExibirNotificacao(titulo, texto);
		}
	}
	
	// Definição do header do método HTTP POST
	// e envio dos parãmetros
	req_novo_codigo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req_novo_codigo.send(params_novo_codigo);
});

// envio da alteração de senha
botaoAlterarSenha.addEventListener("click", () => {
	
	// inputs não preenchidos
	if (	inputNovaSenhaAlteracao.value == ""
		|| 	inputConfirmarNovaSenhaAlteracao == ""
		||	inputCodigoAlteracao == "") {
		
		// checagem senha
		if (inputNovaSenhaAlteracao.value == "") { inputNovaSenhaAlteracao.style.borderBottom = "4px solid red"; }
		else { inputNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// checagem confirmação senha
		if (inputConfirmarNovaSenhaAlteracao.value == "") { inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid red"; }
		else { inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// checagem código
		if (inputCodigoAlteracao.value == "") { inputCodigoAlteracao.style.borderBottom = "4px solid red"; }
		else { inputCodigoAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// exibição da toast message
		ExibirToastMessage(1);
		
	}
	
	// inputs não seguem o padrão
	else if (	!regexSenha.test(inputNovaSenhaAlteracao.value)
			 ||	!regexSenha.test(inputConfirmarNovaSenhaAlteracao.value)
			 ||	!regexCodigo.test(inputCodigoAlteracao.value)) {
		
		// checagem da senha
		if (!regexSenha.test(inputNovaSenhaAlteracao.value)) { inputNovaSenhaAlteracao.style.borderBottom = "4px solid red"; }
		else { inputNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// checagem da confirmação de senha
		if (!regexSenha.test(inputConfirmarNovaSenhaAlteracao.value)) { inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid red"; }
		else { inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// checagem do código
		if (!regexCodigo.test(inputCodigoAlteracao.value)) { inputCodigoAlteracao.style.borderBottom = "4px solid red"; }
		else { inputCodigoAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		// exibição da toast message
		ExibirToastMessage(4);
	}
	
	// senhas diferentes
	else if (inputNovaSenhaAlteracao.value != inputConfirmarNovaSenhaAlteracao.value) {
		
		// deixar input de código com cor padrão
		inputCodigoAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)";
		
		// destacar inputs de sehas em vermelho
		inputNovaSenhaAlteracao.style.borderBottom = "4px solid red";
		inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid red";
		
		// exibição da toast message
		ExibirToastMessage(5);
	}
	
	// código incorreto
	// ou alteracação efetuada com sucesso
	else {
		
		// deixar inputs com cores padrões
		inputNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputConfirmarNovaSenhaAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)";
		
		// AJAX
		params_alteracao = "senha=" + inputNovaSenhaAlteracao.value
			   + "&codigo=" + inputCodigoAlteracao.value;
		
		req_alteracao = new XMLHttpRequest();
		req_alteracao.open("POST", "java/processamento-java/processamento-alteracao-senha.jsp", true);
		req_alteracao.onreadystatechange = function() {
			
			// Servidor Fora do Ar
			if (req_alteracao.readyState != 4 || req_alteracao.status != 200) {  }
			
			// código incorreto
			else if (this.responseText.includes("0")) {
				inputCodigoAlteracao.style.borderBottom = "4px solid red";
				
				// exibição da toast message
				ExibirToastMessage(6);
			}
			
			// alteração expirada e/ou usada
			else if (this.responseText.includes("1")) {
				
				// exibição da toast message
				ExibirToastMessage(7);
			}
			
			// alteração efetuada com sucesso
			else {
				inputCodigoAlteracao.style.borderBottom = "4px solid var(--style-terciary-color)";
				modal.style.display = "block";
				
				// Exibição de Notificação
				var titulo;
				var texto;
				
				// e identificação do idioma escolhido e tradução do modo ativado
		        if (localStorage.getItem('language') == '1') { 
		        	titulo = '🎉 Alteração Realizada!';
		        	texto = 'Sua senha acabou de ser redefinida e você já pode estar logando em sua conta com ela.';
		        }
		        else { 
		        	titulo = '🎉 Change Done!';
		        	texto = 'Your password has just been reset and you may already be logging into your account with it.';
		        }
		        
				ExibirNotificacao(titulo, texto);
			}
		}
		
		// Definição do header do método HTTP POST
		// e envio dos parãmetros
		req_alteracao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req_alteracao.send(params_alteracao);
	}
});

// clique no botão do modal
//
// modal aparece depois que senha é alterada com sucesso
// e orienta usuário a retornar à página de login
botaoModal.addEventListener("click", () => { window.location.href = "index.jsp"; });