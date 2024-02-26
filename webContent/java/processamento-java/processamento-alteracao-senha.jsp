<%@page import="Bean.UsuarioBean" %>
<%@page import="Bean.AlteracaoSenhaBean" %>
<%@page import="Dao.AlteracaoSenhaDao" %>
<%@page import="Seguranca.StripHTML" %>

<%
	UsuarioBean usuario_bean = new UsuarioBean();
	usuario_bean.setSenha(StripHTML.StripString(request.getParameter("senha")));
	usuario_bean.setUuidUsuario((String) session.getAttribute("hash_usuario"));
	
	AlteracaoSenhaBean alteracao_bean = new AlteracaoSenhaBean();
	alteracao_bean.setCodigo(StripHTML.StripString(request.getParameter("codigo")));
	alteracao_bean.setUuidUsuario((String) session.getAttribute("hash_usuario"));
	alteracao_bean.setUuidAlteracaoSenha((String) session.getAttribute("hash_alteracao_senha"));
	
	AlteracaoSenhaDao alteracao_dao = new AlteracaoSenhaDao();
	int retorno = alteracao_dao.AlterarSenha(alteracao_bean, usuario_bean);
	
	// altera��o expirada >> usu�rio dever� realizar outra requisi��o
	if (retorno == 1) {
%>
		1
<%
	}
	
	// c�digo incorreto >> usu�rio dever� digitar o c�digo correto ou requisitar um novo
	else if (retorno == 0) {
%>
		0
<%
	}
%>