// =====================================
// JS — PROJETO SWIFT (global)
// Carregado em TODAS as páginas.
// Mantemos a lógica isolada por página com guards.
// =====================================

console.log("Swift: scripts carregados.");
const page = window.location.pathname;

// --------- HEADER global
(() => {
  const cartBadge = document.getElementById("cartBadge");
  const btnSearch = document.getElementById("btnSearch");
  if (btnSearch) {
    btnSearch.addEventListener("click", () => {
      alert("Busca simulada (mock) — em breve conectamos filtros/navegação.");
    });
  }
})();

// =====================================
// HOME (index.html)
// =====================================
(() => {
  if (!(page.endsWith("/index.html") || page.endsWith("/"))) return;

  const cartBadge = document.getElementById("cartBadge");
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = Number(cartBadge?.textContent || 0);
      if (cartBadge) cartBadge.textContent = String(current + 1);
      btn.classList.add("btn-success");
      btn.textContent = "Adicionado!";
      setTimeout(() => {
        btn.classList.remove("btn-success");
        btn.textContent = "Adicionar";
      }, 1200);
    });
  });
})();

// =====================================
// CADASTRO (pages/cadastro.html)
// =====================================
(() => {
  if (!page.endsWith("/cadastro.html")) return;

  // Toggle password com ícone (se você estiver usando material icons)
  window.togglePassword = function (inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (!input || !iconElement) return;
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    iconElement.textContent = show ? "visibility_off" : "visibility";
  };

  // Form
  const form = document.getElementById("cadastroForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const senha = document.getElementById("senha")?.value || "";
      const confirmarSenha = document.getElementById("confirmarSenha")?.value || "";
      const termosPrivacidade = !!document.getElementById("termosPrivacidade")?.checked;

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
      }
      if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
      }
      if (!termosPrivacidade) {
        alert("Você deve aceitar os Termos da Política de Privacidade para prosseguir.");
        return;
      }

      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    });
  }

  // CPF
  const cpf = document.getElementById("cpf");
  if (cpf) {
    cpf.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      e.target.value = value;
    });
  }

  // Telefone
  const telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
      e.target.value = value;
    });
  }
})();

// =====================================
// LOGIN (pages/login.html)
// - Toggle do "olhinho"
// - (Opcional) botão "Continuar" -> Google (mock ou real)
// =====================================
(() => {
  if (!page.endsWith("/login.html")) return;

  // Toggle de visibilidade da senha
  const btn = document.getElementById("togglePassword");
  const input = document.getElementById("password");
  if (btn && input) {
    btn.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", String(show));
      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-eye", !show);
        icon.classList.toggle("bi-eye-slash", show);
      }
    });

    // Pressionar e segurar para ver (opcional)
    btn.addEventListener("mousedown", () => (input.type = "text"));
    btn.addEventListener("mouseup", () => (input.type = "password"));
    btn.addEventListener("mouseleave", () => {
      if (btn.getAttribute("aria-pressed") !== "true") input.type = "password";
    });
  }

  // Botão Continuar -> Google (mock)
  const btnGoogleLogin = document.getElementById("btnGoogleLogin");
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener("click", () => {
      // MOCK: troque depois pela URL OAuth real
      window.location.href = "/mock/google-login.html";
    });
  }
})();

// --------- MOCK GOOGLE LOGIN ---------
function startCountdown() {
  console.log("Página de mock de login via Google (simulação).");

  const target  = "../pages/index-logado.html";      
  const span    = document.getElementById("mockCountdown");

  let left = 3;

  const tick = () => {
    if (span) span.textContent = left;
    if (left <= 0) {
      console.log("[mock] redirecionando para:", target);
      window.location.href = target;
    } else {
      left -= 1;
      setTimeout(tick, 1000);
    }
  };

  tick();
}

// =====================================
// ENTREGA E RETIRADA (pages/entrega.html)
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const homeDeliveryRadio = document.getElementById("homeDelivery")
  const storePickupRadio = document.getElementById("storePickup")
  const storeSearchSection = document.getElementById("storeSearchSection")
  const deliveryOptions = document.querySelectorAll(".delivery-option")
  const locationSearch = document.getElementById("locationSearch")
  const selectStoreBtn = document.getElementById("selectStoreBtn")
  const continueBtn = document.querySelector(".btn-continue")

  // Função para atualizar a aparência das opções
  function updateDeliveryOptions() {
    deliveryOptions.forEach((option) => {
      option.classList.remove("active")
    })

    if (homeDeliveryRadio.checked) {
      homeDeliveryRadio.closest(".delivery-option").classList.add("active")
      storeSearchSection.classList.remove("show")
    } else if (storePickupRadio.checked) {
      storePickupRadio.closest(".delivery-option").classList.add("active")
      storeSearchSection.classList.add("show");

      if (map){
        map.invalidateSize(); // Corrige problemas de renderização do mapa ao mostrar a seção
      }
    }
  }

  // Event listeners para os radio buttons
  homeDeliveryRadio.addEventListener("change", updateDeliveryOptions)
  storePickupRadio.addEventListener("change", updateDeliveryOptions)

  const swiftStores = [
    {
      id: 1,
      name: "São Paulo - Ipiranga",
      address: "Rua Bom Pastor, 2260",
      lat: -23.5928,
      lng: -46.6097,
      hours: [
        "Segunda a Sábado: 8h - 21h",
        "Domingo: 8h - 15h",
        "Feriados: Horário normal de acordo com o dia da semana.",
      ],
    },
    {
      id: 2,
      name: "São Paulo - Liberdade",
      address: "Rua da Liberdade, 150",
      lat: -23.5587,
      lng: -46.6347,
      hours: [
        "Segunda a Sábado: 9h - 20h",
        "Domingo: 10h - 16h",
        "Feriados: Horário normal de acordo com o dia da semana.",
      ],
    },
    {
      id: 3,
      name: "São Paulo - Mooca",
      address: "Av. Paes de Barros, 890",
      lat: -23.5505,
      lng: -46.5995,
      hours: [
        "Segunda a Sábado: 8h - 21h",
        "Domingo: 9h - 17h",
        "Feriados: Horário normal de acordo com o dia da semana.",
      ],
    },
    {
      id: 4,
      name: "São Paulo - Vila Prudente",
      address: "Av. Prof. Luiz Ignácio Anhaia Mello, 1200",
      lat: -23.5825,
      lng: -46.5825,
      hours: [
        "Segunda a Sábado: 8h - 21h",
        "Domingo: 8h - 15h",
        "Feriados: Horário normal de acordo com o dia da semana.",
      ],
    },
    {
      id: 5,
      name: "São Paulo - Chácara Inglesa",
      address: "Rua Vergueiro, 3456",
      lat: -23.6178,
      lng: -46.6394,
      hours: [
        "Segunda a Sábado: 9h - 20h",
        "Domingo: 10h - 16h",
        "Feriados: Horário normal de acordo com o dia da semana.",
      ],
    },
  ]

  let map
  let markers = []
  let selectedStore = swiftStores[0] // Loja padrão selecionada

  function initMap() {
    // Centralizar o mapa em São Paulo
    const saoPaulo = [-23.5505, -46.6333]

    map = L.map("map").setView(saoPaulo, 12)

    // Adicionar camada base (tiles do OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Criar ícone personalizado
const storeIcon = L.icon({
  iconUrl: '../img/pinmapa.png', // caminho do seu PNG
  iconSize: [60, 60],          // tamanho do ícone (ajuste conforme seu PNG)
  iconAnchor: [20, 40],        // ponto do ícone que "encosta" no mapa
  popupAnchor: [0, -40]        // onde aparece o popup em relação ao ícone
})

    // Criar marcadores para todas as lojas
    swiftStores.forEach((store) => {
      const marker = L.marker([store.lat, store.lng], { icon: storeIcon })
        .addTo(map)
        .bindPopup(`<b>${store.name}</b><br>${store.address}`)

      marker.on("click", () => {
        selectStore(store)
      })

      markers.push(marker)
    })

    // Selecionar a primeira loja por padrão
    selectStore(selectedStore)
  }

  function selectStore(store) {
    selectedStore = store

    // Atualizar informações da loja selecionada
    document.getElementById("selectedStoreName").textContent = store.name
    document.getElementById("selectedStoreAddress").textContent = store.address

    const hoursContainer = document.getElementById("selectedStoreHours")
    hoursContainer.innerHTML = ""
    store.hours.forEach((hour) => {
      const li = document.createElement("li")
      li.textContent = hour
      hoursContainer.appendChild(li)
    })

    // Centralizar o mapa na loja selecionada
    if (map) {
      map.setView([store.lat, store.lng], 15)
    }

    // Resetar botão de seleção
    const selectBtn = document.getElementById("selectStoreBtn")
    selectBtn.textContent = "Selecionar"
    selectBtn.style.backgroundColor = ""
    selectBtn.disabled = false
  }

  function searchStores(query) {
    const filteredStores = swiftStores.filter(
      (store) =>
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.address.toLowerCase().includes(query.toLowerCase()),
    )

    if (filteredStores.length > 0) {
      selectStore(filteredStores[0])
    }
  }

  // Busca em tempo real
  locationSearch.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase()
    if (searchValue.length > 2) {
      searchStores(searchValue)
    }
  })

  // Botão de busca
  document.querySelector(".search-btn").addEventListener("click", () => {
    const searchValue = locationSearch.value
    if (searchValue.trim()) {
      searchStores(searchValue)
    }
  })



  // Selecionar loja
  selectStoreBtn.addEventListener("click", function () {
    console.log(`[Leaflet] Loja selecionada: ${selectedStore.name}`)
    this.textContent = "Selecionado"
    this.style.backgroundColor = "var(--swift-green)"
    this.disabled = true

    // Habilitar botão continuar
    continueBtn.disabled = false
  })

  // Continuar compra
  continueBtn.addEventListener("click", () => {
    const selectedMethod = document.querySelector('input[name="deliveryMethod"]:checked').value
    if (selectedMethod === "home") {
      alert("Entrega no endereço selecionada!")
    } else {
      alert("Retirada na loja selecionada!")
    }
  })

  // Inicializar estado
  updateDeliveryOptions()
  initMap()
})







// =====================================
// PRODUTOS / DETALHE / CARRINHO / CHECKOUT / PAGAMENTO / PONTOS
// (coloque suas lógicas, sempre com guards de existência)
// =====================================
