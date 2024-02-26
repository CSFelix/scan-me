package Servlets;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import Dao.UsuarioDao;
 
@WebServlet(urlPatterns = "/AlterarAvatar")
@MultipartConfig(maxFileSize = 16177215) // processa imagens de até 16 MB (valor informado em Bits)

public class AlterarAvatar extends HttpServlet {
	/*
	 * Classe responsável por receber e tratar o envio de imagens de perfil pelos usuários durante o cadastro de novas contas
	 * Após receber, ela irá descriptar as partes do arquivo, uni-las em um único pacote
	 * e encaminhar ao banco de dados
	 * */
	private static final long serialVersionUID = 4L;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	/*
    	 * Processamento de envio da imagem em método POST
    	 * Assintótica: O(1)
    	 * */
    	
        InputStream avatar = null;
        Part partes_avatar = request.getPart("avatar");
        
        // Caso a imagem seja encaminhada com sucesso à Servlet
        // Tal será processada e inserida no banco de dados
        if (partes_avatar != null && request.getPart("avatar").getSize() > 0) { avatar = partes_avatar.getInputStream(); }
        
        // definição da imagem padrão
        else {
        	File avatar_padrao = new File("C:\\Users\\gabri\\Desktop\\TCC\\Projeto-Eclipse\\WebContent\\images\\avatar\\avatar.png");
        	avatar = new FileInputStream(avatar_padrao);
        }
        
        UsuarioDao usuario_dao = new UsuarioDao();
    	usuario_dao.AlterarAvatarCadastro(request.getParameter("email"), avatar);
        response.sendRedirect("painel.jsp");
    }
}