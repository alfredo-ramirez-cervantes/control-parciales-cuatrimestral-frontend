
import  React, { 
                Fragment, 
                useState, 
                useRef
            }                                from 'react';

import { gql, useMutation, useQuery }       from '@apollo/client';

import { useFormik }                        from 'formik';
import * as Yup                             from 'yup'

import { InputText }                        from 'primereact/inputtext';
import { Button }                           from 'primereact/button';
import { classNames }                       from 'primereact/utils';
import { Toast }                            from 'primereact/toast';
import { Dropdown }                         from 'primereact/dropdown';
import { Panel }                            from 'primereact/panel';
import { Toolbar }                          from 'primereact/toolbar';
import { InputTextarea }                    from 'primereact/inputtextarea';

const REGISTRAR_ACTIVIDAD = gql`
    mutation crearActualizarActividad($ActividadInput: ActividadInput) { 
        crearActualizarActividad(input: $ActividadInput) 
        {
            id
        }
    }
`;

const QUERY_CATALOGO_PONDERADOR = gql`
	query CatListaPonderador{
		CatListaPonderador{
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

const CrearActividad = (props) => {

const [selectedIdPonderador, setSelectedIdPonderador]   = useState(null);
const [mensaje, guardarMensaje]                         = useState(null);

const toast                             = useRef(null);

const [ crearActualizarActividad ]    = useMutation(REGISTRAR_ACTIVIDAD, {
    update(cache, { data: { crearActualizarActividad } } ) {
        // This is intentional
    }
});


let id_materia      = null;
let id_grupo        = null;
let id_profesor     = null;
            
let id_parcial      = null;     
let id_periodo      = 1;  
    
if (typeof window !== 'undefined') {
    id_materia      = Number(sessionStorage.getItem('id_materia'));
    id_grupo        = Number(sessionStorage.getItem('id_grupo'));
    id_profesor     = Number(sessionStorage.getItem('id_profesor'));

    id_parcial      = Number(sessionStorage.getItem('id_parcial'));
}

const formik = useFormik({

    initialValues: {

        id:             0
        ,id_ponderador: ''
        ,descripcion:  ''
        ,modificar:     false
    }, 

    validationSchema: Yup.object({

        id_ponderador:  Yup.number().required('Es obligatorio'),
        descripcion:    Yup.string().required('Es obligatorio')
    }), 

    onSubmit: async valores => {

        const {
            id      
            ,id_ponderador        
            ,descripcion        
        } = valores;
       
        try {

            let  ActividadInput = null;

            if(id > 0){

                ActividadInput = {
                    id:             Number(id),      
                    
                    id_ponderador:  Number(selectedIdPonderador),                                          
                    descripcion,    
                                                                
                    id_materia,     
                    id_grupo,       
                    id_profesor,    
                                                                
                    id_parcial,     
                    id_periodo   
                };

            } else {

                ActividadInput = {
                    id_ponderador:  Number(selectedIdPonderador),                                          
                    descripcion,    
                                                                
                    id_materia,     
                    id_grupo,       
                    id_profesor,    
                                                                
                    id_parcial,     
                    id_periodo   
                };
            }

            const { data, error } = await crearActualizarActividad({
                 variables: {
                    ActividadInput
                 }
            });

            limpiarForm();
            toast.current.show({severity:'success', 
                                    summary: '¡Exito!', 
                                    detail:'El nuevo ponderador, se guardo correctamente.', 
                                    life: 2000
                            });
            props.refetch();

            setTimeout(() => {
                props.onHideNuevaActividad();
            }, 2000);

         } catch (error) {

             guardarMensaje(error.message.replace('GraphQL error: ', ''));

             setTimeout(() => {
                 guardarMensaje(null);
             }, 2000);
         }
     }
});  

const {data,  loading} = useQuery(QUERY_CATALOGO_PONDERADOR, {} );  

if(loading) return 'Cargando...';

// if( editarEscolar !== null && !formik.values.modificar){

//     formik.values.id             = editarEscolar.id;
//     formik.values.asistencia     = editarEscolar.asistencia;
//     formik.values.modificar      = true;
// }

const isFormFieldValid      = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage   = (name) => {
                                            return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
                                        };

const rightToolbarTemplate = () => {
    return (
        <Fragment>
                <Button type="submit" 
                        label="Guardar" 
                        icon="pi pi-save" 
                        className="p-button-secondary mr-2" 
                />

                <Button type="button" 
                        label="Cancelar" 
                        icon="pi pi-times-circle" 
                        className="p-button-secondary mr-2"
                        onClick={ () => { props.onHideNuevaActividad(); }}
                />
        </Fragment>
    )
}

const limpiarForm = () => {

    formik.values.id                =0
    ,formik.values.id_ponderador    =''
    ,formik.values.descripcion      =''
   ,formik.values.modificar         =false  

}

const seleccionarPonderador = seleccion => {
    setSelectedIdPonderador(seleccion.value);
    formik.values.id_ponderador = seleccion.value;
}

return (
    
    <div className="form-demo">
        
        <Toast ref={toast} />
       
        <div className="flex ">     

            <div className="card">     

                <form onSubmit={formik.handleSubmit} className="p-fluid m-3">

                    <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>                              

                    <Panel >
                                
                        <div className="card">
                    
                            <div className="grid p-fluid mt-2" style={{marginLeft:'10%', marginRight: '10%'}}>
                                
                                <div className="field col-12 md:col-12">                                        
                                    <div className="p-inputgroup">

                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-id-card mr-2"></i>
                                                <span style={{width:'15vw', fontWeight:'700'}}>
                                                    * Ponderador: 
                                                </span>
                                        </span>    

                                        <Dropdown 
                                                    id="selectedIdPonderador" 
                                                    name="selectedIdPonderador" 
                                                    value={selectedIdPonderador}      
                                                    options={ data === undefined ? {} : data.CatListaPonderador }
                                                    optionValue='id'
                                                    optionLabel="descripcion"     
                                                    onChange={seleccionarPonderador}                                            
                                        />       
  
                                    </div>
                                </div>
                               
                                <div className="field col-12 md:col-12">
                                    <div className="p-inputgroup">

                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-id-card mr-2"></i>
                                                <span style={{width:'15vw', fontWeight:'700'}}>
                                                    * Descripción:
                                                </span>
                                        </span>                            
                                   
                                        <InputText   id=        "descripcion" 
                                                    name=       "descripcion" 
                                                    value=      {formik.values.descripcion} 
                                                    onChange=   {formik.handleChange}  
                                                    feedback=   {false} 
                                                    className=  {classNames({ 'p-invalid': isFormFieldValid('descripcion') })} 
                                                    maxLength=  {200}
                                        />
                                        {getFormErrorMessage('descripcion')}                                
                                    </div>
                                </div>                                 
                            </div>
                        </div>
                    </Panel>                   
                </form> 
            </div>
        </div>
    </div>     
);
}

export default CrearActividad;
