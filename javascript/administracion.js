if (sessionStorage.getItem("usuario") != "admin") {
    window.alert("No tienes acceso")
    window.location.href ="/index.html"
}