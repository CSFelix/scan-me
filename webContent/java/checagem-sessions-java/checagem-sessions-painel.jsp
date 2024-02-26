<%
	// caso algum dado abaxio da session seja igual a null,
	// significa de que o usuário não está realmente logado na aplicação
	// e o mesmo é redirecionado à página de login
	if (   session.getAttribute("usuario_nickname") == null
		|| session.getAttribute("usuario_email") == null
		|| session.getAttribute("usuario_whatsapp") == null
		|| session.getAttribute("usuario_telegram") == null
		|| session.getAttribute("usuario_uuid") == null
		|| session.getAttribute("usuario_tipo") == null) {
%>
		<script>window.location.href = "index.jsp";</script>
<%
	}
%>