import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchArea.module.css'; 


export default function SearchArea({popupShow, popupHandler, cityInfoToss}){
    const [city, setCity] = useState('');
    const inputRef = useRef(null); 

    useEffect(()=>{
        inputRef.current.focus(); 
    }, [])

    function handleSearch(){
        cityInfoToss(city)
        popupHandler(false);
        setCity(''); 
    }

    function handleKeyDown(e){
        if(e.keyCode===13){
            cityInfoToss(city)
            popupHandler(false);
            setCity('');
        }
    }

    return(
        <section 
            className={`${styles['search-wrap']} ${popupShow? styles['show'] : '' }`}
        >
            <div className={[styles['search-container']]}>
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