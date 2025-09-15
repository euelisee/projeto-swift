// =====================================
// JS — PROJETO SWIFT
// Este arquivo é carregado em TODAS as páginas.
// Use condicionais por página para isolar a lógica.
// =====================================

console.log("Swift: scripts carregados.");
const page = window.location.pathname;

// --------- HEADER global
const cartBadge = document.getElementById("cartBadge");
const btnSearch = document.getElementById("btnSearch");
if (btnSearch) {
  btnSearch.addEventListener("click", () => {
    alert("Busca simulada (mock) — em breve conectamos filtros/navegação.");
  });
}

// --------- HOME (index)
if (page.endsWith("/index.html") || page.endsWith("/")) {
  // Simula “adicionar ao carrinho” nos cards da vitrine
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = Number(cartBadge?.textContent || 0);
      if (cartBadge) cartBadge.textContent = String(current + 1);
      // feedback simples
      btn.classList.add("btn-success");
      btn.textContent = "Adicionado!";
      setTimeout(() => {
        btn.classList.remove("btn-success");
        btn.textContent = "Adicionar";
      }, 1200);
    });
  });
}

//---------- CADASTRO (pages/cadastro.html)
// Toggle password visibility
function togglePassword(inputI, iconElement) {
    const input = document.getElementById(inputI);
    //input entre "password" e "text"
    if (input.type === "password") {
        input.type = "text";
        iconElement.textContent = "visibility_off";
    } else {
        input.type = "password";
        iconElement.textContent = "visibility";
    }
}

// Form validation and submission
document.getElementById("cadastroForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const senha = document.getElementById("senha").value
    const confirmarSenha = document.getElementById("confirmarSenha").value
    const termosPrivacidade = document.getElementById("termosPrivacidade").checked

    // Validate password match
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, verifique.")
        return
    }

    // Validate password length
    if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.")
        return
    }

    // Validate terms acceptance
    if (!termosPrivacidade) {
        alert("Você deve aceitar os Termos da Política de Privacidade para prosseguir.")
        return
    }

    // If all validations pass
    alert("Cadastro realizado com sucesso!")
    //adicionando redirecionamento para a home
    window.location.href="index.html"
    // Here you would typically send the data to your server
})

// Format CPF input
document.getElementById("cpf").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    e.target.value = value
})

// Format phone input
document.getElementById("telefone").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    e.target.value = value
})


// --------- PRODUTOS (pages/produtos.html)
// INSERIR SUA LÓGICA: filtros, paginação mock etc.

// --------- DETALHE (pages/detalhe-produto.html)
// INSERIR SUA LÓGICA: abas, receitas mock etc.

// --------- CARRINHO (pages/carrinho.html)
// INSERIR SUA LÓGICA: somar subtotal, +/-, frete grátis.

// --------- CHECKOUT (pages/checkout.html)
// INSERIR SUA LÓGICA: esconder endereço quando "Retirada em loja".

// --------- PAGAMENTO (pages/pagamento.html)
// INSERIR SUA LÓGICA: destaque 5% no Pix, validações visuais.

// --------- PONTOS (pages/pontos.html)
// INSERIR SUA LÓGICA: mostrar pontos mock (ex.: 2.395 pts).
