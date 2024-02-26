<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<%@page import="Seguranca.StripHTML" %>

<!DOCTYPE html>

	<!-- checagem se a session de cadastro efetuado está criada, caso esteja, 
	usuário é redirecionado à páina de cadastro-final.jsp-->
	<jsp:include page="java/checagem-sessions-java/checagem-sessions-retorno-cadastro-inicial.jsp"/>

<html lang="pt-br, en">

	<jsp:include page="includes/head-login.html" />

	<body>
		
		<jsp:include page="includes/nav.html" />
		<jsp:include page="includes/modal-cadastro.html" />

		<section id="mainContent">
		
				<!-- blobs -->
				<div id="left-bottom-corner" class="blob"></div>
				<div id="right-top-corner" class="blob"></div>
		
				<!--  toast messages -->
				<div id="toast" class="toastMessageErro"></div>
		
				<section class="formLogin neon">
				
					<!-- título -->
					<div class="formLoginHeader">
						<h3>{{ tituloFormAtiva }} 
						<i id="botaoModalCadastroInicial" class="fas fa-question-circle info" data-anijs="if: mouseover, do: rubberBand animated"></i></h3>
					</div>
					<br><br>

					<div class="formLoginContent">
					
						<!-- nickname -->
						<div class="campoDivForm flexCenter">
							<label id="labelNickname" class="campoLabel">{{ labelNicknameAtiva }}</label>
							<p>📛</p>&nbsp&nbsp<input type="text" name="nickname" id="inputNickname" class="campoInput" pattern="<%=StripHTML.REGEX_NICKNAME %>" onkeyup="checkLabel('labelNickname', this)" onkeydown="checkLabel('labelNickname', this)" onkeypress="ApertarEnterFocus(event, inputEmail)" autofocus required>
						</div>
						<br><br>

						<!-- email -->
						<div class="campoDivForm flexCenter">
							<label id="labelLogin" class="campoLabel">{{ labelLoginAtiva }}</label>
							<p>👤</p>&nbsp&nbsp<input type="email" name="email" id="inputEmail" class="campoInput" pattern="<%=StripHTML.REGEX_EMAIL %>" onkeyup="checkLabel('labelLogin', this)" onkeydown="checkLabel('labelLogin', this)" onkeypress="ApertarEnterFocus(event, inputSenha)" required>
						</div>
						
						<br>
						<hr class="horizontalLine">
						<br>
				
						<!-- senha -->
						<div class="campoDivForm flexCenter">
							<label id="labelSenha" class="campoLabel">{{ labelSenhaAtiva }}</label>
							<p>🔒</p>&nbsp&nbsp<input type="password" name="senha" id="inputSenha" class="campoInput" pattern="<%=StripHTML.REGEX_SENHA %>" onkeyup="checkLabel('labelSenha', this)" onkeydown="checkLabel('labelSenha', this)" onkeypress="ApertarEnterFocus(event, inputConfirmarSenha)" required>

							<!-- 
								Visualizar senha em texto:
								<i class="fas fa-eye"></i> >> ativar visualização
								<i class="far fa-eye-slash"></i> >> desativar visualização
							-->
							&nbsp&nbsp<i class="fas fa-eye visualizarSenha"></i>
						</div>
						<br><br>

						<!-- confirmar senha -->
						<div class="campoDivForm flexCenter">
							<label id="labelConfirmarSenha" class="campoLabel">{{ labelConfirmarSenhaAtiva }}</label>
							<p>🔒</p>&nbsp&nbsp<input type="password" name="confirmarSenha" id="inputConfirmarSenha" class="campoInput" pattern="<%=StripHTML.REGEX_SENHA %>" onkeyup="checkLabel('labelConfirmarSenha', this)" onkeydown="checkLabel('labelConfirmarSenha', this)" onkeypress="ApertarEnterFocus(event, inputWhatsapp)" required>
						</div>
						
						<br>
						<hr class="horizontalLine">
						<br>

						<!-- whatsapp -->
						<div class="campoDivForm flexCenter">
							<label id="labelWhatsapp" class="campoLabel">{{ labelWhatsappAtiva }}</label>
							<p>📱</p>&nbsp&nbsp<input type="tel" name="whatsapp" id="inputWhatsapp" class="campoInput" 
												pattern="<%=StripHTML.REGEX_WHATSAPP %>" onkeyup="checkLabel('labelWhatsapp', this)" onkeydown="checkLabel('labelWhatsapp', this)" onkeypress="ApertarEnterFocus(event, inputTelegram)" required>
						</div>
						<br><br>

						<!-- telegram -->
						<div class="campoDivForm flexCenter">
							<label id="labelTelegram" class="campoLabel">{{ labelTelegramAtiva }}</label>
							<p>📱</p>&nbsp&nbsp<input type="tel" name="telegram" id="inputTelegram" class="campoInput" 
												pattern="<%=StripHTML.REGEX_TELEGRAM %>" onkeyup="checkLabel('labelTelegram', this)" onkeydown="checkLabel('labelTelegram', this)" onkeypress="ApertarEnterFocus(event, inputIdTelegram)" required>
						</div>
						<br><br>
						
						<!-- id telegram -->
						<div class="campoDivForm flexCenter">
							<label id="labelIdTelegram" class="campoLabel">{{ labelIdTelegramAtiva }}</label>
							<p>📱</p>&nbsp&nbsp<input type="text" name="idTelegram" id="inputIdTelegram" class="campoInput" 
												pattern="<%=StripHTML.REGEX_ID_TELEGRAM %>" onkeyup="checkLabel('labelIdTelegram', this)" onkeydown="checkLabel('labelIdTelegram', this)" onkeypress="ApertarEnterCliqueBotao(event, botaoCadastrar)" required>
						</div>
						<br><br>
						
						<center>
							<a href="videos/encontrar_id_telegram.mp4" id="esqueceuSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ checkIdTelegramAtiva }}</a>
						</center>
						
						<br>
						<hr class="horizontalLine">
						<br>
						
						<!-- tipo usuário título -->
						<div class="campoDivForm flexCenter">
							<p>🏷️</p>
							&nbsp&nbsp
							<label>{{ tipoUsuarioTituloAtiva }}</label>
						</div>
						
						<br>
						
						<!-- tipo usuário switch -->
						<div class="campoDivForm flexCenter">
							
							<!-- tag comprador -->
							<label id="tagComprador" class="tagIdentificadorCompradorVendedor tagAtivada">{{ tipoUsuarioCompradorAtiva }}</label>
							&nbsp&nbsp&nbsp
							
							<!-- tipo usuário switch -->
							<label for="inputTipoUsuario" class="switchEmoji">
								<input id="inputTipoUsuario" type="checkbox">
								<span id="switchTipoUsuario" class="sliderRoundEmoji"></span>
							</label>	
							
							<!-- tag vendedor -->
							&nbsp&nbsp&nbsp
							<label id="tagVendedor" class="tagIdentificadorCompradorVendedor">{{ tipoUsuarioVendedorAtiva }}</label>
							
						</div>

						<br><br>
						
					</div>

					<!-- botões de voltar ao login e confirmar cadastro -->
					<div class="formLoginFooter flexSpace">						
						<button id="botaoVoltarLogin" class="botaoSecundario" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoVoltarLoginAtiva }}</button>
						<button id="botaoCadastrar" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoCadastrarAtiva }}</button>
					</div>
					<br><br>

				</section>
		</section>
		
		<jsp:include page="includes/footer.html" />
	</body>

	<jsp:include page="includes/vue-login.html" />
	<!-- vue não padrão nas demais páginas -->
	<script type="text/javascript" src="assets/js/vue/languages/cadastro.js"></script>
	<script type="text/javascript" src="assets/js/vue/languages/modal-cadastro.js"></script>
	
	<jsp:include page="includes/script-login.html" />
	<!-- scripts não padrões nas demais páginas -->
	<script type="text/javascript" src="assets/js/controllers/modals/modal-cadastro-inicial.js"></script>
	<script type="text/javascript" src="assets/js/ajax/ajax-cadastro-inicial.js"></script>
	<script type="text/javascript" src="assets/js/effects/visualizar-senha-cadastro.js"></script>
	<script type="text/javascript" src="assets/js/controllers/labels-inputs/label-ativa-cadastro.js"></script>

</html>