/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/


//  * Cette fonction affiche dans la console le score de l'utilisateur
//  * @param {number} score : le score de l'utilisateur
//  * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let baliseScore = document.querySelector(".score")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    baliseScore.innerText = affichageScore
}

function afficherProposition(proposition) {
    let baliseZoneProposition = document.querySelector("#zoneProposition")
    baliseZoneProposition.innerText = proposition
    if (proposition === undefined){
        baliseZoneProposition.innerText = "Le jeu est fini"
    }
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction va tester si le champ nom est correctement rempli. 
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le champ nom doit contenir au moins 2 caracteres. ")
    }
}

/**
 * Cette fonction va tester si le champ email est correctement rempli. 
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
}

function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/*
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
    
}

// Cette fonction lance le minuteur
function demarrerMinuteur(duree) {
    let minutes, secondes;
    clearInterval(intervalle)

    intervalle = setInterval(function() {
        minuteurElement.textContent = "";
        minutes = parseInt(duree / 60, 10);
        secondes = parseInt(duree % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;

        minuteurElement.textContent = minutes + ":" + secondes;

        if (--duree < 0) {
            clearInterval(intervalle);
            minuteurElement.textContent = "Temps écoulé!";
        }
    }, 1000);
}

function stopMinuteur (){
    clearInterval(intervalle)
}

function relancerChrono (niveauChoisi){
    if (niveauChoisi === "1") {
        stopMinuteur()
        minuteurElement.textContent = "∞Temps illimité∞";
    } else if (niveauChoisi === "2"){
        // on met un chrono de 20 secondes
        stopMinuteur()
        demarrerMinuteur(20)
    } else if (niveauChoisi === "3"){
        // on met un chrono de 20 secondes
        stopMinuteur()
        demarrerMinuteur(10)
    }
}

// Cette fonction definit le chrono dans la zone dediee en fonction du choix du niveau
// function definirMinuteur() {
//     let choixNiveau = document.querySelectorAll(".zoneChoixNiveau input")
//     for (let j = 0; j < choixNiveau.length; j++) {
//         choixNiveau[j].addEventListener("change", (event) => {
//             // Si c'est le premier élément qui a été modifié, alors le
//             // temps de jeu sera illimité. 
//             if (event.target.value === "1") {
//                 minuteurElement.textContent = "∞Temps illimité∞";
//             } else if (event.target.value === "2"){
//                 // on met un chrono de 20 secondes
//                 demarrerMinuteur(20)
//             } else if (event.target.value === "3"){
//                 // on met un chrono de 20 secondes
//                 demarrerMinuteur(10)
//             }
//         })
//     }

// }


/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    let score = 0
    let i = 0
    let listeProposition = listeMots
    let niveau

    let boutonValidation = document.querySelector("#boutonValidation")
    let baliseZoneSaisie = document.querySelector("#zoneSaisie")

    afficherProposition(listeMots[i])


    // Gestion du choix de niveau et changement de chrono
    let choixNiveau = document.querySelectorAll(".zoneChoixNiveau input")
    for (let j = 0; j < choixNiveau.length; j++) {
        choixNiveau[j].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors le
            // temps de jeu sera illimité. 
            if (event.target.value === "1" && 
                minuteurElement.textContent !== "Le jeu est fini") {
                niveau = "1"
                stopMinuteur()
                minuteurElement.textContent = "∞Temps illimité∞";
            } else if (event.target.value === "2" &&
                minuteurElement.textContent !== "Le jeu est fini"){
                // on met un chrono de 20 secondes
                niveau = "2"
                stopMinuteur()
                demarrerMinuteur(20)
            } else if (event.target.value === "3" && 
                minuteurElement.textContent !== "Le jeu est fini"){
                // on met un chrono de 20 secondes
                niveau = "3"
                stopMinuteur()
                demarrerMinuteur(10)
            }
        })
    }

    // Gestion de l'événement change sur les boutons radios. 
    let inputsRadio = document.querySelectorAll(".zoneChoixRadio input")
    for (let index = 0; index < inputsRadio.length; index++) {
        inputsRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

      // Gestion de l'événement click sur le bouton "valider"
      boutonValidation.addEventListener("click", () => {
        if (baliseZoneSaisie.value === listeProposition[i] 
            && minuteurElement.textContent !== "Temps écoulé!" ) {
            score++
            relancerChrono(niveau)
        }
        i++
        
        afficherResultat(score, i)
        baliseZoneSaisie.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            stopMinuteur()
            minuteurElement.textContent = "Le jeu est fini";
            boutonValidation.disabled = true
        } else {
            afficherProposition(listeProposition[i])
            relancerChrono(niveau)
        }
        
    })

     // Gestion de l'événement submit sur le formulaire de partage. 
     let form = document.querySelector("#form")
     form.addEventListener("submit", (event) => {
         event.preventDefault()
         let scoreEmail = `${score} / ${i}`
         gererFormulaire(scoreEmail)
     })

    afficherResultat(score, i)
    console.log(niveau)
}