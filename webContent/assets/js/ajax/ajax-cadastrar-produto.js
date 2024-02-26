// formulário
const formCadastroProduto = document.getElementById("formCadastroProduto");

// botão de salvar
const botaoSalvar = document.getElementById("botaoSalvarProduto");

// inputs imagens
const inputImagem1 = document.getElementById("fotoProduto1");
const inputImagem2 = document.getElementById("fotoProduto2");
const inputImagem3 = document.getElementById("fotoProduto3");
const inputImagem4 = document.getElementById("fotoProduto4");
const inputImagem5 = document.getElementById("fotoProduto5");
const inputImagem6 = document.getElementById("fotoProduto6");

// inputs textos
const inputNomeProduto = document.getElementById("inputNomeProduto");
const inputValorProduto = document.getElementById("inputValorProduto");
const inputMoedaProduto = document.getElementById("moedaSelecionada");
const inputDescricaoProduto = document.getElementById("inputDescricaoProduto");
const inputEstoqueProduto = document.getElementById("inputEstoqueProduto");
const inputStatusProduto = document.getElementById("statusSelecionado");
const inputTipoPrincipalProduto = document.getElementById("tipoPrincipalSelecionado");

// labels outros tipos selecionados
const labelDoces = document.getElementById("labelTipoDoces");
const labelSalgados = document.getElementById("labelTipoSalgados");
const labelOutrosAlimentos = document.getElementById("labelTipoOutrosAlimentos");

const labelCelulares = document.getElementById("labelTipoCelulares");
const labelInformatica = document.getElementById("labelTipoInformatica");
const labelGames = document.getElementById("labelTipoGames");

const labelLivros = document.getElementById("labelTipoLivros");
const labelMangas = document.getElementById("labelTipoMangas");
const labelBrinquedos = document.getElementById("labelTipoBrinquedos");

const labelDecoracoes = document.getElementById("labelTipoDecoracoes");
const labelRoupas = document.getElementById("labelTipoRoupas");
const labelPerfumaria = document.getElementById("labelTipoPerfumaria");

const labelEletrodomesticos = document.getElementById("labelTipoEletrodomesticos");
const labelMoveis = document.getElementById("labelTipoMoveis");
const labelEmpresariais = document.getElementById("labelTipoEmpresariais");

const labelCarros = document.getElementById("labelTipoCarros");
const labelMotos = document.getElementById("labelTipoMotos");
const labelCaminhoes = document.getElementById("labelTipoCaminhoes");
const labelCaminhonetes = document.getElementById("labelTipoCaminhonetes");

const labelOutros = document.getElementById("labelTipoOutros");

// checkbox outros tipos selecionados
const checkboxDoces = document.getElementById("checkboxTipoDoces");
const checkboxSalgados = document.getElementById("checkboxTipoSalgados");
const checkboxOutrosAlimentos = document.getElementById("checkboxTipoOutrosAlimentos");

const checkboxCelulares = document.getElementById("checkboxTipoCelulares");
const checkboxInformatica = document.getElementById("checkboxTipoInformatica");
const checkboxGames = document.getElementById("checkboxTipoGames");

const checkboxLivros = document.getElementById("checkboxTipoLivros");
const checkboxMangas = document.getElementById("checkboxTipoMangas");
const checkboxBrinquedos = document.getElementById("checkboxTipoBrinquedos");

const checkboxDecoracoes = document.getElementById("checkboxTipoDecoracao");
const checkboxRoupas = document.getElementById("checkboxTipoRoupas");
const checkboxPerfumaria = document.getElementById("checkboxTipoPerfumaria");

const checkboxEletrodomesticos = document.getElementById("checkboxTipoEletrodomesticos");
const checkboxMoveis = document.getElementById("checkboxTipoMoveis");
const checkboxEmpresariais = document.getElementById("checkboxTipoEmpresariais");

const checkboxCarros = document.getElementById("checkboxTipoCarros");
const checkboxMotos = document.getElementById("checkboxTipoMotos");
const checkboxCaminhoes = document.getElementById("checkboxTipoCaminhoes");
const checkboxCaminhonetes = document.getElementById("checkboxTipoCaminhonetes");

const checkboxOutros = document.getElementById("checkboxTipoOutros");

//confirmações
var confirmarEstoqueZerado;

// idioma
var idioma;

// regex
const regexNome = new RegExp("^[A-Za-z0-9áéíóúâêîôûãõñàèìòùç ]{3,250}$");
const regexValorEstoque = new RegExp("^[0-9,.]{0,}$");
const regexDescricao = new RegExp("^[A-Za-z0-9áéíóúâêîôûãõñàèìòùç*+/_= ]{0,500}$");

//###################################################################################

// recuperação dos valores salvos na session
// e definição do tipo padrão de produto
try {
	inputNomeProduto.value = sessionStorage.getItem("nome_produto");
	inputValorProduto.value = sessionStorage.getItem("valor_produto");
	inputDescricaoProduto.value = sessionStorage.getItem("descricao_produto");
	inputEstoqueProduto.value = sessionStorage.getItem("estoque_produto");
	
	/*
	 * redefino a session antes do carregamento da página apenas para não
	 * ter o perigo dela ficar salva na memória e ter problemas ao marcar
	 * o tipo principal ao recarregar a página
	 * */
	sessionStorage.setItem("tipo_selecionado_tag", "");
	labelDoces.click();
	sessionStorage.setItem("tipo_selecionado_tag", "1");
}
catch (exception) {}

// alteração do valor do input de tipo
inputTipoPrincipalProduto.addEventListener("change", () => {
	var tipo_principal_selecionado = inputTipoPrincipalProduto.value;
	
	try {
		// redefinição da section => section fica vazia para poder desativar e ativar tags
		// o armazenamento do valor real é atribuído no final deste bloco
		sessionStorage.setItem("tipo_selecionado_tag", "");
		
		// desativar todas as tags escolhidas anteriormente
		const tipo_selecionado_anteriormente = document.querySelectorAll(".tagAtivada");
		for (i = 0; i < tipo_selecionado_anteriormente.length; i++) { tipo_selecionado_anteriormente[i].click(); }
		
		// ativação da nova tag principal escolhida
		if (tipo_principal_selecionado == "1") { labelDoces.click(); }
		else if (tipo_principal_selecionado == "2") { labelSalgados.click(); }
		else if (tipo_principal_selecionado == "3") { labelOutrosAlimentos.click(); }
		
		else if (tipo_principal_selecionado == "4") { labelCelulares.click(); }
		else if (tipo_principal_selecionado == "5") { labelInformatica.click(); }
		else if (tipo_principal_selecionado == "6") { labelGames.click(); }
		
		else if (tipo_principal_selecionado == "7") { labelLivros.click(); }
		else if (tipo_principal_selecionado == "8") { labelMangas.click(); }
		else if (tipo_principal_selecionado == "9") { labelBrinquedos.click(); }
		
		else if (tipo_principal_selecionado == "10") { labelDecoracoes.click(); }
		else if (tipo_principal_selecionado == "11") { labelRoupas.click(); }
		else if (tipo_principal_selecionado == "12") { labelPerfumaria.click(); }
		
		else if (tipo_principal_selecionado == "13") { labelEletrodomesticos.click(); }
		else if (tipo_principal_selecionado == "14") { labelMoveis.click(); }
		else if (tipo_principal_selecionado == "15") { labelEmpresariais.click(); }
		
		else if (tipo_principal_selecionado == "16") { labelCarros.click(); }
		else if (tipo_principal_selecionado == "17") { labelMotos.click(); }
		else if (tipo_principal_selecionado == "18") { labelCaminhoes.click(); }
		else if (tipo_principal_selecionado == "19") { labelCaminhonetes.click(); }
		
		else if (tipo_principal_selecionado == "20") { labelOutros.click(); }
		
		// redefinição da section
		sessionStorage.setItem("tipo_selecionado_tag", tipo_principal_selecionado);
	}
	catch (event) { }
});

// clique no botão de salvar produto
botaoSalvar.addEventListener("click", () => {
	
	// salvar dados na session
	sessionStorage.setItem("nome_produto", inputNomeProduto.value);
	sessionStorage.setItem("valor_produto", inputValorProduto.value);
	sessionStorage.setItem("descricao_produto", inputDescricaoProduto.value);
	sessionStorage.setItem("estoque_produto", inputEstoqueProduto.value);
	
	// (1) inputs obrigatórios não preenchidos
	if (   inputNomeProduto.value == "" || inputValorProduto.value == ""
		|| inputMoedaProduto.value == "" || inputEstoqueProduto.value == ""
		|| inputStatusProduto.value == "" || inputTipoPrincipalProduto.value == "") {
		
		// reset dos campos opcionais
		inputDescricaoProduto.style.borderBottom ="4px solid var(--style-terciary-color)";
		
		// checagem dos campos que são obrigatórios
		if (inputNomeProduto.value == "") { inputNomeProduto.style.borderBottom = "4px solid red"; }
		else { inputNomeProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputValorProduto.value == "") { inputValorProduto.style.borderBottom = "4px solid red"; }
		else { inputValorProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputMoedaProduto.value == "") { inputMoedaProduto.style.borderBottom = "4px solid red"; }
		else { inputMoedaProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputEstoqueProduto.value == "") { inputEstoqueProduto.style.borderBottom = "4px solid red"; }
		else { inputEstoqueProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputStatusProduto.value == "") { inputStatusProduto.style.borderBottom = "4px solid red"; }
		else { inputStatusProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (inputTipoPrincipalProduto.value == "") { inputTipoPrincipalProduto.style.borderBottom = "4px solid red"; }
		else { inputTipoPrincipalProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		ExibirToastMessage(1);
	}
	
	// (2) campos não seguem o pattern
	else if (  !regexNome.test(inputNomeProduto.value) || !regexValorEstoque.test(inputValorProduto.value)
			|| !regexValorEstoque.test(inputEstoqueProduto.value) || !regexDescricao.test(inputDescricaoProduto.value)) {
		
		// reset dos inputs que não sofrem validação via regex
		inputMoedaProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputStatusProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputTipoPrincipalProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		
		// checagem dos inputs que sofrem validação
		
		if (!regexNome.test(inputNomeProduto.value)) { inputNomeProduto.style.borderBottom = "4px solid red"; }
		else { inputNomeProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (!regexValorEstoque.test(inputValorProduto.value)) { inputValorProduto.style.borderBottom = "4px solid red"; }
		else { inputValorProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (!regexValorEstoque.test(inputEstoqueProduto.value)) { inputEstoqueProduto.style.borderBottom = "4px solid red"; }
		else { inputEstoqueProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		if (!regexDescricao.test(inputDescricaoProduto.value)) { inputDescricaoProduto.style.borderBottom = "4px solid red"; }
		else { inputDescricaoProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; }
		
		ExibirToastMessage(4);
	}
	
	// (3) servidor fora do ar
	// (4) falha interna no cadastro
	// (5) cadastro efetuado com sucesso
	else {
		
		// reset dos inputs
		inputNomeProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputValorProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputMoedaProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputDescricaoProduto.style.borderBottom = "4px solid var(--style-terciary-color)"; 
		inputEstoqueProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputStatusProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		inputTipoPrincipalProduto.style.borderBottom = "4px solid var(--style-terciary-color)";
		
		// lista de tipos de produtos selecionados
		listaTiposProdutos = ListaOutrosTipos();
		
		// checagem se estoque está zerado
		// caso estiver, uma mensagem é exibida ao usuário para confirmar a quantidade, em que:
		//
		// - Confirmado: Status do produto vai para VENDIDO / SOLD
		// - Não Confirmado: Processo é interrompido e campo de estoque é focado 
		if (inputEstoqueProduto.value == 0) {
			
			idioma = localStorage.getItem("language");
			
			// Verificação do idioma e chamada dos alertas e caixas de confirmação
			//
			// Português Brasileiro
			if (idioma == "1") { 
				alert("Estoque do produto consta como zerado. Se prosseguir, produto ficará com status VENDIDO e não estará disponível no mercado de divulgações.");
				confirmarEstoqueZerado = confirm("Deseja continuar?"); 
			}
			
			// Inglês Americano
			else { 
				alert("Product\'s stock is equals zero. If you continue, the product\'s status will be SOLD and it will not be available on the online market.");
				confirmarEstoqueZerado = confirm("Would you like to continue?"); 
			}
			
			// Checagem da escolha realizada pelo usuário
			//
			// - Continuar: Processo ocorre normalmente com status sendo alterado para VENDIDO
			// - Não Continuar: Processo é interrompido, página realiza scroll para o campo de Estoque, que é focado na página
			if (confirmarEstoqueZerado) {
				inputStatusProduto.value = "3";
				CadastrarProduto();
			}
			
			else {  
				inputEstoqueProduto.scrollIntoView(false);
				inputEstoqueProduto.focus(); 
			}
		}
		
		// caso estoque for maior do que zero, procedimento ocorre normalmente
		else { CadastrarProduto(); }
	}
});

ListaOutrosTipos = () => {
	var lista = [];
	
	// Verificação das tags selecionadas
	if (checkboxDoces.checked) { lista.push(checkboxDoces.value); }
	if (checkboxSalgados.checked) { lista.push(checkboxSalgados.value); }
	if (checkboxOutrosAlimentos.checked) { lista.push(checkboxOutrosAlimentos.value); }

	if (checkboxCelulares.checked) { lista.push(checkboxCelulares.value); }
	if (checkboxInformatica.checked) { lista.push(checkboxInformatica.value); }
	if (checkboxGames.checked) { lista.push(checkboxGames.value); }

	if (checkboxLivros.checked) { lista.push(checkboxLivros.value); }
	if (checkboxMangas.checked) { lista.push(checkboxMangas.value); }
	if (checkboxBrinquedos.checked) { lista.push(checkboxBrinquedos.value); }

	if (checkboxDecoracoes.checked) { lista.push(checkboxDecoracoes.value); }
	if (checkboxRoupas.checked) { lista.push(checkboxRoupas.value); }
	if (checkboxPerfumaria.checked) { lista.push(checkboxPerfumaria.value); }

	if (checkboxEletrodomesticos.checked) { lista.push(checkboxEletrodomesticos.value); }
	if (checkboxMoveis.checked) { lista.push(checkboxMoveis.value); }
	if (checkboxEmpresariais.checked) { lista.push(checkboxEmpresariais.value); }

	if (checkboxCarros.checked) { lista.push(checkboxCarros.value); }
	if (checkboxMotos.checked) { lista.push(checkboxMotos.value); }
	if (checkboxCaminhoes.checked) { lista.push(checkboxCaminhoes.value); }
	if (checkboxCaminhonetes.checked) { lista.push(checkboxCaminhonetes.value); }

	if (checkboxOutros.checked) { lista.push(checkboxOutros.value); }
	
	return lista;
}

CadastrarProduto = () => {
	
	// cadastro sem foto
	if (   inputImagem1.value == '' && inputImagem2.value == ''
		&& inputImagem3.value == '' && inputImagem4.value == ''
		&& inputImagem5.value == '' && inputImagem6.value == '') {
		
		// Parâmetros
		var params = "nome=" + inputNomeProduto.value
				   + "&preco=" + inputValorProduto.value
				   + "&moeda=" + inputMoedaProduto.value
				   + "&descricao=" + inputDescricaoProduto.value
				   + "&estoque=" + inputEstoqueProduto.value
				   + "&status=" + inputStatusProduto.value
				   + "&tipoPrincipal=" + inputTipoPrincipalProduto.value
				   + "&outrosTipos=" + JSON.stringify(listaTiposProdutos);
		
		
		// AJAX
		req = new XMLHttpRequest();
		req.open("POST", "java/processamento-java/processamento-cadastro-produto-sem-foto.jsp", true);
		
		req.onreadystatechange = function() {
			
			// (3) Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) {  }
			
			// (4) Falha Interna no Cadastro
			else if (this.responseText.includes("0")) { ExibirToastMessage(9); }
			
			// (5) Cadastro efetuado com sucesso
			else {
				
				// reset das sessions salvas
				sessionStorage.removeItem("tipo_selecionado_tag", "1");
				sessionStorage.removeItem("nome_produto");
				sessionStorage.removeItem("valor_produto");
				sessionStorage.removeItem("descricao_produto");
				sessionStorage.removeItem("estoque_produto");
				
				// redirecionamento ao painel
				sessionStorage.setItem("painel_foco", "2")
				window.location.href = "painel.jsp";
			}
		};
		
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(params);
	}
	
	// cadastro com foto
	else {
		
		// Params
		const formData = new FormData(formCadastroProduto);
		formData.append("usuario_uuid", sessionStorage.getItem("usuario_uuid"));
		
		// Ajax
		req = new XMLHttpRequest();
		req.open("POST", "http://localhost:8080/Scan-Me/CadastroProdutoComFoto", true);
		
		req.onreadystatechange = function() {
			// (3) Servidor Fora do Ar
			if (req.readyState != 4 || req.status != 200) { ExibirToastMessage(3); }
			
			// (4) Falha Interna no Cadastro
			else if (this.responseText.includes("0")) { ExibirToastMessage(9); }
			
			// (5) Cadastro efetuado com sucesso
			else {
				
				// reset das sessions salvas
				sessionStorage.removeItem("tipo_selecionado_tag", "1");
				sessionStorage.removeItem("nome_produto");
				sessionStorage.removeItem("valor_produto");
				sessionStorage.removeItem("descricao_produto");
				sessionStorage.removeItem("estoque_produto");
				
				// redirecionamento ao painel
				sessionStorage.setItem("painel_foco", "2")
				window.location.href = "painel.jsp";
			}
		};
		
		// código comentado pois o 'Content-Type' não salvava a imagem no banco de dados
		// com isso, precisei retirar o código.
		//
		// Problemática: Sem o código, não há mais charset utf-8 e, consequentemente, não consigo
		// salvar mais produtos com acentos.
		//
		// Possível Solução: estudar uma forma de header diferente sem ser "content-type" que aceite
		// blobs e texts OU incluir 'charset utf-8' de maneira isolada da função 'setRequestHeader'
		//
		// Solução: Forçar a Servlet a requerir o charset utf-8 com a seguinte linha de código
		//		request.setCharacterEncoding("UTF-8");
		//
		// req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(formData);
	}
}