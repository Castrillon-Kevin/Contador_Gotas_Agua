document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".reviews-list"); 
  // Asegúrate de tener <div class="reviews-list"></div> en tu HTML

  try {
    // Llamar al PHP que devuelve las reseñas
    const res = await fetch("http://localhost/Contador_Gotas_Agua/backend/get-review-usuario.php");

    const data = await res.json();

    // Limpiar el contenedor
    contenedor.innerHTML = "";

    // Si no hay reseñas visibles
    if (!data || data.length === 0) {
      contenedor.innerHTML = "<p>No hay opiniones disponibles aún.</p>";
      return;
    }

    // Crear una tarjeta por cada reseña
    data.forEach((r) => {
      const tarjeta = document.createElement("article");
      tarjeta.classList.add("review-card");

      tarjeta.innerHTML = `
        <div class="review-header">
          <img src="/pages/Imagenes/perfil-default.jpg" alt="Usuario" class="review-avatar">
          <div class="review-info">
            <h3 class="review-name">${r.usuario || "Anónimo"}</h3>
          </div>
        </div>
        <p class="review-content">${r.contenido || ""}</p>
      `;

      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error("Error al cargar reseñas:", error);
    contenedor.innerHTML = "<p>Error al cargar las reseñas.</p>";
  }
});
