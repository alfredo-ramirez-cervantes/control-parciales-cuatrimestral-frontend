
import React, { Component, Fragment }                       from 'react';
import { withRouter, Redirect }                             from 'react-router-dom';
import { Query, Mutation }                                  from 'react-apollo';
import ApolloClient                                         from 'apollo-boost';
import { InMemoryCache }                                    from 'apollo-cache-inmemory';

import { Dialog }                                           from 'primereact/dialog';
import { Button }                                           from 'primereact/button';
import { DataTable }                                        from 'primereact/datatable';
import { Column }                                           from 'primereact/column';
import { Dropdown }                                         from 'primereact/dropdown';

import Swal                                                 from 'sweetalert2';

import { REGISTRAR_PONDERADOR }                            from '../../mutations';

import { QUERY_CATALOGO_PONDERADOR }                          from '../../queries';

import '../css/Header.css';
import '../css/DropdownDemo.css';


class CrearPonderador extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            id_parcial:         typeof window !== 'undefined' ? Number(sessionStorage.getItem('id_parcial')) : null,            
            id_materia:         typeof window !== 'undefined' ? Number(sessionStorage.getItem('id_materia')) : null,   
            id_grupo:           typeof window !== 'undefined' ? Number(sessionStorage.getItem('id_grupo')) : null,   
            id_materia_grupo:   null,   
            selectedPonderador: null,
            descripcion:        null
        };

        this.onPonderadorChange    = this.onPonderadorChange.bind(this);      
        
        // this.onClick            = this.onClick.bind(this);
        // this.onHide             = this.onHide.bind(this);     
    }

    onPonderadorChange(e) {
        console.log('+++++++++++++++++++++++++++e.value : ', e.value.id );
        this.setState({ selectedPonderador: e.value });
    }


    // onClick(name, position) {
    //     let state = {
    //         [`${name}`]: true
    //     };

    //     if (position) {
    //         state = {
    //             ...state,
    //             position
    //         }
    //     }
    //     this.setState(state);
    // }

    // onHide(name) {
    //     this.setState({
    //         [`${name}`]: false
    //     });
    // }
        
    // seleccionarProcedimiento = (e) => {  
    //     this.setState({
    //         complemento:{
    //             ...this.state.complemento,
    //             id_procedimiento: e.value,
    //         }
    //     })        
    // }

    validarForm = () => {        
        const { selectedPonderador, descripcion} = this.state;
        const noValido = !selectedPonderador  || ! descripcion;
        return noValido;
    }

    // renderFooter(name) {
    //     return (
    //         <div>
    //             <label className='Obligatorio'>Todos los campos marcados con * son obligatorios</label>;
    //             <br />
    //             <Button label="Cancelar" 
    //                     onClick={() => this.onHide(name)} 
    //                     className="btn d-block d-md-inline-block mr-2 botonCancelar"  />
    //         </div>
    //     );
    // }

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
                        // client={client}
                        mutation = { REGISTRAR_PONDERADOR }
                        onCompleted = {() => {
                                // localStorage.setItem('abrePantalla', 0);
                                this.props.onHide(this.props.cerrar);
                                this.setState({
                                    ...this.state,
                                    msgExito: true,
                                })                            
                            }
                        }
                    >    
                        { crearActualizarPonderador => (

                            <form className="col-md-11 m-3" 
                                onSubmit = {
                                    e => {
                                        e.preventDefault();

                                        const { id_parcial            
                                                ,id_materia_grupo   
                                                ,id_materia
                                                ,id_grupo
                                                ,selectedPonderador 
                                                ,descripcion
                                        } = this.state;

                                        this.setState({
                                            error: false
                                        })

                                        const PonderadorInput = {
                                            id_parcial            
                                            ,id_materia_grupo   
                                            ,id_materia
                                            ,id_grupo
                                            ,id_ponderador:   Number(selectedPonderador.id)
                                            ,descripcion            
                                        };

                                        console.log('+++++++++++++++++++++++++++PonderadorInput : ', PonderadorInput );

                                        crearActualizarPonderador({
                                            variables: { PonderadorInput }
                                        })
                                    }
                                } >

                                <div className="form-row">
                                                                     
                                    <div className="form-group col-md-2 dropdown-demo">
                                        {campoObligatorio}
                                        <label>Ponderador:</label>
                                    </div>

                                    <div className="form-group col-md-10 dropdown-demo">

                                        <Query query={QUERY_CATALOGO_PONDERADOR} >

                                            {({ loading, error, data }) => {           

                                                if(loading) return 'Cargando...';
                                                if(error)   return `Error ${error.message}`;

                                                return(

                                                    <Dropdown   
                                                        value       ={this.state.selectedPonderador} 
                                                        options     ={data.CatListaPonderador} 
                                                        onChange    ={this.onPonderadorChange} 
                                                        optionLabel ="descripcion" 
                                                        placeholder ="Seleccionar Ponderador" />
                                                )
                                            }}
                                        </Query>
                                    </div>
                                </div>

                                <div className="form-row">

                                    <div className="form-group col-md-2">
                                        {campoObligatorio}
                                        <label>Descripción:</label>
                                    </div>     

                                    <div className="form-group col-md-10">
                                        <input  type        ="text" 
                                                value       ={this.state.descripcion} 
                                                className   ="form-control" 
                                                placeholder ="Descripción del ponderador"
                                                onChange    ={e => {
                                                                    this.setState({
                                                                        // complemento:{
                                                                        //     ...this.state.complemento,
                                                                            descripcion: e.target.value,
                                                                            // dependencia_conciliadora: Number(this.state.dependencia_conciliadora)
                                                                        // }
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
                                                // localStorage.setItem('abrePantalla', 0);
                                                // window.location.replace(window.location.origin+`/alumnos`)
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

export default CrearPonderador;
