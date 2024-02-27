// la modification de login  en logout doit-il passer par un export de la fonction dans works.js?

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");
const loginEmailError = document.querySelector(".loginEmailError"); 
const loginPasswordError = document.querySelector(".loginPasswordError"); 
const popup = document.querySelector(".popup");

/*PSEUDO-CODE DU LOGIN
-cette page affiche les identifiants de l'utilisateur pour se logger à l'API
-définir les zones email / mdp / bouton submit
-définir écoute évènement sur le bouton submit avec récupération des valeurs email et password.
-ensuite vérifier la syntaxe de l'email + si mot de passe 
-la fonction VerifID vérifie la syntaxe de l'email selon critères et si un pwd a bien été entré.
  Si pas correct, dans la div loginEmailError et la div loginPasswordError situées en dessous des cases et faire apparaitre une balise <p> avec message d'alerte + 
  une class .empty rajouté à cases Email&pwd avec bordures rouges.
-la fonction clearAlerts remove les alertes <p> et la class ".empty" à chaque clic submit
-la fonction login permet ensuite de se connecter à l'API et vérifier si les identifiants correspondent aux accès API-login-Post. Si 
-la fonction showPopupAlert 
-la fonction updateLoginButton
*/

submit.addEventListener("click", function (event) {
  event.preventDefault(); // blocage comportement par défaut
  clearAlerts();
  const user = {
    email: emailInput.value,
    password: passwordInput.value
  };
  login(user);
  getToken(username, password);
});


function VerifID(user) {
  let result = true
  if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer une adresse mail valide";
    loginEmailError.appendChild(p);
    emailInput.classList.add("empty");
    result = false
    //return;
  } if (!user.password) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer un mot de passe";
    loginPasswordError.appendChild(p);
    passwordInput.classList.add("empty");
    result = false
    //return;
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
      //updateLoginButton(); 
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//popup
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

//login - logout - !ne fonctionne pas encore!
function updateLoginButton() {
  const loginButton = document.getElementById("loginLink");
  loginButton.textContent = "Logout";
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
