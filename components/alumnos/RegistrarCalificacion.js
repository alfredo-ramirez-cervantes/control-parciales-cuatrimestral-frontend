
import React, { 
    Fragment, 
    useState, 
    useRef }                                from 'react';

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

const REGISTRAR_ACTIVIDAD_ALUMNO = gql`
    mutation crearActualizarActividadAlumno($ActividadAlumnoInput: ActividadAlumnoInput) { 
        crearActualizarActividadAlumno(input: $ActividadAlumnoInput) 
        {
            id
        }
    }
`;

const RegistrarCalificacion = (props) => {

const [selectedNivelEstudio, setSelectedNivelEstudio]   = useState(null);
const [mensaje, guardarMensaje]                         = useState(null);

const toast                             = useRef(null);

const [ crearActualizarActividadAlumno ]    = useMutation(REGISTRAR_ACTIVIDAD_ALUMNO, {
    update(cache, { data: { crearActualizarActividadAlumno } } ) {
        // This is intentional
    }
});

let perfil          = null;
let id_alumno       = null;          
let id_actividad    = null;   
let actividadDescripcion = null;

if (typeof window !== 'undefined') {
    perfil          = JSON.parse(sessionStorage.getItem('perfil'));
    id_alumno       = Number(sessionStorage.getItem('id_alumno'));
    id_actividad    = Number(sessionStorage.getItem('id_actividad'));
    actividadDescripcion    =sessionStorage.getItem('actividadDescripcion'); 
}

const formik = useFormik({

    initialValues: {

        id:             sessionStorage.getItem('id_act_alumno') == 'null' ? 0 : Number(sessionStorage.getItem('id_act_alumno'))
        ,calificacion:  sessionStorage.getItem('calificacion') == 'null' ? '' : Number(sessionStorage.getItem('calificacion'))
        ,modificar:     false
    }, 

    validationSchema: Yup.object({

        calificacion:   Yup.number().required('Es obligatorio')
    }), 

    onSubmit: async valores => {

        const {
            id              
            ,calificacion        
        } = valores;
       
        try {

            let  ActividadAlumnoInput = null;

            if(id > 0){

                ActividadAlumnoInput = {
                    id:             Number(id),           
                    id_alumno,
                    id_actividad,
                    calificacion:   Number(calificacion)  
                };

            } else {

                ActividadAlumnoInput = {
                    id_alumno,
                    id_actividad,
                    calificacion:   Number(calificacion) 
                };
            }

            const { data, error } = await crearActualizarActividadAlumno({
                 variables: {
                    ActividadAlumnoInput
                 }
            });

            limpiarForm();
            toast.current.show({severity:'success', 
                                    summary: '¡Exito!', 
                                    detail:'La Calificación, se guardo correctamente.', 
                                    life: 2000
                            });
            props.refetch();

            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    props.seleccionarParcial2(sessionStorage.getItem('id_parcial'));
                }
                props.onHideRegistrarCalificacion();
            }, 2000);

         } catch (error) {

             guardarMensaje(error.message.replace('GraphQL error: ', ''));

             setTimeout(() => {
                 guardarMensaje(null);
             }, 2000);
         }
     }
});  
     
// if( editarEscolar !== null && !formik.values.modificar){

//     formik.values.id            = editarEscolar.id;
//     formik.values.calificacion  = editarEscolar.calificacion;
//     formik.values.modificar     = true;
// }

const isFormFieldValid      = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage   = (name) => {
                                            return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
                                        };

if(formik.values.modificar && selectedNivelEstudio === null){       

    CatNivelEstudio.forEach(function(elemento, indice, array) {
        if(Number(elemento.value) === Number(formik.values.esc_cve_nivel_estudio) ){                
            setSelectedNivelEstudio(elemento.value);     
        }
    })  
}

if(formik.values.modificar && selectedAvanceEstudio === null){       

    CatAvanceEstudio.forEach(function(elemento, indice, array) {
        if(Number(elemento.value) === Number(formik.values.esc_cve_avance_estudios) ){                
            setSelectedAvanceEstudio(elemento.value);     
        }
    })  
}

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
                        onClick={ () => { props.onHideRegistrarCalificacion(); }}
                />
        </Fragment>
    )
}

const limpiarForm = () => {

    formik.values.id                =0
   ,formik.values.calificacion      =''
   ,formik.values.modificar         =false  

}

const renderFooter = () => {
    return (
        <div className="Obligatorio">
            <label>Todos los campos marcados con * son obligatorios</label>
        </div>
    );
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
                                                    {actividadDescripcion}
                                                </span>
                                        </span>       
  
                                    </div>
                                </div>
                               
                                <div className="field col-12 md:col-6">
                                    <div className="p-inputgroup">

                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-id-card mr-2"></i>
                                                <span style={{width:'15vw', fontWeight:'700'}}>
                                                    * Calificación
                                                </span>
                                        </span>                            
                                    </div>
                                </div>     
                                <div className="field col-12 md:col-5">
                                    <div className="p-inputgroup">

                                        <InputText   id=        "calificacion" 
                                                    name=       "calificacion" 
                                                    value=      {formik.values.calificacion} 
                                                    onChange=   {formik.handleChange}  
                                                    feedback=   {false} 
                                                    className=  {classNames({ 'p-invalid': isFormFieldValid('calificacion') })} 
                                                    maxLength=  {200}
                                        />
                                        {getFormErrorMessage('calificacion')}                                
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

export default RegistrarCalificacion;
