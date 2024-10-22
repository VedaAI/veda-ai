"use client"

import Nav from "../nav/page22";
import styleChat from '../css/chat.module.css';
import Hnav from "../nav/page1";
import { storeData , removeData, getData } from "../../../utlis/localstorage";

import Chat2 from "../chat2/page";

export default function Chat(){


    return (
        <div className={styleChat.all}>
            <div>
                <Nav />
            </div>
            <div className={styleChat.right}>
            <Hnav />

            <div className={styleChat.chat}>


                {/* <div className={styleChat.input}>
                <input type="text" name="chat" />
                <button>&gt;</button>

 

                </div> */}

                <Chat2 />


            </div>
            </div>




        </div>


    )
}