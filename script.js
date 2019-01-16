/*
Projet bonus : Jeu du bonhomme pendu (script)
Fait par: Nadine Pierre
Date de remise: 05/11/2018
*/


/**
 *DÉCLARATION DES VARIABLES GLOBALES
**/
let tabMots = ["abat-jour", "abdominaux", "après-midi", "attention", "babillard", "bactérie", "ballerine", "bungalow", 
				"cylindre", "césarienne", "dentiste", "deuxième", "ecchymose", "enchanteur", "endorphine", "fabriquant", 
				"faiblesse", "fraudeur", "garagiste", "géographie", "guimauve", "harmonie", "honnêteté", "identique", 
				"immeuble", "imprimante", "infraction", "interview", "japonais", "jardinage", "judicieux", "kamikaze", 
				"kangourou", "kilomètre", "lancement", "lévitation", "maintenant", "mammifère", "miniature", "naissance", 
				"nettoyant", "neuvième", "nord-ouest", "obscurité", "obsession", "pavillon", "polynôme", "préalable", 
				"quadruplex", "quelqu'un", "rabat-joie", "raccourci", "rôtisserie", "sortilège", "symptôme", "synonyme", 
				"théorème", "tonnerre", "tutoriel", "uniforme", "université", "vêtement", "volte-face", "xylophone", 
				"xénophobie", "yougoslave", "zodiaque", "zoologie"];				
let nbErreurs = 0;
let nbReussites = 0;
let MAX_ERREURS = 9;
let formLettre = document.getElementsByClassName('btnLettre');
let formMot = document.getElementsByClassName('btnMot');
let formLigne = document.getElementsByClassName('ligneMot');


/**
 *FONCTIONS
**/

/*Tirer un mot au hasard*/
function nouveauMot(){
	let index, motMystere;
	
	index = Math.floor(Math.random() * tabMots.length);
	motMystere = tabMots[index];
	
	//Insérer le mot (invisible) dans la page
	for(i = 0; i < motMystere.length; i++){
		formMot[i].value = motMystere.charAt(i);
	}
	
	return motMystere;
}

/*Logique du jeu*/
function jouer(){
	
	//Cacher les lettres du mot mystère
	for(i = 0; i < formMot.length; i++){
		formMot[i].style.visibility = "hidden";
		formMot[i].disabled = true;
	}
	
	//Récupérer le mot mystère et retirer les accents
	let mot = nouveauMot();
	let motSansAccents = mot.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	
	//Si le mot contient un trait d'union ou un apostrophe, afficher le(s) symbole(s)
	for(i = 0; i < mot.length; i++){
		if(mot.indexOf("-") != -1 || mot.indexOf("'") != -1){
			if(mot.charAt(i) == "-" || mot.charAt(i) == "'"){
				formMot[i].style.visibility = "visible";
				formMot[i].style.color = "#0b2128";
				nbReussites++;
			}
		}
	}
	
	//Ajouter les lignes en dessous des lettres
	for(i = 0; i < mot.length; i++){
		formLigne[i].style.visibility = "visible";
	}
		
	
	//Ajouter un event listener aux boutons de lettres
	for(i = 0; i < formLettre.length; i++){
		/* Fonction anonyme qui gère les clics sur les lettres*/
		formLettre[i].addEventListener("click", function(e){
			
			//Récupérer la lettre du bouton
			let lettre = e.target.value.toLowerCase();
			e.stopPropagation;
			
			//Désactiver le bouton choisi
			for(i = 0; i < formLettre.length; i++){
				if(formLettre[i].value.toLowerCase() === lettre){
					formLettre[i].disabled = true;
					formLettre[i].style.backgroundColor = "#c4e5ee";
				}
			}
			
			//Vérifier si la lettre est dans le mot mystère
			if(motSansAccents.indexOf(lettre) != -1){
				document.getElementById("message").innerHTML = "Très bien !";
				document.getElementById("message").style.color = "#153914";
				//Afficher les lettres
				for(i = 0; i < motSansAccents.length; i++){
					if(motSansAccents.charAt(i) == lettre){
						nbReussites++;
						formMot[i].style.visibility = "visible";
						formMot[i].style.color = "#0b2128";
					}
				}
			}
			else{
				nbErreurs++;
				document.getElementById("imagePendu").src = "images/pendu_" + nbErreurs + ".jpg";
				document.getElementById("message").innerHTML = "Il vous reste " + (MAX_ERREURS - nbErreurs) + " essais.";
				document.getElementById("message").style.color = "red";
			}
			
			//Contrôler l'arrêt du jeu
			if(nbErreurs == MAX_ERREURS - 1){
				document.getElementById("message").innerHTML = "Attention ! C'est votre dernière chance !";
				document.getElementById("message").style.color = "red";
			}
			else if(nbErreurs == MAX_ERREURS){
				document.getElementById("message").innerHTML = "Désolé...vous avez perdu. Le mot était " + mot + ".";
				document.getElementById("message").style.color = "red";
				for(i = 0; i < formLettre.length; i++){
					formLettre[i].disabled = true;
				}
			}
			else if(nbReussites == mot.length){
				document.getElementById("message").innerHTML = "Bravo ! Vous avez trouvé le mot !";
				document.getElementById("message").style.color = "#153914";
				for(i = 0; i < formLettre.length; i++){
					formLettre[i].disabled = true;
				}
			}
		});
	}
}






