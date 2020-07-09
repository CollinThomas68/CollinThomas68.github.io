
     
     
     if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 


 

        document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket"></i>';
        document.getElementById("detailPanier").innerHTML = 
            '<article class="row">'+
                '<div class="col-12">'+
                    '<p>Le panier est vide </p>'+
                    '<p><a href="orinoco.html"> Retour à l\'accueil </a></p>'+
                '</div>'+
            '</article>';
        document.getElementById("contactClient").innerHTML =
        '<div>'+'</div>';

    } else { // panier NON vide
        var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
        document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket"></i><span>'+quantitePanier+'</span>' ;
        var contenuPanier = JSON.parse(localStorage.getItem("panier")); // Récupération du  panier
        console.log(contenuPanier);
        var tableauPrixPanier=[];//Déclaration du tableau de calcul des prix

        for (let x in contenuPanier) { //Inspection du panier
            var ligneProduitPanier = contenuPanier[x]; //Recherche  ligneProduitLocal par id

            //Calcul du prix Total
            var lignePrixPanier=contenuPanier[x].prixTtl;
            tableauPrixPanier.push(Number(contenuPanier[x].prixTtl));
            calculPrixPanier(tableauPrixPanier);
            var prixTotal=localStorage.messagePrixPanier;
            console.log('Test affichage final');
            console.log(prixTotal);

            //Calcul du prix total

            // variation quantite - ou suppression a l'affichage
            var boutonMoins = "";

            if (ligneProduitPanier.quantite > 1) {
                boutonMoins = '<button class="boutonMoins" onclick="diminutionQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')">-1</button>';
            } else {
                boutonMoins = '<button class="boutonMoins" onclick="suppressionArticle(' + x + ')">Suppression</i></button>';
            }

            // creationligne produit
            let ligne =
                '<article class="row borderTest">'+
                    '<div class="col-md-10">'+
                        '<a href="'+ligneProduitPanier.adresseHtml +'">'+
                            '<div class="row">'+
                                '<div class="col-md-6 border"><img src="' + ligneProduitPanier.image + '" title="' + ligneProduitPanier.id + '"></div>'+
                                '<div class="col-md-3">'+
                                    '<div>' + ligneProduitPanier.nom + '</div>'+
                                    '<div><b>Couleur: </b><span id="couleurPanier">' + ligneProduitPanier.couleur + '</span></div>'+
        
                                    '<div>' + ligneProduitPanier.description + '</div>'+
                                '</div>'+
                                '<div class="col-md-3">'+
                                    '<div><b>Prix U:</b><br/>' + ligneProduitPanier.prix / 100 + '€</div>'+
                                    '<div><b>Qté:</b><br/>' + ligneProduitPanier.quantite + '</div>'+
                                    '<div><b>Montant dû</b><br/>' + ligneProduitPanier.prixTtl / 100 + '€</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                        '<button class="boutonPlus" onclick="ajoutQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')">+1</button>' + 
                        boutonMoins + 
                    '</div>'+
                '</article>';


            //affichage du panier sur le html
            document.getElementById("detailPanier").innerHTML += ligne;
            
            
            var quantiteTotale=localStorage.messageQtePanier;
            let recapTTL="";
            if(quantiteTotale>1){
                recapTTL=
                '<article class="row borderTest text-center">'+
                '<h2 class="col-12">Récapitulatif de votre commande</h2>'+
                '<div id="qteTotale" class="col-sm-6"><span>Votre panier contient '+quantiteTotale + ' articles</span></div>'+
                '<div id="prixTotal" class="col-sm-6"><span>Le montant total de votre commande s\'élève à '+ prixTotal/100 + '€</span></div>'+
                '</article>';
            }else{
                recapTTL=
                '<article class="row borderTest text-center">'+
                '<h2 class="col-12">Récapitulatif de votre commande</h2>'+
                '<div id="qteTotale" class="col-sm-6"><span>Votre panier contient '+quantiteTotale + ' article</span></div>'+
                '<div id="prixTotal" class="col-sm-6"><span>Le montant total de votre commande s\'élève à '+ prixTotal/100 + '€</span></div>'+
                '</article>';               
            }
                        
            document.getElementById("totauxPaniers").innerHTML = recapTTL;

        } 

        let partieContact =
        '<article class="row">'+
                    '<form name="formContact" id="idFormContact" onsubmit="return envoiCommande()" class="col-12">'+
                        '<div class="element-form"><label>Nom*:</label><label><input type="text" name="nom" id="nom" pattern="^[A-Z\' ]+$" maxlenght="20" placeholder="Tout en MAJUSCULE !" required></label></div>'+
                        '<div class="element-form"><label>Prénom*:</label><label><input type="text" name="prenom" id="prenom" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]{1}[a-zçàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+$" maxlength="25" placeholder="1 majuscule au début..." required></label></div>'+
                        '<div class="element-form"><label>Adresse*:</label><label><input type="text" name="adresse" id="adresse" placeholder="Numéro rue " maxlength="60" required></label></div>'+
                        '<div class="element-form"><label>CP*:</label><label><input type="text" name="codePostal" id="codePostal" pattern="[0-9]{5}" maxlength="5" placeholder="5 chiffres !" required></label></div>'+
                        '<div class="element-form"><label>Ville*:</label><label><input type="text" name="ville" id="ville" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]+$" maxlength="30" placeholder="Tout en MAJUSCULE !"  required></label></div>'+
                        '<div class="element-form"><label>Email*:</label><label><input type="email" name="mail" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" placeholder="Une adresse email !"required></label></div>'+
                        '<div id="inputContact">'+

                            '<input type="submit" value="Valider la commande" id="bouton_envoi">'+
                        '</div>'+
                    '</form>'+
                    '<p id="important">* Champ obligatoire</p>'+
        '</article>';
    document.getElementById("contactClient").innerHTML = partieContact;
    }
