const menuButton = document.getElementById("hamburger-menu");
const closeButton = document.getElementById("close-icon");
const mobileNavigation = document.querySelector(".mobile-navigation")
menuButton.addEventListener("click", () => {
    menuButton.style.display = "none";
    closeButton.style.display = "flex";
    mobileNavigation.style.display = "flex";
})

closeButton.addEventListener("click", () => {
    menuButton.style.display = "flex";
    closeButton.style.display = "none";
    mobileNavigation.style.display = "none";
})

const menuOptions = document.querySelectorAll(".mobile-navigation");
menuOptions.forEach( (element) => {
    element.addEventListener("click", () => {
        menuButton.style.display = "flex";
        closeButton.style.display = "none";
        mobileNavigation.style.display = "none";
    })
})