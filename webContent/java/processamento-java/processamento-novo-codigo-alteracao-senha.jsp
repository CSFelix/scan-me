<%@page import="Bean.AlteracaoSenhaBean" %>
<%@page import="Dao.AlteracaoSenhaDao" %>

<%
	// Gera��o de um novo c�digo para altera��o de senha e encaminhamento ao email do usu�rio
	AlteracaoSenhaBean alteracao_bean = new AlteracaoSenhaBean();
	alteracao_bean.setUuidUsuario((String) session.getAttribute("hash_usuario"));
	alteracao_bean.setUuidAlteracaoSenha((String) session.getAttribute("hash_alteracao_senha"));
	
	if (request.getParameter("idioma") != null) { alteracao_bean.setIdioma(Integer.parseInt(request.getParameter("idioma"))); }
	else { alteracao_bean.setIdioma(2); }
	
	AlteracaoSenhaDao alteracao_dao = new AlteracaoSenhaDao();
	alteracao_dao.AlterarCodigo(alteracao_bean);
%>