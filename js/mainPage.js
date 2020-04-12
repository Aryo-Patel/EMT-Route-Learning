let mapCenterLocation = document.getElementById('center-location');
let mapInputs = document.getElementById('map-input');
let addPlaces = document.getElementById('add-places');
let add = document.getElementById('add');

add.addEventListener('click', e => mapInfo(e));

function deletePlace(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}


//Adds to the list of places the user needs to know how to get to.
function mapInfo (e){
    e.preventDefault();
    if(mapCenterLocation.value && mapInputs.value){
        let places = mapInputs.value.split(', ');
        places.forEach(place =>{
            let placeContainer = document.createElement('li');
            placeContainer.addEventListener('click', e => deletePlace(e));
            let placeText = document.createElement('span');
            placeText.textContent = place;
            placeContainer.appendChild(placeText);
            addPlaces.appendChild(placeContainer);
        })
        addPlaces.scrollTop = addPlaces.scrollHeight;

        mapInputs.value = '';
    }
}
