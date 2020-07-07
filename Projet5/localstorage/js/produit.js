var teddyElt = document.getElementById("teddy");
// Fonction permettant de récupérer l'id indiqué dans la barre d'adresse
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
var id = $_GET('id');



//test affichage quantité du panier

if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 
    document.getElementById("testqte").textContent = ' est vide !'
} else { // panier NON vide
    var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
    var prixPanier=JSON.parse(localStorage.getItem("messagePrixPanier"));
    document.getElementById("testqte").innerHTML = ' contient '+quantitePanier+' articles<br/> pour un montant total de '+prixPanier/100+' € !';
}

ajaxGet(`http://localhost:3000/api/teddies/${id}`, function (reponse) {
    // Récupère le contenu en fonction de l'id de la page
    var teddy = JSON.parse(reponse);
    var teddyCouleurs= teddy.colors;


    var choixCouleurs="";
    for (let x in teddyCouleurs) {
        choixCouleurs += '<option value="' + teddyCouleurs[x] + '">' + teddyCouleurs[x] + '</option>';
    }

    
    var qteTeddy="";
    for (q=1;q<10;q++){
        qteTeddy+= '<option value="' + q + '">' + q + '</option>';
    }
    



    if(id==teddy._id){

        let produitChoisi = '<article>' +
                                '<div>'+
                                    '<img src="'+teddy.imageUrl+'">'+
                                '</div>'+
                                '<div>'+
                                    '<div>'+
                                        '<h2>'+teddy.name+'</h2>'+
                                        '<p>'+teddy.description+'</p>'+
                                        '<p>'+teddy.price / 100+'€</p>'+
                                        '<div>'+
                                            '<form onsubmit="return ajoutProduitPanier()" id="formulaireProduit">'+
                                                '<label>Quantité : </label><select name="quantite" id="quantite">'+ qteTeddy + '</select>'+
                                                '<label>Couleur : </label><select name="couleur" id="couleur">'+choixCouleurs+'</select>'+
                                                '<input type="hidden" name="id" id="id" value="'+teddy._id+'">'+
                                                '<input type="hidden" name="adresseHtml" id="adresseHtml" value="produit.html?id='+teddy._id+'">'+
                                                '<input type="hidden" name="nom" id="nom" value="'+teddy.name+'">'+
                                                '<input type="hidden" name="quantite" id="quantite"value="1">'+
                                                '<input type="hidden" name="description" id="description" value="'+teddy.description+'">'+
                                                '<input type="hidden" name="prix" id="prix" value="'+teddy.price+'">'+
                                                '<input type="hidden" name="image" id="image" value="'+teddy.imageUrl+'">'+
                                                '<input type="submit" value="Ajout produit au panier" class="btnAjoutProduit"/>'+
                                            '</form>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</article>';
        
        
        let produitAffichage = document.getElementById('teddy');
        produitAffichage.innerHTML= produitChoisi;
    }


});
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    
    console.log(teddies.length);
    console.log(teddies);
    console.log(id);
        for(var i=0;i<teddies.length;i++){
            if(id!=teddies[i]._id){
                let autresProduits='<div class="col-6 col-lg-3">'+
                                        '<div class="card">'+
                                            '<a href="produit.html?id=' +teddies[i]._id+'">'+
                                                '<img class=”card-img-top” src='+teddies[i].imageUrl+'  width="250" height="150" alt=”Photo Ours”>'+
                                                '<div class="card-body">'+
                                                    '<h5 class="card-title">'+teddies[i].name+'</h5>'+
                                                '</div>'+
                                            '</a>'+
                                        '</div>'+
                                    '</div>';

            let autresTeddies = document.getElementById('lesautres');
            autresTeddies.innerHTML+= autresProduits;
            }

    }

});
/*
var autresTeddies=JSON.parse(localStorage.getItem("tableauTeddy"));
console.log(autresTeddies);

for(i=0;i<autresTeddies.length;i++){
    if(id!=autresTeddies[i]){
        let autresProduits='<article>'+
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
    let carousel = document.getElementById('lesautres');
    carousel.innerHTML+= autresProduits;

    }
}
        
        // Ajout du titre et du contenu de chaque article
        var conteneurElt = document.createElement("article");
        var lienElt = document.createElement("a");        
        var imgElt = document.createElement('img');        
        var nameElt = document.createElement("h2");
        var descriptionElt = document.createElement("p");
        var idElt = document.createElement("p");
        var qteElt = document.createElement("div");
        var couleurElt= document.createElement("div");
        var couleurLabelElt=document.createElement("label");
        var couleurSelectElt=document.createElement("select");
       
        conteneurElt.classList.add("col-sm-6");
        imgElt.classList.add("portrait");
        imgElt.src=teddy.imageUrl;
        nameElt.textContent = teddy.name;
        qteElt.innerHTML='<label for="q">Quantité: </label><select id="qt" name="q"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><button type="button" class="add-to-cart" data-id='+ teddy._id +' data-name='+ teddy.name +' data-price='+ teddy.price +' data-url="produit.html?id='+ teddy._id+'">Ajouter au panier</button>';
        couleurSelectElt.classList.add("choixcouleurs");
        teddyCouleurs.forEach(function(element){
            var choixCouleurElt=document.createElement("option");
            choixCouleurElt.innerHTML=element;
            couleurSelectElt.appendChild(choixCouleurElt);
        });
        descriptionElt.textContent = teddy.description;
        idElt.textContent ="Référence : " + teddy._id;
        lienElt.href='produit.html?id=' + teddy._id;

        teddyElt.appendChild(conteneurElt);
        conteneurElt.appendChild(lienElt);           
        lienElt.appendChild(imgElt);        
        lienElt.appendChild(nameElt);
        conteneurElt.appendChild(descriptionElt);
        conteneurElt.appendChild(idElt);
        conteneurElt.appendChild(qteElt);
        conteneurElt.appendChild(couleurElt);
        couleurElt.appendChild(couleurLabelElt);
        couleurElt.appendChild(couleurSelectElt);


    
    }

});
        */