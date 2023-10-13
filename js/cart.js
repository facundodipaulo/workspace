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


