
import React, { Component, Fragment }       from 'react';
import { withRouter, Redirect }             from 'react-router-dom';
import { Query, Mutation }                  from 'react-apollo';
import ApolloClient                         from 'apollo-boost';
import { InMemoryCache }                    from 'apollo-cache-inmemory'

import Swal                                 from 'sweetalert2';

import { REGISTRAR_ACTIVIDAD_ALUMNO }              from '../../mutations';


import '../css/Header.css';
import '../css/DropdownDemo.css';


class RegistrarCalificacion extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            id_alumno:              typeof window !== 'undefined' ? Number(sessionStorage.getItem('id_alumno')) : null,   
            id_actividad:           typeof window !== 'undefined' ? Number(sessionStorage.getItem('id_actividad')) : null,   
            actividadDescripcion:   typeof window !== 'undefined' ? sessionStorage.getItem('actividadDescripcion') : null, 
            
            calificacion:           null,
        };
    }

    validarForm = () => {        
        const { calificacion} = this.state;
        const noValido =  ! calificacion;
        return noValido;
    }

    limpiarState = async () => {
        await this.setState({
            error : false
            ,msgExito : false
            ,paginaRegreso: `/${this.props.match.params.pagina}`
            , displayPosition: false
        })
    }
    
    render() {

        let campoObligatorio    = <label className="CampoObligatorio mr-md-1">* </label>   

        return(
            
            <Fragment>
               
                <div className="row justify-content-center">

                    <Mutation 
                        mutation = { REGISTRAR_ACTIVIDAD_ALUMNO }
                        onCompleted = {() => {
                                this.props.onHide(this.props.cerrar);
                                this.setState({
                                    ...this.state,
                                    msgExito: true,
                                })                            
                            }
                        }
                    >    
                        { crearActualizarActividadAlumno => (

                            <form className="col-md-12 m-3" 
                                onSubmit = {
                                    e => {
                                        e.preventDefault();

                                        const { 
                                            id_alumno,
                                            id_actividad,
                                            calificacion 
                                    } = this.state;

                                        this.setState({
                                            error: false
                                        })

                                        const ActividadAlumnoInput = {
                                            id_alumno,
                                            id_actividad,
                                            calificacion: Number(calificacion)  
                                        };

                                        console.log('+++++++++++++++++++++++++++ActividadAlumnoInput : ', ActividadAlumnoInput );

                                        crearActualizarActividadAlumno({
                                            variables: { ActividadAlumnoInput }
                                        })
                                    }
                                } >

                                <div className="form-row">
                                                                     
                                    <div className="form-group col-md-6 dropdown-demo">
                                        <label>{this.state.actividadDescripcion}</label>
                                    </div>
                                </div>

                                <div className="form-row">

                                    <div className="form-group col-md-3">
                                        <label>Calificación:</label>
                                    </div>     

                                    <div className="form-group col-md-2">
                                        <input  type        ="text" 
                                                value       ={this.state.calificacion} 
                                                className   ="form-control" 
                                                onChange    ={e => {
                                                                    this.setState({
                                                                        calificacion: e.target.value,
                                                                     })
                                                                }}
                                        />
                                    </div>               
                                </div>

                                <div className="float-right">

                                    <button type="submit" 
                                            disabled={ this.validarForm() }
                                            className="btn botonGuardar d-block d-md-inline-block mr-2">
                                        Guardar
                                    </button>      

                                    <button type="button" 
                                            className="btn botonCancelar d-block d-md-inline-block mr-2"
                                            onClick = { () => {
                                               this.props.onHide(this.props.cerrar);
                                            }}>
                                        Cancelar 
                                    </button>
                                </div>
                            </form>
                        )}
                    </Mutation>                                  
                </div>
               
            </Fragment>
        );
    }
}

export default RegistrarCalificacion;
