
    document.getElementById("formulario-opinion").addEventListener("submit", function(event) {
      event.preventDefault();
      enviarResena();
    });
    function enviarResena() {
      const username = document.getElementById("usuario").value.trim() || "Anónimo";
      const content = document.getElementById("contenido").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const messageDiv = document.getElementById("message");

      messageDiv.textContent = "";

      if (!content) {
        messageDiv.textContent = "El contenido de la reseña es obligatorio.";
        return;
      }

      fetch("http://localhost/Contador_Gotas_Agua/backend/crear-review.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: username,
          contenido: content,
          correo: correo
        })
      })
      .then(response => response.json())
      .then(data => {
         console.log("Respuesta del servidor:", data);
        if (data.error) {
          messageDiv.textContent = data.error;
        } else {
          document.getElementById("contenido").value = "";
          document.getElementById("usuario").value = "";
          document.getElementById("correo").value = "";
          alert("¡Reseña enviada con éxito!");
          //cargarResenas();
        }
      })
      .catch(error => {
        console.error("Error al enviar reseña:", error);
        messageDiv.textContent = "Error al conectar con el servidor.";
      });
    }

    // function cargarResenas() {
    //   fetch("http://localhost/reviews/backend/get_reviews.php")
    //     .then(response => response.json())
    //     .then(data => {
    //       const container = document.getElementById("resenas");
    //       container.innerHTML = "";

    //       if (!Array.isArray(data) || data.length === 0) {
    //         container.innerHTML = "<p>No hay reseñas disponibles.</p>";
    //         return;
    //       }

    //       data.forEach(resena => {
    //         const div = document.createElement("div");
    //         div.className = "review";
    //         div.innerHTML = `
    //           <strong>${resena.name}</strong><br>
    //           <small>${resena.created_at}</small>
    //           <p>${resena.content}</p>
    //         `;
    //         container.appendChild(div);
    //       });
    //     })
    //     .catch(err => {
    //       document.getElementById("resenas").innerHTML = "<p>Error al cargar reseñas.</p>";
    //     });
    // }

    // window.onload = cargarResenas; 
