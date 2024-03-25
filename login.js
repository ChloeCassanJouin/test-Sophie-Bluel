const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");
const loginEmailError = document.querySelector(".loginEmailError"); 
const loginPasswordError = document.querySelector(".loginPasswordError")
const popup = document.querySelector(".popup");


localStorage.removeItem("token"); // suppression token


//récupération des valeurs email et password
submit.addEventListener("click", function (event) {
  event.preventDefault();
  clearAlerts();
  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  login(user);
});

////////////////////////////////////////////////////////////////////////////////////// gestion syntaxe identifiants//
//verifier la syntaxe de l'email et présence d'un password
function VerifID(user) {
  let result = true
  if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer une adresse mail valide";
    loginEmailError.appendChild(p);
    emailInput.classList.add("empty");
    result = false
  } if (!user.password) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer un mot de passe";
    loginPasswordError.appendChild(p);
    passwordInput.classList.add("empty");
    result = false
  }
  return result;
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


////////////////////////////////////////////////////////////////////////////////////// envoi des identifiants à l'API//
//CONNECTION API
async function login(user) {
  try {
    const recuperationValeurID = VerifID(user)
    if  (!recuperationValeurID) return;
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
      console.log(result)
      const token = result.token
      console.log(token)
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//popup "identifiants non valides"
function showPopupAlert(message) {
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

//email: sophie.bluel@test.tld
//password: S0phie  

/*^: Indique le début de la chaîne.
(?=.*\d): Recherche au moins un chiffre.
(?=.*[a-z]): Recherche au moins une lettre minuscule.
(?=.*[A-Z]): Recherche au moins une lettre majuscule.
(?=.*[a-zA-Z]): Recherche au moins une lettre (minuscule ou majuscule).
.{8,}: La longueur minimale du mot de passe est de 8 caractères.
$: Indique la fin de la chaîne.*/
