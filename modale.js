//déclaration variables
const openModalBtn = document.getElementById('OpenModalBtn');
const modal = document.querySelector('.modal');
const modalGallery = document.querySelector(".modalGallery");
const closeModalBtn = document.getElementById('closeModal');
const AddProjects = document.querySelector('.addProjects');
const titleModal = document.querySelector('.titleModal');
const BtnAddProject = document.querySelector('.addProjects');
const formulaireAjoutProjetB = document.getElementById("boutonValidation");
let projetElement; // utiliser dans fonction fetch, donc inutilisable sinon

////////////////////////////////////////////////////////////////////////////////      TOKEN///////////////
const token = localStorage.getItem("token");
const isLogged = token ? true : false;// Vérifier si le token existe
console.log(isLogged); // Affiche true si un token existe, sinon false


///////////////////////////////////////////////////////////////////////////////      OUVERTURE-FERMETURE MODALE/
//ouverture modale1
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


///////////////////////////////////////////////////////////////////////////////      AFFICHAGE GALLERIE/
//récupération Gallerie modale
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    modalGallery.innerHTML = "";
    data.forEach(project => {
      projetElement = document.createElement("article");

      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.alt = project.title;

      const idProjet = document.createElement("p");
      idProjet.classList.add("js-delete-work");
      idProjet.innerText = project.id;

      // Création de l'élément <i>
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fas", "fa-trash-alt"); // Ajout des classes pour l'icône de corbeille

      // Ajout de l'élément <i> comme enfant de l'élément <p>
      idProjet.appendChild(trashIcon);

      projetElement.appendChild(imageElement);
      projetElement.appendChild(idProjet);
      modalGallery.appendChild(projetElement);
    });
    deleteWork(); // Appeler la fonction deleteWork après avoir généré tous les éléments
  });


///////////////////////////////////////////////////////////////////////////////      AFFICHAGE FORMULAIRE/
//affichage modale 2
function Make2ndModalAppear() {
  AddProjects.addEventListener("click", function() {
    titleModal.textContent = "Ajout Photos";
    modalGallery.remove();
    BtnAddProject.remove();
  });
}
Make2ndModalAppear();

//récupération des catégories dans formulaire
function fetchAndDisplayCategories() {
  fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
          const selectElement = document.getElementById('modalAddImageCategory');
          selectElement.innerHTML = ''; // Effacer les options existantes
          data.forEach(category => {
              const optionElement = document.createElement('option');
              optionElement.value = category.id;
              optionElement.textContent = category.name;
              selectElement.appendChild(optionElement);
          });
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des catégories :', error);
      });
}
fetchAndDisplayCategories();


///////////////////////////////////////////////////////////////////////////////      AJOUT PROJET/
// Ajouter un projet
async function ajoutListenerAjoutProjet() {
  formulaireAjoutProjetB.addEventListener("click", async function(event) {
      event.preventDefault();

      const token = localStorage.getItem("token");
      const photo = document.getElementById("imageUrl").files[0];
      const title = document.querySelector("input[name='title']").value;
      const category = document.querySelector("select[name='category.name']").value;
      console.log(token, photo, title, category)
      try {
          const formData = new FormData();
          formData.append('image', photo);
          formData.append('title', title);
          formData.append('category', category);

          const response = await fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              body: formData,
          });
      } catch (error) {
          console.log("Erreur :", error);
      }
  });
}
ajoutListenerAjoutProjet();


///////////////////////////////////////////////////////////////////////////////      SUPRESSION PROJET/
// click poubelle
function deleteWork() {
  let btnDeleteList = document.querySelectorAll(".js-delete-work");
  console.log(btnDeleteList)
  btnDeleteList.forEach(function(item) {
      item.addEventListener("click", function(event) {
        event.preventDefault();
        
          const projectId = this.innerText; // Récupérer l'ID du projet à partir du texte de l'élément clic
          deleteProjets(projectId); // Appeler la fonction deleteProjets avec l'ID du projet
      });
  });
}

//suppression de projets
async function deleteProjets(id) {
  // Utiliser l'ID du projet dans l'URL de l'API pour supprimer le projet
  await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${token}`},
  })
  .catch (error => {
      console.log(error);
  });
}