// Mobile Navigation
// Selects the mobile menu button.
const menuToggle = document.querySelector("#menu-toggle");

// Selects the main navigation list.
const navigationMenu = document.querySelector("#navigation-menu");

// Checks that both elements exist before adding the interaction.
if (menuToggle && navigationMenu) {
    menuToggle.addEventListener("click", function () {
        // Shows or hides the mobile navigation.
        navigationMenu.classList.toggle("menu-open");

        // Checks whether the menu is currently open.
        const menuIsOpen = navigationMenu.classList.contains("menu-open");

        // Updates the accessible state of the button.
        menuToggle.setAttribute("aria-expanded", menuIsOpen);

        // Updates the button description for screen-reader users.
        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}