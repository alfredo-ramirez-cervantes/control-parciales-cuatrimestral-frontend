
import React, { 
        Component, 
        Fragment }              from 'react';
import { withRouter }           from 'react-router-dom';

import '../css/Login.css';

import Exito                    from '../Alertas/Exito';
import Error                    from '../Alertas/Error';


const initialState = {
    login: {
        usuario: null
        , password: null
    }
    , error: false
    , msgExito: false
    , resultadoToken: null
    , resultadoAuth: null
}
class Login extends Component {

    state = {
        ...initialState
    }

    limpiarState = () => {
        this.setState({ ...initialState });
    }

    consultarUsuario = e => {
        e.preventDefault();
            
        window.location.replace('/alumnos');
    };

    validarForm = () => {
        const { usuario, password } = this.state.login;
        const noValido = !usuario || !password;
        return noValido;
    }

    render() {

        const { error, msgExito } = this.state;

        let respuesta = (error) ? <Error mensaje={this.state.resultadoToken.errorMessages} /> : '';
        let mensaje = (msgExito) ? <Exito pagina={this.state.paginaRegreso} /> : '';
        let campoObligatorio = <label className="CampoObligatorio mr-md-1">*</label>

        return (

            <Fragment>

                <br />

                {mensaje}

                {respuesta}

                <br />
                <div className='text-center'>
                     <br /><br />
                    <h3 className="text-center">Control de Registro de calificaciones parciales</h3>
                </div>              

                <div className="row justify-content-center">

                    <form className="row justify-content-center"
                        onSubmit={this.consultarUsuario}
                    >
                        <div className="col-md-6 m-1">

                            <div className="CampoObligatorio">
                                <br />
                                <label>* Campos Obligatorios</label>
                            </div>

                            <div>
                                {campoObligatorio}
                                <label>Usuario</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Usuario"
                                    onChange={e => {
                                        this.setState({
                                            login: {
                                                ...this.state.login,
                                                usuario: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 m-1">
                            <div>
                                {campoObligatorio}
                                <label>Contraseña</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    onChange={e => {
                                        this.setState({
                                            login: {
                                                ...this.state.login,
                                                password: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>                        
                        </div>

                        <div className="row justify-content-center col-md-6 m-3">
                            <button type="submit"
                                disabled={this.validarForm()}
                                className="btn entrar-btn">Entrar</button>
                        </div>

                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);
