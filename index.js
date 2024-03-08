
import { ajoutListenerAjoutProjet } from "./modale.js";
//quand clique logout, on est renvoyé sur la page d'accueil avec login

/*
question: pourquoi changement de couleur autour des projets selon organisation code?
-type=module (index.html)
*/

const response = await fetch('http://localhost:5678/api/works');
const architectProjects = await response.json();
const responseCategories = await fetch('http://localhost:5678/api/categories');
const architectButtons = await responseCategories.json();
const sectionButtons = document.querySelector(".buttonsFilter");
const buttonAll = document.querySelector(".btn-filter_all");
const mainGallery = document.querySelector(".mainGallery");
const ModalBtn = document.getElementById("OpenModalBtn");
const logLink = document.getElementById("logLink");


// Récupérer le token depuis le stockage local
const token = localStorage.getItem("token");
const isLogged = token ? true : false;// Vérifier si le token existe
console.log(isLogged); // Affiche true si un token existe, sinon false



//affichage login ou logout
function loggedState() {
    if(isLogged === true) { // affichage conditionnel / token
    logLink.textContent = "logout";
    }
    if(isLogged === false)
        return
}
loggedState()

function logLinkRoad() {
    logLink.addEventListener('click', function () {
        if (isLogged === true) {
            console.log("je suis là") 
            localStorage.removeItem("token"); // Supprimer le token du localStorage
            // Rediriger vers la page d'accueil par exemple
            window.location.href = "../../FrontEnd/index.html";
        } else { 
            // Rediriger vers la page de connexion
            window.location.href = "../../FrontEnd/assets/HTML/login.html";
        }
    });
}
logLinkRoad()

//affichage boutons filtre catégories
function genereCategories(architectButtons) {
    const projectsByCategory = {};
    architectButtons.forEach(category => {
    projectsByCategory[category.name] = architectProjects.filter(project => project.category.name === category.name);
    });
    if(isLogged === true) {
        buttonAll.remove();
        
         // affichage conditionnel / token
    }
    if(isLogged === false) {
        ModalBtn.remove();
        sectionButtons.innerHTML = '';
    architectButtons.forEach(category => {
        const projectCategoriesElement = document.createElement("button");
        projectCategoriesElement.classList.add("buttonHighlight");
        projectCategoriesElement.textContent = category.name;
        projectCategoriesElement.addEventListener('click', function () {
            genereProjets(projectsByCategory[category.name]);
        });
        sectionButtons.appendChild(projectCategoriesElement); 
    });
    }
buttonAll.addEventListener('click', function() {
genereProjets(architectProjects);
});
}


//affichage projets
function genereProjets(projects) {
    projects.forEach(project => {
        const projetElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = project.title;

        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
        mainGallery.appendChild(projetElement);
    }); 
}
genereProjets(architectProjects);
genereCategories(architectButtons);


//affichage rajout projet
const reponse = await fetch('http://localhost:5678/api/works');
const projetAjouté = await reponse.json();
ajoutListenerAjoutProjet()

/* 
1-récupération du token
2-déclarer token true
3-si true = modif page 
4-sinon false
1-verif token
2-si token true - sinon false
3- affichage en consequence (affichage conditionnel)
*/