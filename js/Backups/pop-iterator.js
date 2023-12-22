let oriDropdown = document.getElementById('origin-selector');
oriDropdown.length = 0;
let defaultOri = document.createElement('option');
defaultOri.text = 'OOO | Select your origin';
defaultOri.value = 'OOO';
oriDropdown.add(defaultOri);
let destDropdown = document.getElementById('destination-selector');
destDropdown.length = 0;

let defaultDest = document.createElement('option');
defaultDest.text = 'DDD | Select your destination';
defaultDest.value = 'DDD';
destDropdown.add(defaultDest);
const searchOdForm = document.getElementById("odForm") // calls the form for reactive url params

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

refillOrigins();
refillDestinations();
/*  REFILLS ODS */


/*  Starts glueparams with submit event listener for finding selected fares */

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
        refillOrigins();
        refillDestinations();
    }
})

/* ENDS submit event listener for finding selected fares */



/*Starts saving for URL Params */
console.log(localStorage);
oriDropdown.addEventListener('change', function () {
    localStorage.setItem('oData', this.value); // saves origin value at localStorage
    localStorage.setItem('oNameData', this.text); //saves origin name at LocalStorage

    /*Starts destination validation*/
    var selectedOriginVal = this.value;
    const finderfirst = value => [selectedOriginVal].some(element => value.slice(0, 3).includes(element));

    var presearch = (validRoutes.filter(finderfirst));
    console.log("presearch = " + presearch);
    var onlyValidDestinations = presearch.map(string => string.slice(-3));
    console.log("valid destinations: " + onlyValidDestinations);
    resetDestinationDropdown();

    onlyValidDestinations.forEach(key => {

        var value = destinationContext[key];
        option2new = document.createElement('option');
        option2new.text = `${destinationContext[key].cityName} | ${key}`;
        option2new.value = key;
        destDropdown.add(option2new);

    })
    /*ENDS destination validation*/

});
let oriName = localStorage.getItem('oNameData')
let oriVal = localStorage.getItem('oData');
if (oriVal) oriDropdown.value = oriVal;

destDropdown.addEventListener('change', function () {
    localStorage.setItem('dData', this.value);
    localStorage.setItem('dNameData', this.innerHTML);

    /*Starts origin validation*/
    /*  var selectedDestinationVal = this.value;
     const finderfirst = value => [selectedDestinationVal].some(element => value.slice(-3).includes(element));
     var presearchDest = (validRoutes.filter(finderfirst));
     console.log("presearch for valid origins = " + presearchDest);
     var onlyValidOrigins = presearchDest.map(string => string.slice(0, 3));
     console.log("valid origins: " + onlyValidOrigins); // prints only valid origins
     resetOriginDropdown();
     onlyValidOrigins.forEach(key => {
 
         var value = destinationContext[key];
         option1new = document.createElement('option');
         option1new.text = `${destinationContext[key].cityName} | ${key}`;
         option1new.value = key;
         oriDropdown.add(option1new);
     }) */

})
let destName = localStorage.getItem('dNameData')
let destVal = localStorage.getItem('dData');
if (destVal) destDropdown.value = destVal;
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