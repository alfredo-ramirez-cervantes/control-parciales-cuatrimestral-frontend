
import React, {Fragment, useEffect } from 'react';

import { useRouter }        from 'next/router';

import { Panel }            from 'primereact/panel';

const Principal = () => {

    const styles = {
        width:          '50%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        height:         '30vh',
    };

    const router = useRouter();

    useEffect(() => {

        let usuario = null;

        if (typeof window !== 'undefined') {
            usuario =  JSON.parse(sessionStorage.getItem('perfil'));
        }
        
        if(usuario === null) {
            return router.push('/Login');
        }

    }, []);

    return (  
        <Fragment>    
            <div    style={styles} 
            >
                <Panel header="Bienvenidos al  Control Parcial de Actividades" >
                    <div className="card">
                    <p>
                        El aplicativo de Control Parcial de Actividades, se desarrolla para facilitar el registro por parcial 
                        del cuatrimestre en curso, siendo una herramienta de apoyo y de facil uso para el personal docente.

                        < br/>< br/>
                        
                        Actualmente se encuentra terminada la primer etapa del desarrollo que servira para empezar a definir 
                        nueva funcionalidad y un mejor alcance de proyecto, siendo tambien una herramienta para poder capacitar 
                        a alumnos en diferentes tecnologias.
                    </p>
                    </div>
                </Panel>
            </div>
            
        </Fragment>
    );
}
 
export default Principal;
