const divcarro = document.getElementById("carro");
const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const tablaTitulos = document.getElementById("tablaTitulos");
const nuevoProductoImagen = localStorage.getItem("imagenProducto");
const nuevoProductoNombre = localStorage.getItem("nombreProducto");
const nuevoProductoCurrency = localStorage.getItem("currencyProducto");
const nuevoProductoCost = localStorage.getItem("costProducto");
const botonLimpiarLocalStorage = document.getElementById("limpiarLocalStorage");
const campoSubtotal = document.getElementById("Cost_subtotal");
const campoEnvio = document.getElementById("Cost_envio");
const campoTotal = document.getElementById("Cost_total");
const formEnvio = document.getElementById("formularioEnvio");
const premium = document.getElementById("premium");
const express = document.getElementById("express");
const standard = document.getElementById("standard");
let modal = document.getElementById("modal");
let select = document.getElementById("seleccionar_pago");
let cerrar_modal = document.getElementsByClassName("close")[0];
let arraySubtotales = [];
let sumaSubtotalValor = 0;
let costoEnvio = 0;
let totalTotal = 0;
const creditbtn = document.getElementById("creditbtn");
const bankbtn = document.getElementById("bankbtn");
const cuentanum = document.getElementById("cuentanum");
const num = document.getElementById("num");
const cod = document.getElementById("cod");
const date = document.getElementById("date");
const finCompra = document.getElementById("finCompra");
const seleccionar_pago = document.getElementById("seleccionar_pago");


    num.disabled = true;
    cod.disabled = true;
    date.disabled = true;
    cuentanum.disabled = true;




creditbtn.addEventListener("change", function () {
  if(creditbtn.checked) {
    num.disabled = false;
    cod.disabled = false;
    date.disabled = false;

    cuentanum.value = "";

    cuentanum.disabled = true;
 
  }
})

bankbtn.addEventListener("change", function() {
  if (bankbtn.checked) {
    cuentanum.disabled = false;

    num.value = "";
    cod.value = "";
    date.value = "";

    num.disabled = true;
    cod.disabled = true;
    date.disabled = true;
  }
});












select.addEventListener("click", function() {
  modal.style.display = "block";
});

cerrar_modal.addEventListener("click", function() {
  modal.style.display = "none";
});

window.addEventListener("click", function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  };
});

function actualizarPrecioTotal() {
  totalTotal = sumaSubtotalValor + costoEnvio;
  console.log("El totalTotal es: " + totalTotal);
  campoTotal.innerHTML = "USD" + " " + totalTotal.toFixed(2);
}


formEnvio.addEventListener("input", function () {

  if (premium.checked) {
    costoEnvio = 0;
    costoEnvio = sumaSubtotalValor * 0.15;
    console.log(costoEnvio.toFixed(2));
    campoEnvio.innerHTML = "USD" + " " + costoEnvio.toFixed(2);

  } else if (express.checked) {
    costoEnvio = 0;
    costoEnvio = sumaSubtotalValor * 0.07;
    console.log(costoEnvio.toFixed(2));
    campoEnvio.innerHTML = "USD" + " " + costoEnvio.toFixed(2);
  } else if (standard.checked) {
    costoEnvio = 0;
    costoEnvio = sumaSubtotalValor * 0.05;
    console.log(costoEnvio.toFixed(2));
    campoEnvio.innerHTML = "USD" + " " + costoEnvio.toFixed(2);
  }

  actualizarPrecioTotal()



})

function actualizarSubtotales() {
  arraySubtotales = []; // Limpia el array antes de llenarlo nuevamente
  const totalPriceElements = tablaTitulos.querySelectorAll(".totalPrice");
  totalPriceElements.forEach((totalPriceElement) => {
    const textoPrecio = totalPriceElement.textContent;
    const numerosEncontrados = textoPrecio.match(/\d+/); //Extrae del precio la unidad monetaria y deja solo el numero

    if (numerosEncontrados) {
      const valorNumerico = parseFloat(numerosEncontrados[0]); // Obtén el primer número encontrado
      arraySubtotales.push(valorNumerico);
    } else {
      totalPriceElement.textContent = "0"; // Establece el valor a "0" si no se encuentra un número
      arraySubtotales.push(0);
    }
  });
  console.log(arraySubtotales);
  sumaSubtotal();
  actualizarPrecioTotal()
  campoSubtotal.innerHTML = "USD" + " " + sumaSubtotalValor;
}



console.log(nuevoProductoNombre);

// Obtiene la lista de productos del carrito del local storage
const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.articles.forEach(article => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <th><img src="${article.image}" class="cartproductimg"></th>
        <th>${article.name}</th>
        <th>${article.currency + " " + article.unitCost}</th>
        <th><input type="number" min="1" required class="form-control inputCant " style="width: 20%"></th>
        <th class="totalPrice"></th>
      `;

      // Agrega la fila a la tabla
      tablaTitulos.appendChild(tableRow);
    });

   
    function createTableRow(producto) {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <th><img src="${producto.imagen}" class="cartproductimg"></th>
        <th>${producto.nombre}</th>
        <th>${producto.moneda + " " + producto.costo}</th>
        <th class="cuadradito">
            <input type="number" min="1" required class="form-control inputCant " style="width: 20%">
        </th>
        <th class="totalPrice"></th>
        <th><button class="btn btn-danger btnEliminar">
        <i class="fas fa-trash"></i>
    </button></th>
      `;

      // Agrega el manejador de eventos al botón de eliminación
      const btnEliminar = tableRow.querySelector(".btnEliminar");
      btnEliminar.addEventListener("click", () => {
        // Elimina la fila de la tabla
        tablaTitulos.removeChild(tableRow);
        actualizarSubtotales()
        
      });

      return tableRow;
    }

    // Recorre la lista de productos del carrito y agrega cada producto a la tabla
    productosEnCarrito.forEach(producto => {
      const tableRow = createTableRow(producto);
      // Agrega la fila a la tabla
      tablaTitulos.appendChild(tableRow);
    });

    // Agrega la tabla a divcarro
    divcarro.appendChild(tablaTitulos);

    // Agrega eventos a los elementos input
    const inputCants = tablaTitulos.querySelectorAll(".inputCant");

    inputCants.forEach(input => {
      input.addEventListener("input", function () {
        const cant = input.value;
        const totalPrice = input.closest("tr").querySelector(".totalPrice");
        const currencyCell = input.closest("tr").querySelector("th:nth-child(3)");
        const currency = currencyCell.textContent.split(" ")[0]; // Obtiene la moneda
        const unitCost = parseFloat(currencyCell.textContent.split(" ")[1]); // Obtiene el costo unitario
        let totalPriceValue = 0;
    
        if (currency === "USD") {
          totalPriceValue = currency + " " + (cant * unitCost).toFixed(2);
        } else if (currency === "UYU") {
          totalPriceValue = "USD" + " " + (cant * unitCost / 40).toFixed(2);
        }
    
        totalPrice.textContent = totalPriceValue;
        arraySubtotales.push(totalPriceValue); // Agrega el precio total en la moneda correcta
        actualizarSubtotales();
      });
    });
  });

  function sumaSubtotal() {
    sumaSubtotalValor = 0; // Reinicia el valor a 0 antes de la suma
    arraySubtotales.forEach(valor => {
      sumaSubtotalValor += parseFloat(valor); // Convierte el valor a número antes de sumarlo
    });
    console.log(sumaSubtotalValor);
  }


  // Función para limpiar el carrito
  function limpiarCarrito() {
  // Vacía el arreglo de productos en el carrito
  productosEnCarrito.length = 0;

  // Guarda el carrito vacío de nuevo en el almacenamiento local
  localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
  location.reload();
  // Actualiza la interfaz de usuario y borrar los elementos visuales del carrito en la página
  actualizarSubtotales()
}

// Configura un evento de click para el botón "limpiarLocalStorage"
botonLimpiarLocalStorage.addEventListener("click", limpiarCarrito);

actualizarSubtotales();

finCompra.addEventListener("click", function (event) {
  // Evita el envío del formulario si no pasa la validación
  if (!formEnvio.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  
});
const botonFinalizarCompra = document.querySelector("button.btn.btn-primary");
const alertContainer = document.getElementById("alert-container");

botonFinalizarCompra.addEventListener("click", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe

  // Obtén los valores de los campos de dirección
  const calle = document.getElementById("calle");
  const numero = document.getElementById("numero");
  const esquina = document.getElementById("esquina");

  // Verifica que los campos de dirección no estén vacíos
  if (calle.value === "" || numero.value === "" || esquina.value === "") {
    showAlert("Los campos de dirección no pueden estar vacíos.");
    if (calle.value === "") {
      calle.classList.remove('is-valid');
      calle.classList.add('is-invalid');
    }

  if (numero.value === "") {
    numero.classList.remove('is-valid');
      numero.classList.add('is-invalid');
    }

  if (esquina.value === "") {
    esquina.classList.remove('is-valid');
  esquina.classList.add('is-invalid');
  esquina.preventDefault(); // Evita el envío del formulario
}

} else {
  if (calle.value !== null) {
    calle.classList.remove('is-invalid');
    calle.classList.add('is-valid');
  }

  if (numero.value !== null) {
    numero.classList.remove('is-invalid');
    numero.classList.add('is-valid');
  }

  if (esquina.value !== null) {
    esquina.classList.remove('is-invalid');
    esquina.classList.add('is-valid');
  }
}

const tiposDeEnvio = document.getElementById("tiposDeEnvio");

  // Verifica que se haya seleccionado una forma de envío
  const envioSeleccionado = document.querySelector("input[name='envio']:checked");
  if (!envioSeleccionado) {
    showAlert("Debes seleccionar una forma de envío.");
    tiposDeEnvio.classList.add('is-invalid');
    return;
  }

  // Verifica que la cantidad para cada artículo sea mayor a 0
  const cantidades = document.querySelectorAll("input.inputCant");
  for (const cantidadInput of cantidades) {
    const cantidad = parseInt(cantidadInput.value);
    if (isNaN(cantidad) || cantidad <= 0) {
      showAlert("La cantidad para cada artículo debe ser mayor a 0.");
      return;
    }
  }

  const aviso = document.getElementById("aviso");

  // Verifica que se haya seleccionado una forma de pago
  const formaPagoSeleccionada = document.querySelector("input[name='paymethod']:checked");
  if (!formaPagoSeleccionada) {
    showAlert("Debes seleccionar una forma de pago.");
    aviso.classList.remove('d-none');
    return;
  }

  // Verifica los campos del modal
  const modalCampos = document.querySelectorAll("#modal input:enabled");
  let camposCompletos = true;
  modalCampos.forEach((campo) => {
    if (campo.value === "") {
      camposCompletos = false;
      return;
    }
  });


  if (!camposCompletos) {
    showAlert("Debes completar todos los datos de pago.");
    aviso.classList.remove('d-none');
    return;
  }

  if ((creditbtn.checked || bankbtn.checked) && camposCompletos) {
    aviso.classList.add('d-none');
  }

  // Si todas las validaciones pasan se muestra el mensaje de "Compra realizada"
  showAlert("Compra realizada con éxito. ¡Gracias!", true);
 
});

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


  
  