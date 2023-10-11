//Tomamos los datos de las id del localStorage
const selectedProductId = localStorage.getItem("prodID");
const selectedProductCategory = localStorage.getItem("catID");
const container = document.getElementById("cont");
const productInfoUrl = `https://japceibal.github.io/emercado-api/cats_products/${selectedProductCategory}.json`;
const catName = localStorage.getItem("catName");
const buyButton = document.getElementById("buy");
let selectedProduct;

function compra(selectedProduct) {
  
    console.log(selectedProduct);
    localStorage.setItem("imagenProducto", selectedProduct.image);
    localStorage.setItem("nombreProducto", selectedProduct.name);
    localStorage.setItem("costProducto", selectedProduct.cost);
    localStorage.setItem("currencyProducto", selectedProduct.currency);

  
}



fetch(productInfoUrl)
    .then(response => response.json())
    .then(productData => {
        
        const products = productData.products;
        selectedProduct = products.find(product => product.id === parseInt(selectedProductId));
        //Creamos una constante con la posición en el array products del selectedProduct
        const selectedProductPosition = products.indexOf(selectedProduct);

        //Función que, en el caso de que existan dos productos como mínimo en la categoría, muestra dos productos relacionados
        function relatedProducts (arrayPosition) {
            if (products.length > 1) {
            switch (arrayPosition) {
                case 0:
                return `<div>
                        <p>${products[1].name}</p>
                        <img src="${products[1].image}" id="ilustracion">
                        </div>
                        <div>
                        <p>${products[2].name}</p>
                        <img src="${products[2].image}" id="ilustracion">
                        </div>
                        `;
            case 1:
                return `<div>
                        <p>${products[0].name}</p>
                        <img src="${products[0].image}" id="ilustracion">
                        </div>
                        <div>
                        <p>${products[2].name}</p>
                        <img src="${products[2].image}" id="ilustracion">
                        </div>
                        `;
            case 2:
                return `<div>
                        <p>${products[0].name}</p>
                        <img src="${products[0].image}" id="ilustracion">
                        </div>
                        <div>
                        <p>${products[1].name}</p>
                        <img src="${products[1].image}" id="ilustracion">
                        </div>
                        `;
            case 3:
                return `<div>
                        <p>${products[2].name}</p>
                        <img src="${products[2].image}" id="ilustracion">
                        </div>
                        <div>
                        <p>${products[1].name}</p>
                        <img src="${products[1].image}" id="ilustracion">
                        </div>
                        `;
            case 4:
                return `<div>
                        <p>${products[3].name}</p>
                        <img src="${products[3].image}" id="ilustracion">
                        </div>
                        <div>
                        <p>${products[2].name}</p>
                        <img src="${products[2].image}" id="ilustracion">
                        </div>
                        `;
            
                default:
                    console.log(`Error de posición del array para relatedProducts`);
            }
        } else {
            //Si no existen al menos dos productos en el arreglo, se imprime el mensaje: "No se han encontrado productos relacionados"
            return  `
                    <h5>No se han encontrado productos relacionados</h5>
                    `
        }
        }
        const secondFetchUrl = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;
    
            //Fetch para el carrusel
        fetch(secondFetchUrl)
          .then(response => response.json())
          .then(secondProductData => {
            const images = secondProductData.images;
            const productInfoContainer = document.getElementById('cont');
            const carouselInner = document.querySelector('.carousel-inner');
        
            // Borrar el contenido interno del carrusel existente
            carouselInner.innerHTML = "";
        
            images.forEach((imageUrl, index) => {
              const carouselItem = document.createElement('div');
              carouselItem.classList.add('carousel-item');
            
              // La primera imagen debe tener la clase "activa" para que sea el elemento activo inicial.
              if (index === 0) {
                carouselItem.classList.add('active');
              }
          
              const imageElement = document.createElement('img');
              imageElement.src = imageUrl;
              imageElement.classList.add('d-block', 'w-100');
              imageElement.alt = 'Imagen del Producto';
          
              carouselItem.appendChild(imageElement);
              carouselInner.appendChild(carouselItem);
            });
          });
        
        if (selectedProduct) {
            
            // Mostrar el nombre del producto en el contenedor
            //Más abajo se llama a la función relatedProducts, utilizando la posicion del producto seleccionado en el array como parámetro
            container.innerHTML = `
            <h1>${selectedProduct.name}</h1> <button id="buy" onclick="compra(selectedProduct)" class="btn btn-success" value="comprar">Comprar</button>
            <hr>
            <p class="tipoDeDato">Imágenes ilustrativas:</p>
            <div id ="ilustracion">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="..." class="d-block w-100" alt="imagen_1">
                </div>
                <div class="carousel-item">
                  <img src="..." class="d-block w-100" alt="Imagen_2">
                </div>
                <div class="carousel-item">
                  <img src="..." class="d-block w-100" alt="Imagen_3">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div> 
            <br>
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
            <br><br>
            <p class="tipoDeDato">Relacionados:</p> 
            <div class="card mb-3">
            ${relatedProducts (selectedProductPosition)}
            </div>
            `

        } else {
            console.error("Producto no encontrado");
        }
    })
    .catch(error => {
        console.error("Error al obtener la información del producto:", error);
    });

    const container2 = document.getElementById("cont2");
    const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;

    //Llamamos un fetch que recorre el JSON de comentarios del producto, recorriendo cada uno con el forEach e imprimiendo
    //su información en pantalla
    fetch (COMMENTS_URL)
    .then(response => response.json())
    .then(commentsData => {
        container2.innerHTML += `<h5>Comentarios: </h5> <br>`
        commentsData.forEach(comment => {
            container2.innerHTML += `<div class="card mb-3">
            <p>${comment.user + " " + comment.dateTime + " " + stars(comment.score)}</p>
            <p>${comment.description}</p>
            </div>
            `;
        });
    })
    .catch(error => {
        console.error("Error al obtener la información del producto:", error);
    });

    //Funcion con un switch que cumple la función de poner muchos if, en su lugar compara el parametro starNbr con cada uno de los case
    //En el caso de que el parametro no concuerde con ningún case, se va al default "Error de puntaje"
    //La función muestra las estrellas correspondenties en base al puntaje definido

    function stars (starNbr) {
        switch (starNbr) {
            case 1:
            return `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
        case 2:
            return `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
        case 3:
            return `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
        case 4:
            return `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>`;
        case 5:
            return `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>`;
        
            default:
                console.log(`Error de puntaje`);
        }
    }

    //Función que nos devuelve la fecha y hora actual en el formato del JSON

    function setDate () {
        const fechaHoraActual = new Date();
        const fechaFormateada = `${fechaHoraActual.getFullYear()}-${(fechaHoraActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaHoraActual.getDate().toString().padStart(2, '0')}`;
        
        const horaFormateada = `${fechaHoraActual.getHours().toString().padStart(2, '0')}:${fechaHoraActual.getMinutes().toString().padStart(2, '0')}:${fechaHoraActual.getSeconds().toString().padStart(2, '0')}`;

        return `${fechaFormateada + " " + horaFormateada}`;
    };

    const inputComment = document.getElementById("commentBox");
    const sendCommentBtn = document.getElementById("sendBtn");
    const usuario = window.localStorage.getItem("usuario");

    //Evento del botón para poder agregar el comentario deseado a la lista de comentarios con su respectivo puntaje y usando
    //localStorage para recoger los datos de usuario 

    sendCommentBtn.addEventListener('click', function () {

        const inputCommentScore = document.getElementById("userScore");
        let commentText = inputComment.value;
        //parseInt convierte el número de string a integer para que la función stars() lo reconozca
        let commentScore = parseInt(inputCommentScore.value);
        console.log(commentScore);
        

        container2.innerHTML += `<div class="card mb-3">
            <p>${usuario + " " + setDate() + " " + stars(commentScore)}</p>
            <p>${commentText}</p>
            </div>
            `;


    })



