/* Frete/Desconto Progressivo - JS Only (EXCLUSIVE Style)
   Insere logo abaixo de: #gallery-image-and-product-options
*/
(function () {
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function run() {
    const alvo = document.querySelector("#gallery-image-and-product-options");
    if (!alvo) return;

    // evita duplicar caso rode mais de 1x
    if (document.querySelector(".frete-progressivo")) return;

    // 1) Injeta fonte (Poppins) via <link>
    if (!document.querySelector('link[data-britz-poppins="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap";
      link.setAttribute("data-britz-poppins", "1");
      document.head.appendChild(link);
    }

    // 2) Injeta CSS via <style>
    if (!document.querySelector("style[data-britz-frete-progressivo='1']")) {
      const style = document.createElement("style");
      style.setAttribute("data-britz-frete-progressivo", "1");
      style.textContent = `
        .frete-progressivo {
          font-family: "Poppins", sans-serif;
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          gap: 20px;
        }

        .frete-progressivo .title-content {
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          max-width: 680px;
          margin: 0 auto;
          text-transform: uppercase;
          font-size: 18px;
          color: #5a1c7d;
          text-align: center;
          letter-spacing: 0.5px;
        }

        .frete-progressivo .content-cupom {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: stretch;
          margin: auto;
          max-width: 1240px;
          font-family: "Poppins", sans-serif;
          width: 100%;
          gap: 15px;
        }

       .frete-progressivo .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    padding: 25px 10px;
    flex: 1;
    position: relative;
    color: #fff;
    border-radius: 100px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    min-height: 120px;
}

        .frete-progressivo .step:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
        }

        .frete-progressivo .step:first-child {
          background: linear-gradient(135deg, #7b4ba5 0%, #5a1c7d 100%);
        }

        .frete-progressivo .step:nth-child(2) {
          background: linear-gradient(135deg, #4ea9a0 0%, #2d7a73 100%);
        }

        .frete-progressivo .step:last-child {
          background: linear-gradient(135deg, #3d5a99 0%, #1e3a6d 100%);
        }

        .frete-progressivo .step p {
    margin: 0 0 -6px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

        .frete-progressivo .step:first-child p strong {
          color: #fd5b31;
        }
          .frete-progressivo .step:first-child .cupom-code {
          background: #fd5b31;
        }


        .frete-progressivo .step:nth-child(2) p strong {
          color: #1e3a6d;
        }
        .frete-progressivo .step:nth-child(2) .cupom-code {
          background: #1e3a6d;
        }

        .frete-progressivo .step:last-child p strong {
          color: #effa06;
        }
        .frete-progressivo .step:last-child .cupom-code {
          background: #effa06;
          color: black;
        }

        .frete-progressivo .step p strong {
          font-size: 52px;
          font-weight: 900;
          display: inline;
        }

        .frete-progressivo .step small {
          font-size: 11px;
          opacity: 0.9;
          font-weight: 400;
          margin-top: 5px;
          display: block;
          line-height: 1.3;
          text-transform: lowercase;
        }

        .frete-progressivo .step .cupom-code {
          display: inline-block;
          background: rgba(255, 255, 255, 0.3);
          padding: 8px 18px;
          border-radius: 25px;
          font-size: 10px;
          font-weight: 800;
          margin-top: 12px;
          letter-spacing: 0.5px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .frete-progressivo .title-content {
            font-size: 14px;
          }

          .frete-progressivo .content-cupom {
            flex-direction: column;
            gap: 12px;
            padding: 0 15px;
          }

          .frete-progressivo .step {
            min-height: auto;
            padding: 20px 15px;
          }

          .frete-progressivo .step p {
            font-size: 14px;
          }

          .frete-progressivo .step p strong {
            font-size: 38px;
          }

          .frete-progressivo .step small {
            font-size: 10px;
          }

          .frete-progressivo .step .cupom-code {
            font-size: 9px;
            padding: 6px 14px;
          }

          .frete-progressivo {
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .frete-progressivo .step p {
            font-size: 13px;
          }

          .frete-progressivo .step p strong {
            font-size: 32px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 3) Injeta HTML logo abaixo de #gallery-image-and-product-options
    const wrapper = document.createElement("div");
    wrapper.className = "frete-progressivo";
    wrapper.innerHTML = `
      <div class="content-cupom">
        <div class="step">
          <p>ganhe<br>R$<strong>80</strong>,00</p>
          <small>nas compras acima de R$1000,00</small>
          <span class="cupom-code">DESCONTO AUTOMÁTICO</span>
        </div>

        <div class="step">
          <p>ganhe<br>R$<strong>120</strong>,00</p>
          <small>nas compras acima de R$1500,00</small>
          <span class="cupom-code">DESCONTO AUTOMÁTICO</span>
        </div>

        <div class="step">
          <p>ganhe<br>R$<strong>200</strong>,00</p>
          <small>nas compras acima de R$1800,00</small>
          <span class="cupom-code">DESCONTO AUTOMÁTICO</span>
        </div>
      </div>
    `;

    insertAfter(wrapper, alvo);
  }

  // DOM pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
