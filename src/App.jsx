import { useState, useEffect } from "react";
import SearchArea from "./SearchArea";
import NowWeatherWrap from "./NowWeatherWrap";
import WeekWeatherWrap from "./WeekWeatherWrap";
import WeekList from "./WeekList";
import TimeWeatherWrap from "./TimeWeatherWrap";
import TimeList from "./TimeList";
import FetchAPI from "./FetchAPI";
import Loading from "./Loading";
import {fetchLocationData, fetchReverseLocationData} from "./FetchLocationData";
import {getDateAddZero, getTimeAddZero, getSplitArray} from './Util'; 

function  App() {
    const [weatherData, setWeatherData] = useState(null); 
    const [dailyData, setDailyData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [popupShow, setPopupShow] = useState(false); 
    const [weatherCity, setWeatherCity] = useState('');
    const now = getSplitArray(getNowTime()); 
    let nowWeather = []; 
    try{
        if(weatherData){
            const wData = weatherData[getDateAddZero(now[0])]; 
            if(wData && Array.isArray(wData)){
                nowWeather = wData.filter((item) => parseInt(item.time) === parseInt(getTimeAddZero(now[1]))); 
            }
        }
    }catch {
        console.error('데이터 처리 중 error'); 
        nowWeather = []; 
    }

   /* 내 지역 위치 찾기 */
    useEffect(() =>{
        const loadData = async () =>{
            try{
                const position = await new Promise((resolve, reject) =>{
                    navigator.geolocation.getCurrentPosition(resolve, reject); 
                }); 
                const coordsObj = {lat : position.coords.latitude, lng : position.coords.longitude}
                const myCity = await fetchReverseLocationData(coordsObj); 
               
                await getCityWeather(myCity);
            } catch(error){
                console.error('로딩 중 오류', error);
                await getCityWeather('서울');
            } finally{
                setIsLoading(false);
            }
        }
        loadData(); 
    }, []) ; 

    function popupHandler(state){
        setPopupShow(state);
    }

    async function cityInfoToss(city){
        try{
            setIsLoading(true);
            await getCityWeather(city);
        }catch(error){
            console.error('해당 도시 정보 로딩 중 오류', error); 
        }finally{
            setIsLoading(false);
        }
    }

    async function getCityWeather(city){
        let detailCity = city.split(' ').at(-1);
        const locationInfo = await fetchLocationData(detailCity); 
        locationInfo.city = locationInfo.detailCity.split(' ').at(-1);
        
        const data = await FetchAPI(locationInfo); 
        setWeatherData(data[0]);
        setDailyData(data[1]);
        setWeatherCity(locationInfo.detailCity);
    }

    if(isLoading){
        return <Loading />;
    } 

    return (
        <div className="wrap">
            {popupShow && <SearchArea popupShow={popupShow} popupHandler={popupHandler} cityInfoToss={cityInfoToss} />}
            <NowWeatherWrap 
                nowWeather={nowWeather} 
                dailyData={dailyData} 
                popupHandler={popupHandler} 
                weatherCity={weatherCity}    
            />
            <div className="detail-wrap">
                <TimeWeatherWrap>
                    <TimeList weatherData={weatherData} dailyData={dailyData}  />
                </TimeWeatherWrap>
               <WeekWeatherWrap>
                    <WeekList weatherData={weatherData} />
                </WeekWeatherWrap>
            </div>
        </div>
    )
}

function getNowTime(){
    const now = new Date(); 
    const fullYear = now.getFullYear(); 
    const month = now.getMonth() + 1
    const day = now.getDate();
    const hour = now.getHours();
    
    return `${fullYear}-${month}-${day}T${hour}:00`;
}





export default App;



