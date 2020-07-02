
       if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 


 

        
        document.getElementById("resultatsPanier").innerHTML = 
            '<div class="messagePanierVide">'+
                '<p>Le panier est vide </p>'+
                '<p><a href="orinoco.html"> Retour à l\'accueil </a></p>'+
            '</div>';//panier vide dans index et Message
/*       document.getElementById("contactPanier").innerHTML = 
            '<article class="messagePanierVide">'+
                '<a href="orinoco.html"><i class="fas fa-camera-retro"></i></a>'+
            '</article>';//retour vers catalogue
*/

    } else { // panier NON vide
        var contenuPanier = JSON.parse(localStorage.getItem("panier")); // Récupération du  panier
        console.log(contenuPanier);

        for (let x in contenuPanier) { //Inspection du panier
            var ligneProduitPanier = contenuPanier[x]; //Recherche  ligneProduitLocal par nom
            console.log(ligneProduitPanier);
            // variation quantite - ou suppression a l'affichage
            var boutonMoins = "";

            if (ligneProduitPanier.quantite > 1) {
                boutonMoins = '<button class="boutonMoins" onclick="diminutionQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')">-1</button>';
            } else {
                boutonMoins = '<button class="boutonMoins" onclick="suppressionArticle(' + x + ')">Suppression</i></button>';
            }

            // creationligne produit
            let ligne =
                '<article class="container">'+
                    '<div class="row">'+
                    '<div class="col-sm-11">'+
                        '<a href="'+ligneProduitPanier.adresseHtml +'">'+
                            '<div class="row border">'+
                                '<div class="col-sm-4 border"><img src="' + ligneProduitPanier.image + '" title="' + ligneProduitPanier.id + '"></div>'+
                                '<div class="col-sm-4">'+
                                    '<div>' + ligneProduitPanier.nom + '</div>'+
                                    '<div><b>Couleur: </b><span id="couleurPanier">' + ligneProduitPanier.couleur + '</span></div>'+
        
                                    '<div>' + ligneProduitPanier.description + '</div>'+
                                '</div>'+
                                '<div class="col-sm-4">'+
                                    '<div><b>Prix U:</b><br/>' + ligneProduitPanier.prix / 100 + '€</div>'+
                                    '<div><b>Qté:</b><br/>' + ligneProduitPanier.quantite + '</div>'+
                                    '<div><b>Montant dû</b><br/>' + ligneProduitPanier.prixTtl / 100 + '€</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>'+
                    '<div class="col-sm-1">'+
                        '<button class="boutonPlus" onclick="ajoutQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')">+1</button>' + boutonMoins + 
                    '</div>'+
                    '</div>'+
                '</article>';



            //affichage du panier sur le html
            document.getElementById("resultatsPanier").innerHTML += ligne;
        } 
        let partieContact =
        '<article class="elementPanier">'+
                    '<form name="formContact" id="idFormContact" onsubmit="return fonctionSubmitContact()">'+
                        '<div class="element-form"><label>Nom*:</label></div>'+
                            '<div class="element-form"><label><input type="text" name="nom" id="nom" class="decoInputContact" pattern="^[A-Z]+$" maxlenght="20" placeholder="Tout en MAJUSCULE !" required></label></div>'+
                        '<div class="element-form"><label>Prénom*:</label></div>'+
                            '<div class="element-form"><label><input type="text" name="prenom" id="prenom" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]{1}[a-zçàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+$" maxlength="25" class="decoInputContact" placeholder="1 majuscule au début..." required></label></div>'+
                        '<div class="element-form"><label>Adresse*:</label></div>'+
                            '<div class="element-form"><label><input type="text" name="adresse" id="adresse" class="decoInputContact" placeholder="Numéro rue " maxlength="60" required></label></div>'+
                        '<div class="element-form">CP*:</div>'+
                            '<div class="element-form"><label><input type="text" name="codePostal" id="codePostal" class="decoInputContact" pattern="[0-9]{5}" maxlength="5" placeholder="5 chiffres !" required></label></div>'+
                        '<div class="element-form"><label>Ville*:</label></div>'+
                            '<div class="element-form"><label><input type="text" name="ville" id="ville" class="decoInputContact" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]+$" maxlength="30" placeholder="Tout en MAJUSCULE !"  required></label></div>'+
                        '<div class="element-form"><label>Email*:</label></div>'+
                            '<div class="element-form"><label><input type="email" name="mail" id="email" class="decoInputContact" placeholder="Une adresse email !"required></label></div>'+
                        '<div id="inputContact">'+
                            '<input type="hidden" name="actionPanier" value="eCommande">'+
                            '<input type="submit" value="Valider la commande" id="bouton_envoi">'+
                        '</div>'+
                    '</form>'+
                    '<p id="important">* Champ obligatoire</p>'+
        '</article>';
    document.getElementById("contactClient").innerHTML = partieContact;
    }
