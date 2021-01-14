import React, { createContext, useState, useEffect } from "react";


const UserContext = createContext();


export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("noticias-vm-token"));
    const [user, setUser] = useState();
    const [isLog, setIsLog] = useState(false);
    const [isStaff, setIsStaff] = useState(false)
    const [polling, setPolling] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("noticias-vm-token"));
        getUserData(token)
    }, []); // ? Reload user data if has token
    
    const getUserData = (token)=>{
        fetch(`/api/users/get-user-with-token/?token=${token}`, {
            method:"GET",
            headers: { "Content-Type": "application/json" },
        }).then(data=>data.json())
        .then(data=>{
            console.log(data);
            setUser(old => data.user);
            setIsLog(old => true);
            setIsStaff(old => data.user.is_staff);
        });
    }


    const loginHandler = (username, password) => {
        setPolling(old => true);
        fetch(`/api/auth/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(r => r.json()).then(data => {
            console.log("Login handler", data);
            handleTokenData(data)
            setPolling(old => false);
        });
    };
    const logoutHandler = () => {
        setUser(old => null);
        setIsLog(old => false);
        setToken(old => null)
        setIsStaff(old => false)
        localStorage.removeItem("noticias-vm-token");
    }

    const handleTokenData = (data) => {
        setToken(old => data.token);
        setUser(old => data.user);
        setIsLog(old => true);
        setIsStaff(old => data.user.is_staff);
        localStorage.setItem("noticias-vm-token", data.token);
    };

    return (
        <UserContext.Provider value={{ user, loginHandler, logoutHandler, isLog, token, polling, handleTokenData }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;