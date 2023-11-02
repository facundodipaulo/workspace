document.addEventListener("DOMContentLoaded", function(){

    /* Las tarjetas de Autos, Juguetes y Muebles redireccionan a products.html
    en cualquier parte que se haga click de la imagen o texto. */

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


});