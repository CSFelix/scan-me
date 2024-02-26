/* 
	Variáveis
*/

var vueModalContent = new Vue({
  el: '#modalEsqueceuSenha',
  data: {
	  modalHeaderPortugues: '🎯 Solicitação Enviada 🎯',
	  modalHeaderEnglish: '🎯 Request Sent 🎯',
	  modalHeaderAtiva: '',
	  
	  conteudoModalPortugues: 'A solicitação de alteração de senha foi aceita e em breve enviaremos um email para você com os procedimentos a serem feitos!',
	  conteudoModalEnglish: 'The password change request was accepted and soon we will send you an email with the procedures to be done!',
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
const vueAtivarControladorIdiomaModalEsqueceuSenha = () => {

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