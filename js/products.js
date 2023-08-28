let container = document.querySelector(".product-container");
let cat_name = 101;
let minCount = undefined;
let maxCount = undefined;
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let currentPriceOrder = "none"; // none, ascending, descending
let currentRelevanceOrder = "none"; // none, descending
const searchInput = document.getElementById('searchInput');

function cargarDatos(newCatName) {
    cat_name = newCatName;
    container.innerHTML = "";

    const url = `https://japceibal.github.io/emercado-api/cats_products/${cat_name}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.products.sort((a, b) => {
                if (currentPriceOrder === "ascending") {
                    return a.cost - b.cost;
                } else if (currentPriceOrder === "descending") {
                    return b.cost - a.cost;
                }
                return 0;
            });

            data.products.sort((a, b) => {
                if (currentRelevanceOrder === "descending") {
                    return b.soldCount - a.soldCount;
                }
                return 0;
            });

            data.products.forEach(category => {
                const productElement = document.createElement("div");
                productElement.className = "product";

                const producto_json = document.getElementById("producto_json");
                producto_json.innerHTML = data.catName;

                if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
                    ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

                    productElement.innerHTML = `
                    <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                                    <small class="text-muted">${category.soldCount} artículos</small>
                                </div>
                                <p class="mb-1">${category.description}</p>
                            </div>
                        </div>
                    </div>
                    `;

                    container.appendChild(productElement);
                }
            });
        })
        .catch(error => {
            console.error("Error al obtener el JSON:", error);
        });
}

const sortAscPriceBtn = document.getElementById("sortAsc");
const sortDescPriceBtn = document.getElementById("sortDesc");
const sortByCountBtn = document.getElementById("sortByCount");

sortAscPriceBtn.addEventListener("click", () => {
    currentRelevanceOrder = "none"
    currentPriceOrder = "ascending";
    cargarDatos(cat_name);
});

sortDescPriceBtn.addEventListener("click", () => {
    currentRelevanceOrder = "none"
    currentPriceOrder = "descending";
    cargarDatos(cat_name);
});

sortByCountBtn.addEventListener("click", () => {
    currentRelevanceOrder = "descending";
    cargarDatos(cat_name);
});

const loadedId = window.localStorage.getItem("catID");
cargarDatos(loadedId);

document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    currentRelevanceOrder = "none"
    minCount = undefined;
    maxCount = undefined;

    cargarDatos(cat_name);
});

document.getElementById("rangeFilterCount").addEventListener("click", function () {
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    } else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    } else {
        maxCount = undefined;
    }

    cargarDatos(cat_name);
});

 searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();
    const productElements = document.querySelectorAll(".product");
    productElements.forEach(productElement => {
            const productName = productElement.querySelector("h4.mb-1").textContent.toLowerCase();
            
            if (productName.includes(searchText)) {
                productElement.style.display = 'block';
            } else {
                productElement.style.display = 'none';
            }
        });
    });