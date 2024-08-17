/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

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
sr.reveal(`.specs__img, .discount__img, .temp`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)

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
    //document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
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
// Déclaration des variables globales pour stocker les informations des produits
var globalShopProducts;
var globalTitle;
var globalPrice;
var globalProductImg;

function addCartClicked(event) {
    return new Promise((resolve, reject) => {
        popupContainer.classList.add('active');
        var button = event.target;
        globalShopProducts = button.parentElement.parentElement;
        globalTitle = globalShopProducts.getElementsByClassName('product-title')[0].innerText;
        globalPrice = globalShopProducts.getElementsByClassName('product-price')[0].innerText;
        globalProductImg = globalShopProducts.getElementsByClassName('product-img')[0].src;

        // Fonction pour gérer l'événement du bouton de confirmation
        function confirmButtonHandler() {
            const selectedOption = document.querySelector('.option.selected');
            if (selectedOption) {
                // Obtenir les valeurs mises à jour à l'intérieur de confirmButtonHandler
                var title = globalTitle;
                var price = globalPrice;
                var productImg = globalProductImg;

                // Ajouter l'article au panier, mettre à jour le total et afficher une alerte
                addProductToCart(title, price, productImg);
                updateTotal();
                

                // Réinitialiser l'option sélectionnée
                selectedOption.classList.remove('selected');
                popupContainer.classList.remove('active');
                resolve(); // Résoudre la promesse une fois que tout est fait
            }
        }

        // Attacher l'événement click au bouton de confirmation
        confirmButton.addEventListener('click', confirmButtonHandler);
    });
}




function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i=0; i<cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == (title+' '+choix)){
            showPopup(`Le ${title} est déjà dans votre panier`);
            return;
        }
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box a-enregistrer">
                        <div class="cart-product-title">${title} ${choix}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!--Remove Cart -->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    showPopup(`Le ${title} a été ajouté à votre panier`);
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
    confirmButton.disabled = false;
});

option2.addEventListener('click', () => {
    option1.classList.remove('selected');
    option2.classList.add('selected');
    confirmButton.disabled = false;
});
/*
confirmButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        const optionText = selectedOption.innerText.trim();
        alert('Vous avez sélectionné : ' + optionText);
        popupContainer.classList.remove('active');
    } 
});
*/
const closePopupButton = document.getElementById('close-popup');
closePopupButton.addEventListener('click', () => {
    popupContainer.classList.remove('active');
});

//FAQ 
function displayFaq(){
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq =>{
        faq.addEventListener("click",() => {
            faq.classList.toggle("active");
        })
    });
}


//FONTIONNALITES

document.querySelector(".btn-buy").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');
    const telInput = document.getElementById('tel');
    const validerBtn = document.getElementById('valider-btn');

    function verifierChamps() {
        // Vérifiez si tous les champs requis sont remplis
        const nomRempli = nomInput.value.trim() !== '';
        const prenomRempli = prenomInput.value.trim() !== '';
        const telRempli = telInput.value.trim() !== '';

        // Activez le bouton si tous les champs sont remplis, sinon désactivez-le
        if (nomRempli && prenomRempli && telRempli) {
            validerBtn.disabled = false;
        } else {
            validerBtn.disabled = true;
        }
    }

    // Ajoutez des écouteurs d'événements sur les champs de formulaire pour surveiller les changements
    nomInput.addEventListener('input', verifierChamps);
    prenomInput.addEventListener('input', verifierChamps);
    telInput.addEventListener('input', verifierChamps);
});


function enregistrerCommande() {
    // Récupérer les éléments contenant la classe "a-enregistrer"
    var elementsAEnregistrer = document.querySelectorAll('.detail-box.a-enregistrer');
    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var tel = document.getElementById('tel').value;
    var commandesExistantes = [];

    // Ajouter les informations utilisateur à la liste des commandes existantes
    commandesExistantes.push({
        nom: nom,
        prenom: prenom,
        tel: tel
    });

    elementsAEnregistrer.forEach(function(element) {
        // Récupérer les informations sur le produit
        var nomProduit = element.querySelector('.cart-product-title').textContent;
        var prix = element.querySelector('.cart-price').textContent;
        var quantite = element.querySelector('.cart-quantity').value;
        
        // Créer un objet représentant la commande
        var commande = {
            nomProduit: nomProduit,
            prix: prix,
            quantite: quantite
        };
        
        // Ajouter la commande à la liste des commandes existantes
        commandesExistantes.push(commande);
    });

    // Envoyer les données au serveur
    fetch('http://127.0.0.1:4000/save-orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commandesExistantes)
    }).then(function(response) {
        if (response.ok) {
            console.log('Commandes enregistrées avec succès.');
        } else {
            console.error('Erreur lors de l\'enregistrement des commandes.');
        }
    }).catch(function(error) {
        console.error('Erreur lors de l\'enregistrement des commandes:', error);
        alert("Une erreur s'est produite, veuillez repasser votre commande");
    });
}

function validerCommande() {
    // Récupérer les éléments à mettre à jour
    var elementsAEnregistrer = document.querySelectorAll('.maj');

    // Mettre à jour chaque élément avec les valeurs des champs de formulaire
    elementsAEnregistrer.forEach(function(element) {
        element.textContent = element.value;
    });
    enregistrerCommande();
    openPopup();
}

let popup = document.getElementById("popup-success");

function openPopup(){
    popup.classList.add("open-popup");
}
function closePopupSuccess(){
    popup.classList.remove("open-popup");
    document.querySelector(".popup").classList.remove("active");
}
const choice1 = document.getElementById('option1');
const choice2 = document.getElementById('option2');

    // Déclarer une variable pour stocker le choix de l'utilisateur
    let choix = '';

    // Ajouter des gestionnaires d'événements aux options pour enregistrer le choix de l'utilisateur
    option1.addEventListener('click', function() {
        choix = 'Mâle';
    });

    option2.addEventListener('click', function() {
        choix = 'Femelle';
    });



//SWIPPER
// Sélection du bouton et des sections
function toggleSections() {
    const sections = document.querySelectorAll('.des');
    let currentIndex = 0;

    sections.forEach((section, index) => {
        if (section.style.display === 'block') {
            currentIndex = index;
            section.style.display = 'none';
        }
    });

    const nextIndex = (currentIndex + 1) % sections.length;
    sections[nextIndex].style.display = 'block';
}

const nextButton = document.getElementById('nextButton');


//LAST
function showPopup(message) {
    var popupMessage = document.getElementById('popupMessage');
    var popupText = document.getElementById('popupText');
    popupText.textContent = message;
    popupMessage.style.display = 'block';
    setTimeout(function () {
        popupMessage.style.display = 'none';
    }, 3000); // Auto-hide after 3 seconds
}

function closePopup() {
    var popupMessage = document.getElementById('popupMessage');
    popupMessage.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typing", {
        strings: ["RimDeco"],
        typeSpeed: 200,
        backSpeed: 60,
        loop: true
    });
});
