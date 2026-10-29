
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
});
