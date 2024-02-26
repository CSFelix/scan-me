const qrcodeTpl1PainelRelatorio = document.getElementById('qrcodeTpl1PainelRelatorio').innerHTML;
const divQRCodePainelRelatorio = document.getElementById('divQRCodePainelRelatorio');

const produtoSelecionadoPainelRelatorio = document.getElementById('produtoSelecionadoPainelRelatorio');

const botaoSelecionarProdutoPainelRelatorio = document.getElementById('selecionarProdutoPainelRelatorio');
const botaoLimparDivQRCodePainelRelatorio = document.getElementById('limparDivQRCodePainelRelatorio');
const botaoSalvarQRCodePainelRelatorio = document.getElementById('salvarQRCodePainelRelatorio');

const nomeProdutoSelecionado = document.getElementById("nomeProdutoPainelRelatorios");

// cique no botão para ativar geração do qr code
botaoSelecionarProdutoPainelRelatorio.addEventListener("click", () => {
	divQRCodePainelRelatorio.innerHTML = '';
	
	// checagem se há produto cadastrado e/ou selecionado no sistema
	// o QR Code somente será executado se há produto cadastrado e selecionado
	if (produtoSelecionadoPainelRelatorio.value != '') {
	
		nomeProdutoSelecionado.innerText = "📦 " + produtoSelecionadoPainelRelatorio.value + " 📦";
		
		var qrCodeImage = [{
			config: {
				text: /*"https://192.168.0.103:8443/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
					/*"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
					"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="
					+ produtoSelecionadoPainelRelatorio.options[produtoSelecionadoPainelRelatorio.selectedIndex].dataset.uuidProduto
					+ "&idioma="
					+  localStorage.getItem('language'),
	
				width: 240,
				height: 240,
				colorDark: "#000000",
				colorLight: "#ffffff",
		                        
		        quietZone: 15,
		        quietZoneColor: '#bd72ed',
		                
				logo: "images/logos/icone-padrao.png",		
						
				logoBackgroundColor: '#ffffff',
				logoBackgroundTransparent: false,
	
				correctLevel: QRCode.CorrectLevel.H // L, M, Q, H
			}
	
		}];
	
		for (var i = 0; i < qrCodeImage.length; i++) {
			var qrcodeHTML = qrcodeTpl1PainelRelatorio.replace(/{i}/, i);
			divQRCodePainelRelatorio.innerHTML += qrcodeHTML;
		}
	
		for (var i = 0; i < qrCodeImage.length; i++) { var t = new QRCode(document.getElementById("qrcodePainelRelatorio_"+i), qrCodeImage[i].config); }
	}
});

//clique no botão para retirar qr code gerado
botaoLimparDivQRCodePainelRelatorio.addEventListener("click", () => { 
	nomeProdutoSelecionado.innerText = '';
	divQRCodePainelRelatorio.innerHTML = ''; 
});

// clique no botão para salvar qr code gerado
botaoSalvarQRCodePainelRelatorio.addEventListener("click", () => {
	
	// verifica se a div não está sem qr code
	if (divQRCodePainelRelatorio.innertHTML != '') {
		
		var canvasQRCode = document.querySelector("#divQRCodePainelRelatorio canvas");
		canvasQRCode.toBlob(function(blob) {
			saveAs(blob,  nomeProdutoSelecionado.innerText + ".png");
		}, "image/png");
	}
});