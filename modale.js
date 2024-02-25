//déclaration variables
const openModalBtn = document.getElementById('OpenModalBtn');
const modal = document.querySelector('.modal');
const modalGallery = document.querySelector(".modalGallery");
const closeModalBtn = document.getElementById('closeModal');
const AddProject = document.querySelector('.addProjects')
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

//rajout de projet
function AddNewProjectModale() {
  modalGallery.innerHTML ="";
}
//suppression projet
/*trashIcon.addEventListener("click", function() {
  projetElement.remove();
  const imageIndex = Array.from(mainGallery.children).indexOf(projetElement);
    if (imageIndex !== -1) {
      mainGallery.removeChild(mainGallery.children[imageIndex]);
    }
});*/
