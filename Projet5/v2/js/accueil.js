var teddiesElt = document.getElementById("teddies");
//affichage du panier en haut de page avec la quantité d'articles s'y trouvant
if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 
    document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket"></i>';
} else { // panier NON vide
    var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
    document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket"></i><span>'+quantitePanier+'</span>' ;
}
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    let selectionTeddies= document.getElementById('teddies');
    console.log(teddies.length);
    var tableauTeddies=[];
        for(var i=0;i<teddies.length;i++){
            var teddy=teddies[i];
            let selectionProduits='<article>'+
                                    '<a href="produit.html?id=' + teddy._id+'" class="row">'+
                                        '<div class="col-sm-6">'+
                                            '<img src="'+teddy.imageUrl+'" class="imageListing">'+
                                        '</div>'+
                                        '<div class="col-sm-6">'+
                                            '<h2>'+teddy.name+'</h2>'+
                                            '<p>'+teddy.description+'</p>'+
                                        '</div>'+    
                                    '</a>'+
                                '</article>';
                                tableauTeddies.push(teddy._id);
                                localStorage.setItem('tableauTeddy',JSON.stringify(tableauTeddies));
            selectionTeddies.innerHTML+=selectionProduits;


    }

});