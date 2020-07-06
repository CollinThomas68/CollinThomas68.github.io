var teddiesElt = document.getElementById("teddies");
/*var infoQte=document.getElementById("infoPanier");
infoQte.innerHTML='<span>contient '+ qteTtlPanier +' article(s)</span>';
*/
if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 
    document.getElementById("testqte").textContent = ' est vide !'
} else { // panier NON vide
    var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
    var prixPanier=JSON.parse(localStorage.getItem("messagePrixPanier"));
    document.getElementById("testqte").innerHTML = ' contient '+quantitePanier+' articles<br/> pour un montant total de '+prixPanier/100+' € !';
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