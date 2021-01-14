import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import RoomList from "./RoomList";
import Room from "./Room";
import NotaPage from "./NotaPage";
import Nota from "./Nota";
import NotaList from "./NotaList";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import  {UserProvider}  from "../contexts/UserContext";
import { RegisterForm } from "./RegisterForm";
// import { CounterProvider } from "../contexts/CounterContext";

export default function HomePage(props) {

	return (
		<Router>
			<UserProvider>
				<Nav />
				<Switch>
					<Route
						exact
						path="/frontend/"
						render={() => {
							return (
								<p>Home page</p>
							);
						}}
					/>
					<Route exact path="/frontend/rooms/">

						<RoomList />
					</Route>
					<Route exact path="/frontend/rooms/:room/">
						<Room></Room>
					</Route>
					<Route exact path="/frontend/notas/" component={NotaList} />
					<Route exact path="/frontend/crear/nota/" component={NotaPage} />
					<Route exact path="/frontend/nota/:slug/">
						{/* <CounterProvider> */}
						<Nota></Nota>
						{/* </CounterProvider> */}
					</Route>
					<Route exact path="/frontend/login/" >
						<LoginForm />
					</Route>
					<Route exact path="/frontend/register/" >
						<RegisterForm />
					</Route>
				</Switch>
			</UserProvider>
		</Router>
	);

}
