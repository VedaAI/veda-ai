import stylesNav from '../css/nav.module.css'


export default function Nav(){

    return(
        <div className = {stylesNav.flex}>
            <div className={stylesNav.top}>
                <img src="" alt="logo"></img>
            </div>
            <div className={stylesNav.centereText}>

            <div className={stylesNav.box} >
                <h2> Agrim Kulshreshtha </h2>
                <h3> agrim@gmail.com </h3>
            </div>
            <div className={stylesNav.history}>
                <h5>history

                </h5>
            </div>


            </div>
            <div className={stylesNav.bottom}>
                <h4> LOGOUT </h4>
            </div>
        </div>
    )


}