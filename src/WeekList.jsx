import WeekItem from "./WeekItem"; 
import styles from './WeekWeatherWrap.module.css'


export default function WeekList({weatherData}){
    const keys = Object.keys(weatherData); 
    const dayWeather = []; 
    keys.forEach((key, index)=>{
        const obj ={};
        const arr = weatherData[key].map((item) => item.temper); 
        obj.day = key; 
        obj.minTemper = Math.min(...arr); 
        obj.maxTemper = Math.max(...arr);
        obj.id = `${key.replaceAll('-', '')}-${index}`; 
        obj.weatherCode = getWeatherCode(weatherData[key])
        dayWeather.push(obj);
    })

    return(
        <ul className={ styles['week-list']}>
            {
                dayWeather.map((item)=>{
                    const {day, minTemper, maxTemper, id, weatherCode } = item;
                    return(
                        <WeekItem
                            day={day}
                            minTemper={minTemper} 
                            maxTemper={maxTemper} 
                            key={id}
                            weatherCode={weatherCode}
                        />
                    )
                })
            }
        </ul>
    )
}

function getWeatherCode(oneDayWeatherData){
     const getCode = (arr) =>{
        let code;
        const codeMass = arr.map((item)=>item.weathercode);
        if(codeMass.filter((i) => i > 3).length){
            code = Math.max(...codeMass); 
        }else{
            const obj = {}; 
            codeMass.map((i) => obj[i] = (i in obj)? obj[i] + 1 : 1); 
            code = Object.keys(obj).find((key)=> {
                return Math.max(...Object.values(obj)) == obj[key]
            }); 
        }
        return code * 1; 
    }

    const AMCode = getCode(oneDayWeatherData.filter((data)=>(parseInt(data['time']) < 12))); 
    const PMCode= getCode(oneDayWeatherData.filter((data)=>(parseInt(data['time']) > 12))); 
    const dayWeatherCode = {AMCode, PMCode}; 

    return dayWeatherCode; 
}