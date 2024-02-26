/* 
	Variáveis
*/

var vuePainelInfo = new Vue({
  el: '#painelInfo',
  data: {
    tituloInfoPortugues: '⚙️ Info ⚙️',
    tituloInfoEnglish: '⚙️ Info ⚙️',
    tituloInfoAtiva: '',
    
    botaoEditarPortugues: 'Editar',
    botaoEditarEnglish: 'Edit',
    botaoEditarAtiva: '',
    
    botaoCancelarPortugues: 'Cancelar',
    botaoCancelarEnglish: 'Cancel',
    botaoCancelarAtiva: '',
    
    botaoSalvarPortugues: 'Salvar',
    botaoSalvarEnglish: 'Confirm',
    botaoSalvarAtiva: '',
    
    spanAvatarPortugues: 'Clique no Avatar para trocar de foto!',
    spanAvatarEnglish: 'Click in the Avatar to change the image!',
    spanAvatarAtiva: '',
    
    labelNicknamePortugues: 'Seu Nome',
    labelNicknameEnglish: 'Your Name',
    labelNicknameAtiva: '',
    
    labelEmailPortugues: 'Seu Email',
    labelEmailEnglish: 'Your Email',
    labelEmailAtiva: '',
    
    labelWhatsappPortugues: 'Seu Whatsapp',
    labelWhatsappEnglish: 'Your Whatsapp',
    labelWhatsappAtiva: '',
    
    labelTelegramPortugues: 'Seu Telegram',
    labelTelegramEnglish: 'Your Telegram',
    labelTelegramAtiva: '',
    
    labelIdTelegramPortugues: 'Sua Id do Telegram',
    labelIdTelegramEnglish: 'Your Telegram Id',
    labelIdTelegramAtiva: '',
    
    checkIdTelegramPortugues: 'Aprenda a checar sua Id do Telegram aqui!',
    checkIdTelegramEnglish: 'Learn how to check your Telegram\'s id here!',
    checkIdTelegramAtiva: '',
    
    tipoUsuarioTituloPortugues: 'Tipo de Usuário',
    tipoUsuarioTituloEnglish: 'Kind of User',
    tipoUsuarioTituloAtiva: '',
    
    tipoUsuarioCompradorPortugues: 'Comprador',
    tipoUsuarioCompradorEnglish: 'Buyer',
    tipoUsuarioCompradorAtiva: '',
    
    tipoUsuarioVendedorPortugues: 'Divulgador',
    tipoUsuarioVendedorEnglish: 'Promoter',
    tipoUsuarioVendedorAtiva: '',
    
    trocarSenhaPortugues: 'Trocar Senha!',
    trocarSenhaEnglish: 'Change Password!',
    trocarSenhaAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelInfo = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vuePainelInfo.tituloInfoAtiva = vuePainelInfo.tituloInfoPortugues;
		vuePainelInfo.botaoEditarAtiva = vuePainelInfo.botaoEditarPortugues;
		vuePainelInfo.botaoCancelarAtiva = vuePainelInfo.botaoCancelarPortugues;
		vuePainelInfo.botaoSalvarAtiva = vuePainelInfo.botaoSalvarPortugues;
		vuePainelInfo.spanAvatarAtiva = vuePainelInfo.spanAvatarPortugues;
		vuePainelInfo.labelNicknameAtiva = vuePainelInfo.labelNicknamePortugues;
		vuePainelInfo.labelEmailAtiva = vuePainelInfo.labelEmailPortugues;
		vuePainelInfo.labelWhatsappAtiva = vuePainelInfo.labelWhatsappPortugues;
		vuePainelInfo.labelTelegramAtiva = vuePainelInfo.labelTelegramPortugues;
		vuePainelInfo.labelIdTelegramAtiva = vuePainelInfo.labelIdTelegramPortugues;
		vuePainelInfo.checkIdTelegramAtiva = vuePainelInfo.checkIdTelegramPortugues;
		
		vuePainelInfo.tipoUsuarioTituloAtiva = vuePainelInfo.tipoUsuarioTituloPortugues;
		vuePainelInfo.tipoUsuarioCompradorAtiva = vuePainelInfo.tipoUsuarioCompradorPortugues;
		vuePainelInfo.tipoUsuarioVendedorAtiva = vuePainelInfo.tipoUsuarioVendedorPortugues;
		
		vuePainelInfo.trocarSenhaAtiva = vuePainelInfo.trocarSenhaPortugues;
	}

	// english - eua
	else {
		vuePainelInfo.tituloInfoAtiva = vuePainelInfo.tituloInfoEnglish;
		vuePainelInfo.botaoEditarAtiva = vuePainelInfo.botaoEditarEnglish;
		vuePainelInfo.botaoCancelarAtiva = vuePainelInfo.botaoCancelarEnglish;
		vuePainelInfo.botaoSalvarAtiva = vuePainelInfo.botaoSalvarEnglish;
		vuePainelInfo.spanAvatarAtiva = vuePainelInfo.spanAvatarEnglish;
		vuePainelInfo.labelNicknameAtiva = vuePainelInfo.labelNicknameEnglish;
		vuePainelInfo.labelEmailAtiva = vuePainelInfo.labelEmailEnglish;
		vuePainelInfo.labelWhatsappAtiva = vuePainelInfo.labelWhatsappEnglish;
		vuePainelInfo.labelTelegramAtiva = vuePainelInfo.labelTelegramEnglish;
		vuePainelInfo.labelIdTelegramAtiva = vuePainelInfo.labelIdTelegramEnglish;
		vuePainelInfo.checkIdTelegramAtiva = vuePainelInfo.checkIdTelegramEnglish;
		
		vuePainelInfo.tipoUsuarioTituloAtiva = vuePainelInfo.tipoUsuarioTituloEnglish;
		vuePainelInfo.tipoUsuarioCompradorAtiva = vuePainelInfo.tipoUsuarioCompradorEnglish;
		vuePainelInfo.tipoUsuarioVendedorAtiva = vuePainelInfo.tipoUsuarioVendedorEnglish;
		
		vuePainelInfo.trocarSenhaAtiva = vuePainelInfo.trocarSenhaEnglish;
	}
};