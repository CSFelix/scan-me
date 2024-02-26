<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<!DOCTYPE html>
	
	<!-- checagem se as sessions para login estão definidas
	caso não estiverem, usuário será redirecionado ao login -->
	<jsp:include page="java/checagem-sessions-java/checagem-sessions-painel.jsp"/>
	
	<script>
		sessionStorage.setItem("usuario_nickname", "<%=(String) session.getAttribute("usuario_nickname") %>");
		sessionStorage.setItem("usuario_email", "<%=(String) session.getAttribute("usuario_email") %>");
		sessionStorage.setItem("usuario_whatsapp", "<%=(String) session.getAttribute("usuario_whatsapp") %>");
		sessionStorage.setItem("usuario_telegram", "<%=(String) session.getAttribute("usuario_telegram") %>");
		sessionStorage.setItem("usuario_id_telegram", "<%=(String) session.getAttribute("usuario_id_telegram")%>");
		sessionStorage.setItem("usuario_uuid", "<%=(String) session.getAttribute("usuario_uuid")%>");
		sessionStorage.setItem("usuario_tipo", "<%=(String) session.getAttribute("usuario_tipo")%>");
		
		<%
			try { session.removeAttribute("cadastro_efetuado"); }
			catch (Exception e) {}
		%>
	</script>
	
<html lang="pt-br, en">
	
	<jsp:include page="includes/head-painel.html" />

	<body>
	
		<jsp:include page="includes/nav.html" />
		
		<!-- modals -->
		<jsp:include page="includes/modal-tabela-produtos-qr-code.html" />
		<jsp:include page="includes/modal-alteracao-dados-usuarios-painel-info.html" />

		<section id="mainContent">
		
			<!-- blobs -->
			<div id="left-top-corner" class="blob"></div>
			<div id="right-bottom-corner" class="blob"></div>
		
			<!--  toast messages -->
			<div id="toast" class="toastMessageErro"></div>
			
			<%
				// caso usuário for comprador:
				//
				// 1) menu vertical: parcial
				// 2) painéis habilitados: loja, scanner, info
				if (session.getAttribute("usuario_tipo").equals("0")) {
			%>
					<!-- menu vertical -->
					<jsp:include page="includes/menu-vertical-painel-comprador.html" />
					
					<!--  sections do painel -->
					<jsp:include page="includes/sections-painel/painel-loja.jsp" />
					<jsp:include page="includes/sections-painel/painel-scanner.jsp" />
					<jsp:include page="includes/sections-painel/painel-info.jsp" />
			<%
				}
				
				// caso usuário for vendedor:
				//
				// 1) menu vertical: completo
				// 2) painéis habilitados: todos
				else {
			%>
					<!-- menu vertical -->
					<jsp:include page="includes/menu-vertical-painel-vendedor.html" />
					
					<!--  sections do painel -->
					<jsp:include page="includes/sections-painel/painel-dashboard.jsp" />
					<jsp:include page="includes/sections-painel/painel-produtos.jsp" />
					<jsp:include page="includes/sections-painel/painel-relatorios.jsp" />
					<jsp:include page="includes/sections-painel/painel-loja.jsp" />
					<jsp:include page="includes/sections-painel/painel-scanner.jsp" />
					<jsp:include page="includes/sections-painel/painel-info.jsp" />
			<%
				}
			%>
		</section>
	</body>

	<%
		// caso usuário for comprador
		//
		// 1) importação do respectivo vue e scripts
		if (session.getAttribute("usuario_tipo").equals("0")) {
	%>
			<jsp:include page="includes/vue-painel-comprador.html" />
			<jsp:include page="includes/script-painel-comprador.html" />
	<%
		}
		
		// caso usuário for vendedor
		//
		// 1) importação do respectivo vue e scripts
		else {
	%>
			<jsp:include page="includes/vue-painel-vendedor.html" />
			<jsp:include page="includes/script-painel-vendedor.html" />
	<%
		}
	%>
</html>