<%
	// caso algum dado abaxio da session seja igual a null,
	// significa de que o usu�rio n�o est� realmente logado na aplica��o
	// e o mesmo � redirecionado � p�gina de login
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