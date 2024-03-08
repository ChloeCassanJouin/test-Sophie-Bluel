/*
-Attention border radius modale

[ressource tutoriel modale Grafikart]
[ressource utilisation des objets FormData]
[ressource Créez un nouvel élément dans une page web]

La modale n'est accessible que si Sophie Bluel est login.
Alors le bouton "modifier" apparait (avec icône) (a la place des boutons de filtre)
la modale apparait au clic du bouton 
modale1 contient: croix de fermeture / titre / photos projets / poubelle de suppression / barre horizontale / bouton "ajouter une photo"
lors du clic sur bouton "ajouter une photo" le contenu de la modale1 change
POSSIBILITE DE SUPPRESSION DE PROJETS (suppression visible dans la modale ET sur page ppale ET définitive de l'API - action à mettre en place APRES l'action d'ajout de projets) - requete fetch
Important: on ne devra pas avoir besoin de recharger la page pour voir que le projet a été supprimé. (comment retirer des éléments du DOM apres conf suppression de l'entrée en BDD)
modale2 contient: fleche de retour / croix de fermeture / titre / cadre gris avec image-bouton "+ajouter photo"+phrase / titre / zone de texte / titre / menu deroulant / barre horizontale : bouton "valider" NON ACTIF
la modale2 a pour condition de ne pouvoir activer le bouton "valider" que si le formulaire complet (photo + titre + catégorie)
POSSIBILITE D'AJOUT DE PROJETS visible dans la modale ET sur page ppale (au rechargement de la page?) ET dans l'API (requete fetch)  - actualisation du DOM sans recharge page
verif réponse API pour ajout projet
Alors le bouton "valider" est actif
Un message d'erreur doit apparaitre si le formulaire n'est pas correctement rempli - vérifier le comportement du formulaires si données erronées.
Vérifier la MAJ de l'interface et sa gestion quand ajout ou suppression éléments du DOM
La modale doit pouvoir se fermer au clic de la croix ou à l'extérieur de la modale
Il est important s'assurer que quel que soit le nombre de fois que la modale est ouverte ou fermée, une seule modale reste présente dans le code source.
*/

//déclaration variables
const openModalBtn = document.getElementById('OpenModalBtn');
const modal = document.querySelector('.modal');
const modalGallery = document.querySelector(".modalGallery");
const closeModalBtn = document.getElementById('closeModal');
const AddProjects = document.querySelector('.addProjects');
const titleModal = document.querySelector('.titleModal');
const BtnAddProject = document.querySelector('.addProjects');
const modal2 = document.querySelector('.modalAdditionContainer')
let projetElement; // utiliser dans fonction fetch, donc inutilisable sinon


const openModal = function (event) {
  event.preventDefault()
}

//ouverture modale
openModalBtn.addEventListener("click", function() {
  modal.style.display = "flex";
});

//fermeture modale
closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});
// Fermeture de la modale en cliquant en dehors
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// ouverture gallerie Modale 
fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
  modalGallery.innerHTML = "";
  data.forEach(project => {
    projetElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;

    projetElement.appendChild(imageElement);
    modalGallery.appendChild(projetElement);
    generateTrashIcon(); // permet l'apparition d'un icone a chaque nouveau projet créé
  });
});

//affichage des trashbIcons
function generateTrashIcon() {
  const trashIcon = document.createElement("span");
  trashIcon.classList.add("trash-icon");
  trashIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
  projetElement.appendChild(trashIcon);
}


//affichage modale 2
function Make2ndModalAppear() {
  AddProjects.addEventListener("click", function() {
    console.log("j'ai bien cliqué");
    titleModal.textContent = "Ajout Photos";
    modalGallery.remove();
    BtnAddProject.remove();
  });
}

Make2ndModalAppear();

//soumettre formulaire ajout de projets
export function ajoutListenerAjoutProjet() {
  const formulaireAjoutProjet = document.querySelector(".formulaireAjoutProjet");
  formulaireAjoutProjet.addEventListener("submit", function (event) {
    event.preventDefault();
    const photo = event.target.querySelector("#imageUrl").files[0];
    if (!photo) {
      // Gérer le cas où aucune photo n'est sélectionnée
      console.error("Veuillez sélectionner une photo.");
      return;
    }
    const projetAjoute = {
      titre: event.target.querySelector("input[name='title']").value, // Utiliser input[name='titre']
      categorie: event.target.querySelector("select[name='categoryID']").value, // Utiliser [name='categorie']
      photo: photo,
    };
    const chargeUtile = JSON.stringify(projetAjoute);
    console.log(projetAjoute);
    fetch("http://localhost:5678/api/works", { 
      method: "POST", // Protocole HTTP
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: chargeUtile 
    });
  });
}
/*//rajout de projets
const AddProjects = await fetch('http://localhost:5678/api/works', { 
method: "POST",//protocole HTTP
headers: { 
  "Content-Type": "application/json", 
}, // format charge utile
body: JSON.stringify(??), //charge utile
});
*/



//suppression projet
/*trashIcon.addEventListener("click", function() {
  projetElement.remove();
  const imageIndex = Array.from(mainGallery.children).indexOf(projetElement);
    if (imageIndex !== -1) {
      mainGallery.removeChild(mainGallery.children[imageIndex]);
    }
});
*/