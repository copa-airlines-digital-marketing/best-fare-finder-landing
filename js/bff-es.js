
let oriDropdown = document.getElementById('origin-selector');
oriDropdown.length = 0;
let defaultOri = document.createElement('option');
defaultOri.text = 'Select your origin';
defaultOri.value = 'OOO';
oriDropdown.add(defaultOri);
let destDropdown = document.getElementById('destination-selector');
destDropdown.length = 0;
let defaultDest = document.createElement('option');
defaultDest.text = 'Select your destination';
defaultDest.value = 'DDD';
destDropdown.add(defaultDest);
const searchOdForm = document.getElementById("odForm") // calls the form for reactive url params


var histoSelector = document.getElementsByClassName('search-container')[0];
var histoOriDesSelector = document.getElementsByClassName('select-destination');

console.log("Histogram selector really removed");

refillOrigins();
refillDestinations();
selectorCheck();

function refillOrigins() {
    Object.keys(destinationContext).forEach(key => {

        let option;
        option1 = document.createElement('option');
        option1.text = `${destinationContext[key].cityName} | ${key}`;
        option1.value = key;
        oriDropdown.add(option1);
        option1.disable = true;
    });
    sortOD(oriDropdown);
    addDefaultOrigin(oriDropdown);


}
function addDefaultOrigin(originsSORTED) {

    defaultOri.text = 'Select your origin';
    defaultOri.value = 'OOO';
    oriDropdown.insertBefore(defaultOri, oriDropdown.firstChild);


}

function sortOD(ORIGINS) {
    var tArr = new Array();
    for (var i = 0; i < ORIGINS.options.length; i++) {
        tArr[i] = new Array();
        tArr[i][0] = ORIGINS.options[i].text;
        tArr[i][1] = ORIGINS.options[i].value;
    }
    tArr.sort();
    while (ORIGINS.options.length > 0) {
        ORIGINS.options[0] = null;

    }
    for (var i = 0; i < tArr.length; i++) {
        var op = new Option(tArr[i][0], tArr[i][1]);
        ORIGINS.options[i] = op;
    }
    return;
}

function refillDestinations() {

    Object.keys(destinationContext).forEach(key => {
        option2 = document.createElement('option');
        option2.text = `${destinationContext[key].cityName} | ${key}`;
        option2.value = key;
        destDropdown.add(option2);
    });
    sortOD(destDropdown);
    addDefaultDestination(destDropdown);
}


function addDefaultDestination(destinationsSORTED) {

    defaultDest.text = 'Select your destination';
    defaultDest.value = 'DDD';
    destDropdown.insertBefore(defaultDest, destDropdown.firstChild);

}



/*  Starts glueparams with submit event listener for finding selected fares */

searchOdForm.addEventListener("submit", (e) => {

    e.preventDefault();
    var o = document.getElementById('origin-selector').value;
    var d = document.getElementById('destination-selector').value;
    const stopMessage = document.getElementById('showStopper');
    var histoSelector = document.getElementsByClassName('search-container')[0];
    var histoOriDesSelector = document.getElementsByClassName('select-destination');

    console.log(`o= ${o}`)
    console.log(`d= ${d}`)


    if (o === 'OOO' && d === 'DDD') {
        stopMessage.classList.remove('erro');
        stopMessage.classList.add('errorHide');
        stopMessage.innerHTML = "Please, choose an origin or a destination!";
        noHistoSelect();
    } else if (o != 'OOO' && d === 'DDD') {
        d = '';
        glueParams(o, d);
        noHistoSelect();

    } else if (o === 'OOO' && d != 'DDD') {
        o = '';
        glueParams(o, d);
        noHistoSelect();
    } else {
        glueParams(o, d);
        getHistoSelect();
    }

    function glueParams(o, d) {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.hash = '#originSelector'
        urlParams.set('em_o', o);
        urlParams.set('em_d', d);
        window.location.hash = '#originSelector';
        window.location.search = urlParams;
        refillOrigins();
        refillDestinations();
    }


    function noHistoSelect() {
        histoSelector.classList.add('display-no');
    }
    function getHistoSelect() {
        histoSelector.classList.add("display-no");
        histoOriDesSelector[0].disabled = true;
        histoOriDesSelector[1].disabled = true;

    }
    function refillOrigins() {
        Object.keys(destinationContext).forEach(key => {

            let option;
            option1 = document.createElement('option');
            option1.text = `${destinationContext[key].cityName} | ${key}`;
            option1.value = key;
            oriDropdown.add(option1);
            option1.disable = true;
        });

    }
    function refillDestinations() {
        Object.keys(destinationContext).forEach(key => {
            option2 = document.createElement('option');
            option2.text = `${destinationContext[key].cityName} | ${key}`;
            option2.value = key;
            destDropdown.add(option2);
        });

    }



})

/* ENDS submit event listener for finding selected fares */

searchOdForm.addEventListener("reset", (e) => {

    let defaultOri = document.createElement('option');
    defaultOri.text = 'Select your origin';
    defaultOri.value = 'OOO';
    oriDropdown.add(defaultOri);
    let destDropdown = document.getElementById('destination-selector');
    destDropdown.length = 0;

    let defaultDest = document.createElement('option');
    defaultDest.text = 'Select your destination';
    defaultDest.value = 'DDD';
    destDropdown.add(defaultDest);

    refillOrigins();
    refillDestinations();
    localStorage.clear();
})



window.onload = function () {


    setTimeout(() => {
        if (oriVal === null && destVal === null) {
            document.getElementsByClassName('search-container')[0].style.display = "none";
            document.getElementById('histoTitle').style.display = "none";

        }
        else if (oriVal === 'OOO' && destVal === 'DDD') {
            document.getElementsByClassName('search-container')[0].style.display = "none";
            document.getElementById('histoTitle').style.display = "none";

        }
        else if (oriVal != 'OOO' && destVal != 'DDD') {
            document.getElementsByClassName('search-container')[0].style.display = "block";
            document.getElementById('histoTitle').style.display = "block";
            histoOriDesSelector[0].disabled = true;
            histoOriDesSelector[1].disabled = true;

        }


    }, 4000);


}





function noHistoSelect() {
    document.getElementsByClassName('search-container')[0].style.display = "none";
}
function getHistoSelect() {

    document.getElementsByClassName('search-container')[0].classList.remove('display-no');
    histoOriDesSelector[0].disabled = true;
    histoOriDesSelector[1].disabled = true;

}

/*Starts saving for URL Params */
console.log(localStorage);
oriDropdown.addEventListener('change', function () {
    localStorage.setItem('oData', this.value); // saves origin value at localStorage
    // localStorage.setItem('oNameData', this.text); saves origin name at LocalStorage

    /*Starts destination validation*/

    var selectedOriginVal = this.value;
    const finderfirst = value => [selectedOriginVal].some(element => value.slice(0, 3).includes(element));

    var presearch = (validRoutes.filter(finderfirst));
    console.log("presearch = " + presearch);
    var onlyValidDestinations = presearch.map(string => string.slice(-3));
    console.log("valid destinations: " + onlyValidDestinations);
    resetDestinationDropdown();
    selectorCheck();
    let defaultDest = document.createElement('option');
    defaultDest.text = 'Select your destination';
    defaultDest.value = 'DDD';
    destDropdown.add(defaultDest);

    if (selectedOriginVal === 'OOO') {
        refillDestinations();
        selectorCheck();


    } else {
    selectorCheck();
    onlyValidDestinations.forEach(key => {
        // Convert the key to a number if needed
        let numericKey = parseInt(key);

        // Check if the conversion is successful
        if (!isNaN(numericKey)) {
            // Access the properties using the numeric key
            var value = destinationContext[key];
            option2new = document.createElement('option');
            option2new.text = `${destinationContext[key].cityName} | ${numericKey}`;
            option2new.value = key;
            destDropdown.add(option2new);
        }
    })
}



    /*ENDS destination validation*/

});
//let oriName = localStorage.getItem('oNameData')
let oriVal = localStorage.getItem('oData');
if (oriVal) oriDropdown.value = oriVal;

destDropdown.addEventListener('change', function () {
    localStorage.setItem('dData', this.value);
    // localStorage.setItem('dNameData', this.innerHTML);

    /*Starts origin validation*/


    if (dData === 'DDD') {
        refillDestinations();
        selectorCheck();
    } else {
        var selectedDestinationVal = this.value;
        const finderfirst = value => [selectedDestinationVal].some(element => value.slice(-3).includes(element));
        var presearchDest = (validRoutes.filter(finderfirst));
        console.log("presearch for valid origins = " + presearchDest);
        var onlyValidOrigins = presearchDest.map(string => string.slice(0, 3));
        console.log("valid origins: " + onlyValidOrigins); // prints only valid origins
        resetOriginDropdown();
        selectorCheck();

        onlyValidOrigins.forEach(key => {

            var value = destinationContext[key];
            option1new = document.createElement('option');
            option1new.text = `${destinationContext[key].cityName} | ${key}`;
            option1new.value = key;
            oriDropdown.add(option1new);
        })

    }



})
// let destName = localStorage.getItem('dNameData')
let destVal = localStorage.getItem('dData');
if (destVal) destDropdown.value = destVal;
function selectorCheck() {
    if (defaultOri.value === null && defaultDest.value === null) {
        var histoSelector = document.getElementsByClassName('search-container')[0];
        histoSelector.classList.add('display-no');
    }
    else if (defaultOri.value === 'OOO' && defaultDest.value === 'DDD') {
        var histoSelector = document.getElementsByClassName('search-container')[0];
        histoSelector.classList.add('display-no');
    }
    else {
        getHistoSelect();
    }
}

/* ENDS reactivity for URL Params*/
function resetOriginDropdown() {
    length = oriDropdown.options.length;
    while (length--) {
        oriDropdown.remove(length);
    }

    let defaultOriAtReset = document.createElement('option');


}
function resetDestinationDropdown() {
    length = destDropdown.options.length;
    while (length--) {
        destDropdown.remove(length);
    }

}
