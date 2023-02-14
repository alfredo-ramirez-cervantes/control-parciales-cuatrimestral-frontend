
import React                        from 'react';
import { Query }                    from 'react-apollo';
import { QUERY_CATALOGO_GENERICO }  from '../queries';

let variablesEstado = { catalogo: 'CONC_ESTADO'};


const Session = Component => props => (

    <Query query={QUERY_CATALOGO_GENERICO} variables={variablesEstado}  >
            
        {({loading, error, data, refetch}) => {
            
            //console.log('+++SESSION-PERFIL:', JSON.parse(localStorage.getItem('perfil')));
            if(loading) return null;

            let perfil = localStorage.getItem('perfil')
            return <Component {...props} refetch={refetch} session={perfil} />
        }}
    </Query>
)

export default Session;