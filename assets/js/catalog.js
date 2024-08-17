/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__header, .section__title`,{delay: 600})
sr.reveal(`.home__footer`,{delay: 700})
sr.reveal(`.home__img`,{delay: 900, origin: 'top'})

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`,{origin: 'top', interval: 100})
sr.reveal(`.specs__data, .discount__animate`,{origin: 'left', interval: 100})
sr.reveal(`.specs__img, .discount__img`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)


/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }

 showMenu('nav-toggle','nav-menu')


/*Code supplementaire*/
//Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

//Open Cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
}
//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
} 

//Cart Working 
if(document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
    displayFaq();
    
}
else{
    ready();
}

// Making Function
function ready(){
    //Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener( "click" , addCartClicked);
    }

    //Buy button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}
//Buy Button
function buyButtonClicked() {
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

//remove Items From Cart
function removeCartItem(event){
    var buttonCliked = event.target
    buttonCliked.parentElement.remove();
    updateTotal();
}
// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
//Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
    alert('Le '+title +' a été ajouté a votre panier');
}
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i=0; i<cartItemsNames.length; i++) {
        console.log(title);
            console.log(cartItemsNames[i].innerText);
        if (cartItemsNames[i].innerText == title){
            alert('Le '+title +' est déjà dans votre panier');
            return;
        }
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!--Remove Cart -->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);


}


//Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    for (var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //If price contain some cents values
        total = Math.round(total *100)/100 ;
        document.getElementsByClassName('total-price')[0].innerText =total+ ' F';
    
}

/*Popup code*/
const openPopupButton = document.getElementById('open-popup');
const popupContainer = document.getElementById('popup-container');
const confirmButton = document.getElementById('confirm');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');

openPopupButton.addEventListener('click', () => {
    popupContainer.classList.add('active');
});

option1.addEventListener('click', () => {
    option1.classList.add('selected');
    option2.classList.remove('selected');
});

option2.addEventListener('click', () => {
    option1.classList.remove('selected');
    option2.classList.add('selected');
});

confirmButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        const optionText = selectedOption.innerText.trim();
        alert('Vous avez sélectionné : ' + optionText);
        popupContainer.classList.remove('active');
    } else {
        alert('Veuillez sélectionner une option.');
    }
});

const closePopupButton = document.getElementById('close-popup');
closePopupButton.addEventListener('click', () => {
    popupContainer.classList.remove('active');
});

function displayFaq(){
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq =>{
        faq.addEventListener("click",() => {
            faq.classList.toggle("active");
        })
    });
}