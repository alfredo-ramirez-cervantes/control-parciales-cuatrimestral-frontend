
import React, { Component } from 'react';
import { withRouter }       from 'react-router-dom';


class Exito extends Component {

    state = {
        mensajeCrear: this.props.mensaje
     }
    
    render() {

        var mensaje = 'La información ha sido registrada';

        if(this.state.mensajeCrear !== undefined){
            mensaje= this.state.mensajeCrear
        }
        
        return( 

            <div    className="modal fade show" 
                    id="modalExito" 
                    tabIndex="-1" role="dialog" 
                    ria-labelledby="exampleModalLabel" 
                    aria-hidden="true" 
                    style={{display:'block'}}>

                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">¡Éxito¡</h3>
                        </div>

                        <div className="modal-body">
                           {mensaje}
                        </div>

                        <div className="modal-footer">
                            <button type="button" 
                                    className="btn mr-md-2 mb-2 mb-md-0 botonGuardar" 
                                    data-dismiss="modal" 
                                    onClick = { () => {
                                        window.location.replace(this.props.pagina)
                                        this.props.history.push(this.props.pagina)
                                    }} 
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Exito);
