const CONFIG = {
  checkout: {
    basico:   "https://SEU-CHECKOUT/plano-basico",
    completo: "https://SEU-CHECKOUT/pacote-completo",
    upsell:   "https://SEU-CHECKOUT/pacote-completo-oferta"
  },
  mostrarOfertaNoBasico: true
};

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Ano no rodapé
  const ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Header com sombra ao rolar + CTA fixo mobile
  const header = $("#header");
  const sticky = $("#stickyCta");
  const planos = $("#planos");
  let planosVisivel = false;

  if (planos && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { planosVisivel = e.isIntersecting; onScroll(); }, { threshold: 0.1 }).observe(planos);
  }

  function onScroll() {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 8);
    sticky?.classList.toggle("is-visible", y > 700 && !planosVisivel);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Animação de entrada
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Contador animado
  $$("[data-count]").forEach((el) => {
    const alvo = +el.dataset.count;
    const inicio = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - inicio) / dur);
      const v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = "+" + v;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  // Vídeo do produto
  const video = $("#productVideo");
  if (video) {
    const wrap = video.closest(".video-phone");
    const btnSom = $("#videoSound");
    const btnPlay = $("#videoPlay");
    let pausadoPeloUsuario = false;

    const tocar = () => video.play().catch(() => {});
    video.addEventListener("playing", () => wrap.classList.add("is-playing"));
    video.addEventListener("pause", () => wrap.classList.remove("is-playing"));

    btnPlay.addEventListener("click", () => { pausadoPeloUsuario = false; tocar(); });
    video.addEventListener("click", () => {
      if (video.paused) { pausadoPeloUsuario = false; tocar(); }
      else { pausadoPeloUsuario = true; video.pause(); }
    });

    btnSom.addEventListener("click", () => {
      const ligar = video.muted;
      video.muted = !ligar;
      btnSom.setAttribute("aria-pressed", String(ligar));
      btnSom.setAttribute("aria-label", ligar ? "Desligar som" : "Ligar som");
      if (ligar && !btnSom.dataset.usado) { video.currentTime = 0; btnSom.dataset.usado = "1"; }
      pausadoPeloUsuario = false;
      tocar();
    });

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ("IntersectionObserver" in window && !semMovimento) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!pausadoPeloUsuario) tocar(); }
        else if (!video.paused) video.pause();
      }, { threshold: 0.5 }).observe(video);
    }
  }

  // FAQ: um aberto por vez
  const faqs = $$(".faq details");
  faqs.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // Checkout + modal
  const modal = $("#upsell");
  let ultimoFoco = null;

  const abrirModal = () => {
    ultimoFoco = document.activeElement;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $("[data-checkout='upsell']", modal)?.focus();
  };
  const fecharModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    ultimoFoco?.focus();
  };

  const irParaCheckout = (tipo) => {
    const url = CONFIG.checkout[tipo];
    if (!url) return;
    const destino = new URL(url, location.href);
    new URLSearchParams(location.search).forEach((v, k) => destino.searchParams.set(k, v));
    location.href = destino.toString();
  };

  $$("[data-checkout]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tipo = btn.dataset.checkout;
      if (tipo === "basico" && CONFIG.mostrarOfertaNoBasico && !btn.hasAttribute("data-skip") && modal) {
        abrirModal();
        return;
      }
      irParaCheckout(tipo);
    });
  });

  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", fecharModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) fecharModal();
  });
})();
