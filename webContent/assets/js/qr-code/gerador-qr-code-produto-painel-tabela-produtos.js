const qrcodeTpl1PainelTabelaProdutos = document.getElementById('qrcodeTpl1PainelTabelaProdutos').innerHTML;
const divQRCodePainelTabelaProdutos = document.getElementById('divQRCodePainelTabelaProdutos');
const botaosalvarQRCodePainelTabelaProdutos = document.getElementById('salvarQRCodePainelTabelaProdutos');

// clique no botão para ativar geração do qr code
function gerarQRCodePainelProduto(botaoQRCode) {
	divQRCodePainelTabelaProdutos.innerHTML = '';
	
	var qrCodeImagePainelTabelaProdutos = [{
		config: {
			text: /*"https://192.168.0.103:8443/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
				/*"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
				"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="
				+ botaoQRCode.dataset.uuidProduto
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

	for (var i = 0; i < qrCodeImagePainelTabelaProdutos.length; i++) {
		var qrcodeHTML = qrcodeTpl1PainelTabelaProdutos.replace(/{i}/, i);
		divQRCodePainelTabelaProdutos.innerHTML += qrcodeHTML;
	}

	for (var i = 0; i < qrCodeImagePainelTabelaProdutos.length; i++) { var t = new QRCode(document.getElementById("qrcodePainelTabelaProdutos_"+i), qrCodeImagePainelTabelaProdutos[i].config); }
}

//clique no botão para salvar qr code gerado
botaosalvarQRCodePainelTabelaProdutos.addEventListener("click", () => {
	
	// verifica se a div não está sem qr code
	if (divQRCodePainelTabelaProdutos.innertHTML != '') {
		
		const nomeProdutoQRCodePainelTabelaProdutos = document.getElementById('nomeProdutoQRCode').innerHTML;
		
		var canvasQRCodePainelTabelaProdutos = document.querySelector("#divQRCodePainelTabelaProdutos canvas");
		canvasQRCodePainelTabelaProdutos.toBlob(function(blob) {
			saveAs(blob,  nomeProdutoQRCodePainelTabelaProdutos + ".png");
		}, "image/png");
	}
});