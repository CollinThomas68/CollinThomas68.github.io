
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
        var produitsLocal = JSON.parse(localStorage.getItem("panier")); // Récupération du  panier
        console.log(produitsLocal);

        for (let x in produitsLocal) { //Inspection du panier
            var ligneProduitLocal = produitsLocal[x]; //Recherche  ligneProduitLocal par nom
            console.log(ligneProduitLocal);
            // variation quantite - ou suppression a l'affichage
            var signeMoinsPanier = "";
            var plusOuMoins = String("moins");
            if (ligneProduitLocal.quantite > 1) {
                signeMoinsPanier = '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionQuantiteMoins(\'' + ligneProduitLocal.reference + '\')">-1</button></div>';
            } else {
                signeMoinsPanier = '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionDelete(' + x + ')">Suppression</i></button></div>';
            }

            // creationligne produit
            let ligne =
                '<article class="container">'+
                    '<div class="row">'+
                        '<div class="col-sm-4"><img src="' + ligneProduitLocal.image + '" title="' + ligneProduitLocal.id + '"></div>'+
                        '<div class="col-sm-4">'+
                            '<div>' + ligneProduitLocal.nom + '</div>'+
                            '<div><b>Couleur: </b>' + ligneProduitLocal.couleur + '</div>'+
 
                            '<div>' + ligneProduitLocal.description + '</div>'+
                        '</div>'+
                        '<div class="col-sm-4">'+
                            '<div><b>Prix U:</b><br/>' + ligneProduitLocal.prix / 100 + '€</div>'+
                            '<div><b>Qté:</b><br/>' + ligneProduitLocal.quantite + '</div>'+
                            '<div><b>Montant dû</b><br/>' + ligneProduitLocal.prixTtl / 100 + '€</div>'+
                        '</div>'+
                        '<div>'+
                        '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionQuantitePlus(\'' + ligneProduitLocal.reference + '\')">+1</button></div>' + signeMoinsPanier + '</div>'+
                    '</div>'+
                '</article>';



            //affichage du panier sur le html
            document.getElementById("resultatsPanier").innerHTML += ligne;
        } // fin for produilocal
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
