
let hamburger = document.querySelector(".hamburger");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let form = document.getElementById("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});



function checkInputs(){

    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();

    //username
    if(usernameValue === "")
    {
        setErrorFor(username, "Username cannot be blank");
    }
    else
    {
        setSuccessFor(username);
    }
    //email
    if(emailValue === "")
    {
        setErrorFor(email, "Email cannot be blank");
    }
    else if(!verifyEmail(emailValue))
    {
        setErrorFor(email, "Email is not valid")
    }
    else
    {
        setSuccessFor(email);
    }
    //password
    if(passwordValue === "")
    {
        setErrorFor(password, "Password cannot be blank");
    }

    else
    {
        setSuccessFor(password);
    }
    //password2 
    if(password2Value === "")
    {
        setErrorFor(password2, "Password cannot be blank");
    }
    else if(passwordValue !== password2Value)
    {
        setErrorFor(password2, "Password did not match");
    }
    else
    {
        setSuccessFor(password2);
    }


}

function setErrorFor(input, message)
{
    let formControl = input.parentElement;
    let errorMsg = formControl.querySelector(".error-msg");
    errorMsg.innerHTML = message;
    formControl.className = "form-control error";
}

function setSuccessFor(input)
{
    formControl = input.parentElement;
    formControl.className = "form-control success"; 
}

function verifyEmail(email)
{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


let menuOpen = false;

hamburger.addEventListener("click", function() {
    if(!menuOpen)
    {
        hamburger.classList.add("open");
        menuOpen = true;
    }
    else{
        hamburger.classList.remove("open");
        menuOpen = false;
    }
})


let calculation = () => {

    let cartAmount = document.getElementById("cart-amount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();


hamburger.addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
});

