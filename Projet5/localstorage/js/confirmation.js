/*CONFIRMATION ET RETOUR CATALOGUE*/
if (localStorage.confirmCommande !== "KO") {


    document.getElementById("confirmation").innerHTML =
        '<div class="messageConfirmationCommande">'+
            '<p>Votre commande n° ' + localStorage.confirmCommande + ' a bien été prise en compte pour un montant total de '+localStorage.messagePrixPanier/100+' €</p>'+

            '<p>Merci encore pour votre commande</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</div>';
} else {
    document.getElementById("confirmation").innerHTML =
        '<div class="messageConfirmationCommande">'+
            '<p>Un problème technique vient de survenir, merci de réitérer votre commande dans quelques instants</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</div>';
}
/*FIN*/