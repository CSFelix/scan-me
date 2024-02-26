ExibirToastMessage = (codigoMensagem) => {
	
	const toast = document.getElementById("toast");
	var mensagem;
	
	// *************
	// *** Erros ***
	// *************
	
	// (1) Campos Obrigatórios Não Preenchidos
	if (codigoMensagem == 1) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgInputNaoPreenchidoPortugues; }
		else { mensagem = msgInputNaoPreenchidoEnglish; }
	}
	
	// (2) Email e/ou Senha Incorretos
	else if (codigoMensagem == 2) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgEmailSenhaIncorretosPortugues; }
		else { mensagem = msgEmailSenhaIncorretosEnglish; }
	}
	
	// (3) Servidor Fora do Ar
	else if (codigoMensagem == 3) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgServidorForaPortugues; }
		else { mensagem = msgServidorForaEnglish; }
	}
	
	// (4) Campos Não Seguem o Padrão
	else if (codigoMensagem == 4) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgPadraoIncorretoPortugues; }
		else { mensagem = msgPadraoIncorretoEnglish; }
	}
	
	// (5) Campos Senha e Confirmar Senha Diferentes
	else if (codigoMensagem == 5) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgSenhasDiferentesPortugues; }
		else { mensagem = msgSenhasDiferentesEnglish; }
	}
	
	// (6) Código Incorreto da Alteração de Senha
	else if (codigoMensagem == 6) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgAlteracaoExpiradaPortugues; }
		else { mensagem = msgAlteracaoExpiradaEnglish; }
	}
	
	// (7) Requisição de Alteração de Senha Expirada
	else if (codigoMensagem == 7) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgAlteracaoExpiradaPortugues; }
		else { mensagem = msgAlteracaoExpiradaEnglish; }
	}
	
	// (8) Email já Cadastrado por Outro Usuário
	else if (codigoMensagem == 8) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgEmailRegistradoPortugues; }
		else { mensagem = msgEmailRegistradoEnglish; }
	}
	
	// (9) Falha Interna
	else if (codigoMensagem == 9) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgFalhaInternaCadastroPortugues; }
		else { mensagem = msgFalhaInternaCadastroEnglish; }
	}
	
	// (10) Email Não Cadastrado: Requisição de Alteração de Senha
	else if (codigoMensagem == 10) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgEmailNaoCadastradoPortugues; }
		else { mensagem = msgEmailNaoCadastradoEnglish; }
	}
	
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	
	// ****************
	// *** Sucessos ***
	// ****************
	
	// (11) Novo Código para Alteração de Senha Solicitado
	else if (codigoMensagem == 11) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgNovoCodigoSolicitadoPortugues; }
		else { mensagem = msgNovoCodigoSolicitadoEnglish; }
		
		// setamente da classe de sucesso ao toastMessage
		toast.classList.remove("toastMessageErro");
		toast.classList.add("toastMessageSucesso");
	}
	
	// (12) Alteração das Informações Efetuada com Sucesso
	else if (codigoMensagem == 12) { 
		if (localStorage.getItem('language') === "1") { mensagem = msgAlteracaoEfetuadaPortugues; }
		else { mensagem = msgAlteracaoEfetuadaEnglish; }
		
		// setamente da classe de sucesso ao toastMessage
		toast.classList.remove("toastMessageErro");
		toast.classList.add("toastMessageSucesso");
	}
	
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	///////////////////////////////////////////////

	// ***************************
	// *** Exibição da Mensagem***
	// ***************************
	toast.innerHTML = mensagem;
	toast.classList.add('show');
	setTimeout(() => { toast.classList.remove('show'); }, 2000);
	
	if (codigoMensagem == 11 || codigoMensagem == 12) {
		
		// reset da classe de sucesso ao toastMessage
		toast.classList.remove("toastMessageSucesso");
		toast.classList.add("toastMessageErro");
	}
}