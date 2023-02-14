import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { Link }         from 'react-router-dom';


const salir             = require('../../assets/img/menu/salir_title.png');

const CerrarSesionUsuario = (cliente, history) => {

    localStorage.removeItem('token', '');
    localStorage.removeItem('perfil', '');
    localStorage.removeItem('idSolicitudActual', '');
    
    localStorage.clear();
    // desloguear
    cliente.resetStore();
    // reedireccionar
    history.push('/login');
}

const CerrarSesion = ({history}) => (    
    <ApolloConsumer>
        {cliente => {
            return (        
                <Link 
                    onClick={() => CerrarSesionUsuario(cliente, history)}
                    className="text-center imgMenu">
                    <img src={salir}/>
                </Link>
            );
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSesion);