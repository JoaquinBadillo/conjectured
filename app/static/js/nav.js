toggleMenu = () => {
    let hiddenNav = document.getElementById("pop-menu");
    let state = hiddenNav.className;
    hiddenNav.className = state == "hidden" ? "visible" : "hidden";
};