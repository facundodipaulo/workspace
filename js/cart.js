const divcarro = document.getElementById("carro");
const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const tablaTitulos = document.getElementById("tablaTitulos");
const nuevoProductoImagen = localStorage.getItem("imagenProducto");
const nuevoProductoNombre = localStorage.getItem("nombreProducto");
const nuevoProductoCurrency = localStorage.getItem("currencyProducto");
const nuevoProductoCost = localStorage.getItem("costProducto");

console.log(nuevoProductoNombre)




fetch(url)
  .then(response => response.json())
  .then(data => {
    data.articles.forEach(article => {
      const tableRow = document.createElement("tr");
      tablaTitulos.innerHTML += `
        <th><img src="${article.image}" id="cartproductimg" class="cartproductimg"></th>
        <th>${article.name}</th>
        <th>${article.currency + " " + article.unitCost}</th>
        <th class="cuadradito">
        <input type="number" class="inputCant">
        </th>
        <th class="totalPrice"></th>
        <tr>
        <th><img src="${nuevoProductoImagen}" id="cartproductimg" class="cartproductimg"></th>
        <th>${nuevoProductoNombre}</th>
        <th>${nuevoProductoCurrency + " " + nuevoProductoCost}</th>
        <th><input type="number" class="newInputCant"></th>
        <th class="newTotalPrice"></th>
        </tr>
      `;

      const input = tablaTitulos.querySelector(".inputCant");
      const newInput = tablaTitulos.querySelector(".newInputCant");

      const totalPrice = tablaTitulos.querySelector(".totalPrice");
      const newTotalPrice = tablaTitulos.querySelector(".newTotalPrice");
      

      input.addEventListener("input", function () {
        const cant = input.value;
        const totalPriceValue = article.currency + " " + cant * article.unitCost;
        totalPrice.textContent = totalPriceValue;
      });

      newInput.addEventListener("input", function () {
        const newcant = newInput.value;
        const newTotalPriceValue = nuevoProductoCurrency + " " + newcant * nuevoProductoCost;
        newTotalPrice.textContent = newTotalPriceValue;
      });

      divcarro.appendChild(tablaTitulos);
    });
  });

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
