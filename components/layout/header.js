
import React, { useRef }    from 'react';

import { Image }            from 'primereact/image';

import MainMenu             from './mainMenu';

let perfil  = null;
let usuario = null;
let puesto = null;
let area    = null;
let barra;

const NavegacionNoAutenticado = () =>(

    <header className="app-header">

        <div>
            <Image src="/static/img/logo_utn.png" width="100" alt=""/>
        </div>

        <p className="Title"> 
            <span>UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL</span> 
            <br></br>
            Control Cuatrimestral
        </p>      
        <nav className="nav-principal">            
            <label className="usuario-logueado"> &nbsp; </label>
        </nav>
    </header>
);

const NavegacionAutenticado = () =>{

    const menu  = useRef(null);
    const toast = useRef(null);

    return (

        <header className="app-header">

            <div>
                <Image src="/static/img/logo.png" width="100" alt=""/>
            </div>

            <p className="Title">
                <span>UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL</span> 
                <br></br>
                Control Cuatrimestral
            </p>

            <nav className="nav-principal">

                <label className="usuario-logueado"> 
                {/* {area} - Enlace - */}
                    {usuario} 
                </label>
                <br></br>
                <label className="usuario-logueado"> 
                    {puesto} 
                </label>

                <br /><br />

                <div>
                    <MainMenu />
                </div>  
            </nav>
        </header>
    )
}

const Header = () => {

    if (typeof window !== 'undefined') {
        perfil = JSON.parse(sessionStorage.getItem('perfil'));
    }

    usuario = perfil ? `${perfil.usuario.profesor} ` : null;
    puesto = perfil ? `${perfil.usuario.puesto} ` : null;
    // area    = perfil ? perfil.usuario.cus_cve_dependencia : null;
    barra   = perfil ? <NavegacionAutenticado /> : <NavegacionNoAutenticado />;

    return (
        <div>
            {barra}
        </div>
    );
}

export default Header;
