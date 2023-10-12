//Se crea una constante que referencia al elemento "cerrar_sesion"
const cerrar_sesion = document.getElementById("cerrar_sesion");
const usuario = window.localStorage.getItem("usuario"); // Traemos el valor de usuario

console.log(usuario);

//Se crea un evento al hacer click que elimina la información de usuario del localStorage y redirige al usuario a login.html
cerrar_sesion.addEventListener("click", function () {
    sessionStorage.removeItem('usuario');
    window.location.href = "login.html"
})


const datos = document.getElementById("data_user");
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html'; // Redirigir al login.html si no ha iniciado sesión
  } else {
    datos.innerHTML = usuario;
  };