document.addEventListener("DOMContentLoaded", function () {
    const alertContainer = document.getElementById('alert-container');
    const button = document.getElementById('button');
    const checkbox = document.getElementById('checkbox');
    const campoUsuario = document.getElementById('user');
    const campoContrasena = document.getElementById('password');
    let recordar = false;
  
    function showAlert(message, success = false) {
      const alertElement = document.createElement("div");
      alertElement.className = `alert ${success ? 'alert-success' : 'alert-danger'}`;
      alertElement.textContent = message;
      alertContainer.appendChild(alertElement);
  
      setTimeout(() => {
        alertContainer.removeChild(alertElement);
      }, 5000);
    }
  
    function iniciarSesion() {
      const usuario = campoUsuario.value;
      const contrasena = campoContrasena.value;
  
      if (usuario === "" || contrasena === "") {
        showAlert("Por favor, complete todos los campos.", false);
      } else if (usuario.indexOf("@") === -1) {
        showAlert("El Usuario debe contener el carácter @.", false);
      } else if (contrasena.length < 6) {
        showAlert("La contraseña debe tener al menos 6 caracteres.", false);
      } else {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: usuario, password: contrasena }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.token) {
              localStorage.setItem('usuario', data.user); // Almacena el usuario en localStorage
              window.location.href = "index.html";
            } else {
              console.error('Error de autenticación:', data.error);
              showAlert("Credenciales incorrectas. Por favor, inténtelo de nuevo.", false);
            }
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
      }
    }
  
    button.addEventListener("click", function (e) {
      e.preventDefault();
      iniciarSesion();
    });
  
    checkbox.addEventListener('change', function () {
      recordar = checkbox.checked;
    });
  
    const passwordField = document.getElementById('password');
    const showPasswordButton = document.getElementById('mostrar_contraseña');
  
    showPasswordButton.addEventListener('click', function () {
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showPasswordButton.innerHTML = '<i class="far fa-eye-slash"></i>';
      } else {
        passwordField.type = 'password';
        showPasswordButton.innerHTML = '<i class="far fa-eye"></i>';
      }
    });
  });
  