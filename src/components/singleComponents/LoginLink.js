import React from "react";
import {Link} from "@material-ui/core";

export const LoginLink = () => {
    return (
        <div className="jumbotron text-center jumbotron-fluid">
            <div className="display-2">
                Para acceder a esta seccion debe registrarse o loguearse
			</div>
            <a href="/frontend/login/" className="btn btn-lg btn-dark ml-3">Login</a>
            <a href="/frontend/register/" className="btn btn-lg btn-dark ml-3">Registrarse</a>
        </div>
    );
}