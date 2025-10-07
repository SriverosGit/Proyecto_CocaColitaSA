// TechSolutions Web - CocaColita S.A.
// Dev2 implementation - RF3: Age functionality

// API URLs
const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const PRODUCTS_API = 'https://fakestoreapi.com/products';

// Global data storage
let usersData = [];
let productsData = [];

// RF3: Show users with AGE field (Dev2 implementation)
async function showUsers() {
    try {
        const response = await fetch(USERS_API);
        let users = await response.json();
        // Agregar campo de edad aleatorio
        users = users.map(user => ({
            ...user,
            age: Math.floor(Math.random() * (65 - 18 + 1)) + 18
        }));
        usersData = users;
        displayUsers(usersData);
    } catch (error) {
        document.getElementById('usersData').innerHTML = '<p>Error al cargar usuarios.</p>';
    }
}

// RF3: Display users with AGE (Dev2 version - INTENTIONAL CONFLICT ZONE with Dev1)
function displayUsers(users) {
    const container = document.getElementById('usersData');
    if (users.length === 0) {
        container.innerHTML = '<p>No hay usuarios disponibles.</p>';
        return;
    }
    const usersHTML = users.map((user, idx) => `
        <div class="user-card" onclick="showUserModal(${idx})" style="cursor:pointer;">
            <h3>${user.name}</h3>
            <div class="user-info">
                <span><strong>Usuario:</strong> ${user.username}</span><br>
                <span><strong>🎂 Edad:</strong> ${user.age} años</span><br>
                <span><strong>📧 Contacto:</strong> ${user.email || 'Sin email configurado'}</span><br>
                <span><strong>📞 Teléfono:</strong> ${user.phone}</span><br>
                <span><strong>🌐 Sitio web:</strong> ${user.website}</span><br>
                <span><strong>🏙️ Ciudad:</strong> ${user.address.city}</span><br>
                <span><strong>🏢 Empresa:</strong> ${user.company.name}</span><br>
                <span><strong>👤 Categoría:</strong> ${getAgeCategory(user.age)}</span>
            </div>
        </div>
    `).join('');
    container.innerHTML = usersHTML;
}

// Modal para mostrar detalles
function showUserModal(idx) {
    const user = usersData[idx];
    const modalContent = document.getElementById("userModalContent");
    modalContent.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Edad:</strong> ${user.age}</p>
      <p><strong>Email:</strong> ${user.email || 'Sin email configurado'}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
      <p><strong>Ciudad:</strong> ${user.address.city}</p>
      <p><strong>Empresa:</strong> ${user.company.name}</p>
      <p><strong>Categoría:</strong> ${getAgeCategory(user.age)}</p>
    `;
    document.getElementById("userModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("userModal").style.display = "none";
}

// DEV2: Age category function (additional conflict potential)
function getAgeCategory(age) {
    if (age < 30) return "Joven";
    if (age < 50) return "Maduro";
    return "Mayor";
}

// RF4: Show products functionality
async function showProducts() {
    try {
        const response = await fetch(PRODUCTS_API);
        productsData = await response.json();
        displayProducts(productsData);
    } catch (error) {
        document.getElementById('productsData').innerHTML = '<p>Error al cargar productos.</p>';
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsData');
    if (products.length === 0) {
        container.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }
    const productsHTML = products.map(product => `
        <div class="product-card">
            <h4>${product.title}</h4>
            <img src="${product.image}" alt="${product.title}" style="max-width:80px;">
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p>${product.description}</p>
        </div>
    `).join('');
    container.innerHTML = productsHTML;
}

// Utility functions for data management
function getUserById(id) {
    return usersData.find(u => u.id === id);
}

function getProductById(id) {
    return productsData.find(p => p.id === id);
}

// Age-related utility functions (Dev2 specific)
function filterUsersByAge(minAge, maxAge) {
    return usersData.filter(u => u.age >= minAge && u.age <= maxAge);
}

function getAverageAge() {
    if (usersData.length === 0) return 0;
    return Math.round(usersData.reduce((sum, u) => sum + u.age, 0) / usersData.length);
}

// DEV2: Email validation function (CONFLICT: Dev1 will implement real email logic here)
function validateUserEmail(email) {
    // Simple validation
    return typeof email === 'string' && email.includes('@');
}

// DEV2: Contact preference based on age (CONFLICT ZONE)
function getPreferredContact(user) {
    if (user.age < 30) return "Email";
    if (user.age < 50) return "Teléfono";
    return "Presencial";
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Opcional: cargar usuarios o productos automáticamente
    // showUsers();
    // showProducts();
});

function showAgeStatistics() {
    const avg = getAverageAge();
    alert(`Edad promedio de usuarios: ${avg}`);
}

