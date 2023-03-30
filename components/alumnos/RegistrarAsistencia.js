
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

const REGISTRAR_ASISTENCIA_ALUMNO = gql`
    mutation crearActualizarAsistencia($AsistenciaInput: AsistenciaInput) { 
        crearActualizarAsistencia(input: $AsistenciaInput) 
        {
            id
        }
    }
`;

const RegistrarAsistencia = (props) => {

const [selectedNivelEstudio, setSelectedNivelEstudio]   = useState(null);
const [mensaje, guardarMensaje]                         = useState(null);

const toast                             = useRef(null);

const [ crearActualizarAsistencia ]    = useMutation(REGISTRAR_ASISTENCIA_ALUMNO, {
    update(cache, { data: { crearActualizarAsistencia } } ) {
        // This is intentional
    }
});

let id_materia      = null;
let id_grupo        = null;
let id_profesor     = null;
            
let id_dia          = null;
let id_alumno       = null;
            
let actividadDescripcion = null;
    
if (typeof window !== 'undefined') {
    id_materia      = Number(sessionStorage.getItem('id_materia'));
    id_grupo        = Number(sessionStorage.getItem('id_grupo'));
    id_profesor     = Number(sessionStorage.getItem('id_profesor'));

    id_dia          = Number(sessionStorage.getItem('id_dia'));
    id_alumno       = Number(sessionStorage.getItem('id_alumno')); 
    
    actividadDescripcion    =sessionStorage.getItem('actividadDescripcion'); 
}

const formik = useFormik({

    initialValues: {

        id:             0
        ,asistencia:  ''
        ,modificar:     false
    }, 

    validationSchema: Yup.object({

        asistencia:   Yup.string().required('Es obligatorio')
    }), 

    onSubmit: async valores => {

        const {
            id              
            ,asistencia        
        } = valores;
       
        try {

            let  AsistenciaInput = null;

            if(id > 0){

                AsistenciaInput = {
                    id:             Number(id),           
                    id_materia,
                    id_grupo, 
                    id_profesor,
                    
                    id_dia,     
                    id_alumno,
                    asistencia  
                };

            } else {

                AsistenciaInput = {
                    id_materia,
                    id_grupo, 
                    id_profesor,
                    
                    id_dia,     
                    id_alumno,
                    asistencia  
                };
            }

            const { data, error } = await crearActualizarAsistencia({
                 variables: {
                    AsistenciaInput
                 }
            });

            limpiarForm();
            toast.current.show({severity:'success', 
                                    summary: '¡Exito!', 
                                    detail:'La Asistencia, se guardo correctamente.', 
                                    life: 2000
                            });
            props.refetch();

            setTimeout(() => {
                props.onHideRegistrarAsistencia();
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

//     formik.values.id             = editarEscolar.id;
//     formik.values.asistencia     = editarEscolar.asistencia;
//     formik.values.modificar      = true;
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
                        onClick={ () => { props.onHideRegistrarAsistencia(); }}
                />
        </Fragment>
    )
}

const limpiarForm = () => {

    formik.values.id                =0
   ,formik.values.asistencia      =''
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
                                                <span style={{width:'13vw', fontWeight:'700'}}>
                                                    *   A -Asistecia / 
                                                    <br></br>
                                                        I - Inasistencia:
                                                </span>
                                        </span>                            
                                    </div>
                                </div>     
                                <div className="field col-12 md:col-5">
                                    <div className="p-inputgroup">

                                        <InputText   id=        "asistencia" 
                                                    name=       "asistencia" 
                                                    value=      {formik.values.asistencia} 
                                                    onChange=   {formik.handleChange}  
                                                    feedback=   {false} 
                                                    className=  {classNames({ 'p-invalid': isFormFieldValid('asistencia') })} 
                                                    maxLength=  {200}
                                        />
                                        {getFormErrorMessage('asistencia')}                                
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

export default RegistrarAsistencia;
