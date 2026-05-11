const KEY = import.meta.env.VITE_KAKAO_API_KEY;
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
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(city)}`,
            {
                headers: { "Authorization": `KakaoAK ${KEY}` }
            }
        );
        const data = await response.json(); 
        const areaData = data.documents; 
        if(data.documents.length > 0){
            const lat = Number(areaData[0].y); 
            const lng = Number(areaData[0].x); 
            const detailCity = areaData[0].address_name;
            locationInfo = {lat, lng, detailCity}
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
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`, 
        {
            headers: {
                Authorization: `KakaoAK ${KEY}`,
            },
        }
    );
    const data = await response.json(); 
    if(Object.keys(data).length > 0){
        const city = data.documents[0].address_name;

        return city.replaceAll(/(특별시|광역시|직할시|특별자치시|특별자치도|도|시|군|구)$/g, '')
    }
}




