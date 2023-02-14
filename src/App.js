
import React, { Fragment }                              from 'react';
import { BrowserRouter as Router, Route, Switch }       from 'react-router-dom';

import Header                                           from './componentes/Layout/Header';
import Login                                            from './componentes/Auth/Login';
import Principal                                        from './componentes/Principal';
import Alumnos                                          from './componentes/Registros/Alumnos';

import './componentes/css/Generico.css';
import './componentes/css/DropdownDemo.css';
import './componentes/css/DataViewDemo.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

import './componentes/css/Header.css';
import './componentes/css/Login.css';

import Session                                          from './componentes/Session';

const App = ({refetch, session}) => {

return (

        <Router>
                <Fragment>
                        <Header session={session}/>

                        <div className="genDisplay">

                                <Switch>
                                        <Route  exact 
                                                path="/login" 
                                                render={() => <Login refetch={refetch} />} />

                                        <Route  exact 
                                                path="/principal" 
                                                render={() => <Principal session={session} />} />

                                        <Route  exact 
                                                path="/alumnos" 
                                                render={ () => <Alumnos session={session} />} />
                                        
                                </Switch>
                        </div>
                </Fragment>
        </Router>
);
}

const RootSession = Session(App);

export { RootSession }
