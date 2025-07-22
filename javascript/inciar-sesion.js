  const dataDB = {
  usuario: "kevincastrillon777@gmail.com",
  clave: "1234",
  rol: "admin"
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    iniciarSesion();
  });
});

function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  if (usuario === dataDB.usuario && clave === dataDB.clave) {
    if (dataDB.rol === "admin") {
      localStorage.setItem("rol", "admin"); // Guardamos el rol para usarlo en administracion.html
      window.location.href = "administracion.html"; // Redirige
    } else {
      alert("No tienes permisos para acceder a esta sección.");
    }
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}
