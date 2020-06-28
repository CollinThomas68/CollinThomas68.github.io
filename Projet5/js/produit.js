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




ajaxGet(`http://localhost:3000/api/teddies/${id}`, function (reponse) {
    // Récupère le contenu en fonction de l'id de la page
    var teddy = JSON.parse(reponse);
    var teddyCouleurs= teddy.colors;
    var nbCouleurs=teddyCouleurs.length;
    console.log(teddy);
    console.log(teddy.name);
    console.log('Attention début du test');

    console.log('Attention fin du test');
    console.log(teddyCouleurs);
    console.log(nbCouleurs);
    if(id==teddy._id){

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
        qteElt.innerHTML='<label for="q">Quantité: </label><select id="qt" name="q"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><button type="button" class="add-to-cart" data-id='+ teddy._id +' data-name='+ teddy.name +' data-price='+ teddy.price +' data-url="produit.html?id='+ teddy._id+'">Ajouter au panier</button></form>';

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
