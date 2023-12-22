
const searchOdForm = document.getElementById("odForm") // calls the form for reactive url params
searchOdForm.addEventListener("submit", (e) => {

    e.preventDefault();
    var o = document.getElementById('origin-selector').value;
    var d = document.getElementById('destination-selector').value;
    const stopMessage = document.getElementById('showStopper');

    console.log(`o= ${o}`)
    console.log(`d= ${d}`)

    if (o === 'OOO' && d === 'DDD') {
        stopMessage.classList.remove('erro');
        stopMessage.classList.add('errorHide');
        stopMessage.innerHTML = "Please, choose an origin or a destination!";
    } else if (o != 'OOO' && d === 'DDD') {
        d = '';
        glueParams(o, d);

    } else if (o === 'OOO' && d != 'DDD') {
        o = '';
        glueParams(o, d);
    } else {
        glueParams(o, d);
    }

    function glueParams(o, d) {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.hash = '#originSelector'
        urlParams.set('em_o', o);
        urlParams.set('em_d', d);
        window.location.hash = '#originSelector';
        window.location.search = urlParams;
    }
})