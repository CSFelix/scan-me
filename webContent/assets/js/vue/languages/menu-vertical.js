/* 
	Variáveis
*/

var vueMenuVertical = new Vue({
  el: '#verticalMenu',
  data: {
	  opcaoToogleMenuPortugues: 'Deslizar Menu',
	  opcaoToogleMenuEnglish: 'Toogle Menu',
	  opcaoToogleMenuAtiva: '',
	  
	  opcaoDashboardsPortugues: 'Painel',
	  opcaoDashboardsEnglish: 'Dashboard',
	  opcaoDashboardsAtiva: '',
	  
	  opcaoProdutosPortugues: 'Produtos',
	  opcaoProdutosEnglish: 'Products',
	  opcaoProdutosAtiva: '',
	  
	  opcaoRelatoriosPortugues: 'Relatórios',
	  opcaoRelatoriosEnglish: 'Reports',
	  opcaoRelatoriosAtiva: '',
	  
	  opcaoLojasPortugues: 'Loja',
	  opcaoLojasEnglish: 'Market',
	  opcaoLojasAtiva: '',
	  
	  opcaoScannerPortugues: 'Escanear',
	  opcaoScannerEnglish: 'Scan',
	  opcaoScannerAtiva: '',
	  
	  opcaoConfiguracoesPortugues: 'Info',
	  opcaoConfiguracoesEnglish: 'Info',
	  opcaoConfiguracoesAtiva: '',
	  
	  opcaoSairPortugues: 'Sair',
	  opcaoSairEnglish: 'Log Out',
	  opcaoSairAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorMenuVertical = () => {

	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
			|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueMenuVertical.opcaoToogleMenuAtiva = vueMenuVertical.opcaoToogleMenuPortugues;
		vueMenuVertical.opcaoDashboardsAtiva = vueMenuVertical.opcaoDashboardsPortugues;
		vueMenuVertical.opcaoProdutosAtiva = vueMenuVertical.opcaoProdutosPortugues;
		vueMenuVertical.opcaoRelatoriosAtiva = vueMenuVertical.opcaoRelatoriosPortugues;
		vueMenuVertical.opcaoLojasAtiva = vueMenuVertical.opcaoLojasPortugues;
		vueMenuVertical.opcaoScannerAtiva = vueMenuVertical.opcaoScannerPortugues;
		vueMenuVertical.opcaoConfiguracoesAtiva = vueMenuVertical.opcaoConfiguracoesPortugues;
		vueMenuVertical.opcaoSairAtiva = vueMenuVertical.opcaoSairPortugues;
	}

	// english - eua
	else {
		vueMenuVertical.opcaoToogleMenuAtiva = vueMenuVertical.opcaoToogleMenuEnglish;
		vueMenuVertical.opcaoDashboardsAtiva = vueMenuVertical.opcaoDashboardsEnglish;
		vueMenuVertical.opcaoProdutosAtiva = vueMenuVertical.opcaoProdutosEnglish;
		vueMenuVertical.opcaoRelatoriosAtiva = vueMenuVertical.opcaoRelatoriosEnglish;
		vueMenuVertical.opcaoLojasAtiva = vueMenuVertical.opcaoLojasEnglish;
		vueMenuVertical.opcaoScannerAtiva = vueMenuVertical.opcaoScannerEnglish;
		vueMenuVertical.opcaoConfiguracoesAtiva = vueMenuVertical.opcaoConfiguracoesEnglish;
		vueMenuVertical.opcaoSairAtiva = vueMenuVertical.opcaoSairEnglish;
	}
};