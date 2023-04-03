
import React, { useState, 
                useRef, 
                Fragment
            }                           from 'react';

import { gql, 
        useMutation, 
        useQuery }                      from '@apollo/client';

import { Toast }                        from 'primereact/toast'
import { Button }                       from 'primereact/button';
import { Panel }                        from 'primereact/panel';
import { InputText }                    from 'primereact/inputtext';
import { DataTable }                    from 'primereact/datatable';
import { Column }                       from 'primereact/column';
import { Dialog }                       from 'primereact/dialog';
import { Toolbar }                      from 'primereact/toolbar';
import { classNames }                   from 'primereact/utils';
import { Dropdown }                     from 'primereact/dropdown';
import { Card }                         from 'primereact/card';

import DescripcionCatGenerico           from  '../ui/DescripcionCatGenerico';

import CrearActividad                   from  './CrearActividad';
import RegistrarAsistencia              from  './RegistrarAsistencia';
import RegistrarCalificacion            from  './RegistrarCalificacion';

const GET_CAT_MATERIA = gql`
	query CatListaMateriasByIdProfesor($id_profesor: Int) {
		CatListaMateriasByIdProfesor(id_profesor:$id_profesor){
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

const QUERY_CATALOGO_GRUPO = gql`
	query CatListaGruposByMateria($id_profesor: Int, $id_materia: Int) {
		CatListaGruposByMateria(id_profesor:$id_profesor, id_materia:$id_materia ){
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

const QUERY_CATALOGO_PARCIAL = gql`
	query CatListaParciales{
		CatListaParciales{
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

const QUERY_CATALOGO_ALUMNOS = gql`
	query CatListaAlumnosByGrupo($id_grupo: Int) {
		CatListaAlumnosByGrupo(id_grupo:$id_grupo){
			matricula      
			nombre         
			fechaalta        
			fechamodificacion
			estatus 
		}
	}
`;

const QUERY_ASISTENCIA_PARCIAL = gql`
    query CatListaAsistenciaByGrupoProfMat(
                                            $id_parcial: Int,
                                            $id_periodo: Int,
                                            $id_profesor: Int,
                                            $id_materia: Int,
                                            $id_grupo:   Int,
                                            $id_alumno: Int
                                        ) {
            CatListaAsistenciaByGrupoProfMat(
                                            id_parcial:  $id_parcial, 
                                            id_periodo:  $id_periodo,
                                            id_profesor: $id_profesor, 
                                            id_materia:  $id_materia,
                                            id_grupo:    $id_grupo, 
                                            id_alumno:   $id_alumno
                                        ){
            id             
            id_parcial_periodo
            dia 
            asistencia   
            id_alumno   			
        }
    }
`;

const QUERY_ACTIVIDAD_BY_ALUMNO = gql`
	query CatListaActividadesAlumnosByPonderador(
											$id_parcial:   	Int,
											$id_periodo:   	Int,
											$id_ponderador:	Int,
											$id_alumno:    	Int

											$id_profesor:  Int,
											$id_materia:   Int,
											$id_grupo:     Int,
										) {
			CatListaActividadesAlumnosByPonderador(
											id_parcial:   	$id_parcial, 
											id_periodo:   	$id_periodo,
											id_ponderador:	$id_ponderador, 
											id_alumno:    	$id_alumno,

											id_profesor:	$id_profesor,
											id_materia:		$id_materia,
											id_grupo:  		$id_grupo
										){
			id              
			id_parcial_periodo
			id_ponderador   
			descripcion      
			id_alumno       
			calificacion     			
		}
	}
`;

const Resumen = (props) => {


    const [selectedIdMateria, setSelectedIdMateria] = useState(null);
    const [selectedIdGrupo, setSelectedIdGrupo]     = useState(null);
    const [selectedIdParcial, setSelectedIdParcial] = useState(null);

    const [displayNuevaActividad, setDisplayNuevaActividad]                 = useState(null);
    const [displayRegistrarAsistencia, setDisplayRegistrarAsistencia]       = useState(null);
    const [displayRegistrarCalificacion, setDisplayRegistrarCalificacion]   = useState(null);

    let idProfesorSesion = null;

    if (typeof window !== 'undefined') {
        idProfesorSesion = JSON.parse(sessionStorage.getItem('perfil'));
        sessionStorage.setItem('id_profesor', idProfesorSesion == null ? 0 :Number(idProfesorSesion.usuario.id_profesor));
    }
      
    const {data,  loading} = useQuery(GET_CAT_MATERIA, {
        variables: { 
            id_profesor: idProfesorSesion == null ? 0 :Number(idProfesorSesion.usuario.id_profesor)
        },
    });  
    
    const { data:       dataGrupo,
            loading:    loadingGrupo
        } = useQuery(QUERY_CATALOGO_GRUPO, {
        variables: { 
            id_profesor:    idProfesorSesion == null ? 0 : Number(idProfesorSesion.usuario.id_profesor),
            id_materia:     selectedIdMateria == null ? 0: Number(selectedIdMateria) 
        },
    });
    
    const { data:       dataParcial,
            loading:    loadingParcial
        } = useQuery(QUERY_CATALOGO_PARCIAL, {
        variables: {  
        },
    });   
    
    const { data:       dataAlumnos,
            loading:    loadingAlumnos,
            refetch:    refetchAlumnos
        } = useQuery(QUERY_CATALOGO_ALUMNOS, {
        variables: {  
            id_grupo:   selectedIdGrupo == null ? 0: Number(selectedIdGrupo) 
        },
    });   

    if(loading) return 'Cargando...';

    
    const styles = {
        color: 'black'
    }; 

    // const openNew = () => {
    //     setDisplayNuevaActividad(true);
    // }

    const rightToolbarTemplate = () => {
        return (
            <Fragment>
                    <Button type        ="button" 
                            label       ="Nueva Actividad" 
                            icon        ="pi pi-plus" 
                            className   ="p-button-success mr-2" 
                            onClick     ={ onClickNuevaActividad} />
            </Fragment>
        )
    }       
    
    const seleccionarMateria = seleccion => {
        setSelectedIdMateria(seleccion.value);
        
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_materia', seleccion.value);
        }
    }
    
    const seleccionarGrupo = seleccion => {
        setSelectedIdGrupo(seleccion.value);

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_grupo', seleccion.value);
        }
    }
 
    const seleccionarParcial = seleccion => {
        console.log('++++++++++++seleccionvalue: ' , seleccion.value);
        setSelectedIdParcial(seleccion.value);

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('id_parcial', seleccion.value);
        }
    }
 
    const seleccionarParcial2 = seleccion => {
        console.log('++++++++++++seleccion: ' , seleccion);
        setSelectedIdParcial(seleccion);
    }
    
    const colAsisteniaParcial = (matricula) => {
        
        const { data:       dataAsistenciaParcial,
                loading:    loadingAsistenciaParcial
            } = useQuery(QUERY_ASISTENCIA_PARCIAL, {
            variables: {  
                id_parcial:     selectedIdParcial == null ? 0: Number(selectedIdParcial) ,  
                id_periodo:     Number('1'),    //NO DEBE SER FIJA
                id_profesor:    idProfesorSesion == null ? 0 : Number(idProfesorSesion.usuario.id_profesor),
                id_materia:     selectedIdMateria == null ? 0: Number(selectedIdMateria) ,
                id_grupo:       selectedIdGrupo == null ? 0: Number(selectedIdGrupo) ,
                id_alumno:      Number(matricula)  
            },
        });   

        if(loadingAsistenciaParcial) return 'Cargando...';
        
        return (            
                <div className="form-group col-lg-5 col-md-6 col-sm-12 TituloPonderador ml-2">
                    
                    {
                        dataAsistenciaParcial.CatListaAsistenciaByGrupoProfMat.length === 0 ? 
                            <p>No hay registros</p> 
                            :                     
                            <div>
                                <h3>Asistencia</h3>
                                <div className="row">
                                    {dataAsistenciaParcial.CatListaAsistenciaByGrupoProfMat.map((item) => (
                                        <div id="contenedor">

                                            <div id="contenidos">
                                                <div id="columna1">{item.dia}</div>
                                            
                                                <Button type    ='button'
                                                        label   ={item.asistencia} 
                                                        onClick ={() => {
                                                        onClickRegistrarAsistencia();
                                                            if (typeof window !== 'undefined') {
                                                                sessionStorage.setItem('id_dia',        item.id);
                                                                sessionStorage.setItem('id_alumno',     matricula);  
                                                            }
                                                        }
                                                    } 
                                                />  
                                            </div>
                                        </div>
                                            
                                    ))}
                                </div>
                        </div>
                    }
            </div> 
        );
    }

    const colActividadAlumno = (matricula) => {
        
        const { data:       dataActividadAlumno,
                loading:    loadingActividadAlumno
            } = useQuery(QUERY_ACTIVIDAD_BY_ALUMNO, {
            variables: {  
                id_parcial:     selectedIdParcial == null ? 0: Number(selectedIdParcial) ,  
                id_periodo:     Number('1') ,  //NO DEBE SER FIJA
                id_ponderador:  Number('1') ,  
                id_alumno:      Number(matricula) ,
                
                
                id_profesor:    idProfesorSesion == null ? 0 : Number(idProfesorSesion.usuario.id_profesor),
                id_materia:     selectedIdMateria == null ? 0: Number(selectedIdMateria) ,
                id_grupo:       selectedIdGrupo == null ? 0: Number(selectedIdGrupo)                 
            },
        });   

        if(loadingActividadAlumno) return 'Cargando...';
        
        return (            
                <div className="form-group col-lg-5 col-md-6 col-sm-12 TituloPonderador ml-2">
                    
                    {
                        dataActividadAlumno.CatListaActividadesAlumnosByPonderador.length === 0 ? 
                            <p>No hay registros</p> 
                            :                     
                            <div>
                                <h3>Actividad</h3>
                                <div className="row">
                                    {dataActividadAlumno.CatListaActividadesAlumnosByPonderador.map((item) => (
                                        <div id="contenedor">
                                            <div id="contenidos">
                                                <div id="columna1">{item.descripcion}</div>
                                            </div>
                                            <div id="contenidos">
                                                
                                                <Button type    ='button'
                                                        label   ={item.calificacion} 
                                                        onClick ={() => {
                                                                onClickRegistrarCalificacion();
                                                                if (typeof window !== 'undefined') {
                                                                    sessionStorage.setItem('id_alumno',     matricula);
                                                                    sessionStorage.setItem('id_actividad',  item.id);
                                                                    sessionStorage.setItem('actividadDescripcion', item.descripcion);
                                                                }

                                                            }
                                                        } 
                                                />  
                                            </div>
                                        </div>
                                            
                                    ))}
                                </div>
                        </div>
                    }
            </div> 
        );
    }

    const colDesempenoAlumno = (matricula) => {
        
        const { data:       dataActividadAlumno,
                loading:    loadingActividadAlumno
            } = useQuery(QUERY_ACTIVIDAD_BY_ALUMNO, {
            variables: {  
                id_parcial:     selectedIdParcial == null ? 0: Number(selectedIdParcial) ,  
                id_periodo:     Number('1') ,  //NO DEBE SER FIJA
                id_ponderador:  Number('2') ,  
                id_alumno:      Number(matricula) ,
                
                
                id_profesor:    idProfesorSesion == null ? 0 : Number(idProfesorSesion.usuario.id_profesor),
                id_materia:     selectedIdMateria == null ? 0: Number(selectedIdMateria) ,
                id_grupo:       selectedIdGrupo == null ? 0: Number(selectedIdGrupo)                 
            },
        });   

        if(loadingActividadAlumno) return 'Cargando...';
        
        return (            
                <div className="form-group col-lg-5 col-md-6 col-sm-12 TituloPonderador ml-2">
                    
                    {
                        dataActividadAlumno.CatListaActividadesAlumnosByPonderador.length === 0 ? 
                            <p>No hay registros</p> 
                            :                     
                            <div>
                                <h3>Desempeño</h3>
                                <div className="row">
                                    {dataActividadAlumno.CatListaActividadesAlumnosByPonderador.map((item) => (
                                        <div id="contenedor">
                                            <div id="contenidos">
                                                <div id="columna1">{item.descripcion}</div>
                                            </div>
                                            <div id="contenidos">
                                                
                                                <Button type='button'
                                                        label   ={item.calificacion} 
                                                        onClick ={() => {
                                                                onClickRegistrarCalificacion();
                                                                if (typeof window !== 'undefined') {
                                                                    sessionStorage.setItem('id_alumno',     matricula);
                                                                    sessionStorage.setItem('id_actividad',  item.id);
                                                                    sessionStorage.setItem('actividadDescripcion', item.descripcion);
                                                                }

                                                            }
                                                        } 
                                                />  
                                            </div>
                                        </div>
                                            
                                    ))}
                                </div>
                        </div>
                    }
            </div> 
        );
    }

    const colEvaluacionAlumno = (matricula) => {
        
        const { data:       dataActividadAlumno,
                loading:    loadingActividadAlumno
            } = useQuery(QUERY_ACTIVIDAD_BY_ALUMNO, {
            variables: {  
                id_parcial:     selectedIdParcial == null ? 0: Number(selectedIdParcial) ,  
                id_periodo:     Number('1') ,  //NO DEBE SER FIJA
                id_ponderador:  Number('3') ,  
                id_alumno:      Number(matricula) ,
                
                
                id_profesor:    idProfesorSesion == null ? 0 : Number(idProfesorSesion.usuario.id_profesor),
                id_materia:     selectedIdMateria == null ? 0: Number(selectedIdMateria) ,
                id_grupo:       selectedIdGrupo == null ? 0: Number(selectedIdGrupo)                 
            },
        });   

        if(loadingActividadAlumno) return 'Cargando...';
        
        return (            
                <div className="form-group col-lg-5 col-md-6 col-sm-12 TituloPonderador ml-2">
                    
                    {
                        dataActividadAlumno.CatListaActividadesAlumnosByPonderador.length === 0 ? 
                            <p>No hay registros</p> 
                            :                     
                            <div>
                                <h3>Evaluación</h3>
                                <div className="row">
                                    {dataActividadAlumno.CatListaActividadesAlumnosByPonderador.map((item) => (
                                        <div id="contenedor">
                                            <div id="contenidos">
                                                <div id="columna1">{item.descripcion}</div>
                                            </div>
                                            <div id="contenidos">
                                                
                                                <Button type='button'
                                                        label   ={item.calificacion} 
                                                        onClick ={() => {
                                                                onClickRegistrarCalificacion();
                                                                if (typeof window !== 'undefined') {
                                                                    sessionStorage.setItem('id_alumno',     matricula);
                                                                    sessionStorage.setItem('id_actividad',  item.id);
                                                                    sessionStorage.setItem('actividadDescripcion', item.descripcion);
                                                                }

                                                            }
                                                        } 
                                                />  
                                            </div>
                                        </div>
                                            
                                    ))}
                                </div>
                        </div>
                    }
            </div> 
        );
    }

    let imageBodyTemplate = (rowData) => {

        let activarPonderadores = true// Number(this.state.selectedParcial.id) > 0  ? false : true;  

        return <div className="form-group col-lg-12">

                    <Card style={{ width: '100%', marginBottom: '2em' }}>

                        <div className="grid">

                            <div className="form-group col-lg-12 col-md-12 col-sm-12">

                                <div className="row justify-content-center"> 

                                    <div className="form-group col-lg-2 col-md-5 col-sm-12 TituloPonderador">
                                        {/* <img src={`data/${rowData.matricula}.jpg`} 
                                            onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                                            // alt={rowData.image} 
                                            className="product-image" /> */}
                                    </div> 

                                    <div className="form-group col-lg-3 col-md-6 col-sm-6 TituloPonderador ml-2">
                                        <div className="TituloAlumno">{rowData.nombre}</div>
                                        <div className="TituloMatricula">{rowData.matricula}</div>
                                    </div>

                                    <div class="grid">
                                        <div class="col-sm">
                                            {colAsisteniaParcial(rowData.matricula)}
                                        </div>
                                        <div class="col-sm">
                                            {colActividadAlumno(rowData.matricula)}
                                        </div> 
                                        <div class="col-sm">
                                            {colDesempenoAlumno(rowData.matricula)}
                                        </div>
                                        <div class="col-sm">
                                            {colEvaluacionAlumno(rowData.matricula)}
                                        </div>
                                    </div>   
                                </div>
                            </div>   
                            
                            <div className="form-group col-lg-12 col-md-12 col-sm-12">
                               
                            </div>
                        </div>
                    </Card>                    
                </div>
    }

    const onClickNuevaActividad = () => {
        setDisplayNuevaActividad(true);
    }   

    const onHideNuevaActividad = () => {
        setDisplayNuevaActividad(false);
    }  
    
    const onClickRegistrarAsistencia = () => {
        setDisplayRegistrarAsistencia(true);
    }   

    const onHideRegistrarAsistencia = () => {
        setDisplayRegistrarAsistencia(false);
    }  
    
    const onClickRegistrarCalificacion = () => {
        setDisplayRegistrarCalificacion(true);
    }   

    const onHideRegistrarCalificacion = () => {
        setDisplayRegistrarCalificacion(false);
    }  
    
    const renderFooter = () => {
        return (
            <div className="Obligatorio">
                <label>Todos los campos marcados con * son obligatorios</label>
            </div>
        );
    }
 
    return ( 

        <Fragment>

            <div className="form-demo">

                {/* <Toast ref={toast} />      */}
           
                <div className="flex ">

                    <div className="card">
                        
                        <form className="p-fluid m-3">
                            
                            <Panel header="Seleccione" >
                            
                                <div className="card">
                            
                                    <div className="grid p-fluid mt-6" style={{marginLeft:'10%', marginRight: '10%'}}>
                                      
                                        <div className="field col-12 md:col-12">

                                            <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>                                

                                         </div>

                                        <div className="field col-12 md:col-6">
                                            <div className="p-inputgroup">

                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-lock mr-2"></i>
                                                        <span style={{width:'15vw', fontWeight:'700'}}>
                                                            Materia
                                                        </span>
                                                </span>          

                                                <Dropdown 
                                                    id="selectedIdMateria" 
                                                    name="selectedIdMateria" 
                                                    value={selectedIdMateria}      
                                                    options={ data === undefined ? {} : data.CatListaMateriasByIdProfesor }
                                                    optionValue='id'
                                                    optionLabel="descripcion"     
                                                    onChange={seleccionarMateria}                                            
                                                />                                  
                                            </div>
                                        </div>
                                        
                                        <div className="field col-12 md:col-6">
                                            <div className="p-inputgroup">

                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-lock mr-2"></i>
                                                        <span style={{width:'15vw', fontWeight:'700'}}>
                                                            Grupo
                                                        </span>
                                                </span>          

                                                <Dropdown 
                                                    id          ="selectedIdGrupo" 
                                                    name        ="selectedIdGrupo" 
                                                    value       ={selectedIdGrupo}      
                                                    options     ={ dataGrupo === undefined ? {} : dataGrupo.CatListaGruposByMateria }
                                                    optionValue ='id'
                                                    optionLabel ="descripcion"     
                                                    onChange    ={seleccionarGrupo}    
                                                    emptyMessage= 'Seleccione Materia primero'                                        
                                                />                                                 
                                            </div>
                                        </div>
                                        
                                        <div className="field col-12 md:col-6">
                                            <div className="p-inputgroup">

                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-lock mr-2"></i>
                                                        <span style={{width:'15vw', fontWeight:'700'}}>
                                                            Parcial
                                                        </span>
                                                </span>          

                                                <Dropdown 
                                                    id="selectedIdParcial" 
                                                    name="selectedIdParcial" 
                                                    value={selectedIdParcial}      
                                                    options={ dataParcial === undefined ? {} : dataParcial.CatListaParciales }
                                                    optionValue='id'
                                                    optionLabel="descripcion"     
                                                    onChange={seleccionarParcial}                                            
                                                />                                               
                                            </div>
                                        </div>      

                                    </div>
                                </div>
                            </Panel>

                            <Panel header="Listado" >

                                <div className="card">   

                                    <DataTable 
                                        value               ={dataAlumnos == null ? null : dataAlumnos.CatListaAlumnosByGrupo} 
                                        responsiveLayout    ="scroll"
                                    >

                                        <Column header  ="Alumnos"     
                                                body    ={imageBodyTemplate}>
                                        </Column>                                
                                    </DataTable>                                   
                                </div>
                            </Panel>

                            
                        </form>            
                    </div>
                </div>
            </div>

            <Dialog     header      ="Nuevo ponderador" 
                        style       ={{ width: '50vw' }} 
                        visible     ={displayNuevaActividad}
                        modal 
                        position    ='right' 
                        footer      ={renderFooter} 
                        onHide      ={() => onHideNuevaActividad()}
                        draggable   ={false} 
                        resizable   ={false}
            >
                <CrearActividad                              
                    onHideNuevaActividad ={onHideNuevaActividad} 
                    refetch = {refetchAlumnos}/>
            </Dialog>

            <Dialog     header      ="Registrar asistencia" 
                        style       ={{ width: '30vw' }} 
                        visible     ={displayRegistrarAsistencia}
                        modal 
                        position    ='right' 
                        footer      ={renderFooter} 
                        onHide      ={() => onHideRegistrarAsistencia()}
                        draggable   ={false} 
                        resizable   ={false}
            >
                <RegistrarAsistencia                              
                    onHideRegistrarAsistencia ={onHideRegistrarAsistencia} 
                    refetch = {refetchAlumnos}
                />
            </Dialog>  

            <Dialog     header      ="Registrar calificación" 
                        style       ={{ width: '30vw' }} 
                        visible     ={displayRegistrarCalificacion}
                        modal 
                        position    ='right' 
                        footer      ={renderFooter} 
                        onHide      ={() => onHideRegistrarCalificacion()}
                        draggable   ={false} 
                        resizable   ={false}
            >
                <RegistrarCalificacion                              
                    onHideRegistrarCalificacion ={onHideRegistrarCalificacion} 
                    refetch = {refetchAlumnos} 
                    seleccionarParcial2 = {seleccionarParcial2}
                />
            </Dialog>  
                      
        </Fragment>
    );
}

export default Resumen;
