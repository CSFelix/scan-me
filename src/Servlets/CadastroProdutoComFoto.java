package Servlets;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import Bean.ProdutoBean;
import Dao.ProdutoDao;
import Seguranca.StripHTML;

@WebServlet(urlPatterns = "/CadastroProdutoComFoto")
@MultipartConfig(maxFileSize = 16177215) // processa imagens de até 16 MB (valor informado em Bits)

public class CadastroProdutoComFoto extends HttpServlet {
	/*
	 * Classe responsável por receber e tratar o envio de imagens e textos dos produtos cadastrados pelos usuários
	 * Sobre as imagens, após recebê-las, a classe irá descriptar as partes dos arquivos, uni-las em um único pacote (para cada foto)
	 * e encaminhar ao banco de dados juntamente com os dados de texto
	 * */
	private static final long serialVersionUID = 4L;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	/* Conversão dos Dados em UTF-8 para aceitar acentuação */
    	request.setCharacterEncoding("UTF-8");
    	
    	// Preparação Dados Produto
    	ProdutoBean produto_bean = new ProdutoBean();
    	
    	System.out.println(request.getParameter("nomeProduto"));
    	
    	produto_bean.setUuidUsuario(request.getParameter("usuario_uuid"));
    	produto_bean.setNome(StripHTML.StripString(request.getParameter("nomeProduto")));
    	produto_bean.setPreco(request.getParameter("valorProduto"));
    	produto_bean.setMoeda(request.getParameter("moedaProduto"));
    	produto_bean.setDescricao(StripHTML.StripString(request.getParameter("descricaoProduto")));
    	produto_bean.setEstoque(request.getParameter("estoqueProduto"));
    	produto_bean.setStatus(request.getParameter("statusProduto"));
    	produto_bean.setTipoPrincipal(request.getParameter("tipoPrincipalProduto"));
    	produto_bean.setOutrosTipos(request.getParameterValues("outrosTiposProduto"));
    	
    	// Preparação Fotos Produto
    	InputStream[] lista_fotos = new InputStream[] {null, null, null, null, null, null};
    	Part[] partes_fotos = new Part[] { request.getPart("fotoProduto1"), request.getPart("fotoProduto2")
    									 , request.getPart("fotoProduto3"), request.getPart("fotoProduto4")
    									 , request.getPart("fotoProduto5"), request.getPart("fotoProduto6")};
    	
    	for (int i = 0; i < partes_fotos.length; i++) {
    		if (partes_fotos[i] != null && request.getPart("fotoProduto" + (i + 1)).getSize() > 0) { 
    			lista_fotos[i] = partes_fotos[i].getInputStream(); 
    		}
    	}
    	
    	// Preparação do Dao
    	ProdutoDao produto_dao = new ProdutoDao();
    	
    	// caso houver falha interna no cadastro
    	// é retornado 0 para front retornar mensagem de erro ao usuário
    	if (!(produto_dao.CadastrarProdutoComFoto(produto_bean, lista_fotos))) {
    		ServletOutputStream out = response.getOutputStream();
     	    out.println("0");
    	}
    }
}