const divcarro = document.getElementById("carro");
const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const tablaTitulos = document.getElementById("tablaTitulos");
const nuevoProductoImagen = localStorage.getItem("imagenProducto");
const nuevoProductoNombre = localStorage.getItem("nombreProducto");
const nuevoProductoCurrency = localStorage.getItem("currencyProducto");
const nuevoProductoCost = localStorage.getItem("costProducto");
const botonLimpiarLocalStorage = document.getElementById("limpiarLocalStorage");

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
        <th><input type="number" min="0" class="inputCant"></th>
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
            <input type="number" min="0" class="inputCant">
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
        const currency = input.closest("tr").querySelector("th:nth-child(3)").textContent;
        const unitCost = parseFloat(currency.split(" ")[1]);
        const totalPriceValue = currency.split(" ")[0] + " " + (cant * unitCost).toFixed(2);
        totalPrice.textContent = totalPriceValue;
      });
    });
  });

  // Función para limpiar el carrito
  function limpiarCarrito() {
  // Vacía el arreglo de productos en el carrito
  productosEnCarrito.length = 0;

  // Guarda el carrito vacío de nuevo en el almacenamiento local
  localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
  location.reload();
  // Actualiza la interfaz de usuario y borrar los elementos visuales del carrito en la página
}

// Configura un evento de clic para el botón "limpiarLocalStorage"
botonLimpiarLocalStorage.addEventListener("click", limpiarCarrito);

  
  