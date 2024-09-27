import Nav from "../nav/page";
import styleChat from '../css/chat.module.css'


export default function Chat(){


    return (
        <div className={styleChat.all}>
            <div>
                <Nav />
            </div>

            <div className={styleChat.chat}>
                <input type="text" name="chat" />


            </div>


        </div>


    )
}