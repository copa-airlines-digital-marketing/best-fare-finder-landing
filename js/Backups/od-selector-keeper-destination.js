
const destSel = document.getElementById('destination-selector');
const originSelector = document.getElementById('origin-selector'); // for filtering valid origins


destSel.addEventListener('change', function () {
    localStorage.setItem('dData', this.value);
    originSelector.innerHTML = ''; //clears origin options

    let defaultOri = document.createElement('option');
    defaultOri.text = 'Select your origin | OOO'; // creates default naming for origin after clear
    defaultOri.value = 'OOO';
    originSelector.add(defaultOri);// adds default naming for origin 

    var selectedDestinationVal = this.value;
    const finderfirst = value => [selectedDestinationVal].some(element => value.slice(-3).includes(element));
    var presearchDest = (validRoutes.filter(finderfirst));
    console.log("presearch for valid origins = " + presearchDest);
    var onlyValidOrigins = presearchDest.map(string => string.slice(0, 3));
    console.log("valid origins: " + onlyValidOrigins); // prints only valid origins

    onlyValidOrigins.forEach(key => {
        var value = destinationContext[key];
        option1new = document.createElement('option');
        option1new.text = `${destinationContext[key].cityName} | ${key}`;
        option1new.value = key;
        originSelector.add(option1new);
    })






});
let destVal = localStorage.getItem('dData');
if (destVal) destSel.value = destVal;





