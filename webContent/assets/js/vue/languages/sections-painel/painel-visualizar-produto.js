/* 
	Variáveis
*/

var vuePainelVisualizarProduto = new Vue({
  el: '#painelVisualizarProduto',
  data: {
	  
	  // informações da página
	  tituloVisualizarProdutoPortugues: '🤑 Produto Anunciado 🤑',
	  tituloVisualizarProdutoEnglish: '🤑 For Sale Product 🤑',
	  tituloVisualizarProdutoAtiva: '',
	  
	  botaoVoltarPortugues: 'Voltar',
	  botaoVoltarEnglish: 'Back',
	  botaoVoltarAtiva: '',
	  
	  // informação dos produtos
	  spanIdentificadorSlidePortugues: 'Clique nos ícones para alterar a visualização das imagens',
	  spanIdentificadorSlideEnglish: 'Tap on the icons to change the image',
	  spanIdentificadorSlideAtiva: '',
	  
	  produtoEstoquePortugues: 'Estoque:',
	  produtoEstoqueEnglish: 'Stock:',
	  produtoEstoqueAtiva: '',
	  
	  produtoValorPortugues: 'Valor:',
	  produtoValorEnglish: 'Price:',
	  produtoValorAtiva: '',
	  
	  produtoFichaTecnicaPortugues: '📝 Ficha Técnica 📝',
	  produtoFichaTecnicaEnglish: '📝 Description 📝',
	  produtoFichaTecnicaAtiva: '',
	  
	  produtoTiposPortugues: '🌌 Tipos do Produto 🌌',
	  produtoTiposEnglish: '🌌 Kinds of the Product 🌌',
	  produtoTiposAtiva: '',
	  
	  // informação do vendedor
	  vendedorTituloPortugues: '📛 Vendedor 📛',
	  vendedorTituloEnglish: '📛 Seller 📛',
	  vendedorTituloAtiva: '',
	  
	  vendedorNomePortugues: '📛 Nome:',
	  vendedorNomeEnglish: '📛 Name:',
	  vendedorNomeAtiva: '',
	  
	  vendedorEmailPortugues: '✉️ E-mail:',
	  vendedorEmailEnglish: '✉️ E-mail:',
	  vendedorEmailAtiva: '',
	  
	  vendedorNumeroWhatsappPortugues: '📱 WhatsApp:',
	  vendedorNumeroWhatsappEnglish: '📱 WhatsApp:',
	  vendedorNumeroWhatsappAtiva: '',
	  
	  vendedorNumeroTelegramPortugues: '📱 Telegram:',
	  vendedorNumeroTelegramEnglish: '📱 Telegram:',
	  vendedorNumeroTelegramAtiva: '',
	  
	  // botão QR Code
	  botaoQRCodePortugues: 'Visualizar QR Code',
	  botaoQRCodeEnglish: 'View QR Code',
	  botaoQRCodeAtiva: '',
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelVisualizarProduto = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		// informações da página
		vuePainelVisualizarProduto.tituloVisualizarProdutoAtiva = vuePainelVisualizarProduto.tituloVisualizarProdutoPortugues;
		vuePainelVisualizarProduto.botaoVoltarAtiva = vuePainelVisualizarProduto.botaoVoltarPortugues;
		
		// informações do produto
		vuePainelVisualizarProduto.spanIdentificadorSlideAtiva = vuePainelVisualizarProduto.spanIdentificadorSlidePortugues;
		vuePainelVisualizarProduto.produtoEstoqueAtiva = vuePainelVisualizarProduto.produtoEstoquePortugues;
		vuePainelVisualizarProduto.produtoValorAtiva = vuePainelVisualizarProduto.produtoValorPortugues;
		vuePainelVisualizarProduto.produtoFichaTecnicaAtiva = vuePainelVisualizarProduto.produtoFichaTecnicaPortugues;
		vuePainelVisualizarProduto.produtoTiposAtiva = vuePainelVisualizarProduto.produtoTiposPortugues;
		
		// informações do vendedor
		vuePainelVisualizarProduto.vendedorTituloAtiva = vuePainelVisualizarProduto.vendedorTituloPortugues;
		vuePainelVisualizarProduto.vendedorNomeAtiva = vuePainelVisualizarProduto.vendedorNomePortugues;
		vuePainelVisualizarProduto.vendedorEmailAtiva = vuePainelVisualizarProduto.vendedorEmailPortugues;
		vuePainelVisualizarProduto.vendedorNumeroWhatsappAtiva = vuePainelVisualizarProduto.vendedorNumeroWhatsappPortugues;
		vuePainelVisualizarProduto.vendedorNumeroTelegramAtiva = vuePainelVisualizarProduto.vendedorNumeroTelegramPortugues;
		
		// botão visualizar QR Code
		vuePainelVisualizarProduto.botaoQRCodeAtiva = vuePainelVisualizarProduto.botaoQRCodePortugues;
	}

	// english - eua
	else {
		
		// informações da página
		vuePainelVisualizarProduto.tituloVisualizarProdutoAtiva = vuePainelVisualizarProduto.tituloVisualizarProdutoEnglish;
		vuePainelVisualizarProduto.botaoVoltarAtiva = vuePainelVisualizarProduto.botaoVoltarEnglish;
		
		// informações do produto
		vuePainelVisualizarProduto.spanIdentificadorSlideAtiva = vuePainelVisualizarProduto.spanIdentificadorSlideEnglish;
		vuePainelVisualizarProduto.produtoEstoqueAtiva = vuePainelVisualizarProduto.produtoEstoqueEnglish;
		vuePainelVisualizarProduto.produtoValorAtiva = vuePainelVisualizarProduto.produtoValorEnglish;
		vuePainelVisualizarProduto.produtoFichaTecnicaAtiva = vuePainelVisualizarProduto.produtoFichaTecnicaEnglish;
		vuePainelVisualizarProduto.produtoTiposAtiva = vuePainelVisualizarProduto.produtoTiposEnglish;
		
		// informações do vendedor
		vuePainelVisualizarProduto.vendedorTituloAtiva = vuePainelVisualizarProduto.vendedorTituloEnglish;
		vuePainelVisualizarProduto.vendedorNomeAtiva = vuePainelVisualizarProduto.vendedorNomeEnglish;
		vuePainelVisualizarProduto.vendedorEmailAtiva = vuePainelVisualizarProduto.vendedorEmailEnglish;
		vuePainelVisualizarProduto.vendedorNumeroWhatsappAtiva = vuePainelVisualizarProduto.vendedorNumeroWhatsappEnglish;
		vuePainelVisualizarProduto.vendedorNumeroTelegramAtiva = vuePainelVisualizarProduto.vendedorNumeroTelegramEnglish;
		
		// botão visualizar QR Code
		vuePainelVisualizarProduto.botaoQRCodeAtiva = vuePainelVisualizarProduto.botaoQRCodeEnglish;
	}
};