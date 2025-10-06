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
        const usersContainer = document.getElementById('usersData');
        usersContainer.innerHTML = '<div class="loading"></div> Cargando usuarios...';
        
        const response = await fetch(USERS_API);
        usersData = await response.json();
        
        // Dev2: Adding AGE field to user data (intentional conflict area)
        const usersWithAge = usersData.map(user => {
            return {
                ...user,
                age: Math.floor(Math.random() * (65 - 18) + 18), // Random age between 18-65
                website: user.website || 'No website'
            };
        });
        
        displayUsers(usersWithAge);
        
    } catch (error) {
        document.getElementById('usersData').innerHTML = 
            '<p style="color: red;">Error al cargar usuarios: ' + error.message + '</p>';
    }
}

// RF3: Display users with AGE (Dev2 version - will conflict with Dev1's email implementation)
function displayUsers(users) {
    const container = document.getElementById('usersData');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No hay usuarios disponibles.</p>';
        return;
    }
    
    // Dev2: HTML template focusing on AGE field (conflict zone)
    const usersHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <div class="user-info">
                <span><strong>Usuario:</strong> ${user.username}</span>
                <span><strong>Edad:</strong> ${user.age} años</span>
                <span><strong>Teléfono:</strong> ${user.phone}</span>
                <span><strong>Sitio web:</strong> ${user.website}</span>
                <span><strong>Ciudad:</strong> ${user.address.city}</span>
                <span><strong>Empresa:</strong> ${user.company.name}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = usersHTML;
}

// RF4: Show products functionality
async function showProducts() {
    try {
        const productsContainer = document.getElementById('productsData');
        productsContainer.innerHTML = '<div class="loading"></div> Cargando productos...';
        
        const response = await fetch(PRODUCTS_API);
        productsData = await response.json();
        
        // Limit to first 10 products for better display
        const limitedProducts = productsData.slice(0, 10);
        displayProducts(limitedProducts);
        
    } catch (error) {
        document.getElementById('productsData').innerHTML = 
            '<p style="color: red;">Error al cargar productos: ' + error.message + '</p>';
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
            <h3>${product.title}</h3>
            <div class="product-info">
                <span><strong>Precio:</strong> $${product.price}</span>
                <span><strong>Categoría:</strong> ${product.category}</span>
                <span><strong>Rating:</strong> ${product.rating.rate}/5 (${product.rating.count} reviews)</span>
                <span><strong>Descripción:</strong> ${product.description.substring(0, 100)}...</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = productsHTML;
}

// Utility functions for data management
function getUserById(id) {
    return usersData.find(user => user.id === id);
}

function getProductById(id) {
    return productsData.find(product => product.id === id);
}

// Age-related utility functions (Dev2 specific)
function filterUsersByAge(minAge, maxAge) {
    return usersData.filter(user => user.age >= minAge && user.age <= maxAge);
}

function getAverageAge() {
    if (usersData.length === 0) return 0;
    const totalAge = usersData.reduce((sum, user) => sum + (user.age || 0), 0);
    return Math.round(totalAge / usersData.length);
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechSolutions Web - Dev2 version loaded');
    console.log('RF3: Age functionality implemented');
    
    // Add age statistics display
    const ageStatsButton = document.createElement('button');
    ageStatsButton.textContent = 'Estadísticas de Edad';
    ageStatsButton.onclick = showAgeStatistics;
    document.querySelector('.controls').appendChild(ageStatsButton);
});

function showAgeStatistics() {
    if (usersData.length === 0) {
        alert('Primero carga los usuarios');
        return;
    }
    
    const avgAge = getAverageAge();
    const youngUsers = filterUsersByAge(18, 30).length;
    const matureUsers = filterUsersByAge(31, 50).length;
    const seniorUsers = filterUsersByAge(51, 65).length;
    
    alert(`Estadísticas de Edad:
    - Edad promedio: ${avgAge} años
    - Usuarios jóvenes (18-30): ${youngUsers}
    - Usuarios maduros (31-50): ${matureUsers}
    - Usuarios mayores (51-65): ${seniorUsers}`);
}
