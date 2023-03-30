
import React, { useState, 
                useRef, 
                Fragment
            }                   from 'react';

import {    ApolloClient, 
            InMemoryCache, 
            gql
        }                       from '@apollo/client';

import * as Yup                 from 'yup'

import { useFormik }            from 'formik';
import { Toast }                from 'primereact/toast'
import { Button }               from 'primereact/button';
import { Panel }                from 'primereact/panel';
import { InputText }            from 'primereact/inputtext';
import { Password }             from 'primereact/password';
import { classNames }           from 'primereact/utils';


const QUERY_USUARIO_EXISTE = gql`

    query UsuarioExiste($usuario: String!, $password: String!, ){

        UsuarioExiste(usuario: $usuario, password: $password){

            id          
            id_profesor
            id_perfil  
            perfil 
            profesor 
            id_puesto
            puesto      
        }
    }
`;


const Login = (props) => {

    const toast                     = useRef(null);    
    const [mensaje, guardarMensaje] = useState(null);    
    const formik                    = useFormik({

        initialValues: {
            usuario: '',
            password: ''
        },

        validationSchema: Yup.object({

            usuario: Yup.string().required('El campo "Usuario" es obligatorio'),
            password: Yup.string().required('El campo "Contraseña" es obligatorio')
        }), 

        onSubmit: async valores => {
                
            const {
                usuario,
                password
            } = valores;
            
            try {
                
                let respuesta = await ValidaUsuario(usuario, password);
                
                if( respuesta.usuario !== null){
                        
                    await guardaDatos(respuesta);    
                    window.location.replace('/');                    

                }else{                   
                    toast.current.show({severity:'error', summary: 'Invalido!', 
                        detail:'El Usuario o Contraseña son incorrectos.', life: 3000});
                }
            } catch (error) {

                guardarMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
            }
        }
    });
    
    const client = new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false
        }),
        uri: process.env.uriApi,
        onError: ({ networkError, graphQLErrors }) => {
            console.log('graphQLErrors', graphQLErrors);
            console.log('networkError', networkError);
        }
    });

    const ValidaUsuario = async (usuario, contrasena) => {
        
        let variables = { 
            usuario:    usuario,
            password:   contrasena
        };
    
        const existeUsuario = await client.query({
            query: QUERY_USUARIO_EXISTE,
            variables: variables,
            fetchPolicy: "network-only" 
        })
        .then(result    => {console.log(result); return result.data.UsuarioExiste;})
        .catch(err      => {console.log("error: "+err); return null});

        return existeUsuario;
    }

    const guardaDatos = async ( resultado ) => {

        let datos = {
            "valid": true,
            "usuario":{
               "id":                resultado[0].id,             
               "id_profesor":       resultado[0].id_profesor,   
               "id_perfil":         resultado[0].id_perfil,   
               "perfil":            resultado[0].perfil,   
               "profesor":          resultado[0].profesor,   
               "id_puesto":         resultado[0].id_puesto,   
               "puesto":            resultado[0].puesto
            }
        };

        sessionStorage.setItem('perfil', JSON.stringify(datos));    
    }
    
    const isFormFieldValid      = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage   = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    let campoObligatorio = <label className="CampoObligatorio mr-md-1">* </label>    

    return ( 

        <Fragment>

            <div className="form-demo">

                <Toast ref={toast} />     
           
                <div className="flex ">

                    <div className="card">
                        
                        <form onSubmit={formik.handleSubmit} className="p-fluid m-3">
                            
                            <Panel header="Inicio de sesión " className="field col-6 md:col-6" >

                                <div className="card">

                                    <div className="grid p-fluid mt-6" style={{marginLeft:'10%', marginRight: '10%'}}>

                                        <div className="field col-12 md:col-12" >                                      
                                            <div className="p-field p-col-12 p-md-12">    
                                                <label>Todos los campos marcados con * son obligatorios</label>
                                            </div>  
                                        </div>

                                        <div className="field col-12 md:col-12">
                                            <div className="p-inputgroup">

                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-user mr-2"></i>
                                                    <span style={{width:'15vw', fontWeight:'700'}}>
                                                        * Usuario
                                                    </span>
                                                </span>          

                                                <InputText  id          ="usuario" 
                                                            name        ="usuario" 
                                                            value       ={formik.values.usuario} 
                                                            onChange    ={formik.handleChange}  
                                                            divClass    ="field col-12 md=col-6"
                                                            spanClass   ="p-float-label"
                                                            iconClass   ="pi pi-briefcase mr-2"      
                                                            className   ={classNames({ 'p-invalid': isFormFieldValid('usuario') })} 
                                                />
                                                {getFormErrorMessage('usuario')}                                             
                                            </div>
                                        </div>
                                        
                                        <div className="field col-12 md:col-12">
                                            <div className="p-inputgroup">

                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-lock mr-2"></i>
                                                    <span style={{width:'15vw', fontWeight:'700'}}>
                                                        * Contraseña
                                                    </span>
                                                </span>          

                                                <Password   id          ="password" 
                                                            name        ="password" 
                                                            value       ={formik.values.password} 
                                                            onChange    ={formik.handleChange}  
                                                            feedback    ={false} 
                                                            className   ={classNames({ 'p-invalid': isFormFieldValid('password') })} 
                                                />
                                                {getFormErrorMessage('password')}                                            
                                            </div>
                                        </div>

                                        <div className="field col-12 md:col-12" >
                                            <div className="p-inputgroup">                            
                                                <Button type="submit" 
                                                        label="Accesar"
                                                        className="p-button-rounded p-button-secondary mt-2"  />
                                            </div>
                                        </div>    

                                    </div>
                                </div>
                            </Panel>
                        </form>            
                    </div>
                </div>
            </div>
           
        </Fragment>
    );
}

export default Login;
