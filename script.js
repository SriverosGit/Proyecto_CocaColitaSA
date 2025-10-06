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