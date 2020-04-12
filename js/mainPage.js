let mapCenterLocation = document.getElementById('center-location');
let mapRadius = document.getElementById('mile-radius');


function mapInfo (){
    if(mapCenterLocation.value && mapRadius.value){
        let location = mapCenterLocation.value;
        let radius = mapRadius.value;
        console.log(radius)
        mapCenterLocation.value = '';
        mapRadius.value = '';
        return {
            location: location,
            radius: radius
        }
    }
    else{
        console.log('missing one or two inputs');
    }
}
