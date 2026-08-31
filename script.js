/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu when clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("portfolioTheme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("portfolioTheme", "dark");

    }

});


/* Load saved theme */

if (localStorage.getItem("portfolioTheme") === "light") {

    document.body.classList.add("light");

    const icon = themeToggle.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


/* ==========================================
   TYPING EFFECT
========================================== */

const typingText = document.getElementById("typingText");

const words = [
    "Full Stack Developer",
    "Problem Solver",
    "Web Developer",
    "Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );
}

typeEffect();


/* ==========================================
   CERTIFICATE VIEWER
========================================== */

const certificateModal =
    document.getElementById("certificateModal");

const certificateFrame =
    document.getElementById("certificateFrame");

const openCertificate =
    document.getElementById("openCertificate");

const closeCertificate =
    document.getElementById("closeCertificate");

const certificateButtons =
    document.querySelectorAll(".view-cert");


certificateButtons.forEach(button => {

    button.addEventListener("click", () => {

        const certificate =
            button.getAttribute("data-certificate");

        certificateFrame.src = certificate;

        openCertificate.href = certificate;

        certificateModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


/* Close certificate */

closeCertificate.addEventListener("click", closeCertificateModal);


function closeCertificateModal() {

    certificateModal.classList.remove("show");

    certificateFrame.src = "";

    document.body.style.overflow = "";

}


/* Close when clicking outside */

certificateModal.addEventListener("click", event => {

    if (event.target === certificateModal) {

        closeCertificateModal();

    }

});


/* Close using Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCertificateModal();

    }

});


/* ==========================================
   BACK TO TOP
========================================== */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   REVEAL ANIMATION
========================================== */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .stat-card, .timeline-item, " +
        ".skill-category, .project-card, .cert-card, " +
        ".coding-card, .contact-card"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});