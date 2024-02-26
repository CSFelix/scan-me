<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<section id="painelScanner" class="sectionPainel">

	<div class="sectionPainelHeader">
		<h3>{{ tituloScannerAtiva }}</h3>
	</div>
	
	<br><br>
	
	<div class="flexCenterColumn">
		
		<!-- mensagem de câmera não encontrada no dispositivo -->
		<div id="mensagemAtivarCamera" class="infoMessage">{{ infoMensagemAtivarCameraAtiva }}</div>
		<br>
		<button id="botaoLigarCamera" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoLigarCameraAtiva }}</button>

		<!-- camera e qr code outputs -->
  		<canvas id="canvas" class="cameraScanner" hidden></canvas>
		<br><br>
		
		<!-- botão para desligar câmera -->
		<button id="botaoDesligarCamera" class="botao" data-anijs="if: mouseover, do: rubberBand animated" hidden>{{ botaoDesligarCameraAtiva }}</button>
		
		<br><br>
		
		<!--  output: mensagem se o QR Code foi encontrado ou não -->
		<div id="output" class="infoMessage" hidden>
			<div id="mensagemQRCodeNaoEncontrado">{{ infoMensagemQRCodeNaoEncontradoAtiva }}</div>
		</div>
		
	</div>
	
	<br><br>
</section>