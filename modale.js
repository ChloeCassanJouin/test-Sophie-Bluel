const openModalBtn = document.getElementById('OpenModalBtn');
const modal = document.querySelector('.modal');
const modalGallery = document.querySelector(".modalGallery");
const closeModalBtn = document.getElementById('closeModal');
const arrowModal = document.querySelector(".fa-arrow-left");
const titleModal = document.querySelector('.titleModal');
const Modal1SuppressProject = document.querySelector('.Modal1SuppressProject')
const BtnAddProject = document.querySelector('.addProjectsBtn');
const arrowBackToModale1 = document.querySelector('.arrowBackToModale1')
const greySquareModale2 = document.querySelector("greySquareModale2");
const formAddProject = document.getElementById("formAddProject");
const imageUrlupload = document.getElementById("imageUrl");
const mountainIconContainer = document.querySelector("mountainIconContainer");
const inputFieldsForm = document.querySelectorAll(".formField");
const formBtn = document.getElementById("boutonValidation");//bouton validation formulaire ajout
const popup = document.querySelector(".popup");
let projectElement; // utiliser dans fonction fetch

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
// commentaire test

///////////////////////////////////////////////////////////////////////////////      AFFICHAGE GALLERIE/
//récupération Gallerie modale
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    modalGallery.innerHTML = "";
    formAddProject.style.display = "none";
    data.forEach(project => {
      projectElement = document.createElement("article");

      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.alt = project.title;

      const idProjet = document.createElement("div");
      idProjet.classList.add("js-delete-work");
      idProjet.innerText = project.id;

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fas", "fa-trash-alt"); 

      idProjet.appendChild(trashIcon);

      projectElement.appendChild(idProjet);
      projectElement.appendChild(imageElement);
      modalGallery.appendChild(projectElement);
    });
    deleteWork(); // Appeler la fonction deleteWork après avoir généré tous les éléments
  });



///////////////////////////////////////////////////////////////////////////////      AFFICHAGE FORMULAIRE/
//affichage modale 2
function Make2ndModalAppear() {
  BtnAddProject.addEventListener("click", function() {
    titleModal.textContent = "Ajout photo";
    Modal1SuppressProject.style.display = "none";
    formAddProject.style.display= "flex";
    arrowModal.style.display= "flex";

  });
}
Make2ndModalAppear();

// faire réapparaître Modal1SuppressProject au click fleche
function ArrowBackToModale1() {
  arrowBackToModale1.addEventListener("click", function() {
        titleModal.textContent = "Galerie photo";
        formAddProject.style.display = "none";
        Modal1SuppressProject.style.display = "block";
    });
}
ArrowBackToModale1();

//vérification Formulaire modale 2
function verifyFormAddProjectModal2() {
  const imageAddProjectModal2 = document.getElementById("imageUrl").value;
  const titleAddProjectModal2 = document.querySelector("ModalAddProjectTitleCase").value;
  const categoryAddProjectModal2 = document.getElementById("modalAddImageCategory").value;

  if (imageAddProjectModal2 === '' || titleAddProjectModal2 === '' || categoryAddProjectModal2 === '') {
    alert('Veuillez remplir tous les champs du formulaire');
    return false;
  }
  return true;
}


///////////////////////////////////////////////////////////////////////////////    STRUCTURE FORMULAIRE AJOUT PROJET/
//récupération des catégories dans formulaire
function fetchAndDisplayCategories() {
  fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
          const selectElement = document.getElementById('modalAddImageCategory');
          selectElement.innerHTML = ''; // Effacer les options existantes

          const blankOption = document.createElement('option');
            blankOption.value = ''; // La valeur vide
            blankOption.textContent = ''; // Texte affiché
            selectElement.appendChild(blankOption);

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




//********************************************************** */ Afficher la miniature de l'image dans la deuxième modale
function previewFile() {
  imageUrlupload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const file_reader = new FileReader();
      console.log(file, file_reader)

      file_reader.readAsDataURL(file);

      file_reader.onload = function() {
          /*const existingImage = document.getElementById('image_selected');
          if (existingImage) {
              existingImage.remove();
          }*/
          const image_element = document.createElement('img');
          image_element.id = "image_selected";
          image_element.src = file_reader.result;

          greySquareModale2.appendChild(image_element);
      };
  });
}
previewFile()

/*function previewFile() {
  imageUrlupload.addEventListener('change', previewFile);
  if (this.files.length === 0) { 
    return;
  }
  console.log(this.files[0].name);
  /*const file = this.files[0];
  const file_reader = new FileReader();

  file_reader.readAsDataURL(file);

  file_reader.addEventListener('load', (event) => displayImage(event, file));
//previewFile();


function displayImage(event, file) {
  greySquareModale2.remove();
  const figure_element = document.createElement('figure');
  figure_element.id = "image_selected";
  const image_element = document.createElement('img');
  image_element.src = event.target.result;
}
*/


//popup
function showPopupAlertAddProject(message) {
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popupContent.innerHTML = `<p>${message}</p>`;

  popup.appendChild(popupContent);
  popup.style.display = "block";


document.addEventListener("click", closePopup);

function closePopup(event) {
  if (!popup.contains(event.target)) {
    popupContent.remove();
    popup.style.display = "none";
    document.removeEventListener("click", closePopup);
  }
}
}

//changement couleur bouton VALIDER formulaire ajout projet
inputFieldsForm.forEach(field => {
  field.addEventListener('input', () => {
    const isFormValid = Array.from(inputFieldsForm).every(field => field.value.trim() !== ''); 

    if (isFormValid) {
      formBtn.classList.add('active');
  } else {
    formBtn.classList.remove('active');
  }

  });
});

///////////////////////////////////////////////////////////////////////////////    AJOUT PROJET - ENVOI API/
// Ajouter un projet - formulaire bien rempli
async function ajoutListenerAjoutProjet() {
  formBtn.addEventListener("click", async function(event) {
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

          if (response.status === 400 || response.status === 500) {
              showPopupAlertAddProject("Veuillez remplir tous les champs du formulaire.");
              return;
          }
      } catch (error) {
          console.log(error);
      }
  });
}
ajoutListenerAjoutProjet()

////////////////////////////////////////////////////////////////////////////////////      SUPRESSION PROJET/
// click poubelle
function deleteWork() {
  let btnDeleteList = document.querySelectorAll(".js-delete-work");
  console.log(btnDeleteList)
  btnDeleteList.forEach(function(item) {
      item.addEventListener("click", function(event) {
          event.preventDefault(); 
          const projectId = this.innerText; 
          deleteProjets(projectId); 
      });
  });
}

//suppression de projets
async function deleteProjets(id) {
  await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${token}`},
  })
  .catch (error => {
      console.log(error);
  });
}

