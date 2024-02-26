/* 
	Variáveis
*/

var vueMainContent = new Vue({
  el: '#mainContent',
  data: {
  	tituloFormPortugues: 'Cadastro',
  	tituloFormEnglish: 'Sign Up',
  	tituloFormAtiva: '',

    tituloCartaoUsuarioPortugues: 'Cartão de Usuário',
    tituloCartaoUsuarioEnglish: 'User Info',
    tituloCartaoUsuarioAtiva: '',

  	labelNicknamePortugues: 'Seu Nome',
  	labelNicknameEnglish: 'Your Name',
  	labelNicknameAtiva: '',

    labelLoginPortugues: 'Seu Email',
    labelLoginEnglish: 'Your Email',
    labelLoginAtiva: '',

    labelSenhaPortugues: 'Sua Senha',
    labelSenhaEnglish: 'Your Password',
    labelSenhaAtiva: '',

    labelConfirmarSenhaPortugues: 'Confirme a Senha',
    labelConfirmarSenhaEnglish: 'Check the Password',
    labelConfirmarSenhaAtiva: '',

    labelWhatsappPortugues: 'Seu WhatsApp',
    labelWhatsappEnglish: 'Your WhatsApp',
    labelWhatsappAtiva: '',

    labelTelegramPortugues: 'Seu Telegram',
    labelTelegramEnglish: 'Your Telegram',
    labelTelegramAtiva: '',
    
    labelIdTelegramPortugues: 'Sua Id do Telegram',
    labelIdTelegramEnglish: 'Your Telegram Id',
    labelIdTelegramAtiva: '',
    
    tipoUsuarioTituloPortugues: 'Tipo de Usuário',
    tipoUsuarioTituloEnglish: 'Kind of User',
    tipoUsuarioTituloAtiva: '',
    
    tipoUsuarioCompradorPortugues: 'Comprador',
    tipoUsuarioCompradorEnglish: 'Buyer',
    tipoUsuarioCompradorAtiva: '',
    
    tipoUsuarioVendedorPortugues: 'Divulgador',
    tipoUsuarioVendedorEnglish: 'Promoter',
    tipoUsuarioVendedorAtiva: '',

    checkIdTelegramPortugues: 'Aprenda a checar sua Id do Telegram aqui!',
    checkIdTelegramEnglish: 'Learn how to check your Telegram\'s id here!',
    checkIdTelegramAtiva: '',
    
    botaoVoltarLoginPortugues: 'Voltar ao Login',
    botaoVoltarLoginEnglish: 'Back to Login',
    botaoVoltarLoginAtiva: '',

    botaoCadastrarPortugues: 'Cadastrar',
    botaoCadastrarEnglish: 'Sign Up',
    botaoCadastrarAtiva: '',

    spanAlterarAvatarPortugues: 'Clique no Avatar para trocar de foto!',
    spanAlterarAvatarEnglish: 'Tap on the Avatar to change the image!',
    spanAlterarAvatarAtiva: '',

    botaoFinalizarCadastroPortugues: 'Finalizar!',
    botaoFinalizarCadastroEnglish: 'Finish!',
    botaoFinalizarCadastroAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaLogin = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueMainContent.tituloFormAtiva = vueMainContent.tituloFormPortugues;
		vueMainContent.tituloCartaoUsuarioAtiva = vueMainContent.tituloCartaoUsuarioPortugues;
		vueMainContent.labelNicknameAtiva = vueMainContent.labelNicknamePortugues;
		vueMainContent.labelLoginAtiva = vueMainContent.labelLoginPortugues;
		vueMainContent.labelSenhaAtiva = vueMainContent.labelSenhaPortugues;
		vueMainContent.labelConfirmarSenhaAtiva = vueMainContent.labelConfirmarSenhaPortugues;
		vueMainContent.labelWhatsappAtiva = vueMainContent.labelWhatsappPortugues;
		vueMainContent.labelTelegramAtiva = vueMainContent.labelTelegramPortugues;
		vueMainContent.labelIdTelegramAtiva = vueMainContent.labelIdTelegramPortugues;
		vueMainContent.tipoUsuarioTituloAtiva = vueMainContent.tipoUsuarioTituloPortugues;
		vueMainContent.tipoUsuarioCompradorAtiva = vueMainContent.tipoUsuarioCompradorPortugues;
		vueMainContent.tipoUsuarioVendedorAtiva = vueMainContent.tipoUsuarioVendedorPortugues;
		vueMainContent.checkIdTelegramAtiva = vueMainContent.checkIdTelegramPortugues;
		
		vueMainContent.botaoVoltarLoginAtiva = vueMainContent.botaoVoltarLoginPortugues;
		vueMainContent.botaoCadastrarAtiva = vueMainContent.botaoCadastrarPortugues;

	    vueMainContent.spanAlterarAvatarAtiva = vueMainContent.spanAlterarAvatarPortugues;
	    vueMainContent.botaoFinalizarCadastroAtiva = vueMainContent.botaoFinalizarCadastroPortugues;
	}

	// english - eua
	else {
		vueMainContent.tituloFormAtiva = vueMainContent.tituloFormEnglish;
    vueMainContent.tituloCartaoUsuarioAtiva = vueMainContent.tituloCartaoUsuarioEnglish;
		vueMainContent.labelNicknameAtiva = vueMainContent.labelNicknameEnglish;
		vueMainContent.labelLoginAtiva = vueMainContent.labelLoginEnglish;
		vueMainContent.labelSenhaAtiva = vueMainContent.labelSenhaEnglish;
		vueMainContent.labelConfirmarSenhaAtiva = vueMainContent.labelConfirmarSenhaEnglish;
		vueMainContent.labelWhatsappAtiva = vueMainContent.labelWhatsappEnglish;
		vueMainContent.labelTelegramAtiva = vueMainContent.labelTelegramEnglish;
		vueMainContent.labelIdTelegramAtiva = vueMainContent.labelIdTelegramEnglish;
		vueMainContent.tipoUsuarioTituloAtiva = vueMainContent.tipoUsuarioTituloEnglish;
		vueMainContent.tipoUsuarioCompradorAtiva = vueMainContent.tipoUsuarioCompradorEnglish;
		vueMainContent.tipoUsuarioVendedorAtiva = vueMainContent.tipoUsuarioVendedorEnglish;
		vueMainContent.checkIdTelegramAtiva = vueMainContent.checkIdTelegramEnglish;
		
		vueMainContent.botaoVoltarLoginAtiva = vueMainContent.botaoVoltarLoginEnglish;
		vueMainContent.botaoCadastrarAtiva = vueMainContent.botaoCadastrarEnglish;

	    vueMainContent.spanAlterarAvatarAtiva = vueMainContent.spanAlterarAvatarEnglish;
	    vueMainContent.botaoFinalizarCadastroAtiva = vueMainContent.botaoFinalizarCadastroEnglish;
	}
};