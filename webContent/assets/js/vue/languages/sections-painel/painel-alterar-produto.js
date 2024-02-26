/* 
	Variáveis
*/

var vuePainelAlterarProduto = new Vue({
  el: '#painelAlterarProduto',
  data: {	  
	  
	  /* dados principais dos produtos */
	  tituloAlterarProdutoPortugues: '📝 Alterar Produto  📝',
	  tituloAlterarProdutoEnglish: '📝 Product Update 📝',
	  tituloAlterarProdutoAtiva: '',
	  
	  botaoVoltarPortugues: 'Voltar',
	  botaoVoltarEnglish: 'Back',
	  botaoVoltarAtiva: '',
	  
	  spanFotosPortugues: 'Clique nos Campos para inserir fotos!',
	  spanFotosEnglish: 'Click in the Fields to insert the photos!',
	  spanFotosAtiva: '',
	  
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
	  contadorTagsAtivas: '',
	    
	  // mensagem de limite de tags ultrapassado
	  msgLimiteTagPortugues: '😢 Você pode selecionar até 5 tipos de produtos!',
	  msgLimiteTagEnglish: '😢 You can select untill 5 kinds of products!',
	  msgLimiteTagAtiva: '',
	  
	  // botões de salvar e cancelar e alteração
	  botaoCancelarPortugues: 'Cancelar',
	  botaoCancelarEnglish: 'Cancel',
	  botaoCancelarAtiva: '',
	  
	  botaoSalvarPortugues: 'Salvar',
	  botaoSalvarEnglish: 'Confirm',
	  botaoSalvarAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelAlterarProduto = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		/* dados principais dos produtos */
		vuePainelAlterarProduto.tituloAlterarProdutoAtiva = vuePainelAlterarProduto.tituloAlterarProdutoPortugues;
		vuePainelAlterarProduto.botaoVoltarAtiva = vuePainelAlterarProduto.botaoVoltarPortugues;
		vuePainelAlterarProduto.spanFotosAtiva = vuePainelAlterarProduto.spanFotosPortugues;
		vuePainelAlterarProduto.labelNomeProdutoAtiva = vuePainelAlterarProduto.labelNomeProdutoPortugues;
		vuePainelAlterarProduto.labelValorProdutoAtiva = vuePainelAlterarProduto.labelValorProdutoPortugues;
		vuePainelAlterarProduto.labelMoedaProdutoAtiva = vuePainelAlterarProduto.labelMoedaProdutoPortugues;
		vuePainelAlterarProduto.selectMoedaRealAtiva = vuePainelAlterarProduto.selectMoedaRealPortugues;
		vuePainelAlterarProduto.selectMoedaDolarAtiva = vuePainelAlterarProduto.selectMoedaDolarPortugues;
		vuePainelAlterarProduto.labelDescricaoAtiva = vuePainelAlterarProduto.labelDescricaoPortugues;
		vuePainelAlterarProduto.labelEstoqueAtiva = vuePainelAlterarProduto.labelEstoquePortugues;
		vuePainelAlterarProduto.labelStatusAtiva = vuePainelAlterarProduto.labelStatusPortugues;
		vuePainelAlterarProduto.selectStatusPendenteAtiva = vuePainelAlterarProduto.selectStatusPendentePortugues;
		vuePainelAlterarProduto.selectStatusVendaAtiva = vuePainelAlterarProduto.selectStatusVendaPortugues;
		vuePainelAlterarProduto.selectStatusVendidoAtiva = vuePainelAlterarProduto.selectStatusVendidoPortugues;
		vuePainelAlterarProduto.labelTipoPrincipalAtiva = vuePainelAlterarProduto.labelTipoPrincipalPortugues;
		vuePainelAlterarProduto.labelOutrosTiposAtiva = vuePainelAlterarProduto.labelOutrosTiposPortugues;
		
		/* grupos produtos */
		vuePainelAlterarProduto.grupoAlimentosAtiva = vuePainelAlterarProduto.grupoAlimentosPortugues;
		vuePainelAlterarProduto.grupoEletronicosAtiva = vuePainelAlterarProduto.grupoEletronicosPortugues;
		vuePainelAlterarProduto.grupoLazerAtiva = vuePainelAlterarProduto.grupoLazerPortugues;
		vuePainelAlterarProduto.grupoModaAtiva = vuePainelAlterarProduto.grupoModaPortugues;
		vuePainelAlterarProduto.grupoAmbienteAtiva = vuePainelAlterarProduto.grupoAmbientePortugues;
		vuePainelAlterarProduto.grupoAutomoveisAtiva = vuePainelAlterarProduto.grupoAutomoveisPortugues;
		vuePainelAlterarProduto.grupoOutrosAtiva = vuePainelAlterarProduto.grupoOutrosPortugues;
		
		/* tipos produtos */
		vuePainelAlterarProduto.tipoDocesAtiva = vuePainelAlterarProduto.tipoDocesPortugues;
		vuePainelAlterarProduto.tipoSalgadosAtiva = vuePainelAlterarProduto.tipoSalgadosPortugues;
		vuePainelAlterarProduto.tipoOutrosAlimentosAtiva = vuePainelAlterarProduto.tipoOutrosAlimentosPortugues;
		vuePainelAlterarProduto.tipoCelularesAtiva = vuePainelAlterarProduto.tipoCelularesPortugues;
		vuePainelAlterarProduto.tipoInformaticaAtiva = vuePainelAlterarProduto.tipoInformaticaPortugues;
		
		vuePainelAlterarProduto.tipoGamesAtiva = vuePainelAlterarProduto.tipoGamesPortugues;
		vuePainelAlterarProduto.tipoLivrosAtiva = vuePainelAlterarProduto.tipoLivrosPortugues;
		vuePainelAlterarProduto.tipoMangasAtiva = vuePainelAlterarProduto.tipoMangasPortugues;
		vuePainelAlterarProduto.tipoBrinquedosAtiva = vuePainelAlterarProduto.tipoBrinquedosPortugues;
		vuePainelAlterarProduto.tipoDecoracaoAtiva = vuePainelAlterarProduto.tipoDecoracaoPortugues;
		
		vuePainelAlterarProduto.tipoRoupasAtiva = vuePainelAlterarProduto.tipoRoupasPortugues;
		vuePainelAlterarProduto.tipoPerfumariaAtiva = vuePainelAlterarProduto.tipoPerfumariaPortugues;
		vuePainelAlterarProduto.tipoEletrodomesticosAtiva = vuePainelAlterarProduto.tipoEletrodomesticosPortugues;
		vuePainelAlterarProduto.tipoMoveisAtiva = vuePainelAlterarProduto.tipoMoveisPortugues;
		vuePainelAlterarProduto.tipoEmpresariaisAtiva = vuePainelAlterarProduto.tipoEmpresariaisPortugues;
		
		vuePainelAlterarProduto.tipoCarrosAtiva = vuePainelAlterarProduto.tipoCarrosPortugues;
		vuePainelAlterarProduto.tipoMotosAtiva = vuePainelAlterarProduto.tipoMotosPortugues;
		vuePainelAlterarProduto.tipoCaminhoesAtiva = vuePainelAlterarProduto.tipoCaminhoesPortugues;
		vuePainelAlterarProduto.tipoCaminhonetesAtiva = vuePainelAlterarProduto.tipoCaminhonetesPortugues;
		vuePainelAlterarProduto.tipoOutrosAtiva = vuePainelAlterarProduto.tipoOutrosPortugues;
		
		/* mensagem de limite de tags ultrapassado */
		vuePainelAlterarProduto.msgLimiteTagAtiva = vuePainelAlterarProduto.msgLimiteTagPortugues;
		
		/* botões de salvar e cancelar alteração */
		vuePainelAlterarProduto.botaoCancelarAtiva = vuePainelAlterarProduto.botaoCancelarPortugues;
		vuePainelAlterarProduto.botaoSalvarAtiva = vuePainelAlterarProduto.botaoSalvarPortugues;
	}

	// english - eua
	else {
		
		/* dados principais dos produtos */
		vuePainelAlterarProduto.tituloAlterarProdutoAtiva = vuePainelAlterarProduto.tituloAlterarProdutoEnglish;
		vuePainelAlterarProduto.botaoVoltarAtiva = vuePainelAlterarProduto.botaoVoltarEnglish;
		vuePainelAlterarProduto.spanFotosAtiva = vuePainelAlterarProduto.spanFotosEnglish;
		vuePainelAlterarProduto.labelNomeProdutoAtiva = vuePainelAlterarProduto.labelNomeProdutoEnglish;
		vuePainelAlterarProduto.labelValorProdutoAtiva = vuePainelAlterarProduto.labelValorProdutoEnglish;
		vuePainelAlterarProduto.labelMoedaProdutoAtiva = vuePainelAlterarProduto.labelMoedaProdutoEnglish;
		vuePainelAlterarProduto.selectMoedaRealAtiva = vuePainelAlterarProduto.selectMoedaRealEnglish;
		vuePainelAlterarProduto.selectMoedaDolarAtiva = vuePainelAlterarProduto.selectMoedaDolarEnglish;
		vuePainelAlterarProduto.labelDescricaoAtiva = vuePainelAlterarProduto.labelDescricaoEnglish;
		vuePainelAlterarProduto.labelEstoqueAtiva = vuePainelAlterarProduto.labelEstoqueEnglish;
		vuePainelAlterarProduto.labelStatusAtiva = vuePainelAlterarProduto.labelStatusEnglish;
		vuePainelAlterarProduto.selectStatusPendenteAtiva = vuePainelAlterarProduto.selectStatusPendenteEnglish;
		vuePainelAlterarProduto.selectStatusVendaAtiva = vuePainelAlterarProduto.selectStatusVendaEnglish;
		vuePainelAlterarProduto.selectStatusVendidoAtiva = vuePainelAlterarProduto.selectStatusVendidoEnglish;
		vuePainelAlterarProduto.labelTipoPrincipalAtiva = vuePainelAlterarProduto.labelTipoPrincipalEnglish;
		vuePainelAlterarProduto.labelOutrosTiposAtiva = vuePainelAlterarProduto.labelOutrosTiposEnglish;
		
		/* grupos produtos */
		vuePainelAlterarProduto.grupoAlimentosAtiva = vuePainelAlterarProduto.grupoAlimentosEnglish;
		vuePainelAlterarProduto.grupoEletronicosAtiva = vuePainelAlterarProduto.grupoEletronicosEnglish;
		vuePainelAlterarProduto.grupoLazerAtiva = vuePainelAlterarProduto.grupoLazerEnglish;
		vuePainelAlterarProduto.grupoModaAtiva = vuePainelAlterarProduto.grupoModaEnglish;
		vuePainelAlterarProduto.grupoAmbienteAtiva = vuePainelAlterarProduto.grupoAmbienteEnglish;
		vuePainelAlterarProduto.grupoAutomoveisAtiva = vuePainelAlterarProduto.grupoAutomoveisEnglish;
		vuePainelAlterarProduto.grupoOutrosAtiva = vuePainelAlterarProduto.grupoOutrosEnglish;
		
		/* tipos produtos */
		vuePainelAlterarProduto.tipoDocesAtiva = vuePainelAlterarProduto.tipoDocesEnglish;
		vuePainelAlterarProduto.tipoSalgadosAtiva = vuePainelAlterarProduto.tipoSalgadosEnglish;
		vuePainelAlterarProduto.tipoOutrosAlimentosAtiva = vuePainelAlterarProduto.tipoOutrosAlimentosEnglish;
		vuePainelAlterarProduto.tipoCelularesAtiva = vuePainelAlterarProduto.tipoCelularesEnglish;
		vuePainelAlterarProduto.tipoInformaticaAtiva = vuePainelAlterarProduto.tipoInformaticaEnglish;
		
		vuePainelAlterarProduto.tipoGamesAtiva = vuePainelAlterarProduto.tipoGamesEnglish;
		vuePainelAlterarProduto.tipoLivrosAtiva = vuePainelAlterarProduto.tipoLivrosEnglish;
		vuePainelAlterarProduto.tipoMangasAtiva = vuePainelAlterarProduto.tipoMangasEnglish;
		vuePainelAlterarProduto.tipoBrinquedosAtiva = vuePainelAlterarProduto.tipoBrinquedosEnglish;
		vuePainelAlterarProduto.tipoDecoracaoAtiva = vuePainelAlterarProduto.tipoDecoracaoEnglish;
		
		vuePainelAlterarProduto.tipoRoupasAtiva = vuePainelAlterarProduto.tipoRoupasEnglish;
		vuePainelAlterarProduto.tipoPerfumariaAtiva = vuePainelAlterarProduto.tipoPerfumariaEnglish;
		vuePainelAlterarProduto.tipoEletrodomesticosAtiva = vuePainelAlterarProduto.tipoEletrodomesticosEnglish;
		vuePainelAlterarProduto.tipoMoveisAtiva = vuePainelAlterarProduto.tipoMoveisEnglish;
		vuePainelAlterarProduto.tipoEmpresariaisAtiva = vuePainelAlterarProduto.tipoEmpresariaisEnglish;
		
		vuePainelAlterarProduto.tipoCarrosAtiva = vuePainelAlterarProduto.tipoCarrosEnglish;
		vuePainelAlterarProduto.tipoMotosAtiva = vuePainelAlterarProduto.tipoMotosEnglish;
		vuePainelAlterarProduto.tipoCaminhoesAtiva = vuePainelAlterarProduto.tipoCaminhoesEnglish;
		vuePainelAlterarProduto.tipoCaminhonetesAtiva = vuePainelAlterarProduto.tipoCaminhonetesEnglish;
		vuePainelAlterarProduto.tipoOutrosAtiva = vuePainelAlterarProduto.tipoOutrosEnglish;
		
		/* mensagem de limite de tags ultrapassado */
		vuePainelAlterarProduto.msgLimiteTagAtiva = vuePainelAlterarProduto.msgLimiteTagEnglish;
		
		/* botões de salvar e cancelar alteração */
		vuePainelAlterarProduto.botaoCancelarAtiva = vuePainelAlterarProduto.botaoCancelarEnglish;
		vuePainelAlterarProduto.botaoSalvarAtiva = vuePainelAlterarProduto.botaoSalvarEnglish;
	}
};