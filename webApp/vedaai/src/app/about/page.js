import Nav from "../nav/page22";
import Hnav from "../nav/page1";
import styleAbout from "../css/about.module.css"

import Team from "../team/page";


export default function About(){

    return( 
        <div className={styleAbout.all}>
        <Nav />
        <div className={styleAbout.right}>
            
            <div className= {styleAbout.Hnav}>
                <Hnav />
            </div>

            <div className={styleAbout.about} >
                <Team />

            </div>



        </div>
        



        </div>

)
}