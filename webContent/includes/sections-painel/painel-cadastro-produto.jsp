<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="Seguranca.StripHTML" %>
    
<section id="painelCadastroProduto" class="sectionPainelBlock">
				
	<div class="sectionPainelHeader">
		<h3>{{ tituloCadastroProdutoAtiva }}</h3>
	</div>
				
	<br><br>
				
	<!-- botão para voltar à tabela de produtos -->
	<a href="painel.jsp"><button id="botaoCadastroProdutoVoltar" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoVoltarAtiva }}</button></a>
	
	<br><br>
	
	<form id="formCadastroProduto" class="sectionPainelContent" method="POST" action="CadastroProdutoComFoto" enctype='multipart/form-data'>
		
		<!-- fotos -->
		<div class="flexSpaceWrap">
		
			<!-- inputs das fotos -->
			<input class="selecionarFotoProduto" id="fotoProduto1" name="fotoProduto1" type="file" accept="image/*" required>
			<input class="selecionarFotoProduto" id="fotoProduto2" name="fotoProduto2" type="file" accept="image/*" required>
			<input class="selecionarFotoProduto" id="fotoProduto3" name="fotoProduto3" type="file" accept="image/*" required>
			<input class="selecionarFotoProduto" id="fotoProduto4" name="fotoProduto4" type="file" accept="image/*" required>
			<input class="selecionarFotoProduto" id="fotoProduto5" name="fotoProduto5" type="file" accept="image/*" required>
			<input class="selecionarFotoProduto" id="fotoProduto6" name="fotoProduto6" type="file" accept="image/*" required>
			
			<!-- campo de foto -->
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao1"  for="fotoProduto1" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto1" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
			
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao2"  for="fotoProduto2" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto2" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
			
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao3"  for="fotoProduto3" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto3" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
			
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao4"  for="fotoProduto4" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto4" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
			
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao5"  for="fotoProduto5" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto5" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
			
			<div class="flexCenterColumn">
				<label id="fotoProdutoVisualizacao6"  for="fotoProduto6" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
				<button id="botaoFotoProduto6" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-plus"></i></button>
				<br>
			</div>
			&nbsp&nbsp&nbsp
		</div>
		
		<br>
		
		<!-- tip para alterar fotos do produto -->
		<div class="flexCenter">
			<span class="tipSpan">{{ spanFotosAtiva }}</span>
		</div>
		
		<br><br>

		<!-- nome -->
		<div class="campoDivForm flexCenter">
			<label id="labelNomeProduto" class="campoLabel">{{ labelNomeProdutoAtiva }}</label>
			<p>📛</p>&nbsp&nbsp<input type="text" name="nomeProduto" id="inputNomeProduto" class="campoInput" pattern="<%=StripHTML.REGEX_NOME_PRODUTO %>"
									onkeyup="checkLabel('labelNomeProduto', this)" onkeydown="checkLabel('labelNomeProduto', this)">
		</div>
		<br><br>
		
		<!-- valor -->
		<div class="campoDivForm flexCenter">
			<label id="labelValorProduto" class="campoLabel">{{ labelValorProdutoAtiva }}</label>
			<p>💰</p>&nbsp&nbsp<input type="number" name="valorProduto" id="inputValorProduto" class="campoInput outOfRangeInput" min="0" pattern="<%=StripHTML.REGEX_VALOR_ESTOQUE_PRODUTO %>"
									oninput="checkLabel('labelValorProduto', this)" onkeyup="checkLabel('labelValorProduto', this)" onkeydown="checkLabel('labelValorProduto', this)">
		</div>
		<br><br>
		
		<!-- moeda -->
		<div class="campoDivForm flexCenter">
			<p>{{ labelMoedaProdutoAtiva }}</p>&nbsp&nbsp
			
			<select id="moedaSelecionada" name="moedaProduto" class="campoInput">
				<option selected value="1">{{ selectMoedaRealAtiva }}</option>
				<option value="2">{{ selectMoedaDolarAtiva }}</option>
			</select>
		</div>
		<br><br>
		
		<!-- descrição -->
		<div class="campoDivForm flexCenter">
			<label id="labelDescricaoProduto" class="campoLabel">{{ labelDescricaoAtiva }}</label>
			<p>📝</p>&nbsp&nbsp
			<textarea name="descricaoProduto" id="inputDescricaoProduto" class="campoInput" rows="10" style="resize: none;"
			onkeyup="checkLabel('labelDescricaoProduto', this)" onkeydown="checkLabel('labelDescricaoProduto', this)"></textarea>
		</div>
		<br><br>
		
		<!-- estoque -->
		<div class="campoDivForm flexCenter">
			<label id="labelEstoqueProduto" class="campoLabel">{{ labelEstoqueAtiva }}</label>
			<p>🎁</p>&nbsp&nbsp<input type="number" name="estoqueProduto" id="inputEstoqueProduto" class="campoInput outOfRangeInput" min="0" pattern="<%=StripHTML.REGEX_VALOR_ESTOQUE_PRODUTO %>"
									oninput="checkLabel('labelEstoqueProduto', this)" onkeyup="checkLabel('labelEstoqueProduto', this)" onkeydown="checkLabel('labelEstoqueProduto', this)">
		</div>
		<br><br>
		
		<!-- status -->
		<div class="campoDivForm flexCenter">
			<p>{{ labelStatusAtiva }}</p>&nbsp&nbsp
			
			<select id="statusSelecionado" name="statusProduto" class="campoInput">
				<option selected value="1">{{ selectStatusPendenteAtiva }}</option>
				<option value="2">{{ selectStatusVendaAtiva }}</option>
				<option value="3">{{ selectStatusVendidoAtiva }}</option>
			</select>
		</div>
		<br><br>
		
		<!-- tipo principal -->
		<div class="campoDivForm flexCenter">
			<p>{{ labelTipoPrincipalAtiva }}</p>&nbsp&nbsp
			
			<select id="tipoPrincipalSelecionado" name="tipoPrincipalProduto" class="campoInput">
				<optgroup :label="grupoAlimentosAtiva">
				    <option selected value="1">{{ tipoDocesAtiva }}</option>
				    <option value="2">{{ tipoSalgadosAtiva }}</option>
				    <option value="3">{{ tipoOutrosAlimentosAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoEletronicosAtiva">
					<option value="4">{{ tipoCelularesAtiva }}</option>
					<option value="5">{{ tipoInformaticaAtiva }}</option>
					<option value="6">{{ tipoGamesAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoLazerAtiva">
					<option value="7">{{ tipoLivrosAtiva }}</option>
					<option value="8">{{ tipoMangasAtiva }}</option>
					<option value="9">{{ tipoBrinquedosAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoModaAtiva">
					<option value="10">{{ tipoDecoracaoAtiva }}</option>
					<option value="11">{{ tipoRoupasAtiva }}</option>
					<option value="12">{{ tipoPerfumariaAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoAmbienteAtiva">
					<option value="13">{{ tipoEletrodomesticosAtiva }}</option>
					<option value="14">{{ tipoMoveisAtiva }}</option>
					<option value="15">{{ tipoEmpresariaisAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoAutomoveisAtiva">
					<option value="16">{{ tipoCarrosAtiva }}</option>
					<option value="17">{{ tipoMotosAtiva }}</option>
					<option value="18">{{ tipoCaminhoesAtiva }}</option>
					<option value="19">{{ tipoCaminhonetesAtiva }}</option>
				</optgroup>
				
				<optgroup :label="grupoOutrosAtiva">
					<option value="20">{{ tipoOutrosAtiva }}</option>
				</optgroup>
			</select>
		</div>
		<br><br>
		
		<!-- outros tipos -->
		<div class="campoDivForm flexCenter">
			<p>{{ labelOutrosTiposAtiva }}</p>
			&nbsp&nbsp
			<p>({{ contadorTagsAtivas }} / 5)</p>
			&nbsp&nbsp
		</div>
		<br><br>
		
		<!-- mensagem de limite de tags de proutos ultrapassado -->
		<div id="limiteTagsProduto" class="campoDivForm flexCenter">
			<p>{{ msgLimiteTagAtiva }}</p>
		</div>
		<br><br>
		
		<!-- tags -->
		<div class="flexCenterWrap">
			
				<!-- alimentos -->
				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDoces" value="1">
  				<label id="labelTipoDoces" onclick="checkTipoProduto(this, checkboxTipoDoces)" class="tag">{{ tipoDocesAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoSalgados" value="2">
  				<label id="labelTipoSalgados" onclick="checkTipoProduto(this, checkboxTipoSalgados)" class="tag">{{ tipoSalgadosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutrosAlimentos" value="3">
  				<label id="labelTipoOutrosAlimentos" onclick="checkTipoProduto(this, checkboxTipoOutrosAlimentos)" class="tag">{{ tipoOutrosAlimentosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- eletrônicos -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCelulares" value="4">
  				<label id="labelTipoCelulares" onclick="checkTipoProduto(this, checkboxTipoCelulares)" class="tag">{{ tipoCelularesAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoInformatica" value="5">
  				<label id="labelTipoInformatica" onclick="checkTipoProduto(this, checkboxTipoInformatica)" class="tag">{{ tipoInformaticaAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoGames" value="6">
  				<label id="labelTipoGames" onclick="checkTipoProduto(this, checkboxTipoGames)" class="tag">{{ tipoGamesAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- lazer -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoLivros" value="7">
  				<label id="labelTipoLivros" onclick="checkTipoProduto(this, checkboxTipoLivros)" class="tag">{{ tipoLivrosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMangas" value="8">
  				<label id="labelTipoMangas" onclick="checkTipoProduto(this, checkboxTipoMangas)" class="tag">{{ tipoMangasAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoBrinquedos" value="9">
  				<label id="labelTipoBrinquedos" onclick="checkTipoProduto(this, checkboxTipoBrinquedos)" class="tag">{{ tipoBrinquedosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- moda -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDecoracao" value="10">
  				<label id="labelTipoDecoracoes" onclick="checkTipoProduto(this, checkboxTipoDecoracao)" class="tag">{{ tipoDecoracaoAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoRoupas" value="11">
  				<label id="labelTipoRoupas" onclick="checkTipoProduto(this, checkboxTipoRoupas)" class="tag">{{ tipoRoupasAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoPerfumaria" value="12">
  				<label id="labelTipoPerfumaria" onclick="checkTipoProduto(this, checkboxTipoPerfumaria)" class="tag">{{ tipoPerfumariaAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- ambientes -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEletrodomesticos" value="13">
  				<label id="labelTipoEletrodomesticos" onclick="checkTipoProduto(this, checkboxTipoEletrodomesticos)" class="tag">{{ tipoEletrodomesticosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMoveis" value="14">
  				<label id="labelTipoMoveis" onclick="checkTipoProduto(this, checkboxTipoMoveis)" class="tag" for="moveis">{{ tipoMoveisAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEmpresariais" value="15">
  				<label id="labelTipoEmpresariais" onclick="checkTipoProduto(this, checkboxTipoEmpresariais)" class="tag">{{ tipoEmpresariaisAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- automóveis -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCarros" value="16">
  				<label id="labelTipoCarros" onclick="checkTipoProduto(this, checkboxTipoCarros)" class="tag">{{ tipoCarrosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMotos" value="17">
  				<label id="labelTipoMotos" onclick="checkTipoProduto(this, checkboxTipoMotos)" class="tag">{{ tipoMotosAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhoes" value="18">
  				<label id="labelTipoCaminhoes" onclick="checkTipoProduto(this, checkboxTipoCaminhoes)" class="tag">{{ tipoCaminhoesAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhonetes" value="19">
  				<label id="labelTipoCaminhonetes" onclick="checkTipoProduto(this, checkboxTipoCaminhonetes)" class="tag">{{ tipoCaminhonetesAtiva }}</label>&nbsp&nbsp&nbsp
  				
  				<!-- outros -->
  				<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutros" value="20">
  				<label id="labelTipoOutros" onclick="checkTipoProduto(this, checkboxTipoOutros)" class="tag">{{ tipoOutrosAtiva }}</label>
			</div>
	</form>
	
	<br>
	<hr class="horizontalLine">
	<br>
	
	<div class="sectionPainelContent flexSpace">
		<a href="painel.jsp"><button class="botaoSecundario" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoCancelarAtiva }}</button></a>
		<button id="botaoSalvarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoSalvarAtiva }}</button>
	</div>
	<br>
</section>