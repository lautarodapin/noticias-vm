import React, { Component, useState, useEffect, useContext } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, Divider, FormControl, Input } from "@material-ui/core";
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

export function Nav(props) {
	let location = useLocation();
	const { user, isLog, logoutHandler } = useContext(UserContext);
	// return (
	// 	<ul>
	// 		<li>
	// 			Token: {user?.token}
	// 		</li>
	// 		<li>
	// 			IsLoged: {isLog ? "Si" : "No"}
	// 		</li>
	// 		<li>
	// 			<button onClick={logoutHandler}>Logout</button>
	// 		</li>
	// 		<li>
	// 			<Link to="/frontend/login/">Login</Link>
	// 		</li>
	// 	</ul>
	// );
	return 	(
	<nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand ml-2" href="/frontend/notas/">
                LOGO
            </a>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/frontend/notas/">
                            Notas
                        </a>
                    </li>
					{isLog && (
						<li className="nav-item">
							<a className="nav-link" href="/frontend/crear/nota/">
								Crear nota
							</a>
						</li>
					)}
                    <li className="nav-item">
                        <a className="nav-link" href="/frontend/rooms/">
                            Chat Rooms
                        </a>
                    </li >
                </ul >
            </div >
            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto">
					Title
                </a>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    {isLog ? (
						<>
						<li className="nav-item">
							<a className="flex-sm-fill text-sm-center nav-link disabled" href="#">
								{user?.username}
							</a>
						</li>
						<li className="nav-item">
							<a className="flex-sm-fill text-sm-center nav-link" onClick={logoutHandler}>
							Cerrar sesion
							</a>
						</li>
						</>
					):(
						<>
						<li className="nav-item">
							<a className="flex-sm-fill text-sm-center nav-link" href="/frontend/login/">
							Login
							</a>
						</li>
						<li className="nav-item">
							<a className="flex-sm-fill text-sm-center nav-link" href="/frontend/register/">
							Registrarse
							</a>
						</li>
						</>
					)
					}
                </ul>
            </div>
		</nav>
		);
}
export default Nav;
