document.addEventListener("DOMContentLoaded", () => {
    const rol = sessionStorage.getItem("rol");
    if (rol !== "admin") {
        alert("Acceso denegado. No tienes permisos de administrador.");
        window.location.href = "../index.html";
    }
});
