/* 
	Variáveis
*/
var vueModalContentQRCodeVisualizarProduto = new Vue({
  el: '#modalQRCodeVisualizarProduto',
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
const vueAtivarControladorIdiomaModalQRCodeVisualizarProduto = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueModalContentQRCodeVisualizarProduto.modalHeaderQRCodeAtiva = vueModalContentQRCodeVisualizarProduto.modalHeaderQRCodePortugues;
		vueModalContentQRCodeVisualizarProduto.modalFooterQRCodeAtiva = vueModalContentQRCodeVisualizarProduto.modalFooterQRCodePortugues;
	}

	// english - eua
	else {
		vueModalContentQRCodeVisualizarProduto.modalHeaderQRCodeAtiva = vueModalContentQRCodeVisualizarProduto.modalHeaderQRCodeEnglish;
		vueModalContentQRCodeVisualizarProduto.modalFooterQRCodeAtiva = vueModalContentQRCodeVisualizarProduto.modalFooterQRCodeEnglish;
	}
};