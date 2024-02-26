<%@page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="Seguranca.StripHTML" %>
    
<section id="painelAlterarProduto" class="sectionPainelBlock">
	
	<!-- título -->
	<div class="sectionPainelHeader">
		<h3>{{ tituloAlterarProdutoAtiva }}</h3>
	</div>
				
	<br><br>
	
	<!-- botão para voltar à tabela de produtos -->
	<a href="painel.jsp"><button id="botaoVoltarAlterarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoVoltarAtiva }}</button></a>
	
	<br><br>
	
	<!-- checagem se a UUID passada como parâmetro na URL consiste
	de um produto já existente ou não.
	
	- Caso consista e o Usuário Atual é o vendedor do produto: os dados de tal produto são exibidos;
	- Caso consista e o Usuário Atual não for o vendedor do produto 
	  || Caso não consista: uma mensagem é exibida falando de que não foi possível encontrar o produto
	e o usuário pode se redirecionar à página do market online -->
	<jsp:include page="../../java/checagem-uuid-produtos-java/checagem-uuid-produto-alterar-produto.jsp"/>
	<br>
</section>