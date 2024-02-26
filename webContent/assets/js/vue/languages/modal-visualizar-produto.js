/* 
	Variáveis
*/

var vueModalVisualizarProduto = new Vue({
  el: '#modalVisualizarProduto',
  data: {
	  modalHeaderPortugues: '🎯 Foto do Produto 🎯',
	  modalHeaderEnglish: '🎯 Product\'s Image 🎯',
	  modalHeaderAtiva: '',
	  
	  modalFooterPortugues: '❌ Clique em qualquer lugar fora do modal para fechá-lo ❌',
	  modalFooterEnglish: '❌ Click anywhere outside the modal to close it ❌',
	  modalFooterAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaModalVisualizarProduto = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueModalVisualizarProduto.modalHeaderAtiva = vueModalVisualizarProduto.modalHeaderPortugues;
		vueModalVisualizarProduto.modalFooterAtiva = vueModalVisualizarProduto.modalFooterPortugues;
	}

	// english - eua
	else {
		vueModalVisualizarProduto.modalHeaderAtiva = vueModalVisualizarProduto.modalHeaderEnglish;
		vueModalVisualizarProduto.modalFooterAtiva = vueModalVisualizarProduto.modalFooterEnglish;
	}
};