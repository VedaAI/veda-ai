import stylesHNav from '../css/horzontalNav.module.css'
import Link from 'next/link'


export default function Hnav() {

    return(
        <div className={stylesHNav.flex}>
            <Link href="../chat">
            Chat
            </Link>
            <Link href="../about">
            About us
            </Link>

            

        </div>
    )


}