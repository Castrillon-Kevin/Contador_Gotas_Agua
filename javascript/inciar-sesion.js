
const dataDB = {
  usuario: "kevincastrillon777@gmail.com",
  clave: 1234
};

const response = {
  status: 200,
  message: "Inicio de sesión exitoso.",
  user: {
    clave: 1234,
    username: "kevincastrillon777@gmail.com",
    email: "kevincastrillon777@gmail.com",
    rol: "admin"
  }
};

// Ejecutar después de que cargue la página
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recarga
    iniciarSesion();
  });
});

function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  if (dataDB.usuario === usuario && dataDB.clave == clave) {
    validarRol();
  } else {
    window.alert("Correo o clave incorrecta.");
  }
}

function validarRol() {
  const rol = response.user.rol;
  
  if (rol === "admin") {
    window.location.href = "/pages/administracion.html"
  } else {
    alert("Acceso denegado. No tienes permisos de administrador.");
  }
}

