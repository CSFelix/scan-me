const cacheName = "WebChat";

self.addEventListener("install", function(event) {
    event.waitUntill(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                "./",
                
                // manifest e service worker index
                "./manifest.webmanifest",
                "./index.js",
                
                // jsp's principais
                "./alteracao-senha.jsp",
                "./alterar-produto.jsp",
                "./cadastro-final.jsp",
                "./cadastro-inicial.jsp",
                "./cadastro-produto.jsp",
                "./esqueceu-senha.jsp",
                "./index.jsp",
                "./painel.jsp",
                "./visualizar-produto.jsp",
                
                // includes sections
                "./includes/sections-painel/painel-alterar-produto.jsp",
                "./includes/sections-painel/painel-cadastro-produto.jsp",
                "./includes/sections-painel/painel-dashboard.jsp",
                "./includes/sections-painel/painel-info.jsp",
                "./includes/sections-painel/painel-loja.jsp",
                "./includes/sections-painel/painel-produtos.jsp",
                "./includes/sections-painel/painel-relatorios.jsp",
                "./includes/sections-painel/painel-scanner.jsp",
                "./includes/sections-painel/painel-visualizar-produto.jsp",
                
                // includes
                "./includes/footer.html",
                "./includes/head-login.html",
                "./includes/head-painel.html",
                "./includes/head-produto.html",
                
                "./includes/menu-vertical-lojas-comprador.html",
                "./includes/menu-vertical-lojas-vendedor.html",
                "./includes/menu-vertical-painel-comprador.html",
                "./includes/menu-vertical-painel-vendedor.html",
                "./includes/menu-vertical-produto.html",
                
                "./includes/modal-alteracao-dados-usuarios-painel-info.html",
                "./includes/modal-alteracao-senha.html",
                "./includes/modal-cadastro.html",
                "./includes/modal-esqueceu-senha.html",
                "./includes/modal-tabela-produtos-qr-code.html",
                "./includes/modal-visualizar-produto.html",
                
                "./includes/nav.html",
                "./includes/script-alterar-produto.html",
                "./includes/script-login.html",
                "./includes/script-painel-comprador.html",
                "./includes/script-painel-vendedor.html",
                "./includes/script-produto.html",
                "./includes/script-visualizar-produto-comprador.html",
                "./includes/script-visualizar-produto-vendedor.html",
                
                "./includes/vue-alterar-produto.html",
                "./includes/vue-login.html",
                "./includes/vue-painel-comprador.html",
                "./includes/vue-painel-vendedor.html",
                "./includes/vue-produto.html",
                "./includes/vue-visualizar-produto.html",
                
                // imagens
                "./images/avatar/avatar.png",
                "./images/logos/icone-padrao.png",
                
                // css classes
                "./assets/css/classes/blob.css",
                "./assets/css/classes/botao.css",
                "./assets/css/classes/campo-div-form.css",
                "./assets/css/classes/campo-div-produto.css",
                "./assets/css/classes/campo-input-descricao.css",
                "./assets/css/classes/campo-input.css",
                "./assets/css/classes/campo-label.css",
                "./assets/css/classes/campos-desativados.css",
                
                "./assets/css/classes/check-box-hidden.css",
                "./assets/css/classes/esqueceu-senha.css",
                "./assets/css/classes/flex-center.css",
                "./assets/css/classes/flex-space.css",
                "./assets/css/classes/form-login.css",
                "./assets/css/classes/horizontal-line.css",
                "./assets/css/classes/info-message.css",
                
                "./assets/css/classes/info.css",
                "./assets/css/classes/label-ativa.css",
                "./assets/css/classes/language-list.css",
                "./assets/css/classes/modal.css",
                "./assets/css/classes/nav-config-options.css",
                "./assets/css/classes/nav-toast.css",
                "./assets/css/classes/neon.css",
                
                "./assets/css/classes/out-of-range-inputs.css",
                "./assets/css/classes/section-painel.css",
                "./assets/css/classes/slider-imagem.css",
                "./assets/css/classes/slider-toogle-emoji.css",
                "./assets/css/classes/slider-toogle.css",
                "./assets/css/classes/tabela-principal.css",
                "./assets/css/classes/tag.css",
                
                "./assets/css/classes/toast-message.css",
                "./assets/css/classes/vertical-menu.css",
                "./assets/css/classes/visualizar-produto-classes.css",
                "./assets/css/classes/visualizar-foto-perfil-cadastro.css",
                "./assets/css/classes/visualizar-foto-perfil-painel.css",
                "./assets/css/classes/visualizar-foto-produtos.css",
                "./assets/css/classes/visualizar-senha.css",
                
                // css configs
                "./assets/css/configs/layout-desktop-login.css",
                "./assets/css/configs/layout-desktop-painel.css",
                "./assets/css/configs/layout-mobile.css",
                "./assets/css/configs/reset-vars.css",
                
                // css libraries
                "./assets/css/libraries/ani-collection.css",
                
                // css structures
                "./assets/css/structures/content.css",
                "./assets/css/structures/footer.css",
                "./assets/css/structures/nav.css",
                
                // js ajax
                "./assets/js/ajax/ajax-alteracao-senha.js",
                "./assets/js/ajax/ajax-alterar-dados-usuario-painel-info.js",
                "./assets/js/ajax/ajax-alterar-produto.js",
                "./assets/js/ajax/ajax-buscar-dados-dashboard.js",
                "./assets/js/ajax/ajax-buscar-lista-nome-produtos.js",
                
                "./assets/js/ajax/ajax-buscar-lista-tabela-produtos.js",
                "./assets/js/ajax/ajax-cadastrar-produto.js",
                "./assets/js/ajax/ajax-cadastro-inicial.js",
                "./assets/js/ajax/ajax-deslogar.js",
                "./assets/js/ajax/ajax-esqueceu-senha.js",
                
                "./assets/js/ajax/ajax-excluir-produto.js",
                "./assets/js/ajax/ajax-login.js",
                "./assets/js/ajax/ajax-trocar-senha.js",
                
                // js controllers disablers
                "./assets/js/controllers/disablers/disabler-painel-info.js",
                
                // js controllers labels-inputs
                "./assets/js/controllers/labels-inputs/label-ativa-alteracao-senha.js",
                "./assets/js/controllers/labels-inputs/label-ativa-cadastro-final.js",
                "./assets/js/controllers/labels-inputs/label-ativa-cadastro-produto.js",
                "./assets/js/controllers/labels-inputs/label-ativa-cadastro.js",
                "./assets/js/controllers/labels-inputs/label-ativa-esqueceu-senha.js",
                "./assets/js/controllers/labels-inputs/label-ativa-login.js",
                
                // js controllers mensagens-modals
                "./assets/js/controllers/mensagens-modals/exibir-mensagem.js",
                "./assets/js/controllers/mensagens-modals/mensagens-modals.js",
                
                //js controllers modals
                "./assets/js/controllers/modals/modais-painel.js",
                "./assets/js/controllers/modals/modal-alteracao-senha.js",
                "./assets/js/controllers/modals/modal-cadastro-inicial.js",
                "./assets/js/controllers/modals/modal-esqueceu-senha.js",
                "./assets/js/controllers/modals/modal-visualizar-produto.js",

                // js controllers notifications                
                "./assets/js/controllers/notifications/exibir-notificacao-login.js",
                "./assets/js/controllers/notifications/solicitacao-notificao.js",
                
                // js controllers redirecionamentos
                "./assets/js/controllers/redirecionamentos/alterar-produto.js",
                
                // js controllers regex
                "./assets/js/controllers/regex/validar-email.js",
                
                // js effects
                "./assets/js/effects/ativar-opcao-menu-painel-comprador.js",
                "./assets/js/effects/ativar-opcao-menu-painel-vendedor.js",
                "./assets/js/effects/ativar-opcao-menu-produto-comprador.js",
                "./assets/js/effects/ativar-opcao-menu-produto-vendedor.js",
                "./assets/js/effects/carregar-avatar-padrao.js",
               
                "./assets/js/effects/inputs-apertar-enter.js",
                "./assets/js/effects/label-ativa.js",
                "./assets/js/effects/nav-options.js",
                "./assets/js/effects/slider-imagem.js",
                "./assets/js/effects/switch-tipo-usuario.js",
                
                "./assets/js/effects/tipo-produto-ativo-alterar-produto.js",
                "./assets/js/effects/tipo-produto-ativo-cadastro-produto.js",
                "./assets/js/effects/toogle-menu-vertical-comprador.js",
                "./assets/js/effects/toogle-menu-vertical-vendedor.js",
                "./assets/js/effects/trocar-idioma-login.js",
                
                "./assets/js/effects/trocar-idioma-painel.js",
                "./assets/js/effects/trocar-idioma-produto.js",
                "./assets/js/effects/trocar-modo.js",
                "./assets/js/effects/visualizar-alteracao-foto-perfil-cadastro-final.js",
                "./assets/js/effects/visualizar-alteracao-foto-perfil-painel.js",
                
                "./assets/js/effects/visualizar-alteracao-foto-produto.js",
                "./assets/js/effects/visualizar-senha-alteracao-senha.js",
                "./assets/js/effects/visualizar-senha-cadastro.js",
                "./assets/js/effects/visualizar-senha-login.js",
                
                // js libraries
                "./assets/js/libraries/anijs-min.js",
                "./assets/js/libraries/chart.min.js",
                "./assets/js/libraries/easy.qrcode.min.js",
                "./assets/js/libraries/file-saver.js",
                "./assets/js/libraries/font-awesome.js",
                "./assets/js/libraries/jsQR.js",
                "./assets/js/libraries/vue.js",
                
                // js qr-code
                "./assets/js/qr-code/ativar-leitor-qr-code.js",
                "./assets/js/qr-code/gerador-qr-code-produto-painel-alterar-produto.js",
                "./assets/js/qr-code/gerador-qr-code-produto-painel-relatorio.js",
                "./assets/js/qr-code/gerador-qr-code-produto-painel-tabela-produtos.js",
                
                // js vue sections-painel
                "./assets/js/vue/languages/sections-painel/painel-alterar-produto.js",
                "./assets/js/vue/languages/sections-painel/painel-cadastro-produto.js",
                "./assets/js/vue/languages/sections-painel/painel-dashboard.js",
                "./assets/js/vue/languages/sections-painel/painel-info.js",
                "./assets/js/vue/languages/sections-painel/painel-produtos.js",
                
                "./assets/js/vue/languages/sections-painel/painel-relatorios.js",
                "./assets/js/vue/languages/sections-painel/painel-scanner.js",
                "./assets/js/vue/languages/sections-painel/painel-visualizar-produto.js",
                
                // js vue
                "./assets/js/vue/languages/alteracao-senha.js",
                "./assets/js/vue/languages/cadastro.js",
                "./assets/js/vue/languages/esqueceu-senha.js",
                "./assets/js/vue/languages/login.js",
                "./assets/js/vue/languages/menu-vertical.js",
                
                "./assets/js/vue/languages/modal-alteracao-dados-usuarios-painel-info.js",
                "./assets/js/vue/languages/modal-alteracao-senha.js",
                "./assets/js/vue/languages/modal-cadastro.js",
                "./assets/js/vue/languages/modal-esqueceu-senha.js",
                "./assets/js/vue/languages/modal-tabela-produtos-qr-code.js",
                
                "./assets/js/vue/languages/modal-visualizar-produto.js",
                "./assets/js/vue/languages/nav.js",
            ])
        })
    )
    return self.skipWaiting();
})

self.addEventListener("activate", () => {
    self.client.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) { return response; }
      return fetch(event.request);
    })
  );
}); 

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const refresh = await fetch(req);
        await cache.put(req, refresh.clone());
        return refresh;
    }
    catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}