/*INITIALISATION ARRIVÉE DU VISITEUR*/
if (localStorage.getItem("panier") === null) {
    localStorage.setItem("panier", "vide");
    localStorage.setItem("messagePanier", "vide");
}

/*FONCTION CALCUL DU NOMBRE D'ARTICLES TOTAL DANS LE PANIER*/
function functionCalculArticlesDuPanier (panier) {
    var paniers = JSON.parse(localStorage.getItem("panier")); //Recupere le panier en local 
    var quantite = 0;
    for (let x in paniers) {
        quantite += parseInt(paniers[x].quantite);
    }

    return quantite;
}
/*FIN*/

/*FONCTION CALCUL PRIX TOTAL DU PANIER*/
function functionCalculPrixTotalDuPanier (panier) {
    var paniers = JSON.parse(localStorage.getItem("panier")); //Recupere le panier en local 
    var tableauDeComptageDesPrix = [];
    for (let x in paniers) {
        var lignePanier = paniers[x];
        tableauDeComptageDesPrix.push(lignePanier.prixAjour);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotalDuPanier = tableauDeComptageDesPrix.reduce(reducer);

    return prixTotalDuPanier;
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



function fonctionAjoutProduit (produit) {

    // recupere les donnees du formulaire, déclare les constantes 
    const Id = document.getElementById('id').value; //recupere catalogue
    const couleur = document.getElementById('couleur').value; // recupere l'option de couleurs
    const quantite = document.getElementById('quantite').value; // recupere quantité produit
    const adresseHtml = document.getElementById('adresseHtml').value; // recupere url
    const name = document.getElementById('name').value; // recupere nom du produit
    const prixUnitaire = document.getElementById('prix').value; // recupere prix du produit
    const urlImage = document.getElementById('urlImage').value; // recupere url de l'image du produit
    const description = document.getElementById('description').value; // recupere  description du produit

    //création d'un objet, class pour construire une ligne produit dans le panier:
    class ligneDuPanier {
        constructor(Id, nom, quantite, couleur, prixUnitaire, prixAjour, urlImage, description) {
            this.reference = Id;
            this.nom = nom;
            this.quantite = quantite;
            this.couleur = couleur;
            this.prixUnitaire = prixUnitaire;
            this.prixAjour = prixAjour;
            this.urlImage = urlImage;
            this.description = description
        }
    }
    // Calcul le prix si plus que 1 dans le panier  
    var prixAjour = prixUnitaire * quantite; 
   

    // Tri du panier
    if (localStorage.getItem("panier") === "vide") { //si panier vide d'origine car initialisation à null on ecrit directement dans le panier
        const ligne = new ligneDuPanier(Id, name, quantite, couleur, prixUnitaire, prixAjour, urlImage, description);
        var Panier = [];
        Panier.push(ligne); //mis en dernier dans un tableau pour panier
        localStorage.messagePanier = "Produit ajouté"; //Envoi d'un message à l'utilisateur
        localStorage.setItem("panier", JSON.stringify(Panier));
        window.location.href = adresseHtml; //Retour à la page du produit
    } else { //Mettre dans panier
        var data = JSON.parse(localStorage.getItem("panier"));


        var produitTrouve = false;
        for (let x in data) {
            if (data[x].reference == Id && data[x].couleur==couleur) {

                produitTrouve = true;

                // Augmente la quantité et le prix
                data[x].quantite++;
                data[x].prixAjour = data[x].quantite * data[x].prixUnitaire;
            }
        }

        if (!produitTrouve) {
            const ligne = new ligneDuPanier(Id, name, quantite, couleur, prixUnitaire, prixAjour, urlImage, description);
            data.push(ligne);
        }

        // Sauvegarde du panier mis à jour
        localStorage.messagePanier = "Produit ajouté";
        localStorage.setItem("panier", JSON.stringify(data));
        window.location.href = adresseHtml; // on revient à la page du produit    

    } 
    return false; //fin du else panier non vide
}

var fonctionQuantitePlus =function(){
    
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
    var paniersLocal = JSON.parse(localStorage.getItem("panier")); // on recupere le panier
    var idSacommander = [];
    for (var x = 0; x < paniersLocal.length; x++) {
        var ligneProduit = paniersLocal[x];
        idSacommander.push(ligneProduit.reference);
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
    xhttp.open("POST", "http://localhost:3000/api/teddies/order");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(commandeToSend));
    console.log(commandeToSend);
    return false;
}

/*FIN*/
/*FIN GESTION DU PANIER*/