import React, { createContext, useState, useEffect } from "react";


const WsContext = createContext();


export const WsProvider = (props) => {
    const [ws, setWs] = useState();
    useEffect(() => {
        getWs();
    }, []);
    
    const getWs = ()=>{
        setWs(old => new WebSocket("ws://localhost:8000/ws/"));
    };


    return (
        <WsContext.Provider value={{ws, setWs}}>
            {props.children}
        </WsContext.Provider>
    );
}

export default WsContext;