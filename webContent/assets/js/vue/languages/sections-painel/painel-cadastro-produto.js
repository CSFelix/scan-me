/* 
	Variáveis
*/

var vuePainelCadastroProduto = new Vue({
  el: '#painelCadastroProduto',
  data: {
	  
	/* títulos e botões */
    tituloCadastroProdutoPortugues: '📦 Cadastro - Produto 📦',
    tituloCadastroProdutoEnglish: '📦 Insert - Product 📦',
    tituloCadastroProdutoAtiva: '',
    
    botaoVoltarPortugues: 'Voltar',
    botaoVoltarEnglish: 'Back',
    botaoVoltarAtiva: '',
    
    botaoCancelarPortugues: 'Cancelar', 
    botaoCancelarEnglish: 'Cancel',
    botaoCancelarAtiva: '',
    
    botaoSalvarPortugues: 'Salvar',
    botaoSalvarEnglish: 'Confirm',
    botaoSalvarAtiva: '',
    
    /* span fotos */
    spanFotosPortugues: 'Clique nos Campos para inserir fotos!',
    spanFotosEnglish: 'Tap on the Fields to insert the photos!',
    spanFotosAtiva: '',
    
    /* campos */
    labelNomeProdutoPortugues: 'Nome',
    labelNomeProdutoEnglish: 'Name',
    labelNomeProdutoAtiva: '',
    
    labelValorProdutoPortugues: 'Preço',
    labelValorProdutoEnglish: 'Price',
    labelValorProdutoAtiva: '',
    
    labelMoedaProdutoPortugues: '💱 Moeda:',
    labelMoedaProdutoEnglish: '💱 Coin:',
    labelMoedaProdutoAtiva: '',
    
    selectMoedaRealPortugues: 'Real (R$)',
    selectMoedaRealEnglish: 'Real (R$)',
    selectMoedaRealAtiva: '',
    
    selectMoedaDolarPortugues: 'Dólar (U$)',
    selectMoedaDolarEnglish: 'Dollar (U$)',
    selectMoedaDolarAtiva: '',
    
    labelDescricaoPortugues: 'Descrição',
    labelDescricaoEnglish: 'Description',
    labelDescricaoAtiva: '',
    
    labelEstoquePortugues: 'Estoque',
    labelEstoqueEnglish: 'Stock',
    labelEstoqueAtiva: '',
    
    labelStatusPortugues: '☑️ Status:',
    labelStatusEnglish: '☑️ Status:',
    labelStatusAtiva: '',
    
    selectStatusPendentePortugues: 'Pendente',
    selectStatusPendenteEnglish: 'Pending',
    selectStatusPendenteAtiva: '',
    
    selectStatusVendaPortugues: 'À Venda',
    selectStatusVendaEnglish: 'For Sale',
    selectStatusVendaAtiva: '',
    
    selectStatusVendidoPortugues: 'Vendido',
    selectStatusVendidoEnglish: 'Sold',
    selectStatusVendidoAtiva: '',
    
    labelTipoPrincipalPortugues: '🌌 Tipo Principal:',
    labelTipoPrincipalEnglish: '🌌 Main Type:',
    labelTipoPrincipalAtiva: '',
    
    labelOutrosTiposPortugues: '🌌 Outros Tipos:',
    labelOutrosTiposEnglish: '🌌 Other Types:',
    labelOutrosTiposAtiva: '',
    
    // grupos produtos
    grupoAlimentosPortugues: 'Alimentos',
    grupoAlimentosEnglish: 'Foods',
    grupoAlimentosAtiva: '',
    
    grupoEletronicosPortugues: 'Eletrônicos',
    grupoEletronicosEnglish: 'Eletronics',
    grupoEletronicosAtiva: '',
    
    grupoLazerPortugues: 'Lazer',
    grupoLazerEnglish: 'Recreation',
    grupoLazerAtiva: '',
    
    grupoModaPortugues: 'Moda',
    grupoModaEnglish: 'Fashion',
    grupoModaAtiva: '',
    
    grupoAmbientePortugues: 'Ambiente',
    grupoAmbienteEnglish: 'Environment',
    grupoAmbienteAtiva: '',
    
    grupoAutomoveisPortugues: 'Automóveis',
    grupoAutomoveisEnglish: 'Automobiles',
    grupoAutomoveisAtiva: '',
    
    grupoOutrosPortugues: 'Outros',
    grupoOutrosEnglish: 'Others',
    grupoOutrosAtiva: '',
    
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
    
    // contador de tags ativadas
    contadorTagsAtivas: 0,
    
    // mensagem de limite de tags ultrapassado
    msgLimiteTagPortugues: '😢 Você pode selecionar até 5 tipos de produtos!',
    msgLimiteTagEnglish: '😢 You can select untill 5 kinds of products!',
    msgLimiteTagAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelCadastroProduto = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		/* títulos e botões */
		vuePainelCadastroProduto.tituloCadastroProdutoAtiva = vuePainelCadastroProduto.tituloCadastroProdutoPortugues;
		vuePainelCadastroProduto.botaoVoltarAtiva = vuePainelCadastroProduto.botaoVoltarPortugues;
		vuePainelCadastroProduto.botaoCancelarAtiva = vuePainelCadastroProduto.botaoCancelarPortugues;
		vuePainelCadastroProduto.botaoSalvarAtiva = vuePainelCadastroProduto.botaoSalvarPortugues;
		
		/* span */
		vuePainelCadastroProduto.spanFotosAtiva = vuePainelCadastroProduto.spanFotosPortugues;
		
		/* campos */
		vuePainelCadastroProduto.labelNomeProdutoAtiva = vuePainelCadastroProduto.labelNomeProdutoPortugues;
		vuePainelCadastroProduto.labelValorProdutoAtiva = vuePainelCadastroProduto.labelValorProdutoPortugues;
		vuePainelCadastroProduto.labelMoedaProdutoAtiva = vuePainelCadastroProduto.labelMoedaProdutoPortugues;
		vuePainelCadastroProduto.selectMoedaRealAtiva = vuePainelCadastroProduto.selectMoedaRealPortugues;
		vuePainelCadastroProduto.selectMoedaDolarAtiva = vuePainelCadastroProduto.selectMoedaDolarPortugues;
		vuePainelCadastroProduto.labelDescricaoAtiva = vuePainelCadastroProduto.labelDescricaoPortugues;
		vuePainelCadastroProduto.labelEstoqueAtiva = vuePainelCadastroProduto.labelEstoquePortugues;
		vuePainelCadastroProduto.labelStatusAtiva = vuePainelCadastroProduto.labelStatusPortugues;
		vuePainelCadastroProduto.selectStatusPendenteAtiva = vuePainelCadastroProduto.selectStatusPendentePortugues;
		vuePainelCadastroProduto.selectStatusVendaAtiva = vuePainelCadastroProduto.selectStatusVendaPortugues;
		vuePainelCadastroProduto.selectStatusVendidoAtiva = vuePainelCadastroProduto.selectStatusVendidoPortugues;
		vuePainelCadastroProduto.labelTipoPrincipalAtiva = vuePainelCadastroProduto.labelTipoPrincipalPortugues;
		vuePainelCadastroProduto.labelOutrosTiposAtiva = vuePainelCadastroProduto.labelOutrosTiposPortugues;
		
		/* grupos de produtos */
		vuePainelCadastroProduto.grupoAlimentosAtiva = vuePainelCadastroProduto.grupoAlimentosPortugues;
		vuePainelCadastroProduto.grupoEletronicosAtiva = vuePainelCadastroProduto.grupoEletronicosPortugues;
		vuePainelCadastroProduto.grupoLazerAtiva = vuePainelCadastroProduto.grupoLazerPortugues;
		vuePainelCadastroProduto.grupoModaAtiva = vuePainelCadastroProduto.grupoModaPortugues;
		vuePainelCadastroProduto.grupoAmbienteAtiva = vuePainelCadastroProduto.grupoAmbientePortugues;
		vuePainelCadastroProduto.grupoAutomoveisAtiva = vuePainelCadastroProduto.grupoAutomoveisPortugues;
		vuePainelCadastroProduto.grupoOutrosAtiva = vuePainelCadastroProduto.grupoOutrosPortugues;
		
		/* tipos de produtos */
		vuePainelCadastroProduto.tipoDocesAtiva = vuePainelCadastroProduto.tipoDocesPortugues;
		vuePainelCadastroProduto.tipoSalgadosAtiva = vuePainelCadastroProduto.tipoSalgadosPortugues;
		vuePainelCadastroProduto.tipoOutrosAlimentosAtiva = vuePainelCadastroProduto.tipoOutrosAlimentosPortugues;
		vuePainelCadastroProduto.tipoCelularesAtiva = vuePainelCadastroProduto.tipoCelularesPortugues;
		vuePainelCadastroProduto.tipoInformaticaAtiva = vuePainelCadastroProduto.tipoInformaticaPortugues;
		vuePainelCadastroProduto.tipoGamesAtiva = vuePainelCadastroProduto.tipoGamesPortugues;
		vuePainelCadastroProduto.tipoLivrosAtiva = vuePainelCadastroProduto.tipoLivrosPortugues;
		vuePainelCadastroProduto.tipoMangasAtiva = vuePainelCadastroProduto.tipoMangasPortugues;
		vuePainelCadastroProduto.tipoBrinquedosAtiva = vuePainelCadastroProduto.tipoBrinquedosPortugues;
		vuePainelCadastroProduto.tipoDecoracaoAtiva = vuePainelCadastroProduto.tipoDecoracaoPortugues;
		vuePainelCadastroProduto.tipoRoupasAtiva = vuePainelCadastroProduto.tipoRoupasPortugues;
		vuePainelCadastroProduto.tipoPerfumariaAtiva = vuePainelCadastroProduto.tipoPerfumariaPortugues;
		vuePainelCadastroProduto.tipoEletrodomesticosAtiva = vuePainelCadastroProduto.tipoEletrodomesticosPortugues;
		vuePainelCadastroProduto.tipoMoveisAtiva = vuePainelCadastroProduto.tipoMoveisPortugues;
		vuePainelCadastroProduto.tipoEmpresariaisAtiva = vuePainelCadastroProduto.tipoEmpresariaisPortugues;
		vuePainelCadastroProduto.tipoCarrosAtiva = vuePainelCadastroProduto.tipoCarrosPortugues;
		vuePainelCadastroProduto.tipoMotosAtiva = vuePainelCadastroProduto.tipoMotosPortugues;
		vuePainelCadastroProduto.tipoCaminhoesAtiva = vuePainelCadastroProduto.tipoCaminhoesPortugues;
		vuePainelCadastroProduto.tipoCaminhonetesAtiva = vuePainelCadastroProduto.tipoCaminhonetesPortugues;
		vuePainelCadastroProduto.tipoOutrosAtiva = vuePainelCadastroProduto.tipoOutrosPortugues;
		
		vuePainelCadastroProduto.msgLimiteTagAtiva = vuePainelCadastroProduto.msgLimiteTagPortugues;
	}

	// english - eua
	else {
		
		/* título e botões */
		vuePainelCadastroProduto.tituloCadastroProdutoAtiva = vuePainelCadastroProduto.tituloCadastroProdutoEnglish;
		vuePainelCadastroProduto.botaoVoltarAtiva = vuePainelCadastroProduto.botaoVoltarEnglish;
		vuePainelCadastroProduto.botaoCancelarAtiva = vuePainelCadastroProduto.botaoCancelarEnglish;
		vuePainelCadastroProduto.botaoSalvarAtiva = vuePainelCadastroProduto.botaoSalvarEnglish;
		
		/* span */
		vuePainelCadastroProduto.spanFotosAtiva = vuePainelCadastroProduto.spanFotosEnglish;
		
		/* campos */
		vuePainelCadastroProduto.labelNomeProdutoAtiva = vuePainelCadastroProduto.labelNomeProdutoEnglish;
		vuePainelCadastroProduto.labelValorProdutoAtiva = vuePainelCadastroProduto.labelValorProdutoEnglish;
		vuePainelCadastroProduto.labelMoedaProdutoAtiva = vuePainelCadastroProduto.labelMoedaProdutoEnglish;
		vuePainelCadastroProduto.selectMoedaRealAtiva = vuePainelCadastroProduto.selectMoedaRealEnglish;
		vuePainelCadastroProduto.selectMoedaDolarAtiva = vuePainelCadastroProduto.selectMoedaDolarEnglish;
		vuePainelCadastroProduto.labelDescricaoAtiva = vuePainelCadastroProduto.labelDescricaoEnglish;
		vuePainelCadastroProduto.labelEstoqueAtiva = vuePainelCadastroProduto.labelEstoqueEnglish;
		vuePainelCadastroProduto.labelStatusAtiva = vuePainelCadastroProduto.labelStatusEnglish;
		vuePainelCadastroProduto.selectStatusPendenteAtiva = vuePainelCadastroProduto.selectStatusPendenteEnglish;
		vuePainelCadastroProduto.selectStatusVendaAtiva = vuePainelCadastroProduto.selectStatusVendaEnglish;
		vuePainelCadastroProduto.selectStatusVendidoAtiva = vuePainelCadastroProduto.selectStatusVendidoEnglish;
		vuePainelCadastroProduto.labelTipoPrincipalAtiva = vuePainelCadastroProduto.labelTipoPrincipalEnglish;
		vuePainelCadastroProduto.labelOutrosTiposAtiva = vuePainelCadastroProduto.labelOutrosTiposEnglish;
		
		/* grupos de produtos */
		vuePainelCadastroProduto.grupoAlimentosAtiva = vuePainelCadastroProduto.grupoAlimentosEnglish;
		vuePainelCadastroProduto.grupoEletronicosAtiva = vuePainelCadastroProduto.grupoEletronicosEnglish;
		vuePainelCadastroProduto.grupoLazerAtiva = vuePainelCadastroProduto.grupoLazerEnglish;
		vuePainelCadastroProduto.grupoModaAtiva = vuePainelCadastroProduto.grupoModaEnglish;
		vuePainelCadastroProduto.grupoAmbienteAtiva = vuePainelCadastroProduto.grupoAmbienteEnglish;
		vuePainelCadastroProduto.grupoAutomoveisAtiva = vuePainelCadastroProduto.grupoAutomoveisEnglish;
		vuePainelCadastroProduto.grupoOutrosAtiva = vuePainelCadastroProduto.grupoOutrosEnglish;
	
		/* tipos de produtos */
		vuePainelCadastroProduto.tipoDocesAtiva = vuePainelCadastroProduto.tipoDocesEnglish;
		vuePainelCadastroProduto.tipoSalgadosAtiva = vuePainelCadastroProduto.tipoSalgadosEnglish;
		vuePainelCadastroProduto.tipoOutrosAlimentosAtiva = vuePainelCadastroProduto.tipoOutrosAlimentosEnglish;
		vuePainelCadastroProduto.tipoCelularesAtiva = vuePainelCadastroProduto.tipoCelularesEnglish;
		vuePainelCadastroProduto.tipoInformaticaAtiva = vuePainelCadastroProduto.tipoInformaticaEnglish;
		vuePainelCadastroProduto.tipoGamesAtiva = vuePainelCadastroProduto.tipoGamesEnglish;
		vuePainelCadastroProduto.tipoLivrosAtiva = vuePainelCadastroProduto.tipoLivrosEnglish;
		vuePainelCadastroProduto.tipoMangasAtiva = vuePainelCadastroProduto.tipoMangasEnglish;
		vuePainelCadastroProduto.tipoBrinquedosAtiva = vuePainelCadastroProduto.tipoBrinquedosEnglish;
		vuePainelCadastroProduto.tipoDecoracaoAtiva = vuePainelCadastroProduto.tipoDecoracaoEnglish;
		vuePainelCadastroProduto.tipoRoupasAtiva = vuePainelCadastroProduto.tipoRoupasEnglish;
		vuePainelCadastroProduto.tipoPerfumariaAtiva = vuePainelCadastroProduto.tipoPerfumariaEnglish;
		vuePainelCadastroProduto.tipoEletrodomesticosAtiva = vuePainelCadastroProduto.tipoEletrodomesticosEnglish;
		vuePainelCadastroProduto.tipoMoveisAtiva = vuePainelCadastroProduto.tipoMoveisEnglish;
		vuePainelCadastroProduto.tipoEmpresariaisAtiva = vuePainelCadastroProduto.tipoEmpresariaisEnglish;
		vuePainelCadastroProduto.tipoCarrosAtiva = vuePainelCadastroProduto.tipoCarrosEnglish;
		vuePainelCadastroProduto.tipoMotosAtiva = vuePainelCadastroProduto.tipoMotosEnglish;
		vuePainelCadastroProduto.tipoCaminhoesAtiva = vuePainelCadastroProduto.tipoCaminhoesEnglish;
		vuePainelCadastroProduto.tipoCaminhonetesAtiva = vuePainelCadastroProduto.tipoCaminhonetesEnglish;
		vuePainelCadastroProduto.tipoOutrosAtiva = vuePainelCadastroProduto.tipoOutrosEnglish;
		
		vuePainelCadastroProduto.msgLimiteTagAtiva = vuePainelCadastroProduto.msgLimiteTagEnglish;
	}
};