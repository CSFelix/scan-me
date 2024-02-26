// formulário
const formPainelInfo = document.getElementById("painelInfo");

// botão de salvar
const botaoSalvar = document.getElementById("botaoSalvar");

// input do avatar do usuário
const inputAvatar = document.getElementById("selecionarAvatar");

// patterns dos inputs
const regexNickname = new RegExp("^[a-zA-Z0-9çáéíóúâêîôûàèìòùãõ_ ]{5,250}$");
const regexNumeroCelular = new RegExp("^[0-9]{11,12}$");
const regexIdTelegram = new RegExp("^[0-9]{10,12}$");

// flag do erro pattern
var erroPattern = true;

// input tipo usuário
const inputCheckTipoUsuario = document.getElementById("inputTipoUsuario");
var tipoUsuario; // 0 >> comprador, 1 >> vendedor

// resetar/evitar 'onsubmit' do form ao clicar em algum botão
formPainelInfo.onsubmit = function(event) { event.preventDefault(); }

// trigger ao clicar no botão de salvar
botaoSalvar.addEventListener("click", () => {
	
	// (1) Campos obrigatórios não preenchidos
	if (	disablerInputNickname.value == "" || disablerInputEmail.value == ""
		|| (disablerInputWhatsapp.value == "" && disablerInputTelegram.value == "" && disablerInputIdTelegram.value == "")) {
		
		if (disablerInputNickname.value == "") { disablerInputNickname.style.borderBottom = "4px solid red"; }
		else { disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (disablerInputEmail.value == "") { disablerInputEmail.style.borderBottom = "4px solid red"; }
		else { disablerInputEmail.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (disablerInputWhatsapp.value == "" && disablerInputTelegram.value == "") {
			disablerInputWhatsapp.style.borderBottom = "4px solid red";
			disablerInputTelegram.style.borderBottom = "4px solid red";
			disablerInputIdTelegram.style.borderBottom = "4px solid red";
		}
		else {
			disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
			disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
			disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
		}
		
		ExibirToastMessage(1);
	}
	
	// (1) Campos obrigatórios não preenchidos
	if (   (disablerInputTelegram.value != "" && disablerInputIdTelegram.value == "") 
		|| (disablerInputTelegram.value == "" && disablerInputIdTelegram.value != "")) {
		
		if (disablerInputTelegram.value == "") { disablerInputTelegram.style.borderBottom = "4px solid red"; }
		else { disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (disablerInputIdTelegram.value == "") { disablerInputIdTelegram.style.borderBottom = "4px solid red"; }
		else { disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
	}
	
	// (2) Campos não seguem o pattern
	else if (	!regexNickname.test(disablerInputNickname.value) || !RegexEmail(disablerInputEmail.value)
			 || ((!regexNumeroCelular.test(disablerInputWhatsapp.value) || !regexNumeroCelular.test(disablerInputTelegram.value) || !regexIdTelegram.test(disablerInputIdTelegram.value))
				&& (disablerInputWhatsapp.value != "" && disablerInputTelegram.value != "" && disablerInputIdTelegram.value == ""))) {
		
		if (regexNickname.test(disablerInputNickname.value)) { disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { disablerInputNickname.style.borderBottom = "4px solid red"; }
		
		if (RegexEmail(disablerInputEmail.value)) { disablerInputEmail.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else { disablerInputEmail.style.borderBottom = "4px solid red"; }
		
		if (regexNumeroCelular.test(disablerInputWhatsapp.value)) { disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexNumeroCelular.test(disablerInputWhatsapp.value)) { disablerInputWhatsapp.style.borderBottom = "4px solid red"; }
		else { disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)"; }
			
		if (regexNumeroCelular.test(disablerInputTelegram.value)) { disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexNumeroCelular.test(disablerInputTelegram.value)) { disablerInputTelegram.style.borderBottom = "4px solid red"; }
		else { disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color"; }
		
		if (regexIdTelegram.test(disablerInputIdTelegram.value)) { disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		else if (!regexIdTelegram.test(disablerInputIdTelegram.value)) { disablerInputIdTelegram.style.borderBottom = "4px solid red"; }
		else { disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color"; }
		
		if (erroPattern) {
			erroPattern = false;
			modalAlteracaoDadosUsuarioPainelInfo.style.display = "block";
		}
		
		ExibirToastMessage(4);
	}
	
	// Processamento Ajax
	else {
		
		// Alteração de Avatar não solicitada
		if (inputAvatar.value == "") {
			
			// Parâmetros
			tipoUsuario = inputCheckTipoUsuario.checked ? "1" : "0";
			
			var params = "nickname=" + disablerInputNickname.value
					   + "&email=" + disablerInputEmail.value
					   + "&whatsapp=" + disablerInputWhatsapp.value
					   + "&telegram=" + disablerInputTelegram.value
					   + "&idTelegram=" + disablerInputIdTelegram.value
					   + "&tipoUsuario=" + tipoUsuario;
			
			// AJAX
			var req = new XMLHttpRequest();
			req.open("POST", "java/processamento-java/processamento-alterar-dados-usuario-painel-info.jsp", true);
			
			req.onreadystatechange = function() {
				
				// Servidor Fora do Ar
				if (req.readyState != 4 || req.status != 200) {  }
				
				// email já cadastrado
				else if (this.responseText.includes("0")) { 
					
					disablerInputEmail.style.borderBottom = "4px solid red";
					disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					
					ExibirToastMessage(8);
				}
				
				// alteração efetuada com sucesso
				else { 
					
					// redefinição das sessions
					sessionStorage.setItem("usuario_nickname", disablerInputNickname.value);
					sessionStorage.setItem("usuario_email", disablerInputEmail.value);
					sessionStorage.setItem("usuario_whatsapp", disablerInputWhatsapp.value);
					sessionStorage.setItem("usuario_telegram", disablerInputTelegram.value);
					sessionStorage.setItem("usuario_id_telegram", disablerInputIdTelegram.value);
					sessionStorage.setItem("usuario_tipo", tipoUsuario);
					
					// reset da alteração da foto
					disablerLabelAvatar.classList.add("fotoDesativada");
					disablerLabelAvatar.htmlFor = "";
					
					// reset dos inputs
					disablerInputEmail.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					
					disablerInputNickname.readOnly = true;
					disablerInputEmail.readOnly = true;
					disablerInputWhatsapp.readOnly = true;
					disablerInputTelegram.readOnly = true;
					disablerInputIdTelegram.readOnly = true;
					
					// reset do switch do tipo de usuário
					for (var elemento = 0; elemento < campoInputTipoUsuario.length; elemento++){
						campoInputTipoUsuario[elemento].classList.remove("flexCenter");
				    }
					
					// reset dos botões de confirmar e salvar
					disablerBotaoCancelar.classList.add("botaoDesativado");
					disablerBotaoSalvar.classList.add("botaoDesativado");
					
					disablerBotaoCancelar.disabled = true;
					disablerBotaoSalvar.disabled = true;
					
					// reset do botão de editar
					botaoEditar.classList.remove("botaoDesativado");
					botaoEditar.disabled = false;
					
					// exibição da mensagem de sucesso
					ExibirToastMessage(12);
					
					// recarregamento da página para já trazer opções de vendedor/comprador atualizadas
					window.location.href = "painel.jsp";
				}
			};
			
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(params);
		}
		
		// Alteração de Avatar Solicitada
		else {
			// Params
			const formData = new FormData(formPainelInfo);
			formData.append("usuario_uuid", sessionStorage.getItem("usuario_uuid"));
			formData.append("usuario_tipo", inputCheckTipoUsuario.checked ? "1" : "0");
			
			// Ajax
			var reqAvatar = new XMLHttpRequest();
			reqAvatar.open("POST", "AlterarDadosUsuario", true);
			
			reqAvatar.onreadystatechange = function() {
				
				// Servidor Fora do Ar
				if (reqAvatar.readyState != 4 || reqAvatar.status != 200) {  }
				
				// email já cadastrado
				else if (this.responseText.includes("0")) { 
					
					disablerInputEmail.style.borderBottom = "4px solid red";
					disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					
					ExibirToastMessage(8);
				}
				
				// alteração efetuada com sucesso
				else { 
					
					// redefinição das sessions
					sessionStorage.setItem("usuario_nickname", disablerInputNickname.value);
					sessionStorage.setItem("usuario_email", disablerInputEmail.value);
					sessionStorage.setItem("usuario_whatsapp", disablerInputWhatsapp.value);
					sessionStorage.setItem("usuario_telegram", disablerInputTelegram.value);
					sessionStorage.setItem("usuario_id_telegram", disablerInputIdTelegram.value);
					sessionStorage.setItem("usuario_tipo", tipoUsuario);
					
					// reset da alteração da foto
					disablerLabelAvatar.classList.add("fotoDesativada");
					disablerLabelAvatar.htmlFor = "";
					
					// reset dos inputs
					disablerInputEmail.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
					
					disablerInputNickname.readOnly = true;
					disablerInputEmail.readOnly = true;
					disablerInputWhatsapp.readOnly = true;
					disablerInputTelegram.readOnly = true;
					disablerInputIdTelegram.readOnly = true;
					
					// reset do switch do tipo de usuário
					for (var elemento = 0; elemento < campoInputTipoUsuario.length; elemento++){
						campoInputTipoUsuario[elemento].classList.remove("flexCenter");
				    }
					
					// reset dos botões de confirmar e salvar
					disablerBotaoCancelar.classList.add("botaoDesativado");
					disablerBotaoSalvar.classList.add("botaoDesativado");
					
					disablerBotaoCancelar.disabled = true;
					disablerBotaoSalvar.disabled = true;
					
					// reset do botão de editar
					botaoEditar.classList.remove("botaoDesativado");
					botaoEditar.disabled = false;
					
					// exibição da mensagem de sucesso
					ExibirToastMessage(12);
					
					// recarregamento da página para já trazer opções de vendedor/comprador atualizadas
					window.location.href = "painel.jsp";
				}
			};
			
			// código comentado pois o 'Content-Type' não salvava a imagem no banco de dados
			// com isso, precisei retirar o código.
			//
			// Problemática: Sem o código, não há mais charset utf-8 e, consequentemente, não consigo
			// salvar mais produtos com acentos.
			//
			// Possível Solução: estudar uma forma de header diferente sem ser "content-type" que aceite
			// blobs e texts OU incluir 'charset utf-8' de maneira isolada da função 'setRequestHeader'
			//
			// Solução: Forçar a Servlet a requerir o charset utf-8 com a seguinte linha de código
			//		request.setCharacterEncoding("UTF-8");
			//
			// req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			reqAvatar.send(formData);
		}
	}
});