

// NavBar
// NavBar
// NavBar
// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const davToggle = document.querySelector('.dav-toggle');
const linkssContainer = document.querySelector('.links-container');
const linkss = document.querySelector('.linkss');

davToggle.addEventListener('click', () => {
    // linksContainer.classList.toggle('show-links')

    //add extra links
    const containerHeight = linkssContainer.getBoundingClientRect().height;
    const linksHeight = linkss.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linkssContainer.style.height = `${linksHeight}px`
    } else {
        linkssContainer.style.height = 0;
    }
});

const davbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// ********** fixed navbar ************
window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = davbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        davbar.classList.add('fixed-nav');
    } else {
        davbar.classList.remove('fixed-nav');
    }
})

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {

    link.addEventListener('click', (e) => {
        //prevent Default
        e.preventDefault();

        //navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        //calculate the height
        const navHeight = davbar.getBoundingClientRect().height;
        const containerHeight = links.getBoundingClientRect().height;
        const fixedNav = davbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight;
        }
        if (navHeight > 82) {
            position = position + containerHeight;
        }
        window.scrollTo({
            left: 0,
            top: position,
        });
        linkssContainer.style.height = 0;
    });
});





/* ============================ typing animation ===============================*/

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typing", {
        strings: ["OUEDRAOGO Kaled"],
        typeSpeed: 200,
        backSpeed: 60,
        loop: true
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typing2", {
        strings: ["Kaledeuro"],
        typeSpeed: 200,
        backSpeed: 60,
        loop: true
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typing3", {
        strings: ["La Qualité"],
        typeSpeed: 200,
        backSpeed: 60,
        loop: true
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typing4", {
        strings: ["Le Hackeur Ethique"],
        typeSpeed: 200,
        backSpeed: 60,
        loop: true
    });
});
/* ============================ typing animation ===============================*/
