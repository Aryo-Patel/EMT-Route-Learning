let map, infoWindow;
let submitButton = document.getElementById('submit');
let placesFound = document.getElementById('places-found');
let directionsService, directionsDisplay
let API_KEY = 'AIzaSyA84EBjWciqhya_DJ8S_Auc5qNeHs8v2lY';
function initMap(){
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    //geocoder = new google.maps.Geocoder();
}

submitButton.addEventListener('click', async function(e){
    e.preventDefault();
    let mapResults = getLocations();
    if(mapResults){

        //sets the center of the map to be the inputted EMT location
        let address = mapResults.location.split(' ');
        address = address.join('+');

        const locInfo = await getLocationInfo(address);
        
        const {lat, lng} = locInfo.results[0].geometry.location;

        let map = createMap({
            center: {lat, lng},
            zoom: 15,
            draggable: true
        });
        console.log(map);


        let addPlaces = []; //array that gets filled with places the user needs to know how to get to
        //adds circles for all the locations the user needs to be able to get to
        //@todo needa check for places that aren't showing up on the map
        mapResults.places.forEach(async place =>{
            console.log('executed');
            let placeAddress = place.split(' ').join('+');
            let placeLocInfo =  await getLocationInfo(placeAddress);
            let placeLat = placeLocInfo.results[0].geometry.location.lat;
            let placeLng = placeLocInfo.results[0].geometry.location.lng
            addPlaces.push({placeName: place, lat: placeLat, lng: placeLng});
            console.log(placeLat, placeLng);
            createCircle(map, {placeLat, placeLng}, place)
        });

        //once the map loads, the play button is created
        if(map){
            let playBtn = document.createElement('button');
            playBtn.textContent = 'Play!'
            playBtn.onclick = e => {
                askRoute({lat, lng}, addPlaces);
            }
            placesFound.appendChild(playBtn);
        }


    }
});


//returns all the information from an inputted place value
async function getLocationInfo(address){
    try{
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);
        response = await response.json();
        console.log(response);
        return response;
    }catch(err){
        console.log(err);
    }
}


//loads the map with the required center
function createMap(options){
    map = new google.maps.Map(document.getElementById('map'), options);
    console.log('map created');
    return map
}


//draws a circle around a designated point to show locations needed to get to
function createCircle(map, center, place) {
    let circle = new google.maps.Circle({
        map: map,
        center: {lat: center.placeLat, lng: center.placeLng},
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: 30
    });
    console.log((circle));
}


async function askRoute(origin, possiblePlaces){
    const index = parseInt(Math.random()*possiblePlaces.length);
    let destinationPlace = possiblePlaces[index];

    returnRoute(origin, {lat: destinationPlace.lat, lng: destinationPlace.lng}, destinationPlace.placeName);
}

//uses Google's direction service to 
async function returnRoute(startLatLng, endLatLng, destName){
    let route;
    directionsService.route({
        origin: startLatLng.lat+','+startLatLng.lng,
        destination: endLatLng.lat+','+endLatLng.lng,
        travelMode: 'DRIVING'
    }, function(response, status){
        if(status === 'OK'){
            console.log(destName);
            console.log(response.routes[0].legs[0].steps);
        }
        else{
            console.log(status);
        }
    })
}

document.getElementById('test-button').addEventListener('click', async e =>{
    directionsService.route({
        origin: 'Disneyland',
        destination: 'Universal Studios Hollywood',
        travelMode: 'DRIVING'
    }, function(response, status){
        if(status === 'OK'){
            console.log(response.routes[0].legs[0].steps);
        }
        else{
            console.log(status);
        }
    })
});
window.onunload = function(){debugger;}
//    let route = await fetch(`http://maps.googleapis.com/maps/api/directions/json?origin=${startLatLng.lat},${startLatLng.lng}&destination=${endLatLng.lat},${endLatLng.lng}&key=${API_KEY}`, {mode: 'no-cors'});
// function displayMap(mapResults){
//     geocoder.geocode({'address': mapResults.location}, (results, status) =>{
//         if(status === geocoder.maps.GeocoderStatus.OK){

//             fetch()
//         }
//     })
// }