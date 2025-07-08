/* Fale com um consultor */
const botao = document.getElementById("fale-consultor");
const bloco2 = document.getElementById("bloco-carrosel");

window.addEventListener("scroll", () => {
  const blocoTop = bloco2.getBoundingClientRect().top;
  const blocoBottom = bloco2.getBoundingClientRect().bottom;

  if (blocoTop <= 0 || (blocoTop < window.innerHeight && blocoBottom > 0)) {
    botao.classList.add("visivel");
  } else {
    botao.classList.remove("visivel");
  }
});

/* Formulario */

// função de buscar UTMs na URL
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search); // procura pelos parametros UTM da URL

  // retorna objeto
  return {
    utm_source: urlParams.get("utm_source"),
    utm_medium: urlParams.get("utm_medium"),
    utm_campaign: urlParams.get("utm_campaign"),
  };
}

// funcao de preencher os inputs escondidos do HTML com os valores da UTM
function fillUTMs(objeto) {
  document.querySelector("#utm_source").value = objeto.utm_source || "";
  document.querySelector("#utm_medium").value = objeto.utm_medium || "";
  document.querySelector("#utm_campaign").value = objeto.utm_campaign || "";
}

// funcao de enviar dados para CV CRM
function envio(formEntries) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      token: "72d919236350de7e54850a0cfa83096b573b0016",
    },
    body: JSON.stringify(formEntries),
  };

  fetch("https://cvcrm-proxy.vercel.app/api/lead", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

// Evento que se inicia ao carrear a página
document.addEventListener("DOMContentLoaded", () => {
  // chama a função de preencher inputs escondidos
  fillUTMs(getUTMParams());

  // pega a referencia do formulario
  const form = document.querySelector("form");

  // Evento que se inicia ao ocorrer uma submissão nop formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio e redirecionamento automaticos

    if (!form.reportValidity()) return; // se não for válido, não funciona

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData); // transforma os valores do formulario em um objeto

    // adiciona novos objetos
    formEntries.permitir_alteracao = true;
    formEntries.email_gestor = "thiago.cunha@mip.com.br";
    formEntries.idempreendimento = 19;
    formEntries.converter = true;
    formEntries.idsituacao = 1;

    // chama a função de envio
    envio(formEntries);

    // Aguarda um pouco antes de redirecionar para garantir o envio
    setTimeout(() => {
      window.location.href = "agradecimento.html";
    }, 500); // ou ajuste esse tempo conforme necessÃ¡rio
  });
});

// ZOOM MODAL

// FunÃ§Ã£o para abrir o zoom
function openZoom(imgSrc) {
  const modal = document.getElementById("zoomModal");
  const zoomImg = document.getElementById("zoomImg");
  zoomImg.src = imgSrc;
  modal.style.display = "flex";
}

// Fechar ao clicar fora da imagem ou no X
function closeZoom() {
  document.getElementById("zoomModal").style.display = "none";
}

// Aplicar evento a todas as imagens
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#bloco-carrosel-grid img").forEach((img) => {
    img.addEventListener("click", () => openZoom(img.src));
  });
  document.querySelectorAll("#bloco-carrosel-planta img").forEach((img) => {
    img.addEventListener("click", () => openZoom(img.src));
  });
});
