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

