(function deleteAll() {
    const x = document.querySelectorAll(".__pfs, .__bss");
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('__pfs', '__bss');
    }
})();

