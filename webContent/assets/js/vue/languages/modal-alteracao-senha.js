/* 
	Variáveis
*/

var vueModalContent = new Vue({
  el: '#modalAlteracaoSenha',
  data: {
	  modalHeaderPortugues: '🎯 Solicitação Enviada 🎯',
	  modalHeaderEnglish: '🎯 Request Sent 🎯',
	  modalHeaderAtiva: '',
	  
	  conteudoModalPortugues: 'Senha alterada com sucesso! Retorne ao login para entrar com sua conta!!',
	  conteudoModalEnglish: 'Password changed successfully! Return to login to enter your account!!',
	  conteudoModalAtiva: '',
	  
	  conteudoBotaoVoltarLoginPortugues: 'Voltar ao Login',
	  conteudoBotaoVoltarLoginEnglish: 'Back to Login',
	  conteudoBotaoVoltarLoginAtiva: '',
	  
	  modalFooterPortugues: '❌ Clique em qualquer lugar fora do modal para fechá-lo ❌',
	  modalFooterEnglish: '❌ Click anywhere outside the modal to close it ❌',
	  modalFooterAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaModalAlteracaoSenha = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueModalContent.modalHeaderAtiva = vueModalContent.modalHeaderPortugues;
		vueModalContent.conteudoModalAtiva = vueModalContent.conteudoModalPortugues;
		vueModalContent.conteudoBotaoVoltarLoginAtiva = vueModalContent.conteudoBotaoVoltarLoginPortugues;
		vueModalContent.modalFooterAtiva = vueModalContent.modalFooterPortugues;
	}

	// english - eua
	else {
		vueModalContent.modalHeaderAtiva = vueModalContent.modalHeaderEnglish;
		vueModalContent.conteudoModalAtiva = vueModalContent.conteudoModalEnglish;
		vueModalContent.conteudoBotaoVoltarLoginAtiva = vueModalContent.conteudoBotaoVoltarLoginEnglish;
		vueModalContent.modalFooterAtiva = vueModalContent.modalFooterEnglish;
	}
};