var teddiesElt = document.getElementById("teddies");
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    teddies.forEach(function (teddy) {
        // Ajout du titre et du contenu de chaque article
        var conteneurElt = document.createElement("article");
        var lienElt = document.createElement("a");        
        var imgElt = document.createElement('img');        
        var nameElt = document.createElement("h2");
        var descriptionElt = document.createElement("p");
        var idElt = document.createElement("p");

        conteneurElt.classList.add("col-xs-12", "col-lg-6");
        imgElt.classList.add("portrait");
        imgElt.src=teddy.imageUrl;
        nameElt.textContent = teddy.name;
        descriptionElt.textContent = teddy.description;
        idElt.textContent ="Référence : " + teddy._id;
        lienElt.href='produit.html?id=' + teddy._id;
        teddiesElt.appendChild(conteneurElt);
        conteneurElt.appendChild(lienElt);           
        lienElt.appendChild(imgElt);        
        lienElt.appendChild(nameElt);
        conteneurElt.appendChild(descriptionElt);
        conteneurElt.appendChild(idElt);
    });
});
