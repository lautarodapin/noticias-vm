import React, { Component, useState, useEffect, useContext } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, Divider, FormLabel, FormControl, Input } from "@material-ui/core";
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
 
export function  LoginForm(props) {
    const location = useLocation();
    const history = useHistory();
    const {loginHandler} = useContext(UserContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <Grid container alignItems="center" justify="center" style={{height:"100vh"}}>
            <form onSubmit={e=>{
                loginHandler(username, password);
                history.push("/frontend/notas/");
                }}>
                <FormControl>
                    <Typography variant="h3">Log In</Typography>
                    <FormLabel>
                        <Input autoComplete="username" type="text" placeholder="Usuario" value={username} onChange={e=>setUsername(old=>e.target.value)} />
                    </FormLabel>
                    <FormLabel>
                        <Input autoComplete="password" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(old=>e.target.value)} />
                    </FormLabel>
                    <input type="submit" className="btn btn-lg btn-dark" />
                </FormControl>
            </form>
        </Grid>
      );
  
}
export default LoginForm;
