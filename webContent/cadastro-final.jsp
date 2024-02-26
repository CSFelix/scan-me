<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="Seguranca.StripHTML" %>

<!DOCTYPE html>

	<!-- checagem se as sessions para login estão definidas
	caso não estiverem, usuário será redirecionado ao login -->
	<jsp:include page="java/checagem-sessions-java/checagem-sessions-cadastro.jsp"/>

<html lang="pt-br, en">

	<jsp:include page="includes/head-login.html" />

	<body>
		
		<jsp:include page="includes/nav.html" />

		<form id="mainContent" method="POST" action="AlterarAvatar" enctype='multipart/form-data'>
		
				<!-- blobs -->
				<div id="left-bottom-corner" class="blob"></div>
				<div id="right-top-corner" class="blob"></div>
		
				<!--  toast messages -->
				<div id="toast" class="toastMessageErro"></div>
		
				<section class="formLogin neon">
				
					<div class="formLoginHeader"><h3>{{ tituloCartaoUsuarioAtiva }}</h3></div>
					<br><br>

					<div class="formLoginContent flexCenterColumn">
					
						<!--  foto de perfil (avatar) -->
						<input id="selecionarAvatar" class="campoInput" name="avatar" type="file" accept="image/*">

						<div id="containerLabel" class="containerAvatar flexCenter">
							<label id="avatarVisualizacao" for="selecionarAvatar" src="#" class="flexCenter containerAvatar">	
		  						<span id="labelSpan"></span>
		  					</label>
						</div>

						<br>

						<span class="tipSpan">{{ spanAlterarAvatarAtiva }}</span>
					</div>

					<br>
					<hr>
					<br>

					<div class="formLoginContent">

						<!-- nickname -->
						<div class="campoDivForm flexCenter">
							<label id="labelNickname" class="campoLabel">{{ labelNicknameAtiva }}</label>
							<p>📛</p>&nbsp&nbsp<input type="text" name="nickname" id="inputNickname" class="campoInput campoDesativado" value="<%=(String) session.getAttribute("usuario_nickname") %>"
												pattern="<%=StripHTML.REGEX_NICKNAME %>" onkeyup="checkLabel('labelNickname', this)" onkeydown="checkLabel('labelNickname', this)" autofocus readonly>
						</div>
						<br><br>

						<!-- email -->
						<div class="campoDivForm flexCenter">
							<label id="labelLogin" class="campoLabel">{{ labelLoginAtiva }}</label>
							<p>👤</p>&nbsp&nbsp<input type="email" name="email" id="inputEmail" class="campoInput campoDesativado" value="<%=(String) session.getAttribute("usuario_email") %>"
												pattern="<%=StripHTML.REGEX_EMAIL %>" onkeyup="checkLabel('labelLogin', this)" onkeydown="checkLabel('labelLogin', this)" autofocus readonly>
						</div>
						<br><br>

						<!-- whatsapp -->
						<div class="campoDivForm flexCenter">
							<label id="labelWhatsapp" class="campoLabel">{{ labelWhatsappAtiva }}</label>
							<p>📱</p>&nbsp&nbsp<input type="tel" name="whatsapp" id="inputWhatsapp" class="campoInput campoDesativado" value="<%=(String) session.getAttribute("usuario_whatsapp") %>"
												pattern="<%=StripHTML.REGEX_WHATSAPP %>" onkeyup="checkLabel('labelWhatsapp', this)" onkeydown="checkLabel('labelWhatsapp', this)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" readonly>
						</div>
						<br><br>

						<!-- telegram -->
						<div class="campoDivForm flexCenter">
							<label id="labelTelegram" class="campoLabel">{{ labelTelegramAtiva }}</label>
							<p>📱</p>&nbsp&nbsp<input type="tel" name="telegram" id="inputTelegram" class="campoInput campoDesativado" value="<%=(String) session.getAttribute("usuario_telegram") %>"
												pattern="<%=StripHTML.REGEX_TELEGRAM %>" onkeyup="checkLabel('labelTelegram', this)" onkeydown="checkLabel('labelTelegram', this)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" readonly>
						</div>
					</div>

					<br>
					<hr>
					<br>
					
					<!-- botão de confirmação do cadastro -->
					<div class="formLoginFooter flexSpace">
						<input type="submit" class="botao" data-anijs="if: mouseover, do: rubberBand animated" :value="botaoFinalizarCadastroAtiva">
					</div>
					<br>

				</section>
		</form>
		
		<jsp:include page="includes/footer.html" />
	</body>
	
	<jsp:include page="includes/vue-login.html" />
	<!-- vue não padrão nas demais páginas -->
	<script type="text/javascript" src="assets/js/vue/languages/cadastro.js"></script>
		
	<jsp:include page="includes/script-login.html" />
	<!-- scripts não padrões nas demais páginas -->
	<script type="text/javascript" src="assets/js/effects/carregar-avatar-padrao.js"></script>
	<script type="text/javascript" src="assets/js/effects/visualizar-alteracao-foto-perfil-cadastro-final.js"></script>
	<script type="text/javascript" src="assets/js/controllers/labels-inputs/label-ativa-cadastro-final.js"></script>
</html>