// =====================================
// JS — PROJETO SWIFT (global)
// Carregado em TODAS as páginas.
// Mantemos a lógica isolada por página com guards.
// =====================================

console.log("Swift: scripts carregados.");
const page = window.location.pathname;

// --------- HEADER global
// (() => {
//   const cartBadge = document.getElementById("cartBadge");
//   const btnSearch = document.getElementById("btnSearch");
//   if (btnSearch) {
//     btnSearch.addEventListener("click", () => {
//       alert("Busca simulada (mock) — em breve conectamos filtros/navegação.");
//     });
//   }
// })();

// // =====================================
// // HOME (index.html)
// // =====================================
// (() => {
//   if (!(page.endsWith("/index.html") || page.endsWith("/"))) return;

//   const cartBadge = document.getElementById("cartBadge");
//   document.querySelectorAll(".add-to-cart").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const current = Number(cartBadge?.textContent || 0);
//       if (cartBadge) cartBadge.textContent = String(current + 1);
//       btn.classList.add("btn-success");
//       btn.textContent = "Adicionado!";
//       setTimeout(() => {
//         btn.classList.remove("btn-success");
//         btn.textContent = "Adicionar";
//       }, 1200);
//     });
//   });
// })();

// // =====================================
// // CADASTRO (pages/cadastro.html)
// // =====================================
// (() => {
//   if (!page.endsWith("/cadastro.html")) return;

//   // Toggle password com ícone (se você estiver usando material icons)
//   window.togglePassword = function (inputId, iconElement) {
//     const input = document.getElementById(inputId);
//     if (!input || !iconElement) return;
//     const show = input.type === "password";
//     input.type = show ? "text" : "password";
//     iconElement.textContent = show ? "visibility_off" : "visibility";
//   };

//   // Form
//   const form = document.getElementById("cadastroForm");
//   if (form) {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const senha = document.getElementById("senha")?.value || "";
//       const confirmarSenha = document.getElementById("confirmarSenha")?.value || "";
//       const termosPrivacidade = !!document.getElementById("termosPrivacidade")?.checked;

//       if (senha !== confirmarSenha) {
//         alert("As senhas não coincidem. Por favor, verifique.");
//         return;
//       }
//       if (senha.length < 8) {
//         alert("A senha deve ter pelo menos 8 caracteres.");
//         return;
//       }
//       if (!termosPrivacidade) {
//         alert("Você deve aceitar os Termos da Política de Privacidade para prosseguir.");
//         return;
//       }

//       alert("Cadastro realizado com sucesso!");
//       window.location.href = "index.html";
//     });
//   }

//   // CPF
//   const cpf = document.getElementById("cpf");
//   if (cpf) {
//     cpf.addEventListener("input", (e) => {
//       let value = e.target.value.replace(/\D/g, "");
//       value = value.replace(/(\d{3})(\d)/, "$1.$2");
//       value = value.replace(/(\d{3})(\d)/, "$1.$2");
//       value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
//       e.target.value = value;
//     });
//   }

//   // Telefone
//   const telefone = document.getElementById("telefone");
//   if (telefone) {
//     telefone.addEventListener("input", (e) => {
//       let value = e.target.value.replace(/\D/g, "");
//       value = value.replace(/(\d{2})(\d)/, "($1) $2");
//       value = value.replace(/(\d{5})(\d)/, "$1-$2");
//       e.target.value = value;
//     });
//   }
// })();

// // =====================================
// // LOGIN (pages/login.html)
// // - Toggle do "olhinho"
// // - (Opcional) botão "Continuar" -> Google (mock ou real)
// // =====================================
// (() => {
//   if (!page.endsWith("/login.html")) return;

//   // Toggle de visibilidade da senha
//   const btn = document.getElementById("togglePassword");
//   const input = document.getElementById("password");
//   if (btn && input) {
//     btn.addEventListener("click", () => {
//       const show = input.type === "password";
//       input.type = show ? "text" : "password";
//       btn.setAttribute("aria-pressed", String(show));
//       const icon = btn.querySelector("i");
//       if (icon) {
//         icon.classList.toggle("bi-eye", !show);
//         icon.classList.toggle("bi-eye-slash", show);
//       }
//     });

//     // Pressionar e segurar para ver (opcional)
//     btn.addEventListener("mousedown", () => (input.type = "text"));
//     btn.addEventListener("mouseup", () => (input.type = "password"));
//     btn.addEventListener("mouseleave", () => {
//       if (btn.getAttribute("aria-pressed") !== "true") input.type = "password";
//     });
//   }

//   // Botão Continuar -> Google (mock)
//   const btnGoogleLogin = document.getElementById("btnGoogleLogin");
//   if (btnGoogleLogin) {
//     btnGoogleLogin.addEventListener("click", () => {
//       // MOCK: troque depois pela URL OAuth real
//       window.location.href = "/mock/google-login.html";
//     });
//   }
// })();

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
// PRODUTOS / DETALHE / CARRINHO / CHECKOUT / PAGAMENTO / PONTOS
// (coloque suas lógicas, sempre com guards de existência)
// =====================================
