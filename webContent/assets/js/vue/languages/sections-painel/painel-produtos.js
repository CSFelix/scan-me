/* 
	Variáveis
*/

var vuePainelProdutos = new Vue({
  el: '#painelProdutos',
  data: {
	  
	// title e headers
    tituloProdutosPortugues: '📦 Produtos 📦',
    tituloProdutosEnglish: '📦 Products 📦',
    tituloProdutosAtiva: '',
    
    trEditarPortugues: 'Editar',
    trEditarEnglish: 'Edit',
    trEditarAtiva: '',
    
    trNomePortugues: 'Nome',
    trNomeEnglish: 'Name',
    trNomeAtiva: '',
    
    trEstoquePortugues: 'Estoque',
    trEstoqueEnglish: 'Stock',
    trEstoqueAtiva: '',
    
    trPrecoPortugues: 'Preço',
    trPrecoEnglish: 'Price',
    trPrecoAtiva: '',
    
    trStatusPortugues: 'Status',
    trStatusEnglish: 'Status',
    trStatusAtiva: '',
    
    trTipoPortugues: 'Tipo Principal',
    trTipoEnglish: 'Main Type',
    trTipoAtiva: '',
    
    // rows da tabela
    botaoAlterarPortugues: 'Alterar',
    botaoAlterarEnglish: 'Alter',
    botaoAlterarAtiva: '',
    
    botaoQRCodePortugues: 'QR Code',
    botaoQRCodeEnglish: 'QR Code',
    botaoQRCodeAtiva: '',
    
    statusPendentePortugues: 'Pendente',
    statusPendenteEnglish: 'Pending',
    statusPendenteAtiva: '',
    
    statusVendaPortugues: 'À Venda',
    statusVendaEnglish: 'For Sale',
    statusVendaAtiva: '',
    
    statusVendidoPortugues: 'Vendido',
    statusVendidoEnglish: 'Sold',
    statusVendidoAtiva: '',
    
    // tipos produtos
    tipoDocesPortugues: 'Doces',
    tipoDocesEnglish: 'Candy',
    tipoDocesAtiva: '',
    
    tipoSalgadosPortugues: 'Salgados',
    tipoSalgadosEnglish: 'Salty',
    tipoSalgadosAtiva: '',
    
    tipoOutrosAlimentosPortugues: 'Outros Alimentos',
    tipoOutrosAlimentosEnglish: 'Other Foods',
    tipoOutrosAlimentosAtiva: '',
    
    tipoCelularesPortugues: 'Celulares',
    tipoCelularesEnglish: 'Cellphones',
    tipoCelularesAtiva: '',
    
    tipoInformaticaPortugues: 'Informática',
    tipoInformaticaEnglish: 'Computing',
    tipoInformaticaAtiva: '',
    
    tipoGamesPortugues: 'Games',
    tipoGamesEnglish: 'Games',
    tipoGamesAtiva: '',
    
    tipoLivrosPortugues: 'Livros',
    tipoLivrosEnglish: 'Books',
    tipoLivrosAtiva: '',
    
    tipoMangasPortugues: 'Mangás',
    tipoMangasEnglish: 'Mangas',
    tipoMangasAtiva: '',
    
    tipoBrinquedosPortugues: 'Brinquedos',
    tipoBrinquedosEnglish: 'Toys',
    tipoBrinquedosAtiva: '',
    
    tipoDecoracaoPortugues: 'Decoração',
    tipoDecoracaoEnglish: 'Decoration',
    tipoDecoracaoAtiva: '',
    
    tipoRoupasPortugues: 'Roupas',
    tipoRoupasEnglish: 'Clothes',
    tipoRoupasAtiva: '',
    
    tipoPerfumariaPortugues: 'Perfumaria',
    tipoPerfumariaEnglish: 'Perfumery',
    tipoPerfumariaAtiva: '',
    
    tipoEletrodomesticosPortugues: 'Eletrodomésticos',
    tipoEletrodomesticosEnglish: 'Home Appliances',
    tipoEletrodomesticosAtiva: '',
    
    tipoMoveisPortugues: 'Móveis',
    tipoMoveisEnglish: 'Furnitures',
    tipoMoveisAtiva: '',
    
    tipoEmpresariaisPortugues: 'Empresariais',
    tipoEmpresariaisEnglish: 'Business',
    tipoEmpresariaisAtiva: '',
    
    tipoCarrosPortugues: 'Carros',
    tipoCarrosEnglish: 'Cars',
    tipoCarrosAtiva: '',
    
    tipoMotosPortugues: 'Motos',
    tipoMotosEnglish: 'Motorcycles',
    tipoMotosAtiva: '',
    
    tipoCaminhoesPortugues: 'Caminhões',
    tipoCaminhoesEnglish: 'Trucks',
    tipoCaminhoesAtiva: '',
    
    tipoCaminhonetesPortugues: 'Caminhonetes',
    tipoCaminhonetesEnglish: 'Pickup Trucks',
    tipoCaminhonetesAtiva: '',
    
    tipoOutrosPortugues: 'Outros',
    tipoOutrosEnglish: 'Others',
    tipoOutrosAtiva: '',
    
    // idedntificador das páginas
    palavraPaginaAtiva: '',
    palavraPaginaPortugues: 'Página',
    palavraPaginaEnglish: 'Page',
    
    palavraDeAtiva: '',
    palavraDePortugues: 'de',
    palavraDeEnglish: 'of'
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelProdutos = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		// title e headers
		vuePainelProdutos.tituloProdutosAtiva = vuePainelProdutos.tituloProdutosPortugues;
		vuePainelProdutos.trEditarAtiva = vuePainelProdutos.trEditarPortugues;
		vuePainelProdutos.trNomeAtiva = vuePainelProdutos.trNomePortugues;
		vuePainelProdutos.trEstoqueAtiva = vuePainelProdutos.trEstoquePortugues;
		vuePainelProdutos.trPrecoAtiva = vuePainelProdutos.trPrecoPortugues;
		vuePainelProdutos.trStatusAtiva = vuePainelProdutos.trStatusPortugues;
		vuePainelProdutos.trTipoAtiva = vuePainelProdutos.trTipoPortugues;
		
		// rows da tabela
		vuePainelProdutos.botaoAlterarAtiva = vuePainelProdutos.botaoAlterarPortugues;
		vuePainelProdutos.botaoQRCodeAtiva = vuePainelProdutos.botaoQRCodePortugues;
		vuePainelProdutos.statusPendenteAtiva = vuePainelProdutos.statusPendentePortugues;
		vuePainelProdutos.statusVendaAtiva = vuePainelProdutos.statusVendaPortugues;
		vuePainelProdutos.statusVendidoAtiva = vuePainelProdutos.statusVendidoPortugues;
		
		// tipos produtos
		vuePainelProdutos.tipoDocesAtiva = vuePainelProdutos.tipoDocesPortugues;
		vuePainelProdutos.tipoSalgadosAtiva = vuePainelProdutos.tipoSalgadosPortugues;
		vuePainelProdutos.tipoOutrosAlimentosAtiva = vuePainelProdutos.tipoOutrosAlimentosPortugues;
		vuePainelProdutos.tipoCelularesAtiva = vuePainelProdutos.tipoCelularesPortugues;
		vuePainelProdutos.tipoInformaticaAtiva = vuePainelProdutos.tipoInformaticaPortugues;
		vuePainelProdutos.tipoGamesAtiva = vuePainelProdutos.tipoGamesPortugues;
		vuePainelProdutos.tipoLivrosAtiva = vuePainelProdutos.tipoLivrosPortugues;
		vuePainelProdutos.tipoMangasAtiva = vuePainelProdutos.tipoMangasPortugues;
		vuePainelProdutos.tipoBrinquedosAtiva = vuePainelProdutos.tipoBrinquedosPortugues;
		vuePainelProdutos.tipoDecoracaoAtiva = vuePainelProdutos.tipoDecoracaoPortugues;
		vuePainelProdutos.tipoRoupasAtiva = vuePainelProdutos.tipoRoupasPortugues;
		vuePainelProdutos.tipoPerfumariaAtiva = vuePainelProdutos.tipoPerfumariaPortugues;
		vuePainelProdutos.tipoEletrodomesticosAtiva = vuePainelProdutos.tipoEletrodomesticosPortugues;
		vuePainelProdutos.tipoMoveisAtiva = vuePainelProdutos.tipoMoveisPortugues;
		vuePainelProdutos.tipoEmpresariaisAtiva = vuePainelProdutos.tipoEmpresariaisPortugues;
		vuePainelProdutos.tipoCarrosAtiva = vuePainelProdutos.tipoCarrosPortugues;
		vuePainelProdutos.tipoMotosAtiva = vuePainelProdutos.tipoMotosPortugues;
		vuePainelProdutos.tipoCaminhoesAtiva = vuePainelProdutos.tipoCaminhoesPortugues;
		vuePainelProdutos.tipoCaminhonetesAtiva = vuePainelProdutos.tipoCaminhonetesPortugues;
		vuePainelProdutos.tipoOutrosAtiva = vuePainelProdutos.tipoOutrosPortugues;
		
		// idedntificador das páginas
		vuePainelProdutos.palavraPaginaAtiva = vuePainelProdutos.palavraPaginaPortugues;
		vuePainelProdutos.palavraDeAtiva = vuePainelProdutos.palavraDePortugues;
	}

	// english - eua
	else {
		
		// title e headers
		vuePainelProdutos.tituloProdutosAtiva = vuePainelProdutos.tituloProdutosEnglish;
		vuePainelProdutos.trEditarAtiva = vuePainelProdutos.trEditarEnglish;
		vuePainelProdutos.trNomeAtiva = vuePainelProdutos.trNomeEnglish;
		vuePainelProdutos.trEstoqueAtiva = vuePainelProdutos.trEstoqueEnglish;
		vuePainelProdutos.trPrecoAtiva = vuePainelProdutos.trPrecoEnglish;
		vuePainelProdutos.trStatusAtiva = vuePainelProdutos.trStatusEnglish;
		vuePainelProdutos.trTipoAtiva = vuePainelProdutos.trTipoEnglish;
		
		// rows da tabela
		vuePainelProdutos.botaoAlterarAtiva = vuePainelProdutos.botaoAlterarEnglish;
		vuePainelProdutos.botaoQRCodeAtiva = vuePainelProdutos.botaoQRCodeEnglish;
		vuePainelProdutos.statusPendenteAtiva = vuePainelProdutos.statusPendenteEnglish;
		vuePainelProdutos.statusVendaAtiva = vuePainelProdutos.statusVendaEnglish;
		vuePainelProdutos.statusVendidoAtiva = vuePainelProdutos.statusVendidoEnglish;
		
		// tipos produtos
		vuePainelProdutos.tipoDocesAtiva = vuePainelProdutos.tipoDocesEnglish;
		vuePainelProdutos.tipoSalgadosAtiva = vuePainelProdutos.tipoSalgadosEnglish;
		vuePainelProdutos.tipoOutrosAlimentosAtiva = vuePainelProdutos.tipoOutrosAlimentosEnglish;
		vuePainelProdutos.tipoCelularesAtiva = vuePainelProdutos.tipoCelularesEnglish;
		vuePainelProdutos.tipoInformaticaAtiva = vuePainelProdutos.tipoInformaticaEnglish;
		vuePainelProdutos.tipoGamesAtiva = vuePainelProdutos.tipoGamesEnglish;
		vuePainelProdutos.tipoLivrosAtiva = vuePainelProdutos.tipoLivrosEnglish;
		vuePainelProdutos.tipoMangasAtiva = vuePainelProdutos.tipoMangasEnglish;
		vuePainelProdutos.tipoBrinquedosAtiva = vuePainelProdutos.tipoBrinquedosEnglish;
		vuePainelProdutos.tipoDecoracaoAtiva = vuePainelProdutos.tipoDecoracaoEnglish;
		vuePainelProdutos.tipoRoupasAtiva = vuePainelProdutos.tipoRoupasEnglish;
		vuePainelProdutos.tipoPerfumariaAtiva = vuePainelProdutos.tipoPerfumariaEnglish;
		vuePainelProdutos.tipoEletrodomesticosAtiva = vuePainelProdutos.tipoEletrodomesticosEnglish;
		vuePainelProdutos.tipoMoveisAtiva = vuePainelProdutos.tipoMoveisEnglish;
		vuePainelProdutos.tipoEmpresariaisAtiva = vuePainelProdutos.tipoEmpresariaisEnglish;
		vuePainelProdutos.tipoCarrosAtiva = vuePainelProdutos.tipoCarrosEnglish;
		vuePainelProdutos.tipoMotosAtiva = vuePainelProdutos.tipoMotosEnglish;
		vuePainelProdutos.tipoCaminhoesAtiva = vuePainelProdutos.tipoCaminhoesEnglish;
		vuePainelProdutos.tipoCaminhonetesAtiva = vuePainelProdutos.tipoCaminhonetesEnglish;
		vuePainelProdutos.tipoOutrosAtiva = vuePainelProdutos.tipoOutrosEnglish;
		
		// idedntificador das páginas
		vuePainelProdutos.palavraPaginaAtiva = vuePainelProdutos.palavraPaginaEnglish;
		vuePainelProdutos.palavraDeAtiva = vuePainelProdutos.palavraDeEnglish;
	}
};