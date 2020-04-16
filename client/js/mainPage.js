let mapCenterLocation = document.getElementById('center-location');
let mapInputs = document.getElementById('map-input');
let addPlaces = document.getElementById('add-places');
let add = document.getElementById('add');

add.addEventListener('click', e => mapInfo(e));

function deletePlace(e) {
    let index = destinations.indexOf(e.target.textContent);
    destinations.splice(index, 1);

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

const destinations = [];

//Adds to the list of places the user needs to know how to get to.
function mapInfo (e){
    e.preventDefault();
    if(mapCenterLocation.value && mapInputs.value){
        let places = mapInputs.value.split(', ');
        places.forEach(place =>{
            destinations.push(place);
            let placeContainer = document.createElement('li');
            let placeText = document.createElement('span');
            placeText.addEventListener('click', e => deletePlace(e));
            placeText.textContent = place;
            placeContainer.appendChild(placeText);
            addPlaces.appendChild(placeContainer);
        })
        addPlaces.scrollTop = addPlaces.scrollHeight;

        mapInputs.value = '';
    }
}


//returns an object that contains the EMT facility location and an array containing all the locations to get to
function getLocations() {
    if(mapCenterLocation.value && addPlaces.children.length > 0){
        return {
            location: mapCenterLocation.value,
            places: destinations
        }
    }
    else{
        alert('missing one or two of the inputs')
    }
}
