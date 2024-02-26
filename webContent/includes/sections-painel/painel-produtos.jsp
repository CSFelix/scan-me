<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<section id="painelProdutos" class="sectionPainel">
	
	<div class="sectionPainelHeader">
		<h3>{{ tituloProdutosAtiva }}</h3>
	</div>
	
	<br><br>
	
	<!-- botões de adicionar e atualizar produtos -->
	<a href="cadastro-produto.jsp"><button id="botaoAdicionarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button></a>
	<button id="botaoAtualizarTabelaProdutos" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-sync-alt"></i></button>
	<br><br>
	
	<!-- filtro pelo nome do produto -->
	<div class="campoDivForm flexCenter">
		<label id="labelNomeProdutoPesquisa" class="campoLabel">{{ trNomeAtiva }}</label>
		<p>👤</p>&nbsp&nbsp<input type="text" name="nomeProdutoPesquisa" id="inputNomeProdutoPesquisa" class="campoInput" onkeyup="checkLabel('labelNomeProdutoPesquisa', this)" onkeydown="checkLabel('labelNomeProdutoPesquisa', this)" onkeypress="ApertarEnterCliqueBotao(event, 'botaoNomeProdutoPesquisa')" autofocus required>
		<button id="botaoNomeProdutoPesquisa" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-search"></i></button>
	</div>
	<br><br>
	
	<!-- tabela dos produtos -->
	<table id="tabelaProdutos" class="tabelaPrincipal" data-anijs="if: load, on: window, do: rubberBand animated">  
	  	<!-- dados serão buscados em
	  		java/processamento-java/processamento-buscar-lista-tabela-produtos.jsp
	  	 -->
	</table>
	
	<br><br>
	
	<!-- paginação -->
	<div class="flexCenter">
		<button id="botaoPaginaAnterior" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-chevron-left"></i></button>
		&nbsp&nbsp&nbsp
		<i id="identificadorPaginaProduto" class="botaoSecundario"></i>
		&nbsp&nbsp&nbsp
		<button id="botaoPaginaPosterior" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-chevron-right"></i></button>
	</div>
	<br>
	
	<!-- identificador das páginas -->
	<div class="flexCenter">
		<span class="tipSpan flexCenter">
			<p>{{ palavraPaginaAtiva }}</p>&nbsp
			<p id="textoPaginaAtual"></p>&nbsp
			<p>{{ palavraDeAtiva }}</p>&nbsp
			<p id="textoPaginaFinal"></p>
		</span>
	</div>
	<br><br>
</section>