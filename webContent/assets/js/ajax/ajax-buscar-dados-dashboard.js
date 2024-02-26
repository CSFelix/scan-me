// botão de atualização dos dados
const botaoAtualizarDashboard = document.getElementById("botaoAtualizarDashboard");

// canvas do dashboard
const canvaStatusProdutos = document.getElementById("canvaStatusProdutos").getContext("2d");
const canvaVisualizacoesProdutos = document.getElementById("canvaVisualizacoesProdutos").getContext("2d");

// dados retornados do servidor transformados e gráficos
var dados_transformados;
var chartStatus;
var chartVisualizacoes;

// trigger de clique no botão
botaoAtualizarDashboard.addEventListener("click", () => { BuscarDadosDashboard(); });

// função de busca dos dados com callback, a fim do sistema
// não tentar traduzir os conteúdos sem antes ter o dashboard,
// em si, criado
//
// foi preciso criar esta função pois, quando o usuário recarregava página
// com o painel de dashboard ativo, sistema não traduzia os conteúdos de acordo
// com a linguagem alterada e/ou escolhida
function BuscarDadosDashboardCallback(callback) {
	
	// AJAX
	req = new XMLHttpRequest();
	req.open("POST", "java/processamento-java/processamento-buscar-dados-dashboard.jsp", true);
	
	req.onreadystatechange = function() {
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Transformações dos Dados Vindos do Servidor
			dados_transformados = TransformarDadosDashboard(this.responseText.trim());
			
			// Desenho dos Gráficos
			DesenharGrafico(dados_transformados, canvaStatusProdutos, canvaVisualizacoesProdutos);
			
			// Chamada da função callback
			callback();
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send();
}

// função de busca dos dados
function BuscarDadosDashboard() {
	
	// AJAX
	req = new XMLHttpRequest();
	req.open("POST", "java/processamento-java/processamento-buscar-dados-dashboard.jsp", true);
	
	req.onreadystatechange = function() {
		
		// Servidor Fora do Ar
		if (req.readyState != 4 || req.status != 200) {  }
		
		// Busca Efetuada com Sucesso
		else { 
			
			// Transformações dos Dados Vindos do Servidor
			dados_transformados = TransformarDadosDashboard(this.responseText.trim());

			// Desenho dos Gráficos
			DesenharGrafico(dados_transformados, canvaStatusProdutos, canvaVisualizacoesProdutos);
		}
	};
	
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send();
}

// Função de transformação dos dados do dashboard
function TransformarDadosDashboard(dados) {
	
	// retirar caracteres de ArrayList e Map/HashMap vindos do Java
	// e criar um array, separando os dados do ArrayList dos do Map
	dados = dados.replaceAll("[", "")
		         .replaceAll("]", "")
		         .replaceAll("{", "")
		         .replaceAll("}", "");
	dados = dados.split("|");
	
	// transformar dados do ArrayList e do Map em Arrays do JS
	dados[0] = dados[0].split(",");
	dados[1] = dados[1].split(",");
	
	// transformar cada dado do ArrayList em Integer
	for (i = 0; i < dados[0].length; i++) { dados[0][i] = parseInt(dados[0][i]); }
	
	// transformar cada conjunto (key, value) dos dados do Map em um array
	// e converter qnt de visualizações em Integer
	for (i = 0; i < dados[1].length; i++) {
		dados[1][i] = dados[1][i].trim().split("=");
		dados[1][i][1] = parseInt(dados[1][i][1]);
	}
	
	return dados;
}

// Função de Desenho dos Gráficos
function DesenharGrafico(dados, canvaStatus, canvaVisualizacoes) {
	
	// quando o gráfico estava sendo atualizado, ou seja, já havia sido criado
	// e o usuário apenas solicitava a atualização das informações, sistema
	// diminuía o zoom do chart. Para evitar este problema, sistema tenta
	// destruir o gráfico (caso já exista) ou dá continuidade na criação do mesmo
	// (caso não exista)	
	try {
		chartStatus.destroy();
		chartVisualizacoes.destroy();
	}
	catch (e) { console.log(e); }
	
	// Gráfico Canva Status
	chartStatus = new Chart(canvaStatusProdutos, {
	    type: 'doughnut',
	    
	    data: {
	        labels: [vuePainelDashboard.labelPendenteGraficoStatusAtiva, 
	        	     vuePainelDashboard.labelVendaGraficoStatusAtiva, 
	        	     vuePainelDashboard.labelVendidoGraficoStatusAtiva],
	        datasets: [{
	            label: 'Qnt de Produtos \ Amount of Products',
	            data: dados[0],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: { display: false }
	            }]
	        },
	
	        legend: {
	          display: true,
	          position: 'bottom',
	          labels: { fontColor: "#9d3be1" }
	        },
	        
	        responsive: false,
	        
	        title: {
	            display: true,
	            text: vuePainelDashboard.tituloGraficoStatusAtiva,
	            fontColor: "#9d3be1"
	        }
	    }
	});
	
	// Gráfico Canva Visualizações
	chartVisualizacoes = new Chart(canvaVisualizacoesProdutos, {
        type: 'bar',

        data: {
        	labels: [vuePainelDashboard.labelQntGraficoVisualizacoesAtiva],
        	
            datasets: [{
                label: dados[1][0][0],
                data: [dados[1][0][1]],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            },

            {
                label: dados[1][1][0],
                data: [dados[1][1][1]],
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1
            },

            {
                label: dados[1][2][0],
                data: [dados[1][2][1]],
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: [ 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: { beginAtZero: true }
                }],
                xAxes: [{
                    ticks: { display: false }
                }]
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: { fontColor: "#9d3be1" }
            },
            
            responsive: false,
            
            title: {
                display: true,
                text: vuePainelDashboard.tituloGraficoVisualizacoesAtiva,
                fontColor: "#9d3be1"
            }
        }
    });
}