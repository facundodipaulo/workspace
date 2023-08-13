document.addEventListener("DOMContentLoaded", function() {
    //Se declaran las const
    const button = document.getElementById('button');
    
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
            window.location.href = "index.html";
        }
    }
    
    button.addEventListener("click", function(e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        iniciarSesion();
    });
});
