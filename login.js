const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");
const loginEmailError = document.querySelector(".loginEmailError"); 
const loginPasswordError = document.querySelector(".loginPasswordError"); 
const popup = document.querySelector(".popup");

submit.addEventListener("click", function (event) {
  event.preventDefault(); // blocage comportement par défaut
  clearAlerts();
  const user = {
    email: emailInput.value,
    password: passwordInput.value
  };
  VerifID(user);
  login(user);
});

function VerifID(user) {
  if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
    const p = document.createElement("p");
    loginEmailError.innerHTML = "";
    p.innerHTML = "Veuillez entrer une adresse mail valide";
    loginEmailError.appendChild(p);
    emailInput.classList.add("empty");
    return;
  } else if (!user.password) {
    const p = document.createElement("p");
    loginPasswordError.innerHTML = "";
    p.innerHTML = "Veuillez entrer un mot de passe";
    loginPasswordError.appendChild(p);
    passwordInput.classList.add("empty");
    return;
  }
}

//suppression des alertes à chaque submit
function clearAlerts() {
  const errorParagraphs = document.querySelectorAll(".loginEmailError p, .loginPasswordError p");
  errorParagraphs.forEach(paragraph => {
    paragraph.remove();
  });
  emailInput.classList.remove("empty");
  passwordInput.classList.remove("empty");
}

//CONNECTION API
async function login(user) {
  try {
    if (!user.password) {
      return; // Si mdp pas complété, exit fonction
    }

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 401 || response.status === 404) {
      showPopupAlert("Vos identifiants ne sont pas valides.");
      return;
    }

    const result = await response.json();

    if (result.token) {
      localStorage.setItem("token", result.token);
      window.location.href = "../../index.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Affichage du popup
function showPopupAlert(message) {
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popupContent.innerHTML = `
    <p>${message}</p>
  `;

  popup.appendChild(popupContent);
  popup.style.display = "block";

  // Fermeture du popup en cliquant à l'extérieur
  document.addEventListener("click", closePopup);

  function closePopup(event) {
    if (!popup.contains(event.target)) {
      popupContent.remove();
      popup.style.display = "none";
      document.removeEventListener("click", closePopup);
    }
  }
}


//email: sophie.bluel@test.tld
//password: S0phie  

/*^: Indique le début de la chaîne.
(?=.*\d): Recherche au moins un chiffre.
(?=.*[a-z]): Recherche au moins une lettre minuscule.
(?=.*[A-Z]): Recherche au moins une lettre majuscule.
(?=.*[a-zA-Z]): Recherche au moins une lettre (minuscule ou majuscule).
.{8,}: La longueur minimale du mot de passe est de 8 caractères.
$: Indique la fin de la chaîne.*/
