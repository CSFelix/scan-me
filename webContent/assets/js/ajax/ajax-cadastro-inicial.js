const botaoVoltarLogin = document.getElementById("botaoVoltarLogin");
const botaoCadastrar = document.getElementById("botaoCadastrar");

const inputNickname = document.getElementById("inputNickname");
const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");
const inputWhatsapp = document.getElementById("inputWhatsapp");
const inputTelegram = document.getElementById("inputTelegram");
const inputIdTelegram = document.getElementById("inputIdTelegram");
const inputCheckTipoUsuario = document.getElementById("inputTipoUsuario");

var tipoUsuario; // 0 >> comprador, 1 >> vendedor

const regexNickname = new RegExp("^[a-zA-Z0-9 ]{5,250}$");
const regexSenha = new RegExp("^[a-zA-Z0-9_]{5,60}$");
const regexNumeroCelular = new RegExp("^[0-9]{11,12}$");
const regexIdTelegram = new RegExp("^[0-9]{10,12}$");

var erroPattern = true;

// tentativa de recuperar dados digitados anteriormente pelo usuário
// caso o mesmo queira alterar os dados antes de finalizar o cadastro
try {
	inputNickname.value = sessionStorage.getItem("nickname");
	inputEmail.value = sessionStorage.getItem("email");
	inputSenha.value = sessionStorage.getItem("senha");
	inputConfirmarSenha.value = sessionStorage.getItem("senha");
	inputWhatsapp.value = sessionStorage.getItem("whatsapp");
	inputTelegram.value = sessionStorage.getItem("telegram");
	inputIdTelegram.value = sessionStorage.getItem("id_telegram");
}
catch (exception) {}

// retornar à página de login
botaoVoltarLogin.addEventListener("click", () => { window.location.href = "index.jsp"; });

// verificação dos inputs digitados
botaoCadastrar.addEventListener("click", () => {
	
	// salvar dados na session Storage
	sessionStorage.setItem("nickname", inputNickname.value);
	sessionStorage.setItem("email", inputEmail.value);
	sessionStorage.setItem("senha", inputSenha.value);
	sessionStorage.setItem("whatsapp", inputWhatsapp.value);
	sessionStorage.setItem("telegram", inputTelegram.value);
	sessionStorage.setItem("id_telegram", inputIdTelegram.value);
	
	// (1) Campos obrigatórios não preenchidos
	if (	inputNickname.value == "" || inputEmail.value == ""
		||  inputSenha.value == "" || inputConfirmarSenha.value == ""
		|| (inputWhatsapp.value == "" && inputTelegram.value == "" && inputIdTelegram.value == "")) {
		
		if (inputNickname.value == "") { inputNickname.style.borderBottom = "4px solid red"; }
		else { inputNickname.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputEmail.value == "") { inputEmail.style.borderBottom = "4px solid red"; }
		else { inputEmail.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputSenha.value == "") { inputSenha.style.borderBottom = "4px solid red"; }
		else { inputSenha.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputConfirmarSenha.value == "") { inputConfirmarSenha.style.borderBottom = "4px solid red"; }
		else { inputConfirmarSenha.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputWhatsapp.value == "" && inputTelegram.value == "" && inputIdTelegram.value == "") {
			inputWhatsapp.style.borderBottom = "4px solid red";
			inputTelegram.style.borderBottom = "4px solid red";
			inputIdTelegram.style.borderBottom = "4px solid red";
		}
		else {
			inputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
			inputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
			inputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
		}
		
		ExibirToastMessage(1);
	}
	
	// (1) Campos obrigatórios não preenchidos
	else if (   (inputTelegram.value != "" && inputIdTelegram.value == "") 
			 || (inputTelegram.value == "" && inputIdTelegram.value != "")) {
		
		if (inputTelegram.value == "") { inputTelegram.style.borderBottom = "4px solid red"; }
		else { inputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputIdTelegram.value == "") { inputIdTelegram.style.borderBottom = "4px solid red"; }
		else { inputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		ExibirToastMessage(1);
	}
	
	// (2) Campos não seguem o pattern
	else if (	!regexNickname.test(inputNickname.value)          ||    !RegexEmail(inputEmail.value)
			 || !regexSenha.test(inputSenha.value)                ||    !regexSenha.test(inputConfirmarSenha.value)
			 || ((!regexNumeroCelular.test(inputWhatsapp.value)   ||    !regexNumeroCelular.test(inputTelegram.value) || !regexIdTelegram.test(inputIdTelegram.value))
				  && (inputWhatsapp.value != "" && inputTelegram.value != "" && inputIdTelegram.value != ""))) {
		
		if (regexNickname.test(inputNickname.value)) { inputNickname.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { inputNickname.style.borderBottom = "4px solid red"; }
		
		if (RegexEmail(inputEmail.value)) { inputEmail.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { inputEmail.style.borderBottom = "4px solid red"; }
		
		if (regexSenha.test(inputSenha.value)) { inputSenha.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { inputSenha.style.borderBottom = "4px solid red"; }
		
		if (regexSenha.test(inputConfirmarSenha.value)) { inputConfirmarSenha.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { inputConfirmarSenha.style.borderBottom = "4px solid red"; }
		
		if (regexNumeroCelular.test(inputWhatsapp.value)) { inputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexNumeroCelular.test(inputWhatsapp.value)) { inputWhatsapp.style.borderBottom = "4px solid red"; }
		else { inputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)"; }
			
		if (regexNumeroCelular.test(inputTelegram.value)) { inputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexNumeroCelular.test(inputTelegram.value)) { inputTelegram.style.borderBottom = "4px solid red"; }
		else { inputTelegram.style.borderBottom = "4px solid var(--style-terciary-color"; }
		
		if (regexIdTelegram.test(inputIdTelegram.value)) { inputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexIdTelegram.test(inputIdTelegram.value)) { inputIdTelegram.style.borderBottom = "4px solid red"; }
		else { inputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color"; }
		
		if (erroPattern) {
			erroPattern = false;
			modal.style.display = "block";
		}
		
		ExibirToastMessage(4);
	}
	
	// (3) Campo de senha e Confirmação de senha não idênticos
	else if (inputSenha.value != inputConfirmarSenha.value) {
		
		inputNickname.style.borderBottom = "solid 4px var(--style-terciary-color)";
		inputEmail.style.borderBottom = "solid 4px var(--style-terciary-color)";
		inputWhatsapp.style.borderBottom = "solid 4px var(--style-terciary-color)";
		inputTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)";
		inputIdTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)";
		
		inputSenha.style.borderBottom = "4px solid red";
		inputConfirmarSenha.style.borderBottom = "4px solid red";
		
		ExibirToastMessage(5);
	}
	
	// (0) Tudo Ok
	else {
		
		// Parâmetros do Ajax
		tipoUsuario = inputCheckTipoUsuario.checked ? "1" : "0";
		
		var params = "nickname=" + inputNickname.value
		   + "&email=" + inputEmail.value
		   + "&senha=" + inputSenha.value
		   + "&whatsapp=" + inputWhatsapp.value
		   + "&telegram=" + inputTelegram.value
		   + "&idTelegram=" + inputIdTelegram.value
		   + "&tipoUsuario=" + tipoUsuario;
		
		// AJAX
		var req = new XMLHttpRequest();
		req.open("POST", "java/processamento-java/processamento-cadastro.jsp", true);
		
		req.onreadystatechange = function() {
			
			// Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) {  }
			
			// Email já Cadastrado ou
			// Cadastro efetuado com sucesso
			else {
				
				// Email já Cadastrado
				if (this.responseText.includes("0")) {
					inputEmail.style.borderBottom = "4px solid red";
					
					inputNickname.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputSenha.style.borderBottom = "4px solid var(--style-terciary-color)";
					inputConfirmarSenha.style.borderBottom = "4px solid var(--style-terciary-color)";
					inputWhatsapp.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputIdTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)";
					
					ExibirToastMessage(8);
				}
				
				// Cadastro efetuado com Sucesso
				else {
					inputNickname.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputEmail.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputSenha.style.borderBottom = "4px solid var(--style-terciary-color)";
					inputConfirmarSenha.style.borderBottom = "4px solid var(--style-terciary-color)";
					inputWhatsapp.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)";
					inputIdTelegram.style.borderBottom = "solid 4px var(--style-terciary-color)"
					
					// destruição das sessions
					sessionStorage.removeItem("nickname");
					sessionStorage.removeItem("email");
					sessionStorage.removeItem("senha");
					sessionStorage.removeItem("whatsapp");
					sessionStorage.removeItem("telegram");
					sessionStorage.removeItem("id_telegram");
					
					sessionStorage.setItem("painel_foco", "1");
					window.location.href = "cadastro-final.jsp";
				}
			}
		};
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(params);
	}
});