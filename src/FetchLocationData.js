export function fetchLocationData(city){
    return  searchLocation(city);
}

export function fetchReverseLocationData(location){
    return searchAddress(location); 
}

async function searchLocation(city){
    let locationInfo = null;
    if(!city.trim().length){
        alert('도시명을 입력해 주세요.'); 
        return; 
    }
    try{
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&accept-language=ko`
        );
        
        const data = await response.json(); 
        if(data.length > 0){
            const lat = Number(data[0].lat); 
            const lng = Number(data[0].lon); 
            locationInfo = {lat, lng, city}
        }else{
            alert('원하는 위치를 찾을 수 없습니다.'); 
        }
    }catch(err){
        console.log(err)
    }
    return locationInfo; 
}

async function searchAddress(location){
    const {lat, lng} = location; 
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ko`);
    const data = await response.json(); 
    if(Object.keys(data).length > 0){
        const city = data.address.city;
        return city.replaceAll(/(특별시|광역시|직할시|특별자치시|특별자치도|도|시|군|구)$/g, '')
    }
}




