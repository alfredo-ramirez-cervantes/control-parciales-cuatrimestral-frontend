
import React, { Component, Fragment }   from 'react';
import { withRouter }                   from 'react-router-dom';

import { Query }                        from 'react-apollo';

import { Dropdown }                     from 'primereact/dropdown';
import { Button }                       from 'primereact/button';
import { DataTable }                    from 'primereact/datatable';
import { Column }                       from 'primereact/column';
import { Card }                         from 'primereact/card';
import { Dialog }                       from 'primereact/dialog';

import { 
        QUERY_CATALOGO_MATERIA, 
        QUERY_CATALOGO_GRUPO,
        QUERY_CATALOGO_PARCIAL,
        QUERY_CATALOGO_ALUMNOS,
        QUERY_ASISTENCIA_PARCIAL,
        QUERY_ACTIVIDAD_BY_ALUMNO,


        QUERY_CATALOGO_GENERICO,
        QUERY_LISTA_MATERIAS_BY_PROFESOR, 
        QUERY_LISTA_GRUPOS_BY_MATERIA, 
        QUERY_ALUMNOS }                 from '../../queries';

import CrearActividad                   from './CrearActividad';
import EditarActividad                  from './EditarActividad';
import Examen                           from './Examen';
import Desempeño                        from './Desempeño';

class Alumnos extends Component {

	constructor(props) {

        super(props);

        this.state = {
            
            id_profesor_activo: 101,

            selectedMateria:    0,
            selectedGrupo:      0,
            selectedParcial:    0,
            selectedMatricula:  0,


            lazyItems:              [],
            lazyLoading:            false,
            selectedCity1:          null,
            selectedCity2:          null,
            selectedCountry:        null,
            selectedGroupedCity:    null,
            selectedItem:           null,
            selectedItem2:          null,

            products:               null,
            layout:                 'grid',
            sortKey:                null,
            sortOrder:              null,
            sortField:              null,

            displayBasic:           false,
            displayActividad:       false,
            displayExamen:          false,
            displayDesempeño:       false,
        };

        this.onMateriaChange    = this.onMateriaChange.bind(this);       
        this.onGrupoChange      = this.onGrupoChange.bind(this);       
        this.onParcialChange    = this.onParcialChange.bind(this);   

        this.imageBodyTemplate  = this.imageBodyTemplate.bind(this);  
        
        this.onClick            = this.onClick.bind(this);
        this.onHide             = this.onHide.bind(this);    
    }

    componentDidMount() {
    }

    onMateriaChange(e) {
        this.setState({             
            selectedMateria: e.value,
            selectedGrupo:      0,
            selectedParcial:    0
         });

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_materia', e.value.id);
        }
    }

    onGrupoChange(e) {
        this.setState({ 
            selectedGrupo: e.value,            
            selectedParcial:    0
         });

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_grupo', e.value.id);
        }
    }

    onParcialChange(e) {
        this.setState({ selectedParcial: e.value });

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_parcial', e.value.id);
        }
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }    

    renderFooter() {
        return (
            <div className="Obligatorio">
                <label>Todos los campos marcados con * son obligatorios</label>
            </div>
        );
    }

    imageBodyTemplate(rowData) {

        let activarPonderadores =  Number(this.state.selectedParcial.id) > 0  ? false : true;  

        return <div className="form-group col-lg-12">

                    <Card style={{ width: '100%', marginBottom: '2em' }}>

                        <div className="form-row">

                            <div className="form-group col-lg-12 col-md-12 col-sm-12">

                                <div className="row justify-content-center"> 

                                    <div className="form-group col-lg-2 col-md-5 col-sm-12 TituloPonderador">
                                        <img src={`data/${rowData.matricula}.jpg`} 
                                            onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                                            // alt={rowData.image} 
                                            className="product-image" />
                                    </div> 

                                    <div className="form-group col-lg-3 col-md-6 col-sm-12 TituloPonderador ml-2">
                                        <div className="TituloAlumno">{rowData.nombre}</div>
                                        <div className="TituloMatricula">{rowData.matricula}</div>
                                    </div>

                                    <div className="form-group col-lg-5 col-md-6 col-sm-12 TituloPonderador ml-2">
                                        <Query query = {QUERY_ASISTENCIA_PARCIAL} 
                                            variables= {{
                                                id_parcial:     Number(this.state.selectedParcial != 0 ? this.state.selectedParcial.id : 0),  
                                                id_periodo:     Number('1'),    //NO DEBE SER FIJA
                                                id_profesor:    Number('101'),  //NO DEBE SER FIJA
                                                id_materia:     Number(this.state.selectedMateria != 0 ? this.state.selectedMateria.id : 0),
                                                id_grupo:       Number(this.state.selectedGrupo != 0 ? this.state.selectedGrupo.id : 0),
                                                id_alumno:      Number(rowData.matricula)  
                                            }} >
                                            {({ loading, error, data }) => {
                                        
                                                if(loading) return "Cargando...";						
                                                if(error) return ` Error: ${error.message}`;

                                                if(data.CatListaAsistenciaByGrupoProfMat.length === 0) {
                                                    return(
                                                        <p>No hay registros</p>   
                                                    )
                                                } else { 
                                                    return (                                                                                    
                                                        <div>
                                                            <h3>Asistencia</h3>
                                                            <div className="row">
                                                                {data.CatListaAsistenciaByGrupoProfMat.map((item) => (
                                                                        <div>
                                                                            <div id="contenedor">
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.dia}</div>
                                                                                </div>
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.asistencia}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }	
                                            }}
                                        </Query>
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 TituloPonderador ml-2">
                                        <Query query = {QUERY_ACTIVIDAD_BY_ALUMNO} 
                                            variables= {{
                                                id_parcial:     Number(this.state.selectedParcial != 0 ? this.state.selectedParcial.id : 0),  
                                                id_periodo:     Number('1'),  //NO DEBE SER FIJA
                                                id_ponderador:  Number('1'),  
                                                id_alumno:      Number(rowData.matricula),
                                                
                                                
                                                id_profesor:    Number(this.state.id_profesor_activo),
                                                id_materia:     Number(this.state.selectedMateria.id),
                                                id_grupo:       Number(this.state.selectedGrupo.id),
                                                id_ponderador:  Number('1')
                                            }} >
                                            {({ loading, error, data }) => {
                                        
                                                if(loading) return "Cargando...";						
                                                if(error) return ` Error: ${error.message}`;

                                                if(data.CatListaActividadesAlumnosByPonderador.length === 0) {
                                                    return(
                                                        <p>No hay registros</p>   
                                                    )
                                                } else { 
                                                    return (                                                                                    
                                                        <div>
                                                            <h3>Actividad</h3>
                                                            <div className="row">
                                                                {data.CatListaActividadesAlumnosByPonderador.map((item) => (
                                                                        <div>
                                                                            <div id="contenedor">
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.descripcion}</div>
                                                                                </div>
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.calificacion}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }	
                                            }}
                                        </Query>
                                    </div>

                                    <div className="form-group col-lg-3 col-md-6 col-sm-12 TituloPonderador ml-2">
                                        <Query query = {QUERY_ACTIVIDAD_BY_ALUMNO} 
                                            variables= {{
                                                id_parcial:     Number(this.state.selectedParcial != 0 ? this.state.selectedParcial.id : 0),  
                                                id_periodo:     Number('1'),  //NO DEBE SER FIJA
                                                id_ponderador:  Number('2'),  
                                                id_alumno:      Number(rowData.matricula),  

                                                id_profesor:    Number(this.state.id_profesor_activo),
                                                id_materia:     Number(this.state.selectedMateria.id),
                                                id_grupo:       Number(this.state.selectedGrupo.id),
                                                id_ponderador: Number('1')
                                            }} >
                                            {({ loading, error, data }) => {
                                        
                                                if(loading) return "Cargando...";						
                                                if(error) return ` Error: ${error.message}`;

                                                if(data.CatListaActividadesAlumnosByPonderador.length === 0) {
                                                    return(
                                                        <p>No hay registros</p>   
                                                    )
                                                } else { 
                                                    return (                                                                                    
                                                        <div>
                                                            <h3>Desempeño</h3>
                                                            <div className="row">
                                                                {data.CatListaActividadesAlumnosByPonderador.map((item) => (
                                                                        <div>
                                                                            <div id="contenedor">
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.descripcion}</div>
                                                                                </div>
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.calificacion}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }	
                                            }}
                                        </Query>
                                    </div>

                                    <div className="form-group col-lg-3 col-md-6 col-sm-12 TituloPonderador ml-2">
                                        <Query query = {QUERY_ACTIVIDAD_BY_ALUMNO} 
                                            variables= {{
                                                id_parcial:     Number(this.state.selectedParcial != 0 ? this.state.selectedParcial.id : 0),  
                                                id_periodo:     Number('1'),  //NO DEBE SER FIJA
                                                id_ponderador:  Number('3'),  
                                                id_alumno:      Number(rowData.matricula),

                                                id_profesor:    Number(this.state.id_profesor_activo),
                                                id_materia:     Number(this.state.selectedMateria.id),
                                                id_grupo:       Number(this.state.selectedGrupo.id),
                                                id_ponderador: Number('1')
                                            }} >
                                            {({ loading, error, data }) => {
                                        
                                                if(loading) return "Cargando...";						
                                                if(error) return ` Error: ${error.message}`;

                                                if(data.CatListaActividadesAlumnosByPonderador.length === 0) {
                                                    return(
                                                        <p>No hay registros</p>   
                                                    )
                                                } else { 
                                                    return (                                                                                    
                                                        <div>
                                                            <h3>Evaluación</h3>
                                                            <div className="row">
                                                                {data.CatListaActividadesAlumnosByPonderador.map((item) => (
                                                                        <div>
                                                                            <div id="contenedor">
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.descripcion}</div>
                                                                                </div>
                                                                                <div id="contenidos">
                                                                                    <div id="columna1">{item.calificacion}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }	
                                            }}
                                        </Query>
                                    </div>

                                </div>
                            </div>   
                            
                            <div className="form-group col-lg-12 col-md-12 col-sm-12">
                               
                            </div>

                            {/* <div className="form-group col-lg-6 col-md-12 col-sm-12">
                                <div className="row justify-content-center">                   
                            
                                    <div className="form-group TituloPonderador mr-2">
                                        <div>
                                            <Button label       = "Actividades" 
                                                    className   = "p-button-outlined p-button-success" 
                                                    onClick     = {() => {
                                                        this.setState({ selectedMatricula: rowData.matricula });
                                                        this.onClick('displayActividad')} 
                                                    }
                                                    disabled    = {activarPonderadores}
                                            /> 
                                        </div> 
                                        <div>
                                            9
                                        </div>
                                    </div>

                                    <div className="form-group TituloPonderador mr-2">
                                        <div>
                                            <Button label       = "Exámen" 
                                                    className   = "p-button-outlined p-button-success" 
                                                    onClick     = {() => this.onClick('displayExamen')} 
                                                    disabled    = {activarPonderadores}
                                            />                                                    
                                        </div> 
                                        <div>
                                            8
                                        </div>
                                    </div>

                                    <div className="form-group TituloPonderador mr-2">
                                        <div>
                                            <Button label="Desempeño" 
                                                    className="p-button-outlined p-button-success"
                                                    onClick={() => this.onClick('displayDesempeño')} 
                                                    disabled    = {activarPonderadores} 
                                            />      
                                        </div> 
                                        <div>
                                            10
                                        </div>
                                    </div>                                     
                                </div>
                            </div>     

                            <div className="form-group col-lg-2 col-md-12 col-sm-12">
                                
                                <div className="row justify-content-center">       
                                    
                                    <div className={`form-group TituloPonderador ${this.getStatusCalificacion(10)}`}>                                    
                                        Calificación: 
                                        <br />
                                        10
                                    </div> 
                                </div>
                            </div>                   */}
                        </div>
                    </Card>                    
                </div>
    }

    getStatusCalificacion(calificacion) {

        switch (Math.floor(calificacion)) {            

            case 10:
                return 'Calificacion10';

            case 9:
                 return 'Calificacion9';

            case 8:
                return 'Calificacion8';

            case 7:
                return 'Calificacion7';

            case 6:
                return 'Calificacion6';
        
            default:
                return 'Calificacion6';
        }
    }

    render() {
        
        let variablesMateria    = { 
                                    id_profesor:    Number(this.state.id_profesor_activo)
                                };

        let variablesGrupo      = { 
                                    id_profesor:    Number(this.state.id_profesor_activo),
                                    id_materia:     Number(this.state.selectedMateria.id)
                                };

        let variablesAlumnos    = { 
                                    id_grupo:       Number(this.state.selectedGrupo.id)
                                };

        let variablesParcial    = { 
                                    id_parcial:     Number(this.state.selectedParcial.id),    
                                    id_periodo:     Number('1')      
        };


        let activarListaParcial =  Number(this.state.selectedMateria.id) > 0 && Number(this.state.selectedGrupo.id) > 0 ? false : true;  
        
        return (

            <Fragment>

                <br />    
                
                <div className="form-row">

                    <div className="form-group col-md-6 dropdown-demo">

                        <h5>Materia:</h5>
                        
                        <Query query={QUERY_CATALOGO_MATERIA} variables={variablesMateria}  >

                            {({ loading, error, data }) => {           

                                if(loading) return 'Cargando...';
                                if(error) return `Error ${error.message}`;

                                return(

                                    <Dropdown   
                                        value           = {this.state.selectedMateria} 
                                        options         = {data.CatListaMateriasByIdProfesor} 
                                        onChange        = {this.onMateriaChange} 
                                        optionLabel     = "descripcion" 
                                        placeholder     = "Seleccionar Materia" 
                                        emptyMessage    = "No hay opciones"/>
                                )
                            }}
                        </Query>
                
                    </div>      
                </div>

                <div className="form-row">

                    <div className="form-group col-md-4 dropdown-demo">

                        <h5>Grupo:</h5>

                        <Query query={QUERY_CATALOGO_GRUPO} variables={variablesGrupo}  >

                            {({ loading, error, data }) => {           

                                if(loading) return 'Cargando...';
                                if(error) return `Error ${error.message}`;

                                return(

                                    <Dropdown   
                                        value           = {this.state.selectedGrupo} 
                                        options         = {data.CatListaGruposByMateria} 
                                        onChange        = {this.onGrupoChange} 
                                        optionLabel     = "descripcion" 
                                        placeholder     = "Seleccionar Grupo" 
                                        emptyMessage    = "No hay opciones"/>
                                )
                            }}
                        </Query>
                    </div>

                    <div className="form-group col-md-4 dropdown-demo">

                        <h5>Parcial:</h5>

                        <Query query={QUERY_CATALOGO_PARCIAL} >

                            {({ loading, error, data }) => {           

                                if(loading) return 'Cargando...';
                                if(error) return `Error ${error.message}`;

                                return(

                                    <Dropdown   
                                        value       = {this.state.selectedParcial} 
                                        options     = {data.CatListaParciales} 
                                        onChange    = {this.onParcialChange} 
                                        optionLabel = "descripcion" 
                                        placeholder = "Seleccionar Parcial" 
                                        disabled    = {activarListaParcial} />
                                )
                            }}
                        </Query>
                    </div>   

                    <div className="form-group col-md-4 dropdown-demo">

                        <Button label="+ Nueva Actividad" 
                                onClick={() => this.onClick('displayBasic')} 
                                disabled    = { Number(this.state.selectedParcial.id) > 0  ? false : true}
                        />                        
                        
                        <Dialog     header="Nuevo ponderador" 
                                    style={{ width: '50vw' }} 
                                    visible={this.state.displayBasic}
                                    modal 
                                    footer={this.renderFooter} 
                                    onHide={() => this.onHide('displayBasic')}
                                    draggable={false} 
                                    resizable={false}
                        >
                            <CrearActividad                              
                                cerrar         = 'displayBasic'
                                onHide         ={this.onHide} />
                        </Dialog>
                    </div>     
                </div>

                <div className="form-row">

                    <div className="form-group col-md-12 ddatatable-templating-demo">

                        <div className="card">

                            <Query query = {QUERY_CATALOGO_ALUMNOS} variables={variablesAlumnos} >
                                {({ loading, error, data }) => {
                                    
                                if(loading) return "Cargando...";						
                                if(error) return ` Error: ${error.message}`;

                                if(data.CatListaAlumnosByGrupo.length === 0) {

                                    return(
                                        <p>No hay registros</p>   
                                    )

                                } else { 

                                    return (

                                        <div>
                        
                                            <DataTable 
                                                value               ={data.CatListaAlumnosByGrupo} 
                                                responsiveLayout    ="scroll"
                                            >

                                                <Column header  ="Alumnos"     
                                                        body    ={this.imageBodyTemplate}>
                                                </Column>                                
                                            </DataTable>
                                        </div>
                                    )
                                }	
                                }}
                            </Query>
                        </div>
                    </div>
                </div>

                <br />    

                <Dialog   header="Actividades" 
                        style={{ width: '50vw' }} 
                        visible={this.state.displayActividad} 
                        modal 
                        footer={this.renderFooter} 
                        onHide={() => this.onHide('displayActividad')}
                        draggable={false} 
                        resizable={false}
                >
                    <EditarActividad 
                         matricula      = {Number(this.state.selectedMatricula)}
                         id_parcial     = {Number(this.state.selectedParcial.id)}  
                         id_materia     = {Number(this.state.selectedMateria.id)}  
                         id_grupo       = {Number(this.state.selectedGrupo.id)}    
                         id_ponderador  = {10} 
                         cerrar         = 'displayActividad'
                         onHide         ={this.onHide} 
                    />
                </Dialog>    

                <Dialog   header="Exámenes" 
                        style={{ width: '50vw' }} 
                        visible={this.state.displayExamen} 
                        modal 
                        footer={this.renderFooter} 
                        onHide={() => this.onHide('displayExamen')}
                        draggable={false} 
                        resizable={false}
                >
                    {/* <Examen /> */}
                    <EditarActividad 
                         matricula      = {Number(this.state.selectedMatricula)}
                         id_parcial     = {Number(this.state.selectedParcial.id)}  
                         id_materia     = {Number(this.state.selectedMateria.id)}  
                         id_grupo       = {Number(this.state.selectedGrupo.id)}    
                         id_ponderador  = {11}
                         cerrar         = 'displayExamen'
                         onHide         ={this.onHide} 
                    />
                </Dialog> 

                <Dialog   header="Desempeño" 
                        style={{ width: '50vw' }} 
                        visible={this.state.displayDesempeño} 
                        modal 
                        footer={this.renderFooter} 
                        onHide={() => this.onHide('displayDesempeño')}
                        draggable={false} 
                        resizable={false}
                >
                    {/* <Desempeño /> */}
                    <EditarActividad 
                         matricula      = {Number(this.state.selectedMatricula)}
                         id_parcial     = {Number(this.state.selectedParcial.id)}  
                         id_materia     = {Number(this.state.selectedMateria.id)}  
                         id_grupo       = {Number(this.state.selectedGrupo.id)}    
                         id_ponderador  = {12}
                         cerrar         = 'displayDesempeño'
                         onHide         ={this.onHide} 
                    />
                </Dialog> 


            </Fragment>
        )
    }
};

export default withRouter(Alumnos);
