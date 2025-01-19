// Menu Data Loader
async function loadMenuData() {
    try {
        const response = await fetch('menu.json');
        if (!response.ok) {
            throw new Error('Failed to load menu data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading menu data:', error);
        return null;
    }
}

// Template Functions
function createSignatureCocktailItem(item) {
    return `
        <div class="menu-item" data-id="${item.id}">
            <div class="item-header">
                <div class="item-logo-container">
                    <img src="${item.image.path}" alt="${item.name}" class="item-logo ${item.image.class || ''}">
                </div>
                <span class="item-price">${item.price} ${item.currency}</span>
            </div>
            <div class="item-description">${item.description}</div>
            <div class="item-ingredients">${item.ingredients}</div>
            ${item.isSignature ? '<i class="fas fa-star signature-cocktail"></i>' : ''}
            <button class="add-to-cart" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
}

function createMainMenuItem(item) {
    return `
        <div class="menu-item" data-id="${item.id}">
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price} ${item.currency}</span>
            </div>
            ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
            ${item.ingredients ? `<div class="item-ingredients">${item.ingredients}${item.volume ? ` (${item.volume})` : ''}</div>` : ''}
            ${item.volume && !item.ingredients ? `<div class="item-volume">${item.volume}</div>` : ''}
            <button class="add-to-cart" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
}

// Render Functions
function renderSignatureMenu(menuData) {
    const container = document.getElementById('cocktail-menu');
    container.innerHTML = `
        <h1 class="subtitle">${menuData.menu.signature.title}</h1>
        ${menuData.menu.signature.items.map(item => createSignatureCocktailItem(item)).join('')}
    `;
}

function renderMainMenu(menuData) {
    const container = document.getElementById('main-menu');
    let html = `
        <h1 class="subtitle">ОСНОВНОЕ МЕНЮ</h1>
        <nav class="menu-nav">
            ${menuData.navigation[1].sections.map(nav => `
                <a href="#${nav.id}" class="nav-item">
                    ${nav.title}
                </a>
            `).join('')}
        </nav>
    `;

    menuData.menu.main.forEach(section => {
        html += `
            <section id="${section.id}" class="menu-section">
                <h2 class="menu-section-title">${section.title}</h2>
                <div class="menu-items">
                    ${section.items.map(item => createMainMenuItem(item)).join('')}
                </div>
            </section>
        `;
    });

    container.innerHTML = html;
    initializeEventListeners();
}

// Event Listeners
function initializeEventListeners() {
    const menuNav = document.querySelector('.menu-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.menu-section');
    const backToTopButton = document.getElementById('backToTop');

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        const menuHeight = menuNav?.offsetHeight || 0;
        
        const activeSection = [...sections].reverse().find(section => 
            scrollPosition >= section.offsetTop - menuHeight - 10
        );

        if (activeSection) {
            navItems.forEach(item => {
                const isActive = item.getAttribute('href').slice(1) === activeSection.id;
                item.classList.toggle('active', isActive);
            });
        }
    }

    function handleScroll() {
        setActiveNavItem();
        
        requestAnimationFrame(() => {
            if (window.scrollY > 100) {
                menuNav?.classList.add('floating');
                backToTopButton.style.opacity = '0.4';
                backToTopButton.style.pointerEvents = 'auto';
            } else {
                menuNav?.classList.remove('floating');
                backToTopButton.style.opacity = '0';
                backToTopButton.style.pointerEvents = 'none';
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const mainMenu = document.getElementById('main-menu');
            
            // Ensure the main menu is active
            if (!mainMenu.classList.contains('active')) {
                const menuSwitch = document.querySelector('.menu-switch');
                menuSwitch.click(); // Toggle to main menu
            }
            
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add haptic feedback to interactive elements
    function addHapticToElement(element, intensity = 'medium') {
        element.addEventListener('click', () => {
            if (window.Telegram?.WebApp?.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred(intensity);
            }
        });
    }

    document.querySelectorAll('[onclick], button, a, .interactive-element').forEach(element => {
        addHapticToElement(element);
    });

    // Initialize first nav item as active
    if (navItems.length > 0) {
        navItems[0].classList.add('active');
    }
}

// Initialize Menu
async function initializeMenu() {
    const menuData = await loadMenuData();
    if (menuData) {
        renderSignatureMenu(menuData);
        renderMainMenu(menuData);
        initializeEventListeners();
    }
}

// Start loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeMenu); 