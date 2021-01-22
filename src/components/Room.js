import React, { Component, useEffect, useRef, useState, useContext } from "react";
import { GridList, GridListTile, List, ListItem, Paper, Card, CardContent, 
	Grid, Button, ButtonGroup, Typography, TextField, FormControl } from "@material-ui/core";
import {BrowserRouter as Router,Switch,Route,Link,Redirect,useParams,
} from "react-router-dom";
import { AlwaysScrollToBottom } from "./utils/AlwaysScrollToBottom";
import { getCookie } from "./utils/GetCookie";
import {host, protocol, ws_scheme, api} from "../globals";


export function Room() {
	let params = useParams(); // params.room
	const token = localStorage.getItem("noticias-vm-token");
	const room_code = params.room;
	const [ws, setWs] = useState(()=>new WebSocket(`ws://localhost:8000/ws/`, token));
	const [room, setRoom] = useState(null);
	const [messages, setMessages] = useState();
	const [users, setUsers] = useState(null);
	const [messageText, setMessageText] = useState(null);
	const updateMessageText = (e)=>setMessageText(e.target.value)

	const getRoom = () => fetch(`http://localhost:8000/api/rooms/?code=${room_code}`)
	.then((data) => data.json()).then(data=>{
		setRoom(data[0]);
		setMessages(data[0].messages);
	});
	
	// useEffect(() => getRoom(), []);
	// useEffect(()=>initWs(), []);
	
	const enterPress = (e) => e.keyCode === 13?submitMessage():null;

	const submitMessage = ()=>{
		console.log(messageText)
		if (messageText != null){
			ws.send(JSON.stringify({
				stream:"room",
				payload:{
					action:"create_message",
					message:messageText,
					request_id:token,
				},
			}));
		}
		setMessageText("");
	};

	

		ws.onmessage = function (e) {
			const message = JSON.parse(e.data);
			const payload = message.payload;
			const stream = message.stream;
			console.log(message)
			switch (stream) {
				case "room":
					switch (payload.action) {
						case "retrieve":
							setRoom(old =>payload.data);
							setMessages(old=>payload.data.messages);
							break;
						
						case "create":
							setMessages(old=>[...old, payload.data])
							break;
						default:
							break;
					}
					break;
			
				default:
					break;
			}

			// console.log(data);
			// if ("data" in data && data.data != null){
			// 	setUsers(data.data.current_users);
			// }
			// if ("usuarios" in data && data.usuarios != null){
			// 	setUsers(data.usuarios);
			// }
			// if (data.action === "create" && data.type==="message.activity"){
			// 	setMessages(oldMessages=>[...oldMessages, data]);
			// }
		}
		ws.onopen = function () {
			// if (room!=null){
				ws.send(JSON.stringify({
					stream:"room",
					payload:{
						code:room_code,
						action:"join_room",
						request_id:token,
					}
				}))
				ws.send(JSON.stringify({
					stream:"room",
					payload:{
						code:room_code,
						action:"retrieve",
						request_id:token,
					}
				}))
				ws.send(JSON.stringify({
					stream:"room",
					payload:{
						code:room_code,
						action:"subscribe_to_messages_in_room",
						request_id:token,
					}
				}))
				ws.send(JSON.stringify({
					stream:"room",
					payload:{
						code:room_code,
						action:"subscribe_instance",
						request_id:token,
					}
				}))
			// }
			// if (room != null){
			// 	ws.send(JSON.stringify({
			// 		pk: room.pk,
			// 		action: "join_room",
			// 		request_id: getCookie("csrftoken"),
			// 	}));
			// 	ws.send(JSON.stringify({
			// 		action: "subscribe_instance",
			// 		pk: room.pk,
			// 		request_id: getCookie("csrftoken"),
			// 	}));
			// 	ws.send(JSON.stringify({
			// 		action: "subscribe_to_messages_in_room",
			// 		pk: room.pk,
			// 		request_id: getCookie("csrftoken"),
			// 	}));
			// }
		}
		ws.onclose = function (e) {
			console.error('Chat socket closed unexpectedly');
			setTimeout(() =>setWs(new WebSocket(`${ws_scheme}://localhost:8000/ws/messages/`, token)), 1000 * 10);
		};



	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><Link to={`/frontend/rooms/`}>Rooms</Link></li>
					<li class="breadcrumb-item active" aria-current="page">{room?.nombre}</li>
				</ol>
			</nav>
		<div className="container">
			<h3 className="text-capitalize">
				Room {room?.nombre}, <small className="text-muted">{room?.host.username} is the host</small>
			</h3>
			<div className="row">
				<div className="col-xl-2 col-md-12 col-sm-12">
					<div className="row justify-content-center">
						<div className="col-12 mb-2">
							<ul class="list-group">
								{users?.map(user=>(
									<li class="list-group-item">{user.username}</li>
									))}
							</ul>
						</div>
						<div className="col-12 mb-2">
								<textarea onKeyDown={enterPress} onChange={(e)=>setMessageText(e.target.value)} value={messageText} className="form-control" rows="3" placeholder="Mensaje"/>
						</div>
						<div className="col-12 mb-2">
								<button onClick={submitMessage} className="btn btn-lg btn-dark">Enviar</button>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card m-2 p-5 " style={{maxHeight: "80vh", overflow: 'auto'}}>
						{messages?.map(msj=>(
							<div className="card mb-3">
								<div className="card-body">
									<Typography>
										{msj.created_at_formatted} {msj.user?.username}: {msj.text}
									</Typography>
								</div>
							</div>
						))}
						<AlwaysScrollToBottom/>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}
export default Room;