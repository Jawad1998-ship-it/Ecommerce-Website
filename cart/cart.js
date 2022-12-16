
let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let items = document.getElementById("items");
let mainHeading = document.getElementById("main-heading");
let totalItems = document.getElementById("total-items");
let totalPrice = document.getElementById("total-price");
let hamburger = document.querySelector(".hamburger");
let container = document.getElementById("container");

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


let generateCartItems = () => {
    if(basket.length !== 0)
    {
        return(
            items.innerHTML = basket.map((x) => {
                let {id, name, price, img} = x;
                let search = data.find((x) => x.id == id) || [];
                let search2 = basket.find((x) => x.id == id) || [];
                return `
                    <table id="table-${id}">
                        <tr class="product-heading">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal Price</th>
                        </tr>
                        <tr class="product">
                            <td class="product-img">
                                <div class="img-container">
                                    <img src="${search.img}" alt="product">
                                    <p class="title">${search.name}</p>
                                </div>
                            </td>
                            <td class="quantity-number">
                                <div class="counter">
                                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                        <div id=${id} class="quantity">${search2.item === undefined ? 0 : search2.item}
                                        </div>
                                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                </div>
                            </td>
                            <td class="price">
                                $${search.price * search2.item}                             
                                <i class="bi bi-x-lg close" onclick="removeItem(${id})"></i>
                            </td>
                        </tr>
                    </table>
                `;
            }).join("")
        )
    }
    else
    {   
        label.style.display = "flex";
        mainHeading.innerHTML = ``;
        items.innerHTML = ``;
        container.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart Is Empty</h2>
            <a href="/index.html"><button class="homeBtn">Back to Home</button></a>
        `;
    }
}

generateCartItems();



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

    generateCartItems();
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {

    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmountofItems();
    totalAmountofPrice();
}

let calculation = () => {

    let cartAmount = document.getElementById("cart-amount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

}

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

hamburger.addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
});

let totalAmountofItems = () => {

        if(basket.length !== 0)
        {
            totalItems.innerText = `Cart Items : ${basket.map((x) => x.item).reduce((x, y) => x + y, 0)}`;        
        }
        else
        {
            totalItems.innerHTML = `0`
        }

}

let totalAmountofPrice = () => {

    if(basket.length !== 0)
    {   
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = data.find((x) => x.id == id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);    
        totalPrice.innerHTML = `Total Amount : ${amount}`;
    }

    else return;

}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

calculation();
totalAmountofItems();
totalAmountofPrice();


