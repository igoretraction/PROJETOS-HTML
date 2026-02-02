/* Frete/Desconto Progressivo - JS Only
   Insere logo abaixo de: .shipping-calculator
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
    gap: 10px;
    display: flex;
    flex-direction: column-reverse;
    margin-top: 20px;
}

        .frete-progressivo .title-content{
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          max-width: 680px;
          margin: 0 auto 10px auto;
          text-transform: uppercase;
          font-size: 16px;
          color: #111;
        }

        .frete-progressivo .content-cupom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: auto;
    max-width: 1240px;
    font-family: "Poppins", sans-serif;
    width: 100%;
}

        .frete-progressivo .step {
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 400;
    padding: 0px 23px 0px 31px;
    text-transform: uppercase;
    flex: 1;
    clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
    position: relative;
    color: #fff;
    background: linear-gradient(135deg, #cfcfcf 0%, #7a7a7a 55%, #2f2f2f 100%);
}

        .frete-progressivo .step:first-child{
          clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 0% 50%, 0% 0%);
          padding-left:20px;
          background: linear-gradient(135deg, #7b4ba5 0%, #5a1c7d 100%);
        }
          .frete-progressivo .step:first-child > small{
          background: #fd5b31;
          color:#fff;
        }

        .frete-progressivo .step:nth-child(2){
                  background: linear-gradient(135deg, #4ea9a0 0%, #2d7a73 100%);
        }
                  .frete-progressivo .step:nth-child(2) > small{
                  background: linear-gradient(135deg, #3d5a99 0%, #1e3a6d 100%);
                  color:#fff;
        }

        .frete-progressivo .step:last-child{
                  background: linear-gradient(135deg, #3d5a99 0%, #1e3a6d 100%);
        }
                   .frete-progressivo .step:last-child > small{
                  background: #effa06;
                  color:black;
        }

        .frete-progressivo .step + .step{ margin-left:-35px; }
        .frete-progressivo .step:nth-child(1){ z-index:3; }
        .frete-progressivo .step:nth-child(2){ z-index:2; }
        .frete-progressivo .step:nth-child(3){ z-index:1; }

        .frete-progressivo .step span{
          font-size:11px;
          display:block;
          opacity:.95;
        }

        .frete-progressivo .step p{
          margin:6px 0 4px 0;
          font-size:19px;
          font-weight:500;
          line-height:1.1;
          color:#fff;
        }

        .frete-progressivo .step small{
          font-size:11px;
          opacity:.95;
          font-weight:500;
padding: 4px 11px;
    border-radius: 10000px;
        }

        @media (max-width:600px){
          .frete-progressivo .title-content{ font-size:12px; }
          .frete-progressivo .content-cupom{ font-size:10px; }
          .frete-progressivo .step p{ font-size:14px; }

          .frete-progressivo .step:nth-child(2){
            clip-path: polygon(89% -5%, 100% 50%, 88% 101%, 0% 100%, 9% 51%, 0% 0%);
          }

          .frete-progressivo .step:first-child{ padding-left:0; }

          .frete-progressivo .step{
            width:100%;
            clip-path:none;
            padding:12px 8px;
            height:95px;
          }

          .frete-progressivo .step + .step{ margin-left:-9px; }

          .frete-progressivo{
            max-width:95%;
            margin:60px auto 0 auto;
          }

          .frete-progressivo .step span,
          .frete-progressivo .step small{
            font-size:10px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 3) Injeta HTML logo abaixo de .shipping-calculator
    const wrapper = document.createElement("div");
    wrapper.className = "frete-progressivo";
    wrapper.innerHTML = `
      <div class="content-cupom">
        <div class="step">
          <p><strong>R$ 80 </strong> OFF no carrinho</p>
          <small> Em compras acima de R$ 1000</small>
        </div>

        <div class="step">
          <p> <strong>R$ 120</strong> OFF no carrinho</p>
          <small>Em compras acima de R$ 1500</small>
        </div>

        <div class="step">
          <p><strong>R$ 200 </strong> OFF no carrinho</p>
          <small> Em compras acima de R$ 1800</small>
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