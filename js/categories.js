const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

                if (window.innerWidth <= 500) {
                    htmlContentToAppend += `
                    <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active col-12">
                        <div class="row">
                            <div class="col-12">
                                <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail text_description">
                            </div>
                            <div class="col-12">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${category.name}</h4>
                                    <small class="text-muted">${category.productCount} artículos</small>
                                </div>
                                <p class="mb-1">${category.description}</p>
                            </div>
                        </div>
                    </div>
                    `;
                } else {
                    htmlContentToAppend += `
                    <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail text_description">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${category.name}</h4>
                                    <small class="text-muted">${category.productCount} artículos</small>
                                </div>
                                <p class="mb-1">${category.description}</p>
                            </div>
                        </div>
                    </div>
                    `;
                }
            }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


// Agrega un evento para ejecutar showCategoriesList cuando la ventana cambia de tamaño
window.addEventListener('resize', showCategoriesList);

// Llama a showCategoriesList inicialmente para cargar la lista según el ancho actual
showCategoriesList();

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
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

        showCategoriesList();
    });

    //Tomamos constantes para el botón de "Cambiar tema" y el html
    const toggleThemeButton = document.getElementById("toggleThemeButton");
    const htmlElement = document.querySelector("html");
    
    // Al cargar la página, verifica si hay un tema almacenado en el localStorage y lo aplica si existe
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      htmlElement.setAttribute("data-bs-theme", storedTheme);
    }
    //Cambia el tema de light a dark o dark a light respectivamente
    toggleThemeButton.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      htmlElement.setAttribute("data-bs-theme", newTheme);
    
      // Guarda el nuevo tema en el localStorage
      localStorage.setItem("theme", newTheme);
    });

        const usuario = window.localStorage.getItem("usuario");
        const datos = document.getElementById("data_user");

        if (!sessionStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html'; // Redirigir al login.html si no ha iniciado sesión
          } else {
            datos.innerHTML = usuario;
          };


        const cerrar_sesion = document.getElementById("cerrar_sesion");

    
    //Se crea un evento al hacer click que elimina la información de usuario del localStorage y redirige al usuario a login.html
        cerrar_sesion.addEventListener("click", function () {
        sessionStorage.removeItem('usuario');
        window.location.href = "login.html"
    })








});