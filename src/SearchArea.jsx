import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import styles from './SearchArea.module.css'; 
import FetchAPI from "./FetchAPI";
import {fetchLocationData, fetchReverseLocationData} from "./FetchLocationData";


export default function SearchArea({popupShow, popupHandler, cityInfoToss}){
    const [city, setCity] = useState('');
    const inputRef = useRef(null); 

    useEffect(()=>{
        inputRef.current.focus(); 
    }, [])

    async function handleSearch(){
        const searchWord = city.trim();
        cityInfoToss(searchWord)
        popupHandler(false);
        setCity(''); 
    }
   
    function handleKeyDown(e){
        if(e.key=== 'Enter') handleSearch();
    }

    return(
        <section 
            className={`${styles['search-wrap']} ${popupShow? styles['show'] : '' }`}
        >
            <div className={styles['search-container']}>
                <p className={styles['search-title']}>Search Your Weather</p>
                <div className={styles['search-inner']}>
                    <input type="text" 
                        className={styles['search-input']} 
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                        placeholder="Find..."
                    />
                    <button 
                        type="button"
                        onClick={handleSearch}
                        className={styles['submit-btn']}
                    >{<FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'white'}}/>}</button>
                </div>
                {/* <div className={styles['result-area']}>
                    <ul className={styles['result-list']}>
                        <li className={styles['result-item']}><button type="button">Lorem ipsum dolor sit amet.</button></li>
                    </ul>
                </div> */}
            </div>
            <button type="button" 
                className={[styles['popup-close']]} 
                onClick={() => {
                    popupHandler(false);
                }}
            >
                <FontAwesomeIcon icon={faXmark} style={{color:'white'}} />
            </button>
        </section>
    );
}