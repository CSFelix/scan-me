/* 
	Variáveis
*/

var vuePainelDashboard = new Vue({
  el: '#painelDashboard',
  data: {
	  tituloGraficoStatusPortugues: 'Relação Produtos',
	  tituloGraficoStatusEnglish: 'Products Overview',
	  tituloGraficoStatusAtiva: '',
	  
	  labelPendenteGraficoStatusPortugues: 'Pendentes',
	  labelPendenteGraficoStatusEnglish: 'Pending',
	  labelPendenteGraficoStatusAtiva: '',
	  
	  labelVendaGraficoStatusPortugues: 'À Venda',
	  labelVendaGraficoStatusEnglish: 'For Sale',
	  labelVendaGraficoStatusAtiva: '',
	  
	  labelVendidoGraficoStatusPortugues: 'Vendidos',
	  labelVendidoGraficoStatusEnglish: 'Sold',
	  labelVendidoGraficoStatusAtiva: '',
	  
	  tituloGraficoVisualizacoesPortugues: 'Produtos mais Vistos',
	  tituloGraficoVisualizacoesEnglish: 'Most Viewed Products',
	  tituloGraficoVisualizacoesAtiva: '',
	  
	  labelQntGraficoVisualizacoesPortugues: 'Qnt de Visualizações',
	  labelQntGraficoVisualizacoesEnglish: 'Amount of Views',
	  labelQntGraficoVisualizacoesAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelDashboard = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vuePainelDashboard.tituloGraficoStatusAtiva = vuePainelDashboard.tituloGraficoStatusPortugues;
		vuePainelDashboard.labelPendenteGraficoStatusAtiva = vuePainelDashboard.labelPendenteGraficoStatusPortugues;
		vuePainelDashboard.labelVendaGraficoStatusAtiva = vuePainelDashboard.labelVendaGraficoStatusPortugues;
		vuePainelDashboard.labelVendidoGraficoStatusAtiva = vuePainelDashboard.labelVendidoGraficoStatusPortugues;
		
		vuePainelDashboard.tituloGraficoVisualizacoesAtiva = vuePainelDashboard.tituloGraficoVisualizacoesPortugues;
		vuePainelDashboard.labelQntGraficoVisualizacoesAtiva = vuePainelDashboard.labelQntGraficoVisualizacoesPortugues;
	}

	// english - eua
	else {
		vuePainelDashboard.tituloGraficoStatusAtiva = vuePainelDashboard.tituloGraficoStatusEnglish;
		vuePainelDashboard.labelPendenteGraficoStatusAtiva = vuePainelDashboard.labelPendenteGraficoStatusEnglish;
		vuePainelDashboard.labelVendaGraficoStatusAtiva = vuePainelDashboard.labelVendaGraficoStatusEnglish;
		vuePainelDashboard.labelVendidoGraficoStatusAtiva = vuePainelDashboard.labelVendidoGraficoStatusEnglish;
		
		vuePainelDashboard.tituloGraficoVisualizacoesAtiva = vuePainelDashboard.tituloGraficoVisualizacoesEnglish;
		vuePainelDashboard.labelQntGraficoVisualizacoesAtiva = vuePainelDashboard.labelQntGraficoVisualizacoesEnglish;
	}
};