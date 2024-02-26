<%@page import="java.util.ArrayList" %>
<%@page import="Dao.ProdutoDao" %>

<%
	ProdutoDao produto_dao = new ProdutoDao();
	ArrayList<String[]> lista_nome_uuid_produtos = produto_dao.BuscarListaNomeProdutos((String) session.getAttribute("usuario_uuid"));
	
	for (String[] produto : lista_nome_uuid_produtos) {
%>
		<option data-uuid-produto="<%=produto[1]%>" value="<%=produto[0]%>"><%=produto[0]%></option>
<%
	}
%>