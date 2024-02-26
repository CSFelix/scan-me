<%@page import="java.util.ArrayList" %>
<%@page import="java.util.Map" %>
<%@page import="java.util.HashMap" %>
<%@page import="Bean.ProdutoBean" %>
<%@page import="Dao.ProdutoDao" %>
<%
	String uuid_usuario = (String) session.getAttribute("usuario_uuid");
	ProdutoDao produto_dao = new ProdutoDao();

	// busca da quantidade de produtos agrupados por status (à venda, pendente e vendido)
	ArrayList<Integer> contagem_status = produto_dao.SelecionarContagemStatus(uuid_usuario);
	
	// busca do top 3 dos produtos mais visualizados
	Map<String, Integer> produtos_mais_vistos = produto_dao.SelecionarProdutosMaisVistos(uuid_usuario);
%>
	
	<%=contagem_status %>|<%=produtos_mais_vistos %>