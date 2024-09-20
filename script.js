document.addEventListener("DOMContentLoaded", () => {
    // Gérer l'interaction avec les éléments de la timeline
    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Ajouter la classe 'active' lorsque l'élément est visible
            } else {
                entry.target.classList.remove('active'); // Retirer 'active' quand l'élément n'est plus visible
            }
        });
    }, {
        threshold: 0.3 // 30% de l'élément doit être visible pour déclencher
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Gérer l'interaction avec le menu de navigation
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu li a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Ajouter la classe active au lien correspondant à la section visible
                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.menu li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, {
        threshold: 0.4 // 40% de la section doit être visible
    });

    sections.forEach(section => navObserver.observe(section));

    // Gérer l'interaction avec le bouton toggle du menu (burger)
    const toggleButton = document.querySelector('.toggle');
    const menu = document.querySelector('.menu');
    const body = document.body; // Pour désactiver le scroll

    // Ajouter un écouteur d'événement pour le clic sur le toggle button (burger)
    toggleButton.addEventListener('click', () => {
        // Alterner la classe 'active-menu' sur le menu
        menu.classList.toggle('active-menu');

        // Ajouter ou retirer la classe 'no-scroll' pour désactiver/activer le scroll
        if (menu.classList.contains('active-menu')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });

    // Fermer le menu lorsque l'utilisateur clique sur un lien (pour les écrans <= 970px)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 970) {
                menu.classList.remove('active-menu'); // Rétracter le menu
                body.classList.remove('no-scroll');   // Réactiver le scroll
            }
        });
    });

    const skillBoxes = document.querySelectorAll('.skill-box');

    skillBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Basculer la classe 'flipped' sur la box cliquée
            box.classList.toggle('flipped');
        });
    });
});
