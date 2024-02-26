<%@page import="java.util.ArrayList"%>
<%@page import="Bean.ProdutoBean"%>
<%@page import="Dao.ProdutoDao"%>

<%
	ProdutoDao produto_dao = new ProdutoDao();
	ArrayList<ProdutoBean> lista_produtos = produto_dao.BuscarListaDadosTabelaProdutos((String) session.getAttribute("usuario_uuid")
																						, Integer.parseInt(request.getParameter("paginaAtual")));
%>		
	  <!-- header da tabela -->
	  <tr id="tabelaHeader">
	        <th>{{ trEditarAtiva }}</th>
	        <th>{{ trNomeAtiva }}</th>
	        <th>{{ trEstoqueAtiva }}</th>
	        <th>{{ trPrecoAtiva }}</th>
	        <th>{{ trStatusAtiva }}</th>
	        <th>{{ trTipoAtiva }}</th>
	   </tr>
<%
	for (ProdutoBean produto : lista_produtos) {
		String moeda = (produto.getMoeda().equals("1")) ? "R$ " : "U$ ";
		
		String status = (produto.getStatus().equals("1")) ? "{{ statusPendenteAtiva }}"
			   			: (produto.getStatus().equals("2")) ? "{{ statusVendaAtiva }}"
			   			: "{{ statusVendidoAtiva }}";
			   
		String tipoPrincipal;
			   
		switch(produto.getTipoPrincipal()) {
			case "1":
				tipoPrincipal = "{{ tipoDocesAtiva }}";
				break;
				
			case "2":
				tipoPrincipal = "{{ tipoSalgadosAtiva }}";
				break;
				
			case "3":
				tipoPrincipal = "{{ tipoOutrosAlimentosAtiva }}";
				break;
				
			case "4":
				tipoPrincipal = "{{ tipoCelularesAtiva }}";
				break;
				
			case "5":
				tipoPrincipal = "{{ tipoInformaticaAtiva }}";
				break;
				
			case "6":
				tipoPrincipal = "{{ tipoGamesAtiva }}";
				break;
				
			case "7":
				tipoPrincipal = "{{ tipoLivrosAtiva }}";
				break;
				
			case "8":
				tipoPrincipal = "{{ tipoMangasAtiva }}";
				break;
				
			case "9":
				tipoPrincipal = "{{ tipoBrinquedosAtiva }}";
				break;
				
			case "10":
				tipoPrincipal = "{{ tipoDecoracaoAtiva }}";
				break;
				
			case "11":
				tipoPrincipal = "{{ tipoRoupasAtiva }}";
				break;
				
			case "12":
				tipoPrincipal = "{{ tipoPerfumariaAtiva }}";
				break;
				
			case "13":
				tipoPrincipal = "{{ tipoEletrodomesticosAtiva }}";
				break;
				
			case "14":
				tipoPrincipal = "{{ tipoMoveisAtiva }}";
				break;
				
			case "15":
				tipoPrincipal = "{{ tipoEmpresariaisAtiva }}";
				break;
				
			case "16":
				tipoPrincipal = "{{ tipoCarrosAtiva }}";
				break;
				
			case "17":
				tipoPrincipal = "{{ tipoMotosAtiva }}";
				break;
			
			case "18":
				tipoPrincipal = "{{ tipoCaminhoesAtiva }}";
				break;
				
			case "19":
				tipoPrincipal = "{{ tipoCaminhonetesAtiva }}";
				break;
				
			default: tipoPrincipal = "{{ tipoOutrosAtiva }}";
		}
%>
		<!-- corpo da tabela -->
		<tr>
			<td>
				<button class="botaoSecundario" data-uuid-produto="<%=produto.getUuid()%>" onClick="RedirecionarAlterarProduto(this)">{{ botaoAlterarAtiva }}</button>
				&nbsp&nbsp&nbsp
				<button class="botaoSecundario botaoModalQRCodePainelTabelaProduto" onClick="aberturaModalQRCode(this)" 
				data-uuid-produto="<%=produto.getUuid() %>" data-nome-produto="<%=produto.getNome()%>">QR Code</button>
				&nbsp&nbsp&nbsp
				<button class="botaoSecundario" data-uuid-produto="<%=produto.getUuid() %>" data-status-produto="<%=produto.getStatus()%>" onClick="excluirProduto(this)">
						<i class="fas fa-trash-alt" aria-hidden="true"></i>
				</button>
			</td>
			<td><%=produto.getNome() %></td>
			<td><%=produto.getEstoque() %></td>
			<td><%=moeda + produto.getPreco() %></td>
			<td><%=status %></td>
			<td><%=tipoPrincipal %></td>
		</tr>
<%
	}
%>