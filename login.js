//document.addEventListener("DOMContentLoaded", function() {

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");
const loginEmailError = document.querySelector(".loginEmailError"); 
const loginPasswordError = document.querySelector(".loginPasswordError"); 


submit.addEventListener("click", function (event) {
    event.preventDefault(); // bloquer comportement par défaut
    const user = {
        email: emailInput.value,
        password: passwordInput.value 
    };
    login(user);
});
    
async function  login(user) {
  email.innerHTML = "";
  password.innerHTML = "";

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    });
    const result = await response.json();

    if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g) || !user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/) ) {
        const p = document.createElement("p");
        loginEmailError.innerHTML = "";
        loginPasswordError.innerHTML = "";
        p.innerHTML = "Veuillez entrer une adresse mail valide et/ou un mot de passe";
        loginEmailError.appendChild(p);
        email.classList.add("empty");
        loginPasswordError.appendChild(p);
        password.classList.add("empty");
        return;

    } else if (!user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
      const p = document.createElement("p");
      loginPasswordError.innerHTML = "";
      p.innerHTML = "Veuillez entrer un password";
      loginPasswordError.appendChild(p);
      password.classList.add("empty");
      return;
    } 

      else if (result.token) {
        localStorage.setItem("token", result.token);
        window.location.href = "../../index.html";
    }

    } catch (error) {
      console.error("Error:", error);
    } 
  }   
   
// fermeture DOMContentLoaded*/


 //email: sophie.bluel@test.tld
//password: S0phie  

/*^: Indique le début de la chaîne.
(?=.*\d): Recherche au moins un chiffre.
(?=.*[a-z]): Recherche au moins une lettre minuscule.
(?=.*[A-Z]): Recherche au moins une lettre majuscule.
(?=.*[a-zA-Z]): Recherche au moins une lettre (minuscule ou majuscule).
.{8,}: La longueur minimale du mot de passe est de 8 caractères.
$: Indique la fin de la chaîne.*/

/*export function loginSubmit() {
  emailInput.addEventListener("submit", function (event) {
    event.preventDefault();
    const login = { //charge utile
      email: (event.target.querySelector("[name=email").value), // récupération des informations envoyées
      password: (event.target.querySelector("[name=password").value),
    };
    const chargeUtile = Json.stringify(login);
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: chargeUtile,
    })
  });
  console.log(loginSubmit)
}

//fetch / methode Post / body charge utile / headers format*/