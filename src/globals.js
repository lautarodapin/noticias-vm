const host = window.location.protocol === "https:"?window.location.host:"localhost:8000";//"localhost:8000"//window.location.host; // todo chequear 
const ws_scheme = window.location.protocol === "https:"?"wss":"ws";
const protocol = window.location.protocol;
const api = `${protocol}//${host}`;