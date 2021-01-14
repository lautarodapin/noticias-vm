import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, InputLabel, FormControl, Input } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useParams,
} from "react-router-dom";
import parse from 'html-react-parser';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



export function  Comentario({comentario}) {
    const autor = comentario.autor;
	return (
		<Card>
            <CardHeader title={autor.username} subheader={comentario.created_at}/>
            <CardContent>
                <Typography variant="body1">
                    {comentario.cuerpo}
                </Typography>
            </CardContent>
		</Card>
	);
}

export default Comentario;