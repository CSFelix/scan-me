/* 
	Variáveis
*/

var vueModalContent = new Vue({
  el: '#modalAlteracaoDadosUsuarioPainelInfo',
  data: {
	  modalHeaderPortugues: '🎯 Padrão dos Campos 🎯',
	  modalHeaderEnglish: '🎯 Fields Patterns 🎯',
	  modalHeaderAtiva: '',
	  
	  inputNicknamePortugues: '- Nome: apenas letras, números e espaços (5 - 250 caracteres);',
	  inputNicknameEnglis: '- Name: only letters, numbers and spaces (5 - 250 chars);',
	  inputNicknameAtiva: '',
	  
	  inputEmailPortugues: '- Email: apenas letras, números, underlines e @ são permitidos (5 - 250 caracteres);',
	  inputEmailEnglish: '- Email: only letters, numbers, underlines and @ are allowed (5 - 250 chars);',
	  inputEmailAtiva: '',
	  
	  inputWhatsappPortugues: '- Whatsapp: apenas números são permitidos (11 - 12 caracteres);',
	  inputWhatsappEnglish: '- Whatsapp: only numbers are allowed (11 - 12 chars);',
	  inputWhatsappAtiva: '', 
	  
	  inputTelegramPortugues: '- Telegram: apenas números são permitidos (11 - 12 caracteres);',
	  inputTelegramEnglish: '- Telegram: only numbers are allowed (11 - 12 chars);',
	  inputTelegramAtiva: '', 
	  
	  inputIdTelegramPortugues: '- Id Telegram: apenas números são permitidos (10 - 12 caracteres)',
	  inputIdTelegramEnglish: '- Telegram Id: only numbers are allowed (10 - 12 chars)',
	  inputIdTelegramAtiva: '',
	  
	  campoObservacaoPortugues: '- Obs: não é obrigatório informar ambos os campos de Whatsapp e de Telegram, apenas um já é o necessário para efetuar o cadastro.',
	  campoObservacaoEnglish: '- Obs: you do not need to inform both Whatsapp and Telegram fields, only one is enough.',
	  campoObservacaoAtiva: '',
	  
	  modalFooterPortugues: '❌ Clique em qualquer lugar fora do modal para fechá-lo ❌',
	  modalFooterEnglish: '❌ Click anywhere outside the modal to close it ❌',
	  modalFooterAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaModalAlteracaoDadosUsuariosPainelInfo = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueModalContent.modalHeaderAtiva = vueModalContent.modalHeaderPortugues;
		vueModalContent.inputNicknameAtiva = vueModalContent.inputNicknamePortugues;
		vueModalContent.inputEmailAtiva = vueModalContent.inputEmailPortugues;
		vueModalContent.inputWhatsappAtiva = vueModalContent.inputWhatsappPortugues;
		vueModalContent.inputTelegramAtiva = vueModalContent.inputTelegramPortugues;
		vueModalContent.inputIdTelegramAtiva = vueModalContent.inputIdTelegramPortugues;
		vueModalContent.campoObservacaoAtiva = vueModalContent.campoObservacaoPortugues;
		vueModalContent.modalFooterAtiva = vueModalContent.modalFooterPortugues;
	}

	// english - eua
	else {
		vueModalContent.modalHeaderAtiva = vueModalContent.modalHeaderEnglish;
		vueModalContent.inputNicknameAtiva = vueModalContent.inputNicknameEnglish;
		vueModalContent.inputEmailAtiva = vueModalContent.inputEmailEnglish;
		vueModalContent.inputWhatsappAtiva = vueModalContent.inputWhatsappEnglish;
		vueModalContent.inputTelegramAtiva = vueModalContent.inputTelegramEnglish;
		vueModalContent.inputIdTelegramAtiva = vueModalContent.inputIdTelegramEnglish;
		vueModalContent.campoObservacaoAtiva = vueModalContent.campoObservacaoEnglish;
		vueModalContent.modalFooterAtiva = vueModalContent.modalFooterEnglish;
	}
};