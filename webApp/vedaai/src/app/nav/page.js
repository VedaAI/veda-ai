import styles from '../css/nav.module.css'


export default function nav(){

    return(
        <div className = {styles.flex}>
            <div className={styles.top}>
                <img src="" alt="logo"></img>
            </div>
            <div>

            </div>
            <div className={styles.bottom}>
                <h1> LOGOUT </h1>
            </div>
        </div>
    )


}