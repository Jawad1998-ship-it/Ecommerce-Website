
let basket = JSON.parse(localStorage.getItem("data")) || [];

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
};

calculation();

