let product = document.getElementById('products');
let hamburger = document.querySelector(".hamburger");

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

let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateProduct = () => {

    return (product.innerHTML = data.map((x) => {

        let {id, name, price, img} = x;
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
                            <div id=${id} class="quantity">${search.item === undefined? 0 : search.item}</div>
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        </div>
                    </div>
            </div>
    `;
    }).join(""));
}

generateProduct();

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
}


calculation();


hamburger.addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
});


