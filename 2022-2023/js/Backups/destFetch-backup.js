let oriDropdown = document.getElementById('origin-selector');
oriDropdown.length = 0;
let defaultOri = document.createElement('option');
defaultOri.text = 'OOO - Select your origin';
oriDropdown.add(defaultOri);

let destDropdown = document.getElementById('destination-selector');
destDropdown.length = 0;

let defaultDest = document.createElement('option');
defaultDest.text = 'DDD - Select your destination';

destDropdown.add(defaultDest);



//const DestUrl = '/db/bff-context-destination-en.js';
const DestUrl = 'https://www.copaair.com/promotions/airtrfx-lp/assets/js/destination-context-en.min.js';

fetch(DestUrl)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.warn('check connection error code pops: ' +
                    response.status);
                return;
            }
            // console.log(response)
            // Examine the text in the response  
            response.json().then(function (data) {

                let option;

                for (let i = 0; i < data.length; i++) {
                    option1 = document.createElement('option');
                    option1.text = `${data[i].iata} | ${data[i].cityName}`;
                    option1.value = data[i].iata;
                    oriDropdown.add(option1);



                }
                for (let i = 0; i < data.length; i++) {
                    option1.disable = true;
                    option2 = document.createElement('option');
                    option2.text = ` ${data[i].iata} | ${data[i].cityName}`;
                    option2.value = data[i].iata;
                    destDropdown.add(option2);


                }

            });
        }
    )
    .catch(function (err) {
        console.error('Fetch Error -', err);
    });