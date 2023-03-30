
import React, { useEffect } from 'react';

import { useRouter }        from 'next/router';

import Resumen              from '../components/alumnos/Resumen'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Alumnos = () => {

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
        <div className="form-demo font-weight-bold">
            <h3> Alumnos </h3>
            <Resumen />
        </div>
    );
}

export default Alumnos;
