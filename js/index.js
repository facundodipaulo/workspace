document.addEventListener("DOMContentLoaded", function(){
    const datos = document.getElementById("data_user");

    const usuario = window.localStorage.getItem("usuario"); // Traemos el valor de usuario

    console.log(usuario);



    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html'; // Redirigir al login.html si no ha iniciado sesión
      } else {
        datos.innerHTML = usuario;
      };

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});