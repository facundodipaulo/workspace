const divcarro = document.getElementById("carro");
const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const tablaTitulos = document.getElementById("tablaTitulos");

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.articles.forEach(article => {
      const tableRow = document.createElement("tr");
      tablaTitulos.innerHTML += `
        <th><img src="${article.image}" id="cartproductimg" class="cartproductimg"></th>
        <th>${article.name}</th>
        <th>${article.currency + " " + article.unitCost}</th>
        <th><input type="number" class="inputCant"></th>
        <th class="totalPrice"></th>
      `;

      const input = tablaTitulos.querySelector(".inputCant");
      const totalPrice = tablaTitulos.querySelector(".totalPrice");

      input.addEventListener("input", function () {
        const cant = input.value;
        const totalPriceValue = article.currency + " " + cant * article.unitCost;
        totalPrice.textContent = totalPriceValue;
      });

      divcarro.appendChild(tablaTitulos);
    });
  });


