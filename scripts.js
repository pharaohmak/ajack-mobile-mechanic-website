document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.main-nav__toggle');
    const navList = document.querySelector('.main-nav__list');

    navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('main-nav__list--open');
    });
});