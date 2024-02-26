const qrcodeTpl1PainelAlterarProduto = document.getElementById('qrcodeTpl1PainelAlterarProduto').innerHTML;
const divQRCodePainelAlterarProduto = document.getElementById('divQRCodePainelAlterarProduto');
const botaoSalvarQRCodePainelAlterarProduto = document.getElementById('salvarQRCodePainelAlterarProduto');

// carregamento do qr code
window.addEventListener(
		'load', 
		function() { 
		    				
			divQRCodePainelAlterarProduto.innerHTML = '';

			var qrCodeImage = [{
				config: {
					text: /*"https://192.168.0.103:8443/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
						/*"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="*/
						"http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto="
						+ divQRCodePainelAlterarProduto.dataset.uuidProduto
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
				var qrcodeHTML = qrcodeTpl1PainelAlterarProduto.replace(/{i}/, i);
				divQRCodePainelAlterarProduto.innerHTML += qrcodeHTML;
			}

			for (var i = 0; i < qrCodeImage.length; i++) { var t = new QRCode(document.getElementById("qrcodePainelAlterarProduto_"+i), qrCodeImage[i].config); }
	
		}, false);

// clique no botão para salvar qr code gerado
botaoSalvarQRCodePainelAlterarProduto.addEventListener("click", () => {
	
	// verifica se a div não está sem qr code
	if (divQRCodePainelAlterarProduto.innertHTML != '') {
		
		var canvasQRCode = document.querySelector("#divQRCodePainelAlterarProduto canvas");
		canvasQRCode.toBlob(function(blob) {
			saveAs(blob, "📦 " + divQRCodePainelAlterarProduto.dataset.nomeProduto + " 📦" + ".png");
		}, "image/png");
	}
});