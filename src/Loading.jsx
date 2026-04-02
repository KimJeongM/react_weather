import styles from './Loading.module.css'

export default function Loading(){
    return(
         <div className={styles['loading-wrap']}>
            <p className={styles['loading-text']}>Loading</p>
            <div className={styles['loading-box']}>
                <span className={styles['loading-pointer']}></span>
            </div>
        </div>
    )
}