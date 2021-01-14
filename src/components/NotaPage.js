import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
    GridList, GridListTile, List, ListItem, Paper, Card, CardContent,
    Grid, Button, ButtonGroup, Typography, TextField, FormControl, useScrollTrigger
} from "@material-ui/core";
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, useParams,
} from "react-router-dom";
import { AlwaysScrollToBottom } from "./utils/AlwaysScrollToBottom";
import { getCookie } from "./utils/GetCookie";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function NotaPage() {
    const api = `${window.location.protocol}//${window.location.protocol === "https:"?window.location.host:"localhost:8000"}`;
    console.log(api)
    let params = useParams();
    var editor = useRef(null);
    var editorRef = useRef(null);
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    };
    const scrollingContainer = {}
    const [titulo, setTitulo] = useState(null)
    const [subtitulo, setSubtitulo] = useState(null)
    const [cuerpo, setCuerpo] = useState('');
    const editorChange = (e)=>setCuerpo(e);
    const uploadNota = ()=>fetch(`${api}/api/nota/`, {
        method:"POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
            Authorization: `JWT ${localStorage.getItem("token")}`, 
            'X-CSRFToken': getCookie("csrftoken"),},// 'X-CSRFToken': $(token).val(), },
        body:JSON.stringify({
            titulo:titulo,
            subtitulo:subtitulo,
            cuerpo:cuerpo,
            autor:window.username_id,
        }),
    }).then(r=>r.json()).then(data=>console.log(data));
    return (
        <div>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><Link to={`/frontend/notas/`}>Notas</Link></li>
					<li class="breadcrumb-item active" aria-current="page">Nueva nota</li>
				</ol>
			</nav>
            <div className="container">
                <h2>Crear una nueva nota</h2>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="">
                            Titulo
                        </label>
                            <input type="text" value={titulo} onChange={(e)=>setTitulo(e.target.value)} className="form-control form-control-lg"/>
                    </div>
                    <div className="col">
                        <label htmlFor="">
                            Subtitulo
                        </label>
                            <input type="text" value={subtitulo} onChange={(e)=>setSubtitulo(e.target.value)} className="form-control form-control-sm"/>
                    </div>
                </div>
                <ReactQuill 
                    ref={(ele)=>{if(ele){editor=ele.getEditor(); editorRef=ele.makeUnprivilegedEditor(ele.getEditor())}}} 
                    theme="snow" value={cuerpo} onChange={(e) => editorChange(e)} formats={formats} modules={modules} 
                />
                <div className="form-group mt-3">
                    <button onClick={uploadNota} className="btn btn-lg btn-dark">Guardar</button>
                </div>
            </div>
        </div>
    );
}
export default NotaPage;