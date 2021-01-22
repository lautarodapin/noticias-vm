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
	return (
		<HomePage  />
	);
}

export default App;
