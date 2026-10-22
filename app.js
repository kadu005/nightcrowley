/* ================================================================= */
/* FICHEIRO: app.js                                                  */
/* DESCRIÇÃO: Base de Dados Simulada, Sistema de Filtros e          */
/*            Navegação Interativa Multi-Páginas.                    */
/* ================================================================= */

// ===================================================================
// BASE DE DADOS SIMULADA (PRODUTOS GÓTICOS)
// ===================================================================
const productsDatabase = [
    {
        id: 1,
        title: "Sobretudo Manteau Velvet",
        category: "vestuario",
        theme: "vampire",
        brand: "crowley-craft",
        price: "R$ 389,00",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Anel Serpent's Coil",
        category: "acessorios",
        theme: "vampire",
        brand: "crowley-craft",
        price: "R$ 149,00",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Bota Platform Demon-102",
        category: "calcados",
        theme: "cyberpunk",
        brand: "killstar",
        price: "R$ 540,00",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Caderno Ryuk Shinigami",
        category: "decoracao",
        theme: "death-note",
        brand: "restyle",
        price: "R$ 89,00",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Vestido Mente Nevermore",
        category: "vestuario",
        theme: "wednesday",
        brand: "disturbia",
        price: "R$ 279,00",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Gargantilha Dragon Slayer",
        category: "acessorios",
        theme: "berserk",
        brand: "crowley-craft",
        price: "R$ 119,00",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
    }
];

// Estado da Aplicação
let cartCount = 0;
let wishlist = [2, 5]; // IDs dos produtos desejados inicialmente

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a lista inicial do catálogo
    renderCatalog(productsDatabase);
    renderWishlist();
    
    // Associa eventos de filtro e busca
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('filter-type').addEventListener('change', applyFilters);
    document.getElementById('filter-theme').addEventListener('change', applyFilters);
    document.getElementById('filter-brand').addEventListener('change', applyFilters);
});

// ===================================================================
// BLOCO: Gestão de Navegação entre Páginas
// ===================================================================
function switchTab(pageId) {
    // 1. Atualiza abas inferiores
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tab') === pageId);
    });

    // 2. Alterna a página visível
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active-page'));

    const activePage = document.getElementById(`page-${pageId}`);
    if (activePage) {
        activePage.classList.add('active-page');
    }

    // Scroll para o topo ao mudar de página
    document.getElementById('app-content').scrollTop = 0;
}

// ===================================================================
// BLOCO: Renderização e Filtros do Catálogo
// ===================================================================
function renderCatalog(products) {
    const catalogGrid = document.getElementById('catalog-grid');
    catalogGrid.innerHTML = '';

    if (products.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: span 2; text-align: center; color: #9ca3af; padding: 30px 0;">
                <i class="fas fa-ghost" style="font-size: 32px; color: #8b0000; margin-bottom: 10px;"></i>
                <p>Nenhum item encontrado nas sombras com estes filtros.</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const isWish = wishlist.includes(product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-frame product-frame">
                <img src="${product.image}" alt="${product.title}" class="framed-img">
                <button class="wishlist-btn" onclick="toggleWishlist(event, ${product.id})">
                    <i class="${isWish ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="product-tag">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

function applyFilters() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const selectedType = document.getElementById('filter-type').value;
    const selectedTheme = document.getElementById('filter-theme').value;
    const selectedBrand = document.getElementById('filter-brand').value;

    const filtered = productsDatabase.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchValue) || 
                              product.theme.toLowerCase().includes(searchValue);
        const matchesType = selectedType === 'all' || product.category === selectedType;
        const matchesTheme = selectedTheme === 'all' || product.theme === selectedTheme;
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

        return matchesSearch && matchesType && matchesTheme && matchesBrand;
    });

    renderCatalog(filtered);
}

// ===================================================================
// BLOCO: Gestão do Perfil (Sub-Abas e Wishlist)
// ===================================================================
function toggleProfileSubTab(subTab) {
    const ordersBtn = document.getElementById('tab-orders-btn');
    const wishlistBtn = document.getElementById('tab-wishlist-btn');
    const ordersContent = document.getElementById('subcontent-orders');
    const wishlistContent = document.getElementById('subcontent-wishlist');

    if (subTab === 'orders') {
        ordersBtn.classList.add('active');
        wishlistBtn.classList.remove('active');
        ordersContent.classList.remove('hidden');
        wishlistContent.classList.add('hidden');
    } else {
        wishlistBtn.classList.add('active');
        ordersBtn.classList.remove('active');
        wishlistContent.classList.remove('hidden');
        ordersContent.classList.add('hidden');
        renderWishlist();
    }
}

function toggleWishlist(event, productId) {
    event.stopPropagation();
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }

    applyFilters();
    renderWishlist();
}

function renderWishlist() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;

    const wishProducts = productsDatabase.filter(p => wishlist.includes(p.id));
    container.innerHTML = '';

    if (wishProducts.length === 0) {
        container.innerHTML = `<p style="color: #9ca3af; font-size: 12px;">Sua lista de desejos está vazia.</p>`;
        return;
    }

    wishProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-card';
        item.innerHTML = `
            <div class="image-frame product-frame">
                <img src="${product.image}" alt="${product.title}" class="framed-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        container.appendChild(item);
    });
}