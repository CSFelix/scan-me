<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<section id="painelRelatorios" class="sectionPainel">

	<div class="sectionPainelHeader">
		<h3>{{ tituloRelatoriosAtiva }}</h3>
	</div>
	
	<br><br>
	
	<div class="flexCenter" data-anijs="if: load, on: window, do: swing animated">
		
		<!--  lista dos produtos (nome) -->
		<select id="produtoSelecionadoPainelRelatorio" class="campoInput">
			<!-- busca da lista de produtos em 
				java/processamento-java/processamento-buscar-lista-nome-produtos.jsp 
			-->
		</select>
		
		&nbsp&nbsp
		
		<!-- botão para selecionar produto para ter QR Code gerado -->
		<button id="selecionarProdutoPainelRelatorio" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-check"></i></button>
	</div>
	
	<br>
	
	<!-- nome do produto selecionado -->
	<br><center><h3 id="nomeProdutoPainelRelatorios"></h3></center><br>
	
	<br>
	
	<!--  QR Code gerado -->
	<div id="divQRCodePainelRelatorio" class="flexCenterWrap"></div>
	
	<br><br>
	
	<!--  botões para excluir/salvar QR Code e atualizar lista dos nomes dos produtos -->
	<div class="flexCenter">
		<button id="limparDivQRCodePainelRelatorio" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-trash-alt"></i></button>
		&nbsp&nbsp&nbsp
		<button id="salvarQRCodePainelRelatorio" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-download"></i></button>
		&nbsp&nbsp&nbsp
		<button id="atualizarListaProdutos" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-sync-alt"></i></button>
	</div>
	
	<br><br>
</section>

<!-- template do QR Code -->
<script type="text/template" id="qrcodeTpl1PainelRelatorio">
	<div class="imgblock">
		<div class="qr" id="qrcodePainelRelatorio_{i}"></div>
	</div>
</script>