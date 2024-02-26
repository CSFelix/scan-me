<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<section id="painelDashboard" class="sectionPainel">
	<div class="sectionPainelHeader">
		<h3>📈 Dashboard 📈</h3>
	</div>
	
	<br><br>
	
	<button id="botaoAtualizarDashboard" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-sync-alt"></i></button>
	
	<div class="flexSpaceWrap">
	
		<!-- gráfico status produtos: pizza -->
		<canvas id="canvaStatusProdutos" width="200px" height="350px"></canvas>
		
		<!--  gráfico top 3 produtos mais visualizados: barras -->
		<canvas id="canvaVisualizacoesProdutos" width="200px" height="350px"></canvas>
	</div>
	<br><br>
</section>