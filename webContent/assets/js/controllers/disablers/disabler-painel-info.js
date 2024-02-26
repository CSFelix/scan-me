// botão trigger
const botaoEditar = document.getElementById("botaoEditar");

// label avatar
const disablerLabelAvatar = document.getElementById("avatarVisualizacao");

// labels inputs
const disablerLabelNickname = document.getElementById("labelNickname");
const disablerLabelEmail = document.getElementById("labelLogin");
const disablerLabelWhatsapp = document.getElementById("labelWhatsapp");
const disablerLabelTelegram = document.getElementById("labelTelegram");
const disablerLabelIdTelegram = document.getElementById("labelIdTelegram");

// inputs
const disablerInputNickname = document.getElementById("inputNickname");
const disablerInputEmail = document.getElementById("inputEmail");
const disablerInputWhatsapp = document.getElementById("inputWhatsapp");
const disablerInputTelegram = document.getElementById("inputTelegram");
const disablerInputIdTelegram = document.getElementById("inputIdTelegram");

// campos inputs do tipo de usuário
const campoInputTipoUsuario = document.getElementsByClassName("campoDivFormHidden");

// botões
const disablerBotaoCancelar = document.getElementById("botaoCancelar");
const disablerBotaoSalvar = document.getElementById("botaoSalvar");

// trigger para ativar edição dos dados
botaoEditar.addEventListener("click", () => {
	
	// processamento label avatar
	disablerLabelAvatar.classList.remove("fotoDesativada");
	disablerLabelAvatar.htmlFor = "selecionarAvatar";
	
	// processamento inputs
	disablerInputNickname.classList.remove("campoDesativado");
	disablerInputEmail.classList.remove("campoDesativado");
	disablerInputWhatsapp.classList.remove("campoDesativado");
	disablerInputTelegram.classList.remove("campoDesativado");
	disablerInputIdTelegram.classList.remove("campoDesativado");
	
	disablerInputNickname.readOnly = false;
	disablerInputEmail.readOnly = false;
	disablerInputWhatsapp.readOnly = false;
	disablerInputTelegram.readOnly = false;
	disablerInputIdTelegram.readOnly = false;
	
	// processamento dos campos do tipo de usuário
	for (var elemento = 0; elemento < campoInputTipoUsuario.length; elemento++){
		campoInputTipoUsuario[elemento].classList.add("flexCenter");
    }
	
	// redefinição do tipo do usuário se caso
	// o mesmo foi alterado
	if (   (sessionStorage.getItem("usuario_tipo") == '1' && !inputCheckTipoUsuario.checked)
		|| (sessionStorage.getItem("usuario_tipo") == '0' && inputCheckTipoUsuario.checked)) { 
		
		swithTipoUsuario.click();
		
	}
	
	// processamento botões
	disablerBotaoCancelar.classList.remove("botaoDesativado");
	disablerBotaoSalvar.classList.remove("botaoDesativado");
	
	disablerBotaoCancelar.disabled = false;
	disablerBotaoSalvar.disabled = false;
	
	// processamento editar
	botaoEditar.classList.add("botaoDesativado");
	botaoEditar.disabled = true;
});

// triger para cancelar edição dos dados
botaoCancelar.addEventListener("click", () => {
	
	// processamento label avatar
	disablerLabelAvatar.classList.add("fotoDesativada");
	disablerLabelAvatar.htmlFor = "";
	disablerLabelAvatar.style.backgroundImage = "url(java/processamento-java/processamento-exibir-avatar.jsp?uuid_usuario=" + sessionStorage.getItem("usuario_uuid");
	
	// processamento labels inputs
	disablerLabelNickname.classList.add("labelAtiva");
	disablerLabelEmail.classList.add("labelAtiva");
	disablerLabelWhatsapp.classList.add("labelAtiva");
	disablerLabelTelegram.classList.add("labelAtiva");
	disablerLabelIdTelegram.classList.add("labelAtiva");
	
	// processamento inputs
	disablerInputNickname.classList.add("campoDesativado");
	disablerInputEmail.classList.add("campoDesativado");
	disablerInputWhatsapp.classList.add("campoDesativado");
	disablerInputTelegram.classList.add("campoDesativado");
	disablerInputIdTelegram.classList.add("campoDesativado");
	
	disablerInputNickname.readOnly = true;
	disablerInputEmail.readOnly = true;
	disablerInputWhatsapp.readOnly = true;
	disablerInputTelegram.readOnly = true;
	disablerInputIdTelegram.readOnly = true;
	
	disablerInputNickname.style.borderBottom = "4px solid var(--style-terciary-color)";
	disablerInputEmail.style.borderBottom = "4px solid var(--style-terciary-color)";
	disablerInputWhatsapp.style.borderBottom = "4px solid var(--style-terciary-color)";
	disablerInputTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
	disablerInputIdTelegram.style.borderBottom = "4px solid var(--style-terciary-color)";
	
	disablerInputNickname.value = sessionStorage.getItem("usuario_nickname");
	disablerInputEmail.value = sessionStorage.getItem("usuario_email");
	disablerInputWhatsapp.value = sessionStorage.getItem("usuario_whatsapp");
	disablerInputTelegram.value = sessionStorage.getItem("usuario_telegram");
	disablerInputIdTelegram.value = sessionStorage.getItem("usuario_id_telegram");
	
	// processamento dos campos do tipo de usuário
	for (var elemento = 0; elemento < campoInputTipoUsuario.length; elemento++){
		campoInputTipoUsuario[elemento].classList.remove("flexCenter");
    }
	
	// processamento botões
	disablerBotaoCancelar.classList.add("botaoDesativado");
	disablerBotaoSalvar.classList.add("botaoDesativado");
	
	disablerBotaoCancelar.disabled = true;
	disablerBotaoSalvar.disabled = true;
	
	// processamento editar
	botaoEditar.classList.remove("botaoDesativado");
	botaoEditar.disabled = false;
});