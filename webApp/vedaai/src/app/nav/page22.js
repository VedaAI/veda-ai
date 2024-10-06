"use client"

import stylesNav from '../css/nav.module.css'
import { storeData , removeData, getData } from "../../../utlis/localstorage";

import { useState , useEffect } from 'react';


export default function Nav(){

    const [getUser , setUser ] = useState();

    useEffect(() => {
        console.log(getData("user"));
        const x  = getData("user");
        console.log("X" +x);
        
        
    },[]);



    
    
    
    console.log("loacal ")


    return(
        <div className = {stylesNav.flex}>
            <div className={stylesNav.top}>
                <img src="" alt="logo"></img>
            </div>
            <div className={stylesNav.centereText}>

            <div className={stylesNav.box} >
                <h2> </h2>
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