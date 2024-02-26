<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<section id="painelLoja" class="sectionPainel">
	
	<div class="sectionPainelHeader">
		<h3>{{ tituloLojaAtiva }}</h3>
	</div>
	<br><br>
	
	<!-- botão para atualizar lsita de produtos -->
		<button id="botaoAtualizarLojaProdutos" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-sync-alt"></i></button>
	<br><br>
	
	<!-- filtro produto por nome -->
	<div class="campoDivForm flexCenter" data-anijs="if: load, on: window, do: swing animated">
		
		<!-- input para filtro do produto -->	
		<label id="labelProdutoFiltroNomeLoja" class="campoLabel">{{ nomeProdutoAtiva }}</label>
		<p>👤</p>&nbsp&nbsp<input type="text" name="produtoFiltroNomeLoja" id="inputProdutoFiltroNomeLoja" class="campoInput" onkeyup="checkLabel('labelProdutoFiltroNomeLoja', this)" onkeydown="checkLabel('labelProdutoFiltroNomeLoja', this)" onkeypress="ApertarEnterCliqueBotao(event, 'botaoBuscarProdutoFiltroNomeLoja')" autofocus required>		
		
		&nbsp&nbsp
		
		<!-- botão para busca dos produtos -->
		<button id="botaoBuscarProdutoFiltroNomeLoja" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-search"></i></button>
	</div>
	
	<br><br>
	
	<!-- lista produtos -->
	<div id="listaProdutosLoja" class="flexSpaceWrap">
		<!-- busca da lista de produtos em 
				java/processamento-java/processamento-buscar-lista-produtos-loja.jsp 
		-->
	</div>
	
	<br><br>
	
	<!-- paginação -->
	<div class="flexCenter">
		<button id="botaoPaginaAnteriorLoja" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-chevron-left"></i></button>
		&nbsp&nbsp&nbsp
		<i id="identificadorPaginaProdutoLoja" class="botaoSecundario"></i>
		&nbsp&nbsp&nbsp
		<button id="botaoPaginaPosteriorLoja" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-chevron-right"></i></button>
	</div>
	<br>
	
	<!-- identificador das páginas -->
	<div class="flexCenter">
		<span class="tipSpan flexCenter">
			<p>{{ palavraPaginaAtiva }}</p>&nbsp
			<p id="textoPaginaAtualLoja"></p>&nbsp
			<p>{{ palavraDeAtiva }}</p>&nbsp
			<p id="textoPaginaFinalLoja"></p>
		</span>
	</div>
	<br><br>
</section>