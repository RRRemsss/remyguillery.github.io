// JavaScript to handle the timeline interaction
document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add 'active' when item is in view
            } else {
                entry.target.classList.remove('active'); // Remove 'active' when item goes out of view
            }
        });
    }, {
        threshold: 0.4 // 40% of the item needs to be visible
    });

    timelineItems.forEach(item => observer.observe(item));
});

// Sélectionne toutes les sections et les liens de la navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu li a");

// Options pour l'IntersectionObserver (seuil de 50% de visibilité)
const options = {
  threshold: 0.5,
};

// Fonction qui observe quelles sections sont visibles
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Retire la classe active de tous les liens
      navLinks.forEach(link => {
        link.classList.remove("active");
      });
      
      // Ajoute la classe active au lien correspondant à la section visible
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.menu li a[href="#${id}"]`);
      activeLink.classList.add("active");
    }
  });
}, options);

// Observez chaque section
sections.forEach(section => {
  observer.observe(section);
});
