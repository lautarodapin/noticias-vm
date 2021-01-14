import React, { Component, useState, useEffect, useContext } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, Divider, FormLabel, FormControl, Input, } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useHistory,
    useLocation,
} from "react-router-dom";
import Comentario from "./Comentario";
import parse from 'html-react-parser';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import UserContext from "../contexts/UserContext";
import { getCookie } from "./utils/GetCookie";

export function RegisterForm(props) {
    const location = useLocation();
    const history = useHistory();
    const { handleTokenData } = useContext(UserContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])


    let resStatus = 0
    const submitHandler = (e) => {
        e.preventDefault()
        fetch(`/api/users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken")},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(r => { resStatus = r.status; return r.json() })
            .then(
                data => {
                    console.log(data);
                    switch (resStatus) {
                        case 201:
                            handleTokenData({user:data, token:data.token});
                            setUsername(old=>"");
                            setPassword(old=>"");
                            setErrors(old=>[]);
                            history.push("/frontend/notas/");
                            break;
                        default:
                            console.log("Else", data);
                            setErrors(old=>[...old, data.detail]);
                            break;
                    }
                })
    }

    return (
        <Grid container alignItems="center" justify="center" style={{ height: "100vh" }}>
            <form onSubmit={submitHandler}>
                <FormControl>
                    <Typography variant="h3">Registrarse</Typography>
                    {errors && errors.map(error => (<ul>
                        <li>
                            <Typography variant="p">
                                {error}
                            </Typography>
                        </li>
                    </ul>))}
                    <FormLabel>
                        <Input required={true} autoComplete="" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(old => e.target.value)} />
                    </FormLabel>
                    <FormLabel>
                        <Input required={true} autoComplete="" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(old => e.target.value)} />
                    </FormLabel>
                    <input type="submit" className="btn btn-lg btn-dark" />
                </FormControl>
            </form>
        </Grid>
    );
}
