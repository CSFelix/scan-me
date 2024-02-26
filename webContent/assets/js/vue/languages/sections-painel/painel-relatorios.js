/* 
	Variáveis
*/

var vuePainelRelatorios = new Vue({
  el: '#painelRelatorios',
  data: {
    tituloRelatoriosPortugues: '📝 Gerador QR Code 📝',
    tituloRelatoriosEnglish: '📝 QR Code Generator 📝',
    tituloRelatoriosAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelRelatorios = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		
		vuePainelRelatorios.tituloRelatoriosAtiva = vuePainelRelatorios.tituloRelatoriosPortugues;
	}

	// english - eua
	else {
		vuePainelRelatorios.tituloRelatoriosAtiva = vuePainelRelatorios.tituloRelatoriosEnglish;
	}
};