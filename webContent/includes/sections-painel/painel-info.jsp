<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<%@page import="Seguranca.StripHTML" %>

<form id="painelInfo" class="sectionPainel" method="POST" action="AlterarAvatar" enctype='multipart/form-data'>

	<!-- título da página e botão do modal -->
	<div class="sectionPainelHeader">
		<h3>{{ tituloInfoAtiva }}
		<i id="botaoModalAlteracaoDadosUsuarioPainelInfo" class="fas fa-question-circle info" data-anijs="if: mouseover, do: rubberBand animated"></i></h3>
	</div>
	
	<br><br>
	
	<!-- botão de edição dos dados -->
	<button id="botaoEditar" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoEditarAtiva }}</button>
	
	<!-- avatar usuário -->
	<div class="sectionPainelContent flexCenterColumn" data-anijs="if: load, on: window, do: rubberBand animated">
		<input id="selecionarAvatar" class="campoInput" name="avatar" type="file" accept="image/*" required>
	
		<div id="containerLabel" class="containerAvatar flexCenter">
			<label id="avatarVisualizacao"  class="flexCenter containerAvatar fotoDesativada"
					style="background-image: url(java/processamento-java/processamento-exibir-avatar.jsp?uuid_usuario=<%=(String) session.getAttribute("usuario_uuid")%>);">	
					
				  <span id="labelSpan"></span>
			</label>
		</div>
		
		<br>
		
		<span class="tipSpan">{{ spanAvatarAtiva }}</span>
	</div>
	
	<br>
	<br>
	
	<div class="sectionPainelContent">

		<!-- nickname -->
		<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
			<label id="labelNickname" class="campoLabel labelAtiva">{{ labelNicknameAtiva }}</label>
			<p>📛</p>&nbsp&nbsp<input type="text" name="nickname" id="inputNickname" class="campoInput campoDesativado"  value="<%=(String) session.getAttribute("usuario_nickname")%>"
									pattern="<%=StripHTML.REGEX_NICKNAME %>" onkeyup="checkLabel('labelNickname', this)" onkeydown="checkLabel('labelNickname', this)" onkeypress="ApertarEnterFocus(event, inputEmail)" autofocus readonly>
		</div>
		<br><br>

		<!-- email -->
		<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
			<label id="labelLogin" class="campoLabel labelAtiva">{{ labelEmailAtiva }}</label>
			<p>👤</p>&nbsp&nbsp<input type="email" name="email" id="inputEmail" class="campoInput campoDesativado"  value="<%=(String) session.getAttribute("usuario_email")%>"
									pattern="<%=StripHTML.REGEX_EMAIL %>" onkeyup="checkLabel('labelLogin', this)" onkeydown="checkLabel('labelLogin', this)" onkeypress="ApertarEnterFocus(event, inputWhatsapp)" autofocus readonly>
		</div>
		<br><br>

		<!-- whatsapp -->
		<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
			<label id="labelWhatsapp" class="campoLabel labelAtiva">{{ labelWhatsappAtiva }}</label>
			<p>📱</p>&nbsp&nbsp<input type="tel" name="whatsapp" id="inputWhatsapp" class="campoInput campoDesativado"  value="<%=(String) session.getAttribute("usuario_whatsapp")%>"
									pattern="<%=StripHTML.REGEX_WHATSAPP %>" onkeyup="checkLabel('labelWhatsapp', this)" onkeydown="checkLabel('labelWhatsapp', this)" onkeypress="ApertarEnterFocus(event, inputTelegram)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" readonly>
		</div>
		<br><br>

		<!-- telegram -->
		<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
			<label id="labelTelegram" class="campoLabel labelAtiva">{{ labelTelegramAtiva }}</label>
			<p>📱</p>&nbsp&nbsp<input type="tel" name="telegram" id="inputTelegram" class="campoInput campoDesativado"  value="<%=(String) session.getAttribute("usuario_telegram")%>"
									pattern="<%=StripHTML.REGEX_TELEGRAM %>" onkeyup="checkLabel('labelTelegram', this)" onkeydown="checkLabel('labelTelegram', this)" onkeypress="ApertarEnterFocus(event, inputIdTelegram)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" readonly>
		</div>
		<br><br>
		
		<!-- id telegram -->
		<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
			<label id="labelIdTelegram" class="campoLabel labelAtiva">{{ labelIdTelegramAtiva }}</label>
			<p>📱</p>&nbsp&nbsp<input type="text" name="idTelegram" id="inputIdTelegram" class="campoInput campoDesativado"  value="<%=(String) session.getAttribute("usuario_id_telegram")%>"
									pattern="<%=StripHTML.REGEX_ID_TELEGRAM %>" onkeyup="checkLabel('labelIdTelegram', this)" onkeydown="checkLabel('labelIdTelegram', this)" onkeypress="ApertarEnterCliqueBotao(event, botaoSalvar)" readonly>
		</div>
		<br><br>
		
		<center>
			<a href="videos/encontrar_id_telegram.mp4" id="esqueceuSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ checkIdTelegramAtiva }}</a>
		</center>
	</div>
	
	<br>
	<hr class="horizontalLine">
	<br>
	
	<!-- tipo usuário título -->
	<div class="campoDivFormHidden">
		<p>🏷️</p>
		&nbsp&nbsp
		<label>{{ tipoUsuarioTituloAtiva }}</label>
	</div>
				
	<br>
	
	<!-- tipo usuário switch -->
	<div class="campoDivFormHidden">
	
		<%
			// caso usuário for comprador (tipo == 0):
			// - checkbox aparece como não checado,
			// - tag comprador vem como ativada,
			// - tag vendedor vem como desativada
			if (session.getAttribute("usuario_tipo").equals("0")) {
		%>
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
		<%
			}
			
			// caso usuário for vendedor (tipo == 1):
			// - checkbox aparece como checado,
			// - tag comprador vem como desativada,
			// - tag vendedor vem como ativada
			else {
		%>
				<!-- tag comprador -->
				<label id="tagComprador" class="tagIdentificadorCompradorVendedor">{{ tipoUsuarioCompradorAtiva }}</label>
				&nbsp&nbsp&nbsp
									
				<!-- tipo usuário switch -->
				<label for="inputTipoUsuario" class="switchEmoji">
					<input id="inputTipoUsuario" type="checkbox" checked>
					<span id="switchTipoUsuario" class="sliderRoundEmoji"></span>
				</label>	
									
				<!-- tag vendedor -->
				&nbsp&nbsp&nbsp
				<label id="tagVendedor" class="tagIdentificadorCompradorVendedor tagAtivada">{{ tipoUsuarioVendedorAtiva }}</label>
		<%
			}
		%>					
	</div>
	
	<br>
	<hr class="horizontalLine">
	<br>
	
	<!-- botão de cancelar e de salvar alterações -->
	<div class="sectionPainelContent flexSpace">
		<button id="botaoCancelar" class="botaoSecundario botaoDesativado" data-anijs="if: mouseover, do: rubberBand animated" disabled>{{ botaoCancelarAtiva }}</button>
		<button id="botaoSalvar" class="botao botaoDesativado" data-anijs="if: mouseover, do: rubberBand animated" disabled>{{ botaoSalvarAtiva }}</button>
	</div>
	<br>
	
	<!-- redirecionamento para alteração de senha -->
	<div class="sectionPainelFooter flexSpace">
		<p id="trocarSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ trocarSenhaAtiva }}</p>
	</div>
	<br>
</form>