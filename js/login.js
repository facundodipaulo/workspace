document.addEventListener("DOMContentLoaded", function() {
    //Se declaran las const
    const button = document.getElementById('button');
    const checkbox = document.getElementById('checkbox');
    const campoUsuario = document.getElementById('user');
    let recordar = false;
    let dataRecordar = localStorage.getItem('recordar');
    let usuarioGuardado = localStorage.getItem('usuario');

    if (dataRecordar === true) {
        console.log(usuarioGuardado);
    }



    

    
    
    function iniciarSesion() {
        
        //Se declaran las const
    const usuario = document.getElementById('user').value;
    const contrasena = document.getElementById('password').value;
       
        //previene continuar = campo vacio
        if (usuario === "" || contrasena === "") {
            alert("Por favor, complete todos los campos.");
            //Previeen continuar = falta @

        } else if (usuario.indexOf("@") === -1) {
            alert("El Usuario debe contener el carácter @.");
            // Un exito continue

        } else {
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

