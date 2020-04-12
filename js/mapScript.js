let map, infoWindow;
let submitButton = document.getElementById('submit');
let geocoder;
let API_KEY = 'AIzaSyA84EBjWciqhya_DJ8S_Auc5qNeHs8v2lY';
function initMap(){
    geocoder = new google.maps.Geocoder();
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
        //adds circles for all the locations the user needs to be able to get to
        mapResults.places.forEach(async place =>{
            console.log('executed');
            let placeAddress = place.split(' ').join('+');
            let placeLocInfo =  await getLocationInfo(placeAddress);
            let placeLat = placeLocInfo.results[0].geometry.location.lat;
            let placeLng = placeLocInfo.results[0].geometry.location.lng
            createCircle(map, {placeLat, placeLng})
        });



    }
});

async function getLocationInfo(address){
    try{
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);
        response = await response.json();

        return response;
    }catch(err){
        console.log(err);
    }
}

function createMap(options){
    map = new google.maps.Map(document.getElementById('map'), options);
    console.log('map created');
    // console.log(placeArray.length);
    // placeArray.forEach(place => {
    //     console.log(place.placeLat);
    //     let placeCircle= new google.maps.Circle({
    //         strokeColor: '#FF0000',
    //         strokeOpacity: 0.8,
    //         strokeWeight: 2,
    //         fillColor: '#FF0000',
    //         fillOpacity: 0.35,
    //         map: map,
    //         radius: 20000,
    //         center: {lat: place.placeLat, lng: place.placeLng}
    //     })
    //})
    return map
}

function createCircle(map, center) {
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

function displayMap(mapResults){
    geocoder.geocode({'address': mapResults.location}, (results, status) =>{
        if(status === geocoder.maps.GeocoderStatus.OK){

            fetch()
        }
    })
}