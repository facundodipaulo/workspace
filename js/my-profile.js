const usuario = window.localStorage.getItem("usuario");
const campoEmail = document.getElementById('email');
const guardarBtn = document.getElementById('guardarCambios');
const campoNombre1 = document.getElementById('nombre1');
const campoNombre2 = document.getElementById('nombre2');
const formulario = document.getElementById('form');
const campoApellido1 = document.getElementById('apellido1');
const campoApellido2 = document.getElementById('apellido2');
const campoTel = document.getElementById('tel');
let checkBtn = false;
let dataArray = [];
const imagenInput = document.getElementById('selectImage');
const imagenMostrada = document.getElementById('imagen');
const oldData = localStorage.getItem("dataArray");
const oldDataArray = JSON.parse(oldData);
const oldImage = localStorage.getItem("imagen");
const alertContainer = document.getElementById('alert-container');


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

if (oldDataArray && oldDataArray.length > 0) {
  campoNombre1.value = oldDataArray[0];
  campoApellido1.value = oldDataArray[1];
  campoTel.value = oldDataArray[3];
  campoNombre2.value = oldDataArray[4];
  campoApellido2.value = oldDataArray[5];
}

if (oldImage) {
  imagenMostrada.src = oldImage;
}

imagenInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const maxLocalStorageSize = 5242880; // 5MB (tamaño máximo permitido en el localStorage en bytes)

  if (file && file.size <= maxLocalStorageSize) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgGuardada = e.target.result;
      imagenMostrada.src = imgGuardada;
      localStorage.setItem('imagen', imgGuardada);
    };

    reader.readAsDataURL(file);
  } else {
    //alert('La imagen excede el tamaño permitido para almacenamiento en el localStorage.');
    showAlert("La imagen excede el tamaño permitido de 5MB.")
    imagenInput.value = ''; // Limpiar el input del archivo si se excede el tamaño
  }
});

console.log(usuario);

campoEmail.value = usuario;

guardarBtn.addEventListener('click', function (e) {
  dataArray = [];
  e.preventDefault();
  validacion(campoNombre1);
  validacion(campoApellido1);
  validacion(campoTel);
  checkBtn = true;
  const camposForm = document.querySelectorAll('input');
  camposForm.forEach(campo => {
    dataArray.push(campo.value)
  });
  localStorage.setItem("dataArray", JSON.stringify(dataArray));
});

formulario.addEventListener('input', function(event) {
  if (checkBtn) {
    if (event.target === campoNombre1 || event.target === campoApellido1 || event.target === campoTel) {
      validacion(campoNombre1);
      validacion(campoApellido1);
      validacion(campoTel);
    }
  }
});

function validacion(campo) {
  if (campo.value === "") {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
  } else {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
  }
}




