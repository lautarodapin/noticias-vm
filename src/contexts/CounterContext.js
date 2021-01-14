import React, {useState} from "react";

const CounterContext = React.createContext();

export const CounterProvider = (props)=>{
    const [counter, setCounter] = useState(0);
    const upCounter = ()=>setCounter(old=>old+1);
    const downCounter = ()=>setCounter(old=>old-1);
    return (
        <CounterContext.Provider value={{counter, upCounter, downCounter}}>
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContext;