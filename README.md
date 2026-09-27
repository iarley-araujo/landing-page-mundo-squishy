# Mundo Squishy — Landing Page

Landing page de vendas para um infoproduto de **moldes de squishies de papel** para imprimir.
Projeto feito do zero em **HTML, CSS e JavaScript puros**, sem frameworks e sem dependências, com foco em conversão, performance e responsividade.

🔗 **Demo ao vivo:** https://iarley-araujo.github.io/landing-page-mundo-squishy/

## ✨ Destaques

- **Design system em CSS custom properties**: paleta, raios, sombras e tipografia centralizados em `:root`
- **Layout responsivo** (desktop → mobile) com CSS Grid e Flexbox, sem media queries desnecessárias
- **Ilustrações vetoriais próprias** (SVG) geradas por script: leves e nítidas em qualquer tela
- **Vídeo do produto otimizado**: HEVC do iPhone convertido para H.264 (32 MB → 8,5 MB), autoplay mudo só quando está visível na tela e botão “toque para ouvir”
- **Animações de entrada** com `IntersectionObserver` e respeito a `prefers-reduced-motion`
- **Fluxo de checkout configurável**: links centralizados em um objeto `CONFIG`, repasse automático de UTMs e modal de oferta no plano básico
- **CTA fixo no mobile**, que se esconde quando a seção de preços está visível
- **Acessibilidade**: HTML semântico, `aria-*` no modal e no player, foco visível e fechar com `Esc`
- **FAQ** com `<details>/<summary>` nativos, com um item aberto por vez

## 🗂️ Estrutura

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── img/      # logo, favicon, selo e ilustrações SVG
    └── media/    # vídeo do produto (MP4 H.264)
```

## 🚀 Como rodar

Não precisa de build. Abra o `index.html` no navegador ou suba um servidor local:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## ⚙️ Configuração

Os links de pagamento ficam no topo de `js/main.js`:

```js
const CONFIG = {
  checkout: {
    basico:   "https://SEU-CHECKOUT/plano-basico",
    completo: "https://SEU-CHECKOUT/pacote-completo",
    upsell:   "https://SEU-CHECKOUT/pacote-completo-oferta"
  },
  mostrarOfertaNoBasico: true
};
```

## 🛠️ Tecnologias

`HTML5` · `CSS3` (Grid, Flexbox, Custom Properties, animações) · `JavaScript ES6+` (IntersectionObserver) · `SVG` · `FFmpeg`

---

Desenvolvido por **ikaros**
