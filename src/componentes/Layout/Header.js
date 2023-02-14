
import React            from 'react';
import { withRouter }   from 'react-router-dom';

const logo_edomex       = require('../../assets/img/logo_edomex.png');
const logo_utn          = require('../../assets/img/logo_utn.png');

const Header = ({session}) => {

    let barra = <NavegacionAutenticado/>;
 
    return (                    
        <div>
            {barra}                                                  
        </div>           
    );
}

const TituloSistema = () =>(
    <div className="col-md-12" >
        <h3>
            UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL
        </h3>  
        <h5>
            SECRETARÍA DE EDUCACIÓN PÚBLICA
        </h5>          
    </div>
);

const NavegacionNoAutenticado = () =>(

    <div>
        <br />
        <div className=" row col-md-12 pruebaEspacio1">
            <div  className="col-lg-2 col-md-5 col-sm-12 center pruebaEspacio1">
                <img src={logo_edomex} />
            </div>
            <div  className="col-lg-8 col-md-5 col-sm-12 pruebaEspacio1">
                <h3>UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL</h3>
                <h5>SECRETARÍA DE EDUCACIÓN PÚBLICA</h5>
            </div> 
            <div  className="col-lg-2 col-md-5 col-sm-12 pruebaEspacio1">
                <img src={logo_utn} />   
            </div>
        </div>

        <div className="container navbar_menu">
            <nav className="navbar navbar-inverse navbar_principal">
                <div className="container-fluid">
                     <div className="navbar-header">
                        <div className="TitloAcceso">
                            <h4>Acceso</h4>
                        </div> 
                    </div>                 
                </div>
            </nav>
        </div>      

    </div>  
);
    
const NavegacionAutenticado = (session) =>(

    <div>
        <br />
        <div className=" row col-md-12">
            <div  className="col-lg-2 col-md-2 col-sm-12 img_logo">
                <img src={logo_edomex} />
            </div>
            <div  className="col-lg-8 col-md-8  col-sm-10 ">
                <h3>UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL</h3>
                <h5>SECRETARÍA DE EDUCACIÓN PÚBLICA</h5>
            </div> 
            <div  className="col-lg-2 col-md-2 col-sm-2 img_logo">
                <img src={logo_utn} />   
            </div>
        </div>

        <div className="container navbar_menu">
            <nav className="navbar navbar-inverse navbar_principal">
                <div className="container-fluid">
                    <div>
                        <h4>Control de Registro de calificaciones parciales</h4>
                    </div> 
                    <div className="navbar-header">
                        Lic. Adriana Garcia Valdespino
                        <br />
                        Profesor de tiempo completo      
                    </div>                 
                </div>
            </nav>
        </div>      

    </div>  
      
);
        
export default withRouter(Header);
