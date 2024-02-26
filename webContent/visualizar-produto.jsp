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
		sessionStorage.setItem("usuario_uuid", "<%=(String) session.getAttribute("usuario_uuid")%>");
		sessionStorage.setItem("usuario_tipo", "<%=(String) session.getAttribute("usuario_tipo")%>");
	</script>
	
<html lang="pt-br, en">
	
	<jsp:include page="includes/head-produto.html" />

	<body>
	
		<jsp:include page="includes/nav.html" />
		
		<!-- modals -->
		<jsp:include page="includes/modal-visualizar-produto.html" />
		<jsp:include page="includes/modal-visualizar-produto-qr-code.html" />

		<section id="mainContent">
		
			<!-- blobs -->
			<div id="left-top-corner" class="blob"></div>
			<div id="right-bottom-corner" class="blob"></div>
		
			<!--  toast messages -->
			<div id="toast" class="toastMessageErro"></div>
			
			<!-- vertical menu -->
			<%
				
			
				// caso usuário for comprador:
				//
				// 1) menu vertical: parcial
				if (session.getAttribute("usuario_tipo").equals("0")) {
			%>
					<!-- menu vertical -->
					<jsp:include page="includes/menu-vertical-lojas-comprador.html" />
			<%
				}
				
				// caso usuário for vendedor:
				//
				// 1) menu vertical: completo
				else {
			%>
					<!-- menu vertical -->
					<jsp:include page="includes/menu-vertical-lojas-vendedor.html" />
			<%
				}
			%>
		
			<!-- section cadastro produto -->
			<jsp:include page="includes/sections-painel/painel-visualizar-produto.jsp" />
		</section>
	</body>

	<jsp:include page="includes/vue-visualizar-produto.html" />
	
	<%
		// caso usuário for comprador
		//
		// 1) importação do respectivo vue e scripts
		if (session.getAttribute("usuario_tipo").equals("0")) {
	%>
			<jsp:include page="includes/script-visualizar-produto-comprador.html" />
	<%
		}
		
		// caso usuário for vendedor
		//
		// 1) importação do respectivo vue e scripts
		else {
	%>			
			<jsp:include page="includes/script-visualizar-produto-vendedor.html" />
	<%
		}
	%>
</html>