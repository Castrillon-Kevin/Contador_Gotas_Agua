document.getElementById("sesion-form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    iniciarSesion();
  });


async function iniciarSesion() 
{
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");
  console.log('hola');
  
  try {
    const res = await fetch("http://localhost/Contador_Gotas_Agua/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();


    console.log('asd', data);
    mensaje.innerText = data.message;
    if (data.success) {
      console.log(data);
      window.location.href = "/pages/administracion.html";
      sessionStorage.setItem("rol", data.rol);
    } else {
      // window.location.href = "/index.html";

      
    }
  } catch (error) {

  }
};