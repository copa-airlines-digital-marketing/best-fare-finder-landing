


const oriSel = document.getElementById('origin-selector');
const destinationSelector = document.getElementById('destination-selector'); // for wroking valid destinations


oriSel.addEventListener('change', function () {
    localStorage.setItem('oData', this.value); // saves origin at localStorage
    destinationSelector.innerHTML = ''; //clears destinations options
    let defaultDest = document.createElement('option');
    defaultDest.text = 'Select your destination | DDD'; // creates default naming for destination after clear
    defaultDest.value = 'DDD';
    destinationSelector.add(defaultDest); // adds default naming for destination

    var selectedOriginVal = this.value;
    const finderfirst = value => [selectedOriginVal].some(element => value.slice(0, 3).includes(element));
    var presearch = (validRoutes.filter(finderfirst));
    console.log("presearch = " + presearch);
    var onlyValidDestinations = presearch.map(string => string.slice(-3));
    console.log("valid destinations: " + onlyValidDestinations);


    onlyValidDestinations.forEach(key => {
        var value = destinationContext[key];
        option2new = document.createElement('option');
        option2new.text = `${destinationContext[key].cityName} | ${key}`;
        option2new.value = key;
        destinationSelector.add(option2new);

    })



});
let oriVal = localStorage.getItem('oData');
if (oriVal) oriSel.value = oriVal;
oriSel.onchange();






