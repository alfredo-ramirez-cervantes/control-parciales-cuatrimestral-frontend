
import React from 'react';

import { Image } from 'primereact/image';

const Footer = () => {

    return ( 
        <div className="footer">

            <header className="mensajes-footer">
                <div className="app-footer">
                
                    <p className="mensajes-footer">
                        Cto. Universidad Tecnológica s/n Col. Benito Juárez Nezahualcóyotl, Estado de México, C.P. 57000
                        Teléfonos: 57169700E-mail: webmaster@utn.edu.mx - <span> UTN</span>
                    </p> 

                    <nav className="nav-principal">
                    
                        <a id="Facebook" href="https://www.facebook.com/gobmexico" target="_blank" rel="noreferrer"
                            title="enlace a facebook abre en una nueva ventana">
                            <Image src="https://framework-gb.cdn.gob.mx/landing/img/facebook.png" alt="Facebook" />
                        </a>

                        <a id="Twitter" href="https://twitter.com/GobiernoMX" target="_blank" rel="noreferrer"
                            title="enlace a twitter abre en una nueva ventana" 
                            className="p-button-raised p-button-warning p-mr-4">
                            <Image src="https://framework-gb.cdn.gob.mx/landing/img/twitter.png" alt="Twitter" />
                        </a>
                        <label>utn.edu.mx</label>
                    </nav>

                    <div>
                        <Image src="/static/img/footer.jfif" width="150" alt="" />
                        <br />
                    </div>
                </div>
                <div className="container-fluid footer-pleca">
                    <div className="row">
                        <div className="col">
                            <br/>
                        </div>
                    </div>
                </div>
            </header>
        </div>        
     );
}
 
export default Footer;