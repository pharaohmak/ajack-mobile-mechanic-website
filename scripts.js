document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.main-nav__toggle');
    const navList = document.querySelector('.main-nav__list');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.main-nav__list a');
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    // Open and close the mobile menu
    navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('main-nav__list--open');
        overlay.classList.toggle('active');
    });

    // Close the mobile menu when the overlay is clicked
    overlay.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', false);
        navList.classList.remove('main-nav__list--open');
        overlay.classList.remove('active');
    });

    // Close the mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.setAttribute('aria-expanded', false);
            navList.classList.remove('main-nav__list--open');
            overlay.classList.remove('active');
        });
    });

    // Handle form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Validate form fields
        const name = document.getElementById('name-input').value.trim();
        const phone = document.getElementById('phone-input').value.trim();
        const email = document.getElementById('email-input').value.trim();
        const appointmentDate = document.getElementById('input-date').value.trim();
        const appointmentTime = document.querySelector('input[name="appointment-time"]').value.trim();

        if (!name || !phone || !email || !appointmentDate || !appointmentTime) {
            formMessages.textContent = 'Please fill out all required fields.';
            formMessages.classList.remove('success');
            formMessages.classList.add('error');
            formMessages.style.display = 'block';
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm('service_wg1xgdu', 'template_a2j1vdg', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formMessages.textContent = 'Your message has been sent successfully!';
                formMessages.classList.remove('error');
                formMessages.classList.add('success');
                formMessages.style.display = 'block';
                contactForm.reset(); // Reset the form after successful submission
            }, function (error) {
                console.log('FAILED...', error);
                formMessages.textContent = 'An error occurred while sending your message. Please try again later.';
                formMessages.classList.remove('success');
                formMessages.classList.add('error');
                formMessages.style.display = 'block';
            });
    });
});