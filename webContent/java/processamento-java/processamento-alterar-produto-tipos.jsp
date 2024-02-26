<!-- checagem e definição do tipo principal do produto
	a fim de evitar de que usuário desmarque a opção do tipo principal na seção de "outros tipos".
	Código está sendo colocado aqui no final pois o Vue não permite tags "<script></script>" dentro
	de containers -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("1")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "1"); </script> <% } %> <!-- TIPO DOCES -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("2")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "2"); </script> <% } %> <!-- TIPO SALGADOS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("3")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "3"); </script> <% } %> <!-- TIPO OUTROS ALIMENTOS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("4")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "4"); </script> <% } %> <!-- TIPO CELULARES -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("5")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "5"); </script> <% } %> <!-- TIPO INFORMÁTICA -->

<% if (session.getAttribute("tipo_selecionado_tag").equals("6")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "6"); </script> <% } %> <!-- TIPO GAMES -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("7")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "7"); </script> <% } %> <!-- TIPO LIVROS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("8")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "8"); </script> <% } %> <!-- TIPO MANGAS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("9")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "9"); </script> <% } %> <!-- TIPO BRINQUEDOS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("10")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "10"); </script> <% } %> <!-- TIPO DECORAÇÃO -->

<% if (session.getAttribute("tipo_selecionado_tag").equals("11")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "11"); </script> <% } %> <!-- TIPO ROUPAS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("12")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "12"); </script> <% } %> <!-- TIPO PERFUMARIA -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("13")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "13"); </script> <% } %> <!-- TIPO ELETRODOMÉSTICOS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("14")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "14"); </script> <% } %> <!-- TIPO MÓVEIS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("15")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "15"); </script> <% } %> <!-- TIPO EMPRESARIAIS -->
		
<% if (session.getAttribute("tipo_selecionado_tag").equals("16")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "16"); </script> <% } %> <!-- TIPO CARROS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("17")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "17"); </script> <% } %> <!-- TIPO MOTOS -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("18")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "18"); </script> <% } %> <!-- TIPO CAMINHÕES -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("19")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "19"); </script> <% } %> <!-- TIPO CAMINHONETES -->
<% if (session.getAttribute("tipo_selecionado_tag").equals("20")) { %> <script> sessionStorage.setItem("tipo_selecionado_tag", "20"); </script> <% } %> <!-- TIPO OUTROS -->

<!-- checagem e definição do tipo outros do produto
	a fim de evitar de que a contagem das tags inicia-se do zero e cause problemas no controle
	de até 5 tipos selecionados para cada produto.
	Código está sendo colocado aqui no final pois o Vue não permite tags "<script></script>" dentro
	de containers -->
<% if ((Integer) session.getAttribute("quantidade_outros_tipos") == 1) { %> <script> vuePainelAlterarProduto.contadorTagsAtivas = 1; </script> <% } %> <!-- 1 TIPO -->
<% if ((Integer) session.getAttribute("quantidade_outros_tipos") == 2) { %> <script> vuePainelAlterarProduto.contadorTagsAtivas = 2; </script> <% } %> <!-- 2 TIPOS -->
<% if ((Integer) session.getAttribute("quantidade_outros_tipos") == 3) { %> <script> vuePainelAlterarProduto.contadorTagsAtivas = 3; </script> <% } %> <!-- 3 TIPOS -->
<% if ((Integer) session.getAttribute("quantidade_outros_tipos") == 4) { %> <script> vuePainelAlterarProduto.contadorTagsAtivas = 4; </script> <% } %> <!-- 4 TIPOS -->
<% if ((Integer) session.getAttribute("quantidade_outros_tipos") == 5) { %> <script> vuePainelAlterarProduto.contadorTagsAtivas = 5; </script> <% } %> <!-- 5 TIPOS -->