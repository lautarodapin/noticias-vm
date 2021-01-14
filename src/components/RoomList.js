import React, { Component, useState, useEffect, useContext } from "react";
import { Grid, Button, ButtonGroup, Typography, Box } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { LoginLink } from "./singleComponents/LoginLink";
import { getCookie } from "./utils/GetCookie";

const Room = (props) => {
	const {isLog} = useContext(UserContext);
	const room = props.room;
	const host = room.host;
	const current_users = room.current_users;
	const code = room.code;
	return (
		<div className="card m-1 p-1 mb-3">
			<div className="card-header">
				{host.username}'s room
		</div>
			<div className="card-body">
				<ul class="list-group list-group-flush">
					<li class="list-group-item">
						Room "{room.nombre}"
					</li>
					{current_users?.map(user => (
						<li class="list-group-item">
							{user.username}
						</li>
					))}
				</ul>
				{isLog && <Link className="btn btn-dark mt-3" to={`/frontend/rooms/${code}`}>Ingresar</Link>}
			</div>
		</div>

	);
};

const RoomForm = (props) => {
	const [nombre, setNombre] = useState("")
	const submitHandler = () => {
		fetch(`/api/rooms/`, {
			method: "POST",
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': getCookie("csrftoken"),},//'X-CSRFToken': $(token).val(), },
			body: JSON.stringify({ nombre: nombre })
		})
			.then(response => response.json())
			.then(data => { console.log(data); props.onChange(data); }, (error) => null);
	};
	return (
		<div className="jumbotron text-center jumbotron-fluid">
			<div className="display-2">
				Cree un nuevo room
			</div>
			<div className="form-group">
				<label>
					Nombre: 
				<input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre} />
				</label>
				<button onClick={submitHandler} className="m-3 btn btn-lg btn-dark">Crear</button>
			</div>
			<div className="display-4 text-muted">O ingrese a uno ya creado</div>

		</div>
	);
};
export function RoomList() {
	const {isLog, polling} = useContext(UserContext);
	const [room, setRoom] = useState(null);
	const [nombre, setNombre] = useState(null);
	const [roomCreado, setRoomCreado] = useState(null);
	useEffect(() => getRoom(), []);

	const getRoom = () => fetch(`/api/rooms/`).then((r) => r.json()).then(data => setRoom(room => data));
	if (room == null) return (
		<div>Cargando...</div>
	);
	const newRoom = (data) => { setRoom((room => [data, ...room])) };

	// console.log(isLog, polling);
	// if (!isLog && !polling) {
	// 	return (<Redirect to="/frontend/login/"/>)
	// }
	return (
		<Grid>
			{isLog?<RoomForm onChange={newRoom} />:(
				<LoginLink/>
			)}
			
			<Box component="div" overflow="auto" maxHeight="50vh">
			{
				room?.map((item) => (
					<Room room={item} />
					))
				}
		</Box>
		</Grid>
	);
}
export default RoomList;