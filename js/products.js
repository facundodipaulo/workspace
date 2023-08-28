let container = document.querySelector(".product-container");
let cat_name = 101
let minCount = undefined;
let maxCount = undefined;
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
const ORDER_DESC_BY_PRICE = "descPrice";


function cargarDatos(newCatName) { //Funcion que carga los datos pasando como parametro la id de la categoria
    cat_name = newCatName;
    container.innerHTML = "";

const url = `https://japceibal.github.io/emercado-api/cats_products/${cat_name}.json`; // Id de categoría dentro url

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.products.forEach(category => {
            const productElement = document.createElement("div");
            productElement.className = "product";

            const producto_json = document.getElementById("producto_json");
            producto_json.innerHTML = data.catName

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
        ` ;

            container.appendChild(productElement); 
    }});
    })
    .catch(error => {
        console.error("Error al obtener el JSON:", error);
    });
}
const loadedId = window.localStorage.getItem("catID"); // Cargar variable id de categories.js
cargarDatos(loadedId); // Cargar datos con la id cargada como parametro

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    if (sortCriteria === ORDER_DESC_BY_PRICE) {
        return categoriesArray.slice().sort((a, b) => b.cost - a.cost);
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    return cargarDatos(cat_name)

    //Muestro los elementos ordenados
    //cargarDatos(cat_name)
}


document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_DESC_BY_PRICE);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    cargarDatos(cat_name)

});



document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    cargarDatos(cat_name)

});