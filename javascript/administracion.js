document.addEventListener("DOMContentLoaded", () => {
    const rol = sessionStorage.getItem("rol");
    if (rol !== "1") {
        alert("Acceso denegado. No tienes permisos de administrador.");
        window.location.href = "../index.html";
    }
});


//Cargador de reseñas
 function cargarResenas() {
       fetch("http://localhost/Contador_Gotas_Agua/backend/get-review-admin.php")
         .then(response => response.json())
         .then(data => {
           const container = document.getElementById("tabla-reviews");
           //container.innerHTML = "";
            console.log(container);
           if (!Array.isArray(data) || data.length === 0) {
             container.innerHTML = "<p>No hay reseñas disponibles.</p>";
             return;
           }

           data.forEach(resena => {
             const div = document.createElement("div");
             div.className = "tabla-reviews";
             div.innerHTML = `
               
               
             `;
             container.appendChild(div);
           });
         })
         .catch(err => {
          document.getElementById("tabla-reviews").innerHTML = "<p>Error al cargar reseñas.</p>";
         });
     }

     window.onload = cargarResenas;


     //tabla de administracion de reseñas

     const API_BASE = 'http://localhost/Contador_Gotas_Agua/backend/'; // Cambia si tus scripts están en otra ruta

async function fetchReviews() {
    const response = await fetch(`${API_BASE}get-review-admin.php`);
    const reviews = await response.json();
    renderTable(reviews);
}

function renderTable(reviews) {
    const tbody = document.querySelector("#tabla-reviews tbody");
    tbody.innerHTML = "";

    reviews.forEach(review => {
        const tr = document.createElement("tr");
        console.log(review);

        tr.innerHTML = `
            <td>${review.id_opinion}</td>
            <td><input type="text" value="${review.usuario}" id="usuario-${review.id_opinion}"></td>
            <td><input type="text" value="${review.contenido}" id="contenido-${review.id_opinion}"></td>
            <td>
                <select id="visible-${review.id_opinion}">
                    <option value="1" ${review.visible == 1 ? "selected" : ""}>Sí</option>
                    <option value="0" ${review.visible == 0 ? "selected" : ""}>No</option>
                </select>
            </td>
            <td>
                <button onclick="updateReview(${review.id_opinion})"style="color:green;">Guardar</button>
                <button onclick="deleteReview(${review.id_opinion})"style="color:red;">Borrar</button>
            </td>
        `;

        tbody.appendChild(tr);  
    });
}

async function deleteReview(id) {
    if (!confirm("¿Estás seguro de que deseas borrar esta reseña?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const response = await fetch(`${API_BASE}admin_delete_review.php`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.status === "success") {
        alert("Reseña eliminada.");
        fetchReviews();
    } else {
        alert("Error al eliminar: " + result.message);
    }
}
async function updateReview(id) {
        const name = document.getElementById(`usuario-${id}`).value;
        const content = document.getElementById(`contenido-${id}`).value;
        const visible = document.getElementById(`visible-${id}`).value;

        const formData = new FormData();
        formData.append("id_opinion", id);
        formData.append("usuario", name);
        formData.append("contenido", content);
        formData.append("visible", visible);

        const response = await fetch(`${API_BASE}admin_update_review.php`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Reseña actualizada correctamente.");
        } else {
            alert("Error al actualizar: " + result.message);
        }

        fetchReviews(); // recargar
    }
// Cargar al iniciar
fetchReviews();

