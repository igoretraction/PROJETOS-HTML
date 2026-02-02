document.addEventListener("DOMContentLoaded", () => {
  const LOG = (...args) => console.log("[blh-regua]", ...args);

  // ===== CONFIG =====
  const FRETE_GRATIS_MIN = 1000;
  const FRETE_REGIOES = "Sul, Sudeste e Centro-Oeste";

  const DESCONTOS = [
    { value: 1000, label: "R$80 Desconto automático no carrinho", discount: 80 },
    { value: 1500, label: "R$120 Desconto automático no carrinho", discount: 120 },
    { value: 1800, label: "R$200 Desconto automático no carrinho", discount: 200 },
  ];

  const MAX_TIER = DESCONTOS[DESCONTOS.length - 1].value; // 1800

  // ===== CSS =====
  const style = document.createElement("style");
  style.textContent = `
    .blh-regua {
      --bg:#000;
      --ink:#fff;
      --muted:rgba(255,255,255,.72);
      --line:rgba(255,255,255,.14);
      --yellow:#FFD400;
      --shadow:0 10px 30px rgba(0,0,0,.35);

      background:var(--bg);
      color:var(--ink);
      border:1px solid var(--line);
      border-radius:12px;
      box-shadow:var(--shadow);
      padding:16px;
      margin:16px 0;
      font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial;
    }

    .blh-regua__top {
      display:flex;
      justify-content:space-between;
      gap:12px;
      margin-bottom:12px;
      align-items:flex-start;
    }

    .blh-regua__title {
      font-size:16px;
      font-weight:900;
      margin:0;
      letter-spacing:.2px;
    }

    .blh-regua__desc {
      font-size:14px;
      color:var(--muted);
      margin-top:6px;
      line-height:1.35;
    }

    .blh-regua__desc strong { color:#fff; font-weight:900; }

    .blh-regua__badge {
      background:var(--yellow);
      color:#000;
      font-weight:900;
      font-size:12px;
      padding:7px 10px;
      border-radius:999px;
      white-space:nowrap;
      line-height:1;
      margin-top:2px;
    }

    .blh-regua__trackWrap {
      position:relative;
      margin-top:10px;
    }

    .blh-regua__track {
      background:rgba(255,255,255,.15);
      height:8px;
      border-radius:999px;
      overflow:hidden;
      position:relative;
    }

    .blh-regua__bar {
      height:100%;
      width:0%;
      background:var(--yellow);
      transition:width .3s ease;
    }

    .blh-regua__marks {
      position:absolute;
      left:0;
      right:0;
      top:50%;
      transform:translateY(-50%);
      pointer-events:none;
    }

    .blh-regua__mark {
      position:absolute;
      width:10px;
      height:10px;
      border-radius:999px;
      background:rgba(255,255,255,.35);
      border:2px solid rgba(255,255,255,.18);
      transform:translate(-50%,-50%);
      top:50%;
    }

    .blh-regua__mark.is-on {
      background:var(--yellow);
      border-color:rgba(0,0,0,.35);
    }

    .blh-regua__levels {
      display:flex;
      justify-content:space-between;
      margin-top:8px;
      font-size:12px;
      color:rgba(255,255,255,.75);
    }

    .blh-regua__levels b { color:#fff; font-weight:900; }

    .blh-regua__meta {
      display:flex;
      justify-content:space-between;
      gap:12px;
      margin-top:10px;
      font-size:14px;
      color:var(--muted);
      align-items:flex-start;
      flex-wrap:wrap;
    }

    .blh-regua__meta strong { color:var(--ink); font-weight:900; }

    .blh-regua__cta {
      font-size:15px;
      font-weight:900;
      color:#fff;
      line-height:1.25;
    }

    .blh-regua__foot {
      margin-top:12px;
      padding-top:12px;
      border-top:1px solid rgba(255,255,255,.12);
      font-size:12px;
      color:var(--muted);
      line-height:1.45;
    }

    .blh-regua__foot b { color:#fff; font-weight:900; }
  `;
  document.head.appendChild(style);

  // ===== HELPERS =====
  function parseBRL(text) {
    if (!text) return 0;
    return (
      parseFloat(text.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0
    );
  }

  function formatBRL(v) {
    return (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function getSubtotal() {
    const el = document.querySelector(".totalPrice");
    // se não encontrou, retorna 0 (mas a régua continua aparecendo)
    return el ? parseBRL(el.textContent) : 0;
  }

  function bestDiscountTier(subtotal) {
    let best = null;
    DESCONTOS.forEach((t) => {
      if (subtotal >= t.value) best = t;
    });
    return best;
  }

  function nextDiscountTier(subtotal) {
    return DESCONTOS.find((t) => subtotal < t.value) || null;
  }

  // Progresso com 3 estágios (0 -> 1800)
  function progressOverall(subtotal) {
    const p = (Math.max(0, subtotal) / MAX_TIER) * 100;
    return Math.max(0, Math.min(100, p));
  }

  function ensureHost() {
    const cartTable = document.querySelector(".cartTable");
    const cartBody = document.querySelector('[data-cart="body"]');

    let host = document.querySelector(".blh-regua-host");
    if (host) return host;

    host = document.createElement("div");
    host.className = "blh-regua-host";

    if (cartTable && cartTable.parentElement) {
      cartTable.parentElement.insertBefore(host, cartTable);
      return host;
    }

    if (cartBody) {
      cartBody.prepend(host);
      return host;
    }

    // fallback (último caso): tenta colocar no body
    document.body.prepend(host);
    return host;
  }

  // ===== RENDER =====
  function render() {
    const subtotal = getSubtotal();
    const host = ensureHost();

    const bestTier = bestDiscountTier(subtotal);
    const nextTier = nextDiscountTier(subtotal);
    const hasFrete = subtotal >= FRETE_GRATIS_MIN;

    const progress = progressOverall(subtotal);

    // ===== COPY GRANDE (CTA) =====
    let ctaText = "";
    let title = "";
    let desc = "";

    if (!nextTier) {
      // >= 1800
      title = "✅ Benefícios no máximo!";
      desc = `Você já desbloqueou <strong>frete grátis</strong> e o <strong>maior desconto automático</strong>.`;
      ctaText = "🎉 Perfeito! Você atingiu o maior benefício.";
    } else {
      const falta = Math.max(0, nextTier.value - subtotal);

      // Próximo marco: 1000 (frete + 80) ou 1500 (120) ou 1800 (200)
      if (subtotal < FRETE_GRATIS_MIN) {
        // Antes de 1000: ganha frete + 80
        title = "🛒 Falta pouco pra liberar benefícios";
        desc = `Ao chegar em <strong>${formatBRL(1000)}</strong>, você ganha <strong>frete grátis</strong> (${FRETE_REGIOES}) e <strong>${formatBRL(80)} OFF</strong> automático no carrinho.`;
        ctaText = `Compre mais <strong>${formatBRL(falta)}</strong> para ganhar <strong>frete grátis</strong> e mais <strong>${formatBRL(nextTier.discount)} OFF</strong> automático no carrinho.`;
      } else {
        // Já tem frete + alguma faixa: próxima é só o desconto do próximo nível
        title = "✅ Benefícios liberados";
        desc = `Você já ganhou <strong>frete grátis</strong> (${FRETE_REGIOES})${bestTier ? ` + <strong>${formatBRL(bestTier.discount)} OFF</strong>` : ""}.`;
        ctaText = `Compre mais <strong>${formatBRL(falta)}</strong> para ganhar mais <strong>${formatBRL(nextTier.discount)} OFF</strong> automático no carrinho.`;
      }
    }

    // badge
    const badge = bestTier ? `${formatBRL(bestTier.discount)} OFF` : "BENEFÍCIOS";

    // marcadores dos 3 níveis (em % do MAX)
    const marks = DESCONTOS.map((t) => Math.round((t.value / MAX_TIER) * 100));
    const markOn = (v) => subtotal >= v;

    host.innerHTML = `
      <section class="blh-regua">
        <div class="blh-regua__top">
          <div>
            <p class="blh-regua__title">${title}</p>
            <div class="blh-regua__desc">${desc}</div>
          </div>
          <div class="blh-regua__badge">${badge}</div>
        </div>

        <div class="blh-regua__trackWrap">
          <div class="blh-regua__track">
            <div class="blh-regua__bar" style="width:${progress}%"></div>
          </div>

          <div class="blh-regua__marks" aria-hidden="true">
            <span class="blh-regua__mark ${markOn(1000) ? "is-on" : ""}" style="left:${marks[0]}%"></span>
            <span class="blh-regua__mark ${markOn(1500) ? "is-on" : ""}" style="left:${marks[1]}%"></span>
            <span class="blh-regua__mark ${markOn(1800) ? "is-on" : ""}" style="left:${marks[2]}%"></span>
          </div>

          <div class="blh-regua__levels">
            <span><b>${formatBRL(1000)}</b> (Frete + ${formatBRL(80)} OFF)</span>
            <span><b>${formatBRL(1500)}</b> (${formatBRL(120)} OFF)</span>
            <span><b>${formatBRL(1800)}</b> (${formatBRL(200)} OFF)</span>
          </div>
        </div>

        <div class="blh-regua__meta">
          <span>Total: <strong>${formatBRL(subtotal)}</strong></span>
          <span class="blh-regua__cta">${ctaText}</span>
        </div>

        <div class="blh-regua__foot">
          <b>Frete grátis</b> acima de <b>${formatBRL(FRETE_GRATIS_MIN)}</b> (${FRETE_REGIOES}).<br>
          <b>Desconto automático no carrinho</b>:
          ${formatBRL(80)} (≥${formatBRL(1000)}),
          ${formatBRL(120)} (≥${formatBRL(1500)}),
          ${formatBRL(200)} (≥${formatBRL(1800)}).
        </div>
      </section>
    `;
  }

  // ===== OBSERVER =====
  const cartBody = document.querySelector('[data-cart="body"]');
  if (cartBody) {
    const obs = new MutationObserver(() => {
      clearTimeout(window.__blhTO);
      window.__blhTO = setTimeout(render, 80);
    });
    obs.observe(cartBody, { childList: true, subtree: true });
  }

  // Render inicial (aparece sempre)
  render();
  setTimeout(render, 300);

  LOG("Régua de benefícios ativa (3 níveis).");
});
