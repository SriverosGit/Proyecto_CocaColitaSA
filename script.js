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
        
        // Dev2: Adding AGE field to user data (MAJOR CONFLICT ZONE)
        const usersWithAge = usersData.map(user => {
            return {
                ...user,
                age: Math.floor(Math.random() * (65 - 18) + 18), // Random age between 18-65
                website: user.website || 'No website',
                // DEV2: Email placeholder - CONFLICT with Dev1's real email implementation
                email: 'age-dev@example.com', // This will conflict with Dev1's email logic
                contactMethod: 'phone' // Dev2 prefers phone over email
            };
        });
        
        displayUsers(usersWithAge);
        
    } catch (error) {
        document.getElementById('usersData').innerHTML = 
            '<p style="color: red;">Error al cargar usuarios: ' + error.message + '</p>';
    }
}

// RF3: Display users with AGE (Dev2 version - INTENTIONAL CONFLICT ZONE with Dev1)
function displayUsers(users) {
    const container = document.getElementById('usersData');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No hay usuarios disponibles.</p>';
        return;
    }
    
    // DEV2 CONFLICT ZONE: Age-focused template (will conflict with Dev1's email implementation)
    const usersHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <div class="user-info">
                <span><strong>Usuario:</strong> ${user.username}</span>
                <!-- DEV2: Age field implementation - CONFLICT EXPECTED -->
                <span><strong>🎂 Edad:</strong> ${user.age} años</span>
                <span><strong>📧 Contacto:</strong> Sin email configurado</span>
                <span><strong>📞 Teléfono:</strong> ${user.phone}</span>
                <span><strong>🌐 Sitio web:</strong> ${user.website}</span>
                <span><strong>🏙️ Ciudad:</strong> ${user.address.city}</span>
                <span><strong>🏢 Empresa:</strong> ${user.company.name}</span>
                <!-- DEV2: Age category classification -->
                <span><strong>👤 Categoría:</strong> ${getAgeCategory(user.age)}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = usersHTML;
}

// DEV2: Age category function (additional conflict potential)
function getAgeCategory(age) {
    if (age >= 18 && age <= 25) return "Joven Profesional";
    if (age >= 26 && age <= 35) return "Adulto Joven";
    if (age >= 36 && age <= 50) return "Adulto Experimentado";
    if (age >= 51 && age <= 65) return "Adulto Senior";
    return "Edad no clasificada";
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

// DEV2: Email validation function (CONFLICT: Dev1 will implement real email logic here)
function validateUserEmail(email) {
    // Dev2's simple validation focused on age-related domains
    const ageBasedDomains = ['young.com', 'adult.com', 'senior.com'];
    return email.includes('@') && email.includes('age');
}

// DEV2: Contact preference based on age (CONFLICT ZONE)
function getPreferredContact(user) {
    // Dev2 logic: older users prefer phone, younger prefer email
    if (user.age > 40) {
        return `📞 ${user.phone} (Preferido por edad)`;
    } else {
        return `📧 ${user.email} (Joven - email preferido)`;
    }
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
// Proyecto CocaColita SA - Sistema de Usuarios
// Objeto base para usuarios

const user = {
    name: "Juan Pérez",
    id: 1,
    email: "juan.perez@cocacolita.com"
};

// Array de usuarios para el sistema
const users = [
    { name: "Juan Pérez", id: 1, email: "juan.perez@cocacolita.com" },
    { name: "María García", id: 2, email: "maria.garcia@cocacolita.com" },
    { name: "Carlos López", id: 3, email: "carlos.lopez@cocacolita.com" }
];

// Función base para mostrar información del usuario
function showUserInfo(user) {
    console.log(`Usuario: ${user.name}, ID: ${user.id}, Email: ${user.email}`);
}

console.log("Sistema de usuarios CocaColita SA inicializado");
console.log("Usuario actual:", user);
function showUser() {
  const users = [
    { name: "Juan Pérez", age: 30, email: "juan@example.com" },
    { name: "Ana López", age: 25, email: "ana@example.com" },
    { name: "Carlos Díaz", age: 40, email: "carlos@example.com" }
  ];

  const userList = document.getElementById("userList");
  userList.innerHTML = ""; // Limpiar contenido previo

  users.forEach(user => {
    const userItem = document.createElement("p");
    userItem.innerHTML = `
      <strong>${user.name}</strong><br>
      Edad: ${user.age}<br>
      Email: ${user.email}<hr>
    `;
    userList.appendChild(userItem);
  });

  // Mostrar el modal
  document.getElementById("userModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("userModal").style.display = "none";
}

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
        
        // Dev2: Adding AGE field to user data (MAJOR CONFLICT ZONE)
        const usersWithAge = usersData.map(user => {
            return {
                ...user,
                age: Math.floor(Math.random() * (65 - 18) + 18), // Random age between 18-65
                website: user.website || 'No website',
                // DEV2: Email placeholder - CONFLICT with Dev1's real email implementation
                email: 'age-dev@example.com', // This will conflict with Dev1's email logic
                contactMethod: 'phone' // Dev2 prefers phone over email
            };
        });
        
        displayUsers(usersWithAge);
        
    } catch (error) {
        document.getElementById('usersData').innerHTML = 
            '<p style="color: red;">Error al cargar usuarios: ' + error.message + '</p>';
    }
}

// RF3: Display users with AGE (Dev2 version - INTENTIONAL CONFLICT ZONE with Dev1)
function displayUsers(users) {
    const container = document.getElementById('usersData');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No hay usuarios disponibles.</p>';
        return;
    }
    
    // DEV2 CONFLICT ZONE: Age-focused template (will conflict with Dev1's email implementation)
    const usersHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <div class="user-info">
                <span><strong>Usuario:</strong> ${user.username}</span>
                <!-- DEV2: Age field implementation - CONFLICT EXPECTED -->
                <span><strong>🎂 Edad:</strong> ${user.age} años</span>
                <span><strong>📧 Contacto:</strong> Sin email configurado</span>
                <span><strong>📞 Teléfono:</strong> ${user.phone}</span>
                <span><strong>🌐 Sitio web:</strong> ${user.website}</span>
                <span><strong>🏙️ Ciudad:</strong> ${user.address.city}</span>
                <span><strong>🏢 Empresa:</strong> ${user.company.name}</span>
                <!-- DEV2: Age category classification -->
                <span><strong>👤 Categoría:</strong> ${getAgeCategory(user.age)}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = usersHTML;
}

// DEV2: Age category function (additional conflict potential)
function getAgeCategory(age) {
    if (age >= 18 && age <= 25) return "Joven Profesional";
    if (age >= 26 && age <= 35) return "Adulto Joven";
    if (age >= 36 && age <= 50) return "Adulto Experimentado";
    if (age >= 51 && age <= 65) return "Adulto Senior";
    return "Edad no clasificada";
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

// DEV2: Email validation function (CONFLICT: Dev1 will implement real email logic here)
function validateUserEmail(email) {
    // Dev2's simple validation focused on age-related domains
    const ageBasedDomains = ['young.com', 'adult.com', 'senior.com'];
    return email.includes('@') && email.includes('age');
}

// DEV2: Contact preference based on age (CONFLICT ZONE)
function getPreferredContact(user) {
    // Dev2 logic: older users prefer phone, younger prefer email
    if (user.age > 40) {
        return `📞 ${user.phone} (Preferido por edad)`;
    } else {
        return `📧 ${user.email} (Joven - email preferido)`;
    }
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
