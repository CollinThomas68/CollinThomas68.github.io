/*CONFIRMATION ET RETOUR CATALOGUE*/
if (localStorage.confirmCommande !== "KO") {
    document.getElementById("confirmation").innerHTML =
        '<div class="messageConfirmationCommande">'+
            '<p>Confirmation de votre commande n° ' + localStorage.confirmCommande + '</p>'+
            '<p>A bientôt</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</div>';
} else {
    document.getElementById("confirmation").innerHTML =
        '<div class="messageConfirmationCommande">'+
            '<p>Désolé mais nous rencontrons un problème. Veuillez réssayer dans quelques instants</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</div>';
}
/*FIN*/