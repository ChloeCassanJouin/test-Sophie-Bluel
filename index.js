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
const isLogged = token ? true : false;


//affichage mot login ou logout
function loggedState() {
    if(isLogged) { 
    logLink.textContent = "logout";
    }
    return
}
loggedState()


//suppression du token dans le localStorage selon login ou logout
function logLinkRoad() {
    logLink.addEventListener('click', function () {
        if (isLogged) {
            localStorage.removeItem("token");
            window.location.href = "../../FrontEnd/index.html";
        } else { 
            window.location.href = "../../FrontEnd/assets/HTML/login.html";
        }
    });
}
logLinkRoad()


//affichage boutons filtre catégories
function generateCategories(architectButtons) {
    const projectsByCategory = {};
    architectButtons.forEach(category => {
    projectsByCategory[category.name] = architectProjects.filter(project => project.category.name === category.name);
    });
    if(isLogged === true) {
        buttonAll.remove();
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
    buttonAll.addEventListener('click', function() { // bouton tous
    });
}


//affichage gallerie
function generateProjets(projects) {
    projects.forEach(project => {
        const projectElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = project.title;

        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement);
        mainGallery.appendChild(projectElement);
    }); 
}
generateProjets(architectProjects);
generateCategories(architectButtons);
