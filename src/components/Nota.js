import React, { Component, useState, useEffect, useContext } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, Divider, FormControl, Input } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useParams,
} from "react-router-dom";
import Comentario from "./Comentario";
import parse from 'html-react-parser';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import UserContext from "../contexts/UserContext";


const CommentForm = (props)=>{
	const [cuerpo, setCuerpo] = useState(null);
	const postComment = ()=>fetch(`/api/comentario/`, {
		method:"POST",
		headers: { 
			// 'Accept': 'application/json', 
			'Content-Type': 'application/json', 
			// 'X-CSRFToken': $(token).val(), 
			Authorization: `Token ${localStorage.getItem("noticias-vm-token")}`
		},
		body:JSON.stringify({
			cuerpo:cuerpo,
			nota:props.slug,
			// autor:window.username_id,
		})
	}).then(r=>r.json()).then(data=>props.setComments(comments=>[...comments, data])).then(setCuerpo(old=>""));
		return (
        <FormControl fullWidth={true}>
            <Input required={true} onChange={(e)=>setCuerpo(e.target.value)} value={cuerpo} placeholder="Comentario" fullWidth={true} margin="dense" className="mb-2 mt-3"></Input>
            <Button onClick={postComment} color="secondary" variant="contained">Comentar</Button>
        </FormControl>
    );
}

export function  Nota() {
	const {user, isLog} = useContext(UserContext)
	const params = useParams();
	const slug = params.slug;
	const [nota, setNota] = useState(null);
	const [comments, setComments] = useState(null)
	useEffect(()=>getNota(), []);
	const getNota = ()=>fetch(`/api/nota/${slug}/`).then(r=>r.json()).then(data=>{
		setNota(oldNota=>data);
		setComments(oldComments=>data.comentarios);
	});
	
	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><Link to={`/frontend/notas/`}>Notas</Link></li>
					<li class="breadcrumb-item active" aria-current="page">{params.slug}</li>
				</ol>
			</nav>
			<div className="container mt-2">
				<Paper elevation={3} className="p-5 mb-5">
					<Typography variant="h2">{nota?.titulo}</Typography>
					<Typography variant="h4">{nota?.subtitulo}</Typography>
					<Typography variant="subtitle2" className="text-muted">{nota?.created_at}</Typography>
					<Typography variant="body1" >{nota && parse(nota.cuerpo)}</Typography>
				</Paper>
				<Divider/>
				<Typography variant="h4" className="mt-2 mb-2">Comentarios</Typography>
				{comments && comments.map(comentario=>(
					<div>
						<Comentario key={comentario.id} comentario={comentario} />
						<Divider className="m-2" />
					</div>
				))}
				{isLog && <CommentForm setComments={setComments} slug={slug}/>}
			</div>
		</div>
	);
}
export default Nota;