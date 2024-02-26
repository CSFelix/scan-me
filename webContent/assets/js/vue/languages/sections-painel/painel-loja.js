/* 
	Variáveis
*/

var vuePainelLoja = new Vue({
  el: '#painelLoja',
  data: {
    tituloLojaPortugues: '✨ Divulgações ✨',
    tituloLojaEnglish: '✨ Online Market ✨',
    tituloLojaAtiva: '',
    
    nomeProdutoPortugues: 'Produto',
    nomeProdutoEnglish: 'Product',
    nomeProdutoAtiva: '',
    
    // identificador das páginas
    palavraPaginaAtiva: '',
    palavraPaginaPortugues: 'Página',
    palavraPaginaEnglish: 'Page',
    
    palavraDeAtiva: '',
    palavraDePortugues: 'de',
    palavraDeEnglish: 'of',
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelLoja = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		
		vuePainelLoja.tituloLojaAtiva = vuePainelLoja.tituloLojaPortugues;
		vuePainelLoja.nomeProdutoAtiva = vuePainelLoja.nomeProdutoPortugues;
		
		// identificador de páginas
		vuePainelLoja.palavraPaginaAtiva = vuePainelLoja.palavraPaginaPortugues;
		vuePainelLoja.palavraDeAtiva = vuePainelLoja.palavraDePortugues;
	}

	// english - eua
	else {
		vuePainelLoja.tituloLojaAtiva = vuePainelLoja.tituloLojaEnglish;
		vuePainelLoja.nomeProdutoAtiva = vuePainelLoja.nomeProdutoEnglish;
		
		// identificador de páginas
		vuePainelLoja.palavraPaginaAtiva = vuePainelLoja.palavraPaginaEnglish;
		vuePainelLoja.palavraDeAtiva = vuePainelLoja.palavraDeEnglish;
	}
};