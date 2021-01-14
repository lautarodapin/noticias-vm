import '../App.css';
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
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
import HomePage from "./HomePage";
import RoomList from "./RoomList";
import LoginForm from "./LoginForm";
import Nav from "./Nav";
import reportWebVitals from '../reportWebVitals';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("token") ? true : false)
	const [username, setUsername] = useState("");

	const handle_login = (e, username, password, location, history) => {
		e.preventDefault();
		fetch('/api/token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		})
			.then(res => {
				if (!res.ok) throw res;
				return res.json();
			}).then(
				json => {
					localStorage.setItem('token', json.token);
					setLoggedIn(old => true);
					setUsername(old => json.user.username);
					history.goBack()
				});
	};
	const handle_logout = () => {
		localStorage.removeItem("token");
		setLoggedIn(old => false);
		setUsername(old => "");

	}

	// if (!loggedIn)
	//   return <LoginForm handle_login={handle_login}></LoginForm>;

	return (
		<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} handle_login={handle_login} handle_logout={handle_logout} />
	);
}

export default App;
