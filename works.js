//import { loginSubmit } from "./login.js";

const response = await fetch('http://localhost:5678/api/works');
const architectProjects = await response.json();
const responseCategories = await fetch('http://localhost:5678/api/categories');
const architectButtons = await responseCategories.json();
const sectionButtons = document.querySelector(".buttonsFilter");
const buttonAll = document.querySelector(".btn-filter_all");


document.addEventListener("DOMContentLoaded", function() {
    login(user);
});


const projectsByCategory = {};
architectButtons.forEach(category => {
    projectsByCategory[category.name] = architectProjects.filter(project => project.category.name === category.name);
});


function genereCategories(architectButtons) {
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


export const mainGallery = document.querySelector(".mainGallery");

   
function genereProjets(projects) {
    mainGallery.innerHTML = "";
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


buttonAll.addEventListener('click', function() {
    genereProjets(architectProjects);
});

