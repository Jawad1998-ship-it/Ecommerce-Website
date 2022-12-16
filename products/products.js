let allProducts = document.getElementById("all-products");
let searchProducts = document.getElementById("search-products");
let hamburger = document.querySelector(".hamburger");
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

let generateAllProducts = () => {
    return (allProducts.innerHTML = allData
        .map((x) => {
        let { id, name, price, img } = x;
        let search = basket.find((x) => x.id == id) || [];

        return `
                <div class="product-item" id=product-list-${id}>
                        <div class="product-img" >
                            <img src="${img}" alt="">
                        </div>
                        <div class="product-desc">
                            <div class="desc-title">
                                <h4>${name}</h4>
                                <p class="price">$${price}</p>
                            </div>                            
                            <p class="counter-title">Add to Cart</p>
                            <div class="counter">
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        </div>
                    </div>
            </div>
    `;}).join(""));
};

generateAllProducts();

let searchAllProducts = () => {
    return (searchProducts.innerHTML = allData
        .map((x) => {
        let { id, name, price, img } = x;
        let search = basket.find((x) => x.id == id) || [];

        return `
                <div class="search-product-item" id=product-list-${id}>
                        <div class="product-img" >
                            <img src="${img}" alt="">
                        </div>
                        <div class="product-desc">
                            <div class="desc-title">
                                <h4 id="search-name">${name}</h4>
                                <p class="price">$${price}</p>
                            </div>                            
                            <p class="counter-title">Add to Cart</p>
                            <div class="counter">
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        </div>
                    </div>
            </div>
    `;}).join(""));
};

searchAllProducts();


let increment = (id) => {

    let search = basket.find((x) => x.id === id);
    if(search === undefined)
    {
        basket.push({
            id: id,
            item:1,
        });
    }
    else
    {
        search.item += 1;
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {

    let search = basket.find((x) => x.id === id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    else
    {
        search.item -= 1;
    }    
    
    update(id);    
    basket = basket.filter((x) =>  x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {

    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let cartAmount = document.getElementById("cart-amount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

let search = () => {

    let searchItem = document.getElementById("search-item").value.toUpperCase();
    console.log(searchItem);
    let productContainer = document.getElementById("search-products");
    let product = document.querySelectorAll(".search-product-item");
    let pname = document.getElementsByTagName("h4");
    let container = document.getElementById("search-products-container");
    let notFound = document.getElementById("not-found");

    if (searchItem)
    {
        container.classList.add("clicked");
    } 
    else
    {
        container.classList.remove("clicked");
    }


    for(var i = 0; i < pname.length; i++) {

        let match = product[i].getElementsByTagName("h4")[0];
        if(match)
        {
            let textValue = match.innerHTML || match.textContent;
            if(textValue.toUpperCase().indexOf(searchItem) > -1)
            {
                product[i].style.display = "";
            }
            else
            {
                product[i].style.display = "none";
            }
        }

    }
    
}


hamburger.addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
});


calculation();
