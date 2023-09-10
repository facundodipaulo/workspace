//Tomamos los datos de las id del localStorage
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
            <img src="${selectedProduct.image}" id="ilustracion"> <br><br>
            <h5>Comentarios:</h5> <br>`;

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