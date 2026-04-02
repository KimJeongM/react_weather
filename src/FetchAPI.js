import {getSplitArray} from './Util'; 

export default function FetchAPI(location){
    const {lat, lng} = location;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&temperature_unit=celsius&daily=sunrise,sunset&timezone=auto`;
   
    return fetchData(url); 
}

async function fetchData(url){
    const response = await fetch(url); 
    const data = await response.json(); 
    const weatherInfo = await makeArray(data); 
    return weatherInfo; 
}

function makeArray(data){
    const {hourly, daily} = data;
    const weatherData = {}; 
    for(let i = 0; i < hourly.time.length; i++ ){
        const obj = {}
        const weatherDate = getSplitArray(hourly.time[i]); 
        obj.time = weatherDate[1]; 
        obj.weathercode = hourly.weathercode[i];
        obj.temper = Math.round(hourly.temperature_2m[i]); 

        if(weatherDate[0] in weatherData){// 해당 키가 있다면 
            weatherData[weatherDate[0]].push(obj)
        }else{ // 해당 키가 없다면 
            const arr = []; 
            arr.push(obj); 
            weatherData[weatherDate[0]] = arr; 
        }
        
    }
    return [weatherData, daily];
}


