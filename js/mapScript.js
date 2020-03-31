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
        let address = mapResults.location.split(' ');
        address = address.join('+');

        const locInfo = await getLocationInfo(address);
        
        const {lat, lng} = locInfo.results[0].geometry.location;
        let radius = parseInt(mapResults.mapRadius)*1609.34;
        createMap({
            center: {lat, lng},
            zoom: 15,
            draggable: false
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
    console.log(options.center);
    circle = new google.maps.Circle({
        map: map,
        center: {lat: options.center.lat, lng: options.center.lng},
        radius: circleOptions.radius,
        fillOpacity: 0.9,
        fillColor: '#FF0000'
    });
    console.log('circle created');
    // map.fitBounds(circle.getBounds());
}