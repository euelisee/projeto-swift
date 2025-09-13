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
