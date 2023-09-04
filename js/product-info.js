const selectedProductId = localStorage.getItem("prodID");
const selectedProductCategory = localStorage.getItem("catID");
const container = document.getElementById("cont");
const productInfoUrl = `https://japceibal.github.io/emercado-api/cats_products/${selectedProductCategory}.json`;
const catName = localStorage.getItem("catName");

fetch(productInfoUrl)
    .then(response => response.json())
    .then(productData => {
        const products = productData.products;
        const selectedProduct = products.find(product => product.id === parseInt(selectedProductId));

        if (selectedProduct) {
            
            // Mostrar el nombre del producto en el contenedor
            container.innerHTML = `
            <h1>${selectedProduct.name}</h1>
            <hr>
            <p class="tipoDeDato">Precio:</p>
            <p>${selectedProduct.currency + " " + selectedProduct.cost}</p>
            <br>
            <p class="tipoDeDato">Descripción:</p>
            <p>${selectedProduct.description}</p>
            <br>
            <p class="tipoDeDato">Categoría:</p>
            <p>${catName}</p>
            <br>
            <p class="tipoDeDato">Cantidad de vendidos:</p>
            <p>${selectedProduct.soldCount}</p>
            <br>
            <p class="tipoDeDato">Imágenes ilustrativas:</p>
            <img src="${selectedProduct.image}" id="ilustracion">`;

        } else {
            console.error("Producto no encontrado");
        }
    })
    .catch(error => {
        console.error("Error al obtener la información del producto:", error);
    });