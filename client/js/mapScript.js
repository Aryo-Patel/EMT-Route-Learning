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


        let addPlaces = []; //array that gets filled with places the user needs to know how to get to
        //adds circles for all the locations the user needs to be able to get to
        //@todo needa check for places that aren't showing up on the map
        mapResults.places.forEach(async place =>{
            let placeAddress = place.split(' ').join('+');
            let placeLocInfo =  await getLocationInfo(placeAddress);
            let placeLat = placeLocInfo.results[0].geometry.location.lat;
            let placeLng = placeLocInfo.results[0].geometry.location.lng
            addPlaces.push({placeName: place, lat: placeLat, lng: placeLng});
            createCircle(map, {placeLat, placeLng}, place)
        });

        //once the map loads, the play button is created
        if(map){
            if(document.getElementById('play-button') == null){
                let playBtn = document.createElement('button');
                playBtn.textContent = 'Play!'
                playBtn.id = 'play-button'
                playBtn.onclick = e => {
                    console.log(mapResults.location);
                    askRoute({lat, lng}, addPlaces, mapResults.location);
                }
                placesFound.appendChild(playBtn);
            }
        }


    }
});


//returns all the information from an inputted place value
async function getLocationInfo(address){
    try{
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);
        response = await response.json();
        return response;
    }catch(err){
        console.log(err);
    }
}


//loads the map with the required center
function createMap(options){
    map = new google.maps.Map(document.getElementById('map'), options);
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
}

//generates a random place from the user's inputted list
async function askRoute(origin, possiblePlaces, originPlace){
    const index = parseInt(Math.random()*possiblePlaces.length);
    let destinationPlace = possiblePlaces[index];

    returnRoute(origin, {lat: destinationPlace.lat, lng: destinationPlace.lng}, originPlace, destinationPlace.placeName);
}

//uses Google's direction service to get the routes from the EMT facility to the desired location
//extracts the route data and sends it to the game script
async function returnRoute(startLatLng, endLatLng, originName, destName){
    let route;
    directionsService.route({
        origin: startLatLng.lat+','+startLatLng.lng,
        destination: endLatLng.lat+','+endLatLng.lng,
        travelMode: 'DRIVING'
    }, function(response, status){
        if(status === 'OK'){
            console.log(originName);
            console.log(destName);
            let routes = response.routes[0].legs[0].steps;
            console.log(routes);
            let instructions = routes.map(route =>{
                return route.instructions
            });
            console.log(instructions);
            initializeGameBoard(originName, destName, instructions);
        }
        else{
            console.log(status);
        }
    })
}

