
import React, { Component, Fragment }       from 'react';

import { Query }                            from 'react-apollo';

import { InputText }                        from 'primereact/inputtext';
import { Toast }                            from 'primereact/toast';

import { DataTable }                        from 'primereact/datatable';
import { Column }                           from 'primereact/column';


import { QUERY_ACTIVIDADES_BY_ALUMNO }      from '../../queries';

import '../css/Header.css';
import '../css/DropdownDemo.css';


class EditarActividad extends Component {

    constructor(props) {
        super(props);

        this.state = {
            complemento: {
                id_expediente: this.props.id          
                ,id_procedimiento: null
                ,numero: ''
                ,monto_total: 0
                ,usuario: '' 
                ,proceso: Number(2)
                ,dependencia_conciliadora: '',   
            },
            products1: null,
            products2: null,
            products3: null,
            products4: null,
            editingRows: {}
        };

        this.columns = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'price', header: 'Price' }
        ];

        this.statuses = [
            { label: 'In Stock', value: 'INSTOCK' },
            { label: 'Low Stock', value: 'LOWSTOCK' },
            { label: 'Out of Stock', value: 'OUTOFSTOCK' }
        ];

        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.onCellEditComplete = this.onCellEditComplete.bind(this);
        this.onRowEditComplete1 = this.onRowEditComplete1.bind(this);
        this.onRowEditComplete2 = this.onRowEditComplete2.bind(this);
        this.onRowEditChange = this.onRowEditChange.bind(this);

        this.onClick            = this.onClick.bind(this);
        this.onHide             = this.onHide.bind(this);        
    }

    componentDidMount() {
        this.fetchProductData('products1');
        this.fetchProductData('products2');
        this.fetchProductData('products3');
        this.fetchProductData('products4');
    }

    fetchProductData(productStateKey) {
    }

    isPositiveInteger(val) {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    getStatusLabel(status) {
        switch (status) {
            case 'INSTOCK':
                return 'In Stock';

            case 'LOWSTOCK':
                return 'Low Stock';

            case 'OUTOFSTOCK':
                return 'Out of Stock';

            default:
                return 'NA';
        }
    }

    onCellEditComplete(e) {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (this.isPositiveInteger(newValue))
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0)
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;
        }
    }

    onRowEditComplete1(e) {
        let products2 = [...this.state.products2];
        let { newData, index } = e;

        products2[index] = newData;

        this.setState({ products2 });
    }

    onRowEditComplete2(e) {
        let products3 = [...this.state.products3];
        let { newData, index } = e;

        products3[index] = newData;

        this.setState({ products3 });
    }

    onRowEditChange(e) {
        this.setState({ editingRows: e.data });
    }

    textEditor(options) {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    statusBodyTemplate(rowData) {
        return this.getStatusLabel(rowData.inventoryStatus);
    }

    priceBodyTemplate(rowData) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    validarForm = () => {        
        const { id_procedimiento} = this.state.complemento;
        const noValido = !id_procedimiento;
        return noValido;
    }
       
    render() {

        let campoObligatorio        = <label className="CampoObligatorio mr-md-1">* </label>
        
        let variablesProcedimiento  = { catalogo: 'CONC_PROCEDIMIENTO'};

        let footer                  = <label className='Obligatorio'>Todos los campos marcados con * son obligatorios</label>;
       
        let variablesActividades    = { 
                                        matricula:      202,
                                        id_ponderador:  11
                                    };

        return(
            
            <Fragment>               

                <div className="row justify-content-center">                                    

                    <form className="col-md-11 m-3" >

                        <div className="datatable-editing-demo">
                            <Toast ref={(el) => this.toast = el} />
                        
                            <div className="card p-fluid">

                                <Query  query = {QUERY_ACTIVIDADES_BY_ALUMNO} 
                                        variables={variablesActividades} >
                                    
                                    {({ loading, error, data }) => {
                                        
                                    if(loading) return "Cargando...";						
                                    if(error) return ` Error: ${error.message}`;

                                    if(data.CoreActividadesByAlumno.length === 0) {

                                        return(
                                            <p>No hay registros</p>   
                                        )

                                    } else { 

                                        return (

                                            <Fragment>
                                
                                                <DataTable  value={data.CoreActividadesByAlumno} 
                                                        editMode="row" 
                                                        dataKey="id" 
                                                        onRowEditComplete={this.onRowEditComplete1} 
                                                        responsiveLayout="scroll">
                                                    <Column field="descripcion" 
                                                            header="Descripción"
                                                            style={{ width: '20%' }}>
                                                    </Column>
                                                    <Column field="calificacion" 
                                                            header="Calificación" 
                                                            editor={(options) => this.textEditor(options)} 
                                                            style={{ width: '20%' }}>
                                                    </Column>
                                                    <Column rowEditor 
                                                            headerStyle={{ width: '10%', minWidth: '8rem' }} 
                                                            bodyStyle={{ textAlign: 'center' }}>
                                                    </Column>
                                                </DataTable>
                                                                        
                                            </Fragment>
                                        )
                                    }	
                                    }}
                                </Query>                                
                            </div>                                        
                        </div>

                        <br />

                        <div className="float-right">

                            <button type="submit" 
                                    disabled={ this.validarForm() }
                                    className="btn mr-md-2 mb-2 mb-md-0 botonGuardar d-block d-md-inline-block mr-2">
                                Guardar
                            </button>      

                            <button type="button" 
                                    className="btn d-block d-md-inline-block mr-2 botonCancelar"
                                    onClick = { () => {
                                        localStorage.setItem('abrePantalla', 0);
                                        window.location.replace(window.location.origin+`/alumnos`)
                                    }}>
                                Cancelar 
                            </button>

                        </div>
                    </form>                           
                </div>               
            </Fragment>
        );
    }
}

export default EditarActividad;
