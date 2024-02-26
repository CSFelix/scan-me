<%
	// Usado nas páginas / funcionalidades em que o usuário "comprador" não tem acesso
	// Usuário é redirecionado à página do painel caso:
	//
	// 1) tipo for 0 (comprador)
	// 2) tipo estiver vazio
	// 3) tipo não for definido
	//
	// Em resumo, a página de cadastro de produtos está disponível
	// apenas para vendedores
	if (   session.getAttribute("usuario_tipo").equals("0")
		|| session.getAttribute("usuario_tipo").equals("")
		|| session.getAttribute("usuario_tipo") == null) {
%>
		<script>window.location.href = "painel.jsp";</script>
<%
	}
%>