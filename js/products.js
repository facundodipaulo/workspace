let container = document.querySelector(".product-container");

fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json())
    .then(data => {
        data.products.forEach(category => {
            const productElement = document.createElement("div");
            productElement.className = "product";
            
            const producto_json = document.getElementById("producto_json");
            producto_json.innerHTML = data.catName

            productElement.innerHTML = `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${category.name}</h4>
                        <small class="text-muted">${category.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${category.description}</p>
                </div>
            </div>
        </div>
            `;
            
            container.appendChild(productElement); 
        });
    })
    .catch(error => {
        console.error("Error al obtener el JSON:", error);
    });

