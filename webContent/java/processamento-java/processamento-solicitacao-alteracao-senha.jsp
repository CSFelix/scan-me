<%@page import="Dao.UsuarioDao"%>
<%@page import="Bean.AlteracaoSenhaBean"%>
<%@page import="Dao.AlteracaoSenhaDao"%>
<%@page import="Seguranca.StripHTML"%>
<%@page import="Seguranca.GeradorHash"%>

<%	
	UsuarioDao usuario_dao = new UsuarioDao();
	String email_usuario = StripHTML.StripString(request.getParameter("email"));
	String uuid_usuario = usuario_dao.SelecionarUuidPorEmail(email_usuario); 	

	// email não cadastrado
	if (uuid_usuario == null) {
%>
		0
<%
	}
	
	// email cadastrado
	else {
		AlteracaoSenhaBean alteracao_bean = new AlteracaoSenhaBean();
		alteracao_bean.setEmailUsuario(email_usuario);
		alteracao_bean.setUuidUsuario(uuid_usuario);
		alteracao_bean.setHash(GeradorHash.GerarSalt());
		alteracao_bean.setCodigo(GeradorHash.GerarCodigoAlteracaoSenha(6));
		
		if (request.getParameter("idioma") != null) { alteracao_bean.setIdioma(Integer.parseInt(request.getParameter("idioma"))); }
		else { alteracao_bean.setIdioma(2); }		
		
		// Cadastro da solicitação de alteração de senha
		// e envio dos procedimentos ao email do usuário
		AlteracaoSenhaDao alteracao_dao = new AlteracaoSenhaDao();
		alteracao_dao.Cadastrar(alteracao_bean);	
	}
%>