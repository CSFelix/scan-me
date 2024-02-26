const sectionTrocarIdioma = document.getElementById("sectionSwitchLanguage");
const iconeLista = document.getElementById("listIcon");
const idiomaAtual = localStorage.getItem('language');
const idiomaLista = document.getElementById("languageList");
const identificadorLinguagem = document.getElementById("idiomaAtivado");
const tabelaProdutosTraducao = document.getElementById("tabelaProdutos");

// recupera último idioma salvo pelo usuário antes do carregamento da página
if (idiomaAtual) {
    
    // Português - Brasil
    if (idiomaAtual === '1') { 
    	identificadorLinguagem.innerHTML = '(Português - Brasil)';
    	document.querySelector('#languageList option[value="1"]').selected = true;
    }

    else {
    	identificadorLinguagem.innerHTML = '(English - United States)';
    	document.querySelector('#languageList option[value="2"]').selected = true;
    }

    // tradução dos conteúdos
    vueAtivarControladorIdiomaNav();
    vueAtivarControladorMenuVertical();
    
    /* painéis vendedores - disponíveis somente para vendedores */
    try {
    	vueAtivarControladorPainelDashboard();
        vueAtivarControladorPainelProdutos();
        vueAtivarControladorPainelRelatorios();
        vueAtivarControladorIdiomaModalQRCodePainelTabelaProduto();
    }
    catch (Exception) { }
    
    /* painéis padrões - disponíveis para qualquer tipo de usuário */
    vueAtivarControladorPainelLoja();
    vueAtivarControladorPainelScanner();
    vueAtivarControladorPainelInfo();
    vueAtivarControladorIdiomaModalAlteracaoDadosUsuariosPainelInfo();
}

else {
	
	// definição do idioma Inglês - EUA quando usuário não definiu nenhum idioma
	localStorage.setItem('language', '2');
	
	identificadorLinguagem.innerHTML = '(English - United States)';
	document.querySelector('#languageList option[value="2"]').selected = true;
	
	// tradução dos conteúdos
    vueAtivarControladorIdiomaNav();
    vueAtivarControladorMenuVertical();
    
    /* painéis vendedores - disponíveis somente para vendedores */
    try {
    	vueAtivarControladorPainelDashboard();
        vueAtivarControladorPainelProdutos();
        vueAtivarControladorPainelRelatorios();
        vueAtivarControladorIdiomaModalQRCodePainelTabelaProduto();
    }
    catch (Exception) { }
    
    /* painéis padrões - disponíveis para qualquer tipo de usuário */
    vueAtivarControladorPainelLoja();
    vueAtivarControladorPainelScanner();
    vueAtivarControladorPainelInfo();
    vueAtivarControladorIdiomaModalAlteracaoDadosUsuariosPainelInfo();
}

// carregamento da lista de idiomas
sectionTrocarIdioma.addEventListener('click', () => {

	// ativação da lista de idiomas
	if (iconeLista.classList.contains("fa-arrow-up")) {
		iconeLista.classList.remove("fa-arrow-up");
		iconeLista.classList.add("fa-arrow-down");
		
		idiomaLista.style.visibility = 'visible';
	}

	// desativação da lista
	else {
		iconeLista.classList.remove("fa-arrow-down");
		iconeLista.classList.add("fa-arrow-up");

		idiomaLista.style.visibility = 'hidden';
	}
});

// escolha \ alteração do idioma durante o uso da página
idiomaLista.addEventListener('change', () => {

	// português - br
	if (idiomaLista.value == '1') {
        localStorage.setItem('language', '1');
        identificadorLinguagem.innerHTML = '(Português - Brasil)';

        // identificação e tradução do modo escolhido
        // modo escuro ou claro
        if (localStorage.getItem('theme') == 'dark') { identificadorModo.innerHTML = "(Ativado)"; }
        else { identificadorModo.innerHTML = "(Desativado)"; }
	}

	// english - eua
	else {
 		localStorage.setItem('language', '2');
        identificadorLinguagem.innerHTML = '(English - United States)';

        // identificação e tradução do modo escolhido
        // dark or light mode
        if (localStorage.getItem('theme') == 'dark') { identificadorModo.innerHTML = "(Enabled)"; }
        else { identificadorModo.innerHTML = "(Disabled)"; }
	}

	// tradução dos conteúdos
	vueAtivarControladorIdiomaNav();
	vueAtivarControladorMenuVertical();
	
	/* painéis vendedores - disponíveis somente para vendedores */
    try {
    	vueAtivarControladorPainelDashboard();
        vueAtivarControladorPainelProdutos();
        vueAtivarControladorPainelRelatorios();
        vueAtivarControladorIdiomaModalQRCodePainelTabelaProduto();
        
        TraduzirTabelaProdutos();
    	BuscarDadosDashboardCallback(TraduzirDashboard);
    }
    catch (Exception) { }
    
    /* painéis padrões - disponíveis para qualquer tipo de usuário */
    vueAtivarControladorPainelLoja();
    vueAtivarControladorPainelScanner();
    vueAtivarControladorPainelInfo();
    vueAtivarControladorIdiomaModalAlteracaoDadosUsuariosPainelInfo();
    
    // tradução dos cartões dos produtos no mercado online
    BuscarListaProdutosLoja();
});

// função para atualização de tradução aos gráficos do dashboard
function TraduzirDashboard() {
	
	// gráfico status produtos
	chartStatus.data.labels = [vuePainelDashboard.labelPendenteGraficoStatusAtiva, 
	     					   vuePainelDashboard.labelVendaGraficoStatusAtiva, 
	     					   vuePainelDashboard.labelVendidoGraficoStatusAtiva];
	chartStatus.options.title.text = vuePainelDashboard.tituloGraficoStatusAtiva;
	chartStatus.update();

	// gráfico produtos mais visualizados
	chartVisualizacoes.data.labels = [vuePainelDashboard.labelQntGraficoVisualizacoesAtiva];
	chartVisualizacoes.options.title.text = vuePainelDashboard.tituloGraficoVisualizacoesAtiva;
	chartVisualizacoes.update();
}

// função para atualização de tradução da tabela de produtos
function TraduzirTabelaProdutos() {
	tabelaProdutosTraducao.innerHTML = tabelaProdutosTraducao.innerHTML
										// títulos da tabela
										.replace("Edit",      vuePainelProdutos.trEditarAtiva)    .replace("Editar",    vuePainelProdutos.trEditarAtiva)
										.replace("Name",      vuePainelProdutos.trNomeAtiva)      .replace("Nome",      vuePainelProdutos.trNomeAtiva)
										.replace("Stock",     vuePainelProdutos.trEstoqueAtiva)  .replace("Estoque",    vuePainelProdutos.trEstoqueAtiva)
										.replace("Price",     vuePainelProdutos.trPrecoAtiva)    .replace("Preço",      vuePainelProdutos.trPrecoAtiva)
										.replace("Status",    vuePainelProdutos.trStatusAtiva)  .replace("Status",      vuePainelProdutos.trStatusAtiva)
										.replace("Main Type", vuePainelProdutos.trTipoAtiva) .replace("Tipo Principal", vuePainelProdutos.trTipoAtiva)
										
										// botão de alteração e status
										.replaceAll("Alter",     vuePainelProdutos.botaoAlterarAtiva) .replaceAll("Alterar",     vuePainelProdutos.botaoAlterarAtiva)
										.replaceAll("Pending",   vuePainelProdutos.statusPendenteAtiva) .replaceAll("Pendente",  vuePainelProdutos.statusPendenteAtiva)
										.replaceAll("For Sale",  vuePainelProdutos.statusVendaAtiva) .replaceAll("À Venda",      vuePainelProdutos.statusVendaAtiva)
										.replaceAll("Sold",      vuePainelProdutos.statusVendidoAtiva) .replaceAll("Vendido",    vuePainelProdutos.statusVendidoAtiva)
										
										// tipos de produtos divididos em quatro grupos
										.replaceAll("Candy",        vuePainelProdutos.tipoDocesAtiva) .replaceAll("Doces",                       vuePainelProdutos.tipoDocesAtiva)
										.replaceAll("Salty",        vuePainelProdutos.tipoSalgadosAtiva) .replaceAll("Salgados",                 vuePainelProdutos.tipoSalgadosAtiva)
										.replaceAll("Other Foods",  vuePainelProdutos.tipoOutrosAlimentosAtiva) .replaceAll("Outros Alimentos",  vuePainelProdutos.tipoOutrosAlimentosAtiva)
										.replaceAll("Cellphones",   vuePainelProdutos.tipoCelularesAtiva) .replaceAll("Celulares",               vuePainelProdutos.tipoCelularesAtiva)
										.replaceAll("Computing",    vuePainelProdutos.tipoInformaticaAtiva) .replaceAll("Informática",           vuePainelProdutos.tipoInformaticaAtiva)
										
										.replaceAll("Games",       vuePainelProdutos.tipoGamesAtiva) .replaceAll("Games",            vuePainelProdutos.tipoGamesAtiva)
										.replaceAll("Books",       vuePainelProdutos.tipoLivrosAtiva) .replaceAll("Livros",          vuePainelProdutos.tipoLivrosAtiva)
										.replaceAll("Mangas",      vuePainelProdutos.tipoMangasAtiva) .replaceAll("Mangás",          vuePainelProdutos.tipoMangasAtiva)
										.replaceAll("Toys",        vuePainelProdutos.tipoBrinquedosAtiva) .replaceAll("Brinquedos",  vuePainelProdutos.tipoBrinquedosAtiva)
										.replaceAll("Decoration",  vuePainelProdutos.tipoDecoracaoAtiva) .replaceAll("Decoração",    vuePainelProdutos.tipoDecoracaoAtiva)
										
										.replaceAll("Clothes",          vuePainelProdutos.tipoRoupasAtiva) .replaceAll("Roupas",                      vuePainelProdutos.tipoRoupasAtiva)
										.replaceAll("Perfumery",        vuePainelProdutos.tipoPerfumariaAtiva) .replaceAll("Perfumaria",              vuePainelProdutos.tipoPerfumariaAtiva)
										.replaceAll("Home Appliances",  vuePainelProdutos.tipoEletrodomesticosAtiva) .replaceAll("Eletrodomésticos",  vuePainelProdutos.tipoEletrodomesticosAtiva)
										.replaceAll("Furnitures",       vuePainelProdutos.tipoMoveisAtiva) .replaceAll("Móveis",                      vuePainelProdutos.tipoMoveisAtiva)
										.replaceAll("Business",         vuePainelProdutos.tipoEmpresariaisAtiva) .replaceAll("Empresariais",          vuePainelProdutos.tipoEmpresariaisAtiva)
										
										.replaceAll("Cars",           vuePainelProdutos.tipoCarrosAtiva) .replaceAll("Carros",              vuePainelProdutos.tipoCarrosAtiva)
										.replaceAll("Motorcycles",    vuePainelProdutos.tipoMotosAtiva) .replaceAll("Motos",                vuePainelProdutos.tipoMotosAtiva)
										.replaceAll("Trucks",         vuePainelProdutos.tipoCaminhoesAtiva) .replaceAll("Caminhões",        vuePainelProdutos.tipoCaminhoesAtiva)
										.replaceAll("Pickup Trucks",  vuePainelProdutos.tipoCaminhonetesAtiva) .replaceAll("Caminhonetes",  vuePainelProdutos.tipoCaminhonetesAtiva)
										.replaceAll("Others",         vuePainelProdutos.tipoOutrosAtiva) .replaceAll("Outros",              vuePainelProdutos.tipoOutrosAtiva);
}