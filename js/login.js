document.addEventListener("DOMContentLoaded", function() {
    //Se declaran las constantes
    const button = document.getElementById('button');
    const checkbox = document.getElementById('checkbox');
    const campoUsuario = document.getElementById('user');
    let recordar = false;
    let dataRecordar = localStorage.getItem('recordar');
    let usuarioGuardado = localStorage.getItem('usuario');

    // Función para recordar datos de usuario.
    if (dataRecordar === "true" && usuarioGuardado) {
        console.log(usuarioGuardado);
        campoUsuario.value = usuarioGuardado;
    } else {
        console.log("No hay usuario recordado");
        campoUsuario.value.delete;
    }

    // Función para cambiar Modo Día a Modo Noche y el Ícono de Luna a Sol. 
    var icon =  document.getElementById("icon");
    icon.onclick = function(){
        document.body.classList.toggle("dark-theme");
        if(document.body.classList.contains("dark-theme")){
            icon.src = "img/sun.png";
        } else {
            icon.src = "img/moon.png";
        }
    }
    
    
    function iniciarSesion() {
        
        // Se declaran las constantes.
    const usuario = document.getElementById('user').value;
    const contrasena = document.getElementById('password').value;
       
        // Previene continuar = campo vacio
        if (usuario === "" || contrasena === "") {
            alert("Por favor, complete todos los campos.");
            //Previeen continuar = falta @

        } else if (usuario.indexOf("@") === -1) {
            alert("El Usuario debe contener el carácter @.");
            // Un exito continue

        } else if (contrasena.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
        }
        
        else {
            // Redirige al usuario a la página especificada después de la autenticación exitosa
            sessionStorage.setItem('isLoggedIn', 'true'); // Creamos estado "estáLoggeado" y lo hacemos verdadero
            window.localStorage.setItem('usuario', usuario); // Guarda el dato de usuario para utilizarlo en otro documento JS
            window.localStorage.setItem('recordar', recordar);
            console.log(recordar);
            window.location.href = "index.html";
        }
    }
    
    button.addEventListener("click", function(e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        iniciarSesion();
    });

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            recordar = true;
        } else {
            recordar = false;
        }
    })


});


