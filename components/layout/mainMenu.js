
import React, { 
                useRef
            }           from 'react';

import { Menu }         from 'primereact/menu';
import { Button }       from 'primereact/button';
import { Toast }        from 'primereact/toast';


const cerrarSesion = async ( ) => {    
    sessionStorage.clear();
    window.location.replace('/Login');
}


const MainMenu = () => {

    const menu  = useRef(null);
    const toast = useRef(null);
    
    const items = [
        {
            label: 'Enlace',
            items: [
                {
                    label: 'Catalogos',
                    icon: 'pi pi-refresh',
                    command: () => {
                        window.location = "/Plaza"
                    }
                },
                {
                    label: 'Alumnos',
                    icon: 'pi pi-refresh',
                    command: () => {
                        window.location = "/Alumnos"
                    }
                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-times',
                    command: (e) => {
                        cerrarSesion()
                    }
                }
            ]
        }
    ];

    return (
        <div className='menuFixed'>
            <Toast ref={toast}></Toast>

            <div className="card">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button label="Menú" icon="pi pi-bars" 
                    onClick={(event) => menu.current.toggle(event)} 
                    aria-controls="popup_menu" aria-haspopup />
            </div>
        </div>
    );
}

export default MainMenu;
