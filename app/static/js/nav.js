if (document.getElementById("pop-menu")) {
    document.getElementById("toggle-tags").addEventListener("click", () => {
        let hiddenNav = document.getElementById("pop-menu");
        let state = hiddenNav.className;
        hiddenNav.className = state == "hidden" ? "visible" : "hidden";
    })
}