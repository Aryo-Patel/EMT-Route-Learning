let map, infoWindow;
let submitButton = document.getElementById('submit');
let geocoder;
let API_KEY = 'AIzaSyA84EBjWciqhya_DJ8S_Auc5qNeHs8v2lY';
function initMap(){
    console.log('init ran');
    geocoder = new google.maps.Geocoder();
}

submitButton.addEventListener('click', async function(e){
    e.preventDefault();
    let mapResults = mapInfo();
    if(mapResults){
        console.log(mapResults.radius)
        let address = mapResults.location.split(' ');
        address = address.join('+');

        const locInfo = await getLocationInfo(address);
        
        const {lat, lng} = locInfo.results[0].geometry.location;
        console.log(lat, lng);
        let radius = parseInt(mapResults.radius)*1609.34;
        console.log(radius);
        createMap({
            center: {lat, lng},
            zoom: 15,
            draggable: true
        }, {radius});
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
function displayMap(mapResults){
    geocoder.geocode({'address': mapResults.location}, (results, status) =>{
        if(status === geocoder.maps.GeocoderStatus.OK){

            fetch()
        }
    })
}

function createMap(options, circleOptions){
    map = new google.maps.Map(document.getElementById('map'), options);
    console.log('map created');
    console.log(circleOptions.radius);
    circle = new google.maps.Circle({
         map: map,
         center: {lat: Number(options.center.lat), lng: Number(options.center.lng)},
         radius: circleOptions.radius,
         fillOpacity: 0,
         fillColor: '#FF0000'
    });
    console.log('circle created');
    map.fitBounds(circle.getBounds());
}