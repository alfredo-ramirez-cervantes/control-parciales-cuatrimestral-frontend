
import React, { Fragment, useState, useRef, useEffect } from 'react';

import { useRouter }        from 'next/router';

import Principal            from './Principal'


const Index = () => {

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
            <Principal />
        </Fragment>
    );
}

export default Index;
