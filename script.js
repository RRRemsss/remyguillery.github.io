document.addEventListener("DOMContentLoaded", () => {
/************************ Handle interaction with timeline elements ************************************/ 
    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add the 'active' class when the element is visible
            } else {
                entry.target.classList.remove('active'); // Remove 'active' when the element is no longer visible
            }
        });
    }, {
        rootMargin: '0px 0px -20% 0px', // Adjust the margin to better detect the end of the page
        threshold: 0.3 // 40% of the section must be visible
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

/************************ Handle interaction with the navigation menu **********************************/ 
    const sections = document.querySelectorAll("section, footer");
    const navLinks = document.querySelectorAll(".menu li a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the active class from all links
                navLinks.forEach(link => link.classList.remove("active"));

                // Add the active class to the link corresponding to the visible section
                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.menu li a[href="#${id}"]`);

                // If it is the footer or a visible section, add the active class
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, {
        threshold: 0.4, 
        rootMargin: '0px 0px -20% 0px' 
    });

    sections.forEach(section => navObserver.observe(section));

/************* Handle activation of the "About" section when the user is at the top of the page ****************/ 
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            // If the user is at the top, activate the "About" link
            navLinks.forEach(link => link.classList.remove("active")); // Remove 'active' from other links
            const aboutLink = document.querySelector('.menu li a[href="#about"]');
            if (aboutLink) {
                aboutLink.classList.add('active');
            }
        }
    });

/********************* Handle interaction with the toggle button (burger menu) ********************************/ 
    const toggleButton = document.querySelector('.toggle');
    const menu = document.querySelector('.menu');
    const body = document.body; // To disable scrolling

    // Add an event listener for click on the toggle button (burger)
    toggleButton.addEventListener('click', () => {
        // Toggle the 'active-menu' class on the menu
        menu.classList.toggle('active-menu');

        // Add or remove the 'no-scroll' class to disable/enable scrolling
        if (menu.classList.contains('active-menu')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });

    // Close the menu when the user clicks on a link (for screens <= 970px)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 970) {
                menu.classList.remove('active-menu'); // Collapse the menu
                body.classList.remove('no-scroll');   // Reactivate scrolling
            }
        });
    });

/********************* Handle interaction with the skill boxes (flip) ********************************/ 
    const skillBoxes = document.querySelectorAll('.skill-box');

    skillBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Toggle the 'flipped' class on the clicked box
            box.classList.toggle('flipped');
        });
    });
});
