const qrcodeTpl1VisualizarProduto = document.getElementById('qrcodeTpl1VisualizarProduto').innerHTML;
const divQRCodeVisualizarProduto = document.getElementById('divQRCodeVisualizarProduto');
const botaosalvarQRCodeVisualizarProduto = document.getElementById('salvarQRCodeVisualizarProduto');

var nomeProdutoQRCodeVisualizarProduto;

// clique no botão para ativar geração do qr code
function gerarQRCodePainelProduto(botaoQRCode) {
	divQRCodeVisualizarProduto.innerHTML = '';
	
	nomeProdutoQRCodeVisualizarProduto = botaoQRCode.dataset.nomeProduto;
	
	var qrCodeImageVisualizarProduto = [{
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

	for (var i = 0; i < qrCodeImageVisualizarProduto.length; i++) {
		var qrcodeHTML = qrcodeTpl1VisualizarProduto.replace(/{i}/, i);
		divQRCodeVisualizarProduto.innerHTML += qrcodeHTML;
	}

	for (var i = 0; i < qrCodeImageVisualizarProduto.length; i++) { var t = new QRCode(document.getElementById("qrcodeVisualizarProduto_"+i), qrCodeImageVisualizarProduto[i].config); }
}

//clique no botão para salvar qr code gerado
botaosalvarQRCodeVisualizarProduto.addEventListener("click", () => {
	
	// verifica se a div não está sem qr code
	if (divQRCodeVisualizarProduto.innertHTML != '') {
		var canvasQRCodeVisualizarProduto = document.querySelector("#divQRCodeVisualizarProduto canvas");
		canvasQRCodeVisualizarProduto.toBlob(function(blob) {
			saveAs(blob,  "📦 " + nomeProdutoQRCodeVisualizarProduto + " 📦.png");
		}, "image/png");
	}
});