const msgLimiteTagsAtivadas = document.getElementById("limiteTagsProduto");

function checkTipoProduto(tag, checkbox) {
	/*
	 * Checa se a label está ativa ou não
	 * */
	
	// A tag somente poderá ser:
	// - ativada: quanda o limite de tag escolhidas não for superior a cinco 
	// (lembrando que a tag principal é ativada automaticamente);
	// - desativada: quando a tag clicada não é a principal;
	
	if (checkbox.value != sessionStorage.getItem("tipo_selecionado_tag")) {
		
		// até quatro tags ativadas antes da de agora => posso ativar e desativar as mesmas
		if (vuePainelCadastroProduto.contadorTagsAtivas + 1 <= 5) {
			
			// desativação da tag
			if (tag.classList.contains('tagAtivada')) { 
				tag.classList.remove('tagAtivada');
				checkbox.checked = false;
				vuePainelCadastroProduto.contadorTagsAtivas -= 1;
			}
			
			// ativar tag
			else { 
				tag.classList.add('tagAtivada'); 
				checkbox.checked = true;
				vuePainelCadastroProduto.contadorTagsAtivas += 1;
			}
			
			// esconder mensagem do limite de tags
			msgLimiteTagsAtivadas.style.display = 'none';
		}
		
		// cinco tags já ativadas => posso somente desativar
		else if (tag.classList.contains('tagAtivada')) {
			tag.classList.remove('tagAtivada');
			checkbox.checked = false;
			vuePainelCadastroProduto.contadorTagsAtivas -= 1;
			
			// esconder mensagem do limite de tags
			msgLimiteTagsAtivadas.style.display = 'none';
		}
		
		// tentativa de ativar mais de cinco tags
		// exibição da mensagem ao usuário
		else { msgLimiteTagsAtivadas.style.display = 'block'; }
	}
}