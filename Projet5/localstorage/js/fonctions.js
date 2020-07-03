/*INITIALISATION ARRIVÉE DU VISITEUR*/
if (localStorage.getItem("panier") === null) {
    localStorage.setItem("panier", "vide");
    localStorage.setItem("messagePanier", "vide");
    localStorage.setItem("messageQtePanier","vide");
    localStorage.setItem("messagePrixPanier","vide");
}

/*Fonction Vider la Panier*/
var ViderPanier = function ViderPanier(){
    localStorage.getItem("panier");
    localStorage.setItem("panier","vide");
    localStorage.setItem("message", "vide");
}

function calculQtePanier(tableau){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log('test fonction calcul qte');
    console.log(tableau.reduce(reducer));
    localStorage.setItem("messageQtePanier",tableau.reduce(reducer) );
}
/*
//test fonction calcul panier dans Fonctions
function calcQte(){
    var contenuPanier = JSON.parse(localStorage.getItem("panier")); // Récupération du  panier
    var tableauQtePanier=[]; //Déclaration du tableau de calcul des quantités
    for (let x in contenuPanier) { //Inspection du panier
        var ligneProduitPanier = contenuPanier[x]; //Recherche  ligneProduitLocal par id
        
        //Calcul des quantités totales
        var ligneQtePanier=contenuPanier[x].quantite;
        console.log(ligneProduitPanier);
        console.log('Test Qte');
        console.log(ligneQtePanier);
        tableauQtePanier.push(Number(contenuPanier[x].quantite));
        console.log('affichage tableau qte panier'); 
        console.log(tableauQtePanier);
        calculQtePanier(tableauQtePanier);
        var quantiteTotale=localStorage.messageQtePanier;
        console.log('Test affichage final');
        console.log(quantiteTotale);

    }
}
*/

function calculPrixPanier(tableau){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log('test fonction calcul prix');
    console.log(tableau.reduce(reducer));
    localStorage.setItem("messagePrixPanier",tableau.reduce(reducer) );
}
/*FIN*/

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès/*
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
            var conteneurElt = document.createElement("article"); 
            var descriptionElt = document.createElement("p");
            conteneurElt.textContent="Cette référence n'existe pas !"; 
            teddyElt.appendChild(conteneurElt);  
            conteneurElt.appendChild(descriptionElt);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}





function ajoutProduitPanier(produit){
    const id= document.getElementById('id').value;
    const nom=document.getElementById('nom').value;
    const quantite=document.getElementById('quantite').value;
    const couleur=document.getElementById('couleur').value;
    const adresseHtml=document.getElementById('adresseHtml').value;
    const description = document.getElementById('description').value;
    const prix = document.getElementById('prix').value;
    const image = document.getElementById('image').value;
    var prixTtl= prix * quantite;


    class produitPanier{
        constructor(id,nom,quantite,couleur,adresseHtml,description,prix,image,prixTtl){
            this.id=id;
            this.nom=nom;
            this.quantite=quantite;
            this.couleur=couleur;
            this.adresseHtml=adresseHtml;
            this.description=description;
            this.prix=prix;
            this.image=image;
            this.prixTtl=prixTtl;
        }
    }
        if( localStorage.getItem("panier")==="vide"){
            const produit = new produitPanier(id, nom, quantite, couleur,adresseHtml,description,prix,image,prixTtl);
            var Panier=[];
            Panier.push(produit);

            localStorage.setItem("panier",JSON.stringify(Panier));
            window.location.href=adresseHtml;
        } else{
            /*2 hypothèes : -> le produit existe déjà dans le panier, on ne changera donc que la quantité de celui-ci et le prix rapporté à la quantité.
                            -> le produit est absent des produits déjà présents, il faut rajouter une ligne.
            */
        var contenuPanier=JSON.parse(localStorage.getItem("panier"));
        var produitExiste=false;
        for (let x in contenuPanier){

            if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){//1ere hypothèse

                produitExiste=true;
                let qtePanier=Number(contenuPanier[x].quantite);
                let qteAjoutee=Number(quantite);
                contenuPanier[x].quantite=qtePanier + qteAjoutee;
                contenuPanier[x].prixTtl=contenuPanier[x].quantite * contenuPanier[x].prix;
            }

        }
        if(!produitExiste){
            const produit = new produitPanier(id, nom,quantite, couleur,adresseHtml,description,prix,image,prixTtl);
            contenuPanier.push(produit);
        }
        localStorage.setItem("panier",JSON.stringify(contenuPanier));
        window.location.href=adresseHtml;
    }
    return false;
}


var ajoutQuantite = function ajoutQuantitePanier(id,couleur){

    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var produitExiste=false;
    for(let x in contenuPanier){
        console.log(contenuPanier[x]);
        if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){
            console.log(contenuPanier[x].couleur);
            produitExiste=true;
            contenuPanier[x].quantite++;
            contenuPanier[x].prixTtl=contenuPanier[x].quantite * contenuPanier[x].prix;
        }    
    }
    localStorage.setItem("panier",JSON.stringify(contenuPanier));
    console.log(contenuPanier);
    
    window.location.href="panier.html";
    
}




var diminutionQuantite = function diminutionQuantitePanier(id,couleur){
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var produitExiste=false;
    for( let x in contenuPanier){
        if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){
            produitExiste=true;
            contenuPanier[x].quantite--;
            contenuPanier[x].prixTtl=contenuPanier[x].prix * contenuPanier[x].quantite;
        }
    }
    localStorage.setItem("panier",JSON.stringify(contenuPanier));
    window.location.href="panier.html";
}

var suppressionArticle = function suppressionArticlePanier(produit){
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    if(contenuPanier.length==1){
        localStorage.removeItem("panier");
        localStorage.setItem("panier","vide");
        window.location.href="orinoco.html";
    }
    else{
        contenuPanier.splice(produit,1);
        localStorage.setItem("panier",JSON.stringify(contenuPanier));
        window.location.href="panier.html";
    }
}


var fonctionSubmitContact = function () {
    const prenom = document.getElementById('prenom').value; //recupere prenom
    const nom = document.getElementById('nom').value; //recupere nom 
    const mail = document.getElementById('email').value; //recupere email
    const ville = document.getElementById('ville').value; //recupere ville 
    const adresse = document.getElementById('adresse').value; //recupere adresse  
    const codePostal = document.getElementById('codePostal').value; //recupere codepostal

    /*format pour l'envoi*/
    class formatToSend {
        constructor(utilisateur, idSacommander) {
            this.contact = utilisateur;
            this.products = idSacommander;
        }
    }
    /*format pour l'utilisateur*/
    class formatUtilisateur {
        constructor(nom, prenom, adresse, ville, mail) {
            this.firstName = prenom;
            this.lastName = nom;
            this.address = adresse;
            this.city = ville;
            this.email = mail;
        }
    }

    /*construction de l'utilisateur*/
    const utilisateur = new formatUtilisateur(prenom, nom, adresse, ville, mail);


    /*construction de l'array avec uniquement les identifiants des produits*/
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var idSacommander = [];
    for (var x = 0; x < contenuPanier.length; x++) {
        var ligneProduit = contenuPanier[x];
        idSacommander.push(ligneProduit.id);
    }

 /*Infos=Ok==> la commande prete a envoyer*/
    const commandeToSend = new formatToSend(utilisateur, idSacommander)

    /*ENVOI*/


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var response = JSON.parse(this.responseText);
            localStorage.messagePanier = "MERCI";
            localStorage.panier = "vide";
            localStorage.setItem("confirmCommande", response.orderId);
            window.location.href = "remerciement.html"; // Vers la page de confirmation
        
        }
    }; // fin de la fonction
    console.log(commandeToSend);
    xhttp.open("POST", "http://localhost:3000/api/teddies/order");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(commandeToSend));
    return false;
}

