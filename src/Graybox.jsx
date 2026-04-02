export default function Graybox({children, boxTitle, pseudoBool}){
    const pseudo = pseudoBool; 

    return(
        <div className={`data-box ${pseudo? 'is-pseudo' : ''}`} >
            <p className="data-title">{boxTitle}</p>
            {children}
        </div>
    )
}