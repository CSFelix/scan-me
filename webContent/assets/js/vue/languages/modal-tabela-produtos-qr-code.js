/* 
	Variáveis
*/

var vueModalContentQRCode = new Vue({
  el: '#modalQRCodePainelTabelaProduto',
  data: {
	  modalHeaderQRCodePortugues: '🎯 QR Code 🎯',
	  modalHeaderQRCodeEnglish: '🎯 QR Code 🎯',
	  modalHeaderQRCodeAtiva: '',
	  
	  modalFooterQRCodePortugues: '❌ Clique em qualquer lugar fora do modal para fechá-lo ❌',
	  modalFooterQRCodeEnglish: '❌ Click anywhere outside the modal to close it ❌',
	  modalFooterQRCodeAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaModalQRCodePainelTabelaProduto = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueModalContentQRCode.modalHeaderQRCodeAtiva = vueModalContentQRCode.modalHeaderQRCodePortugues;
		vueModalContentQRCode.modalFooterQRCodeAtiva = vueModalContentQRCode.modalFooterQRCodePortugues;
	}

	// english - eua
	else {
		vueModalContentQRCode.modalHeaderQRCodeAtiva = vueModalContentQRCode.modalHeaderQRCodeEnglish;
		vueModalContentQRCode.modalFooterQRCodeAtiva = vueModalContentQRCode.modalFooterQRCodeEnglish;
	}
};