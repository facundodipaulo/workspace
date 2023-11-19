document.addEventListener("DOMContentLoaded", function() {
  //Se declaran las constantes
  const alertContainer = document.getElementById('alert-container');
  const button = document.getElementById('button');
  const checkbox = document.getElementById('checkbox');
  const campoUsuario = document.getElementById('user');
  const campoContrasena = document.getElementById('password');
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

  function showAlert(message, success = false) {
      const alertElement = document.createElement("div");
      alertElement.className = `alert ${success ? 'alert-success' : 'alert-danger'}`;
      alertElement.textContent = message;
      alertContainer.appendChild(alertElement);
    
      // Limpia el mensaje después de unos segundos
      setTimeout(() => {
        alertContainer.removeChild(alertElement);
      }, 5000);
    }
  
    function iniciarSesion() {
      // Se declaran las constantes.
      const usuario = campoUsuario.value;
      const contrasena = campoContrasena.value;

      // Previene continuar = campo vacío
      if (usuario === "" || contrasena === "") {
          showAlert("Por favor, complete todos los campos.", false);
      } else if (usuario.indexOf("@") === -1) {
          showAlert("El Usuario debe contener el carácter @.", false);
      } else if (contrasena.length < 6) {
          showAlert("La contraseña debe tener al menos 6 caracteres.", false);
      } else if (usuario !== "ElonMusk@god.com" || contrasena !== "contraseña") {
          showAlert("Usuario o contraseña incorrectos.", false);
      } else {
          // Verifica si la casilla de recordar contraseña no está marcada
          if (!checkbox.checked) {
              // Si no está marcada, limpia los campos de usuario y contraseña
              campoUsuario.value = '';
              campoContrasena.value = '';
          }

          // Redirige al usuario a la página especificada después de la autenticación exitosa
          sessionStorage.setItem('isLoggedIn', 'true');
          window.localStorage.setItem('usuario', usuario);
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
  });

  //mostrar contraseña
  const passwordField = document.getElementById('password');
  const showPasswordButton = document.getElementById('mostrar_contraseña');

  showPasswordButton.addEventListener('click', function() {
      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          showPasswordButton.innerHTML = '<i class="far fa-eye-slash"></i>';
      } else {
          passwordField.type = 'password';
          showPasswordButton.innerHTML = '<i class="far fa-eye"></i>';
      }
  });
});
