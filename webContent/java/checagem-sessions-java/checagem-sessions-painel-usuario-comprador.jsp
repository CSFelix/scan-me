<%
	// Usado nas p�ginas / funcionalidades em que o usu�rio "comprador" n�o tem acesso
	// Usu�rio � redirecionado � p�gina do painel caso:
	//
	// 1) tipo for 0 (comprador)
	// 2) tipo estiver vazio
	// 3) tipo n�o for definido
	//
	// Em resumo, a p�gina de cadastro de produtos est� dispon�vel
	// apenas para vendedores
	if (   session.getAttribute("usuario_tipo").equals("0")
		|| session.getAttribute("usuario_tipo").equals("")
		|| session.getAttribute("usuario_tipo") == null) {
%>
		<script>window.location.href = "painel.jsp";</script>
<%
	}
%>