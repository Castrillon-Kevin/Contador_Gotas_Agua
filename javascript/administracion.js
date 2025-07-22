document.addEventListener("DOMContentLoaded", () => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") {
        alert("Acceso denegado. No tienes permisos de administrador.");
        window.location.href = "../index.html"; // O la página a la que quieras redirigir
    }
});
