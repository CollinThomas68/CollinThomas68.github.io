var teddiesElt = document.getElementById("teddies");
/*var infoQte=document.getElementById("infoPanier");
infoQte.innerHTML='<span>contient '+ qteTtlPanier +' article(s)</span>';
*/
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    let selectionTeddies= document.getElementById('teddies');
    console.log(teddies.length);
        for(var i=0;i<teddies.length;i++){
            var teddy=teddies[i];
            let selectionProduits='<article>'+
                                    '<a href="produit.html?id=' + teddy._id+'">'+
                                        '<div>'+
                                            '<img src="'+teddy.imageUrl+'">'+
                                        '</div>'+
                                        '<div>'+
                                            '<h2>'+teddy.name+'</h2>'+
                                            '<p>'+teddy.description+'</p>'+
                                        '</div>'+    
                                    '</a>'+
                                '</article>';

            selectionTeddies.innerHTML+=selectionProduits;
    }

});