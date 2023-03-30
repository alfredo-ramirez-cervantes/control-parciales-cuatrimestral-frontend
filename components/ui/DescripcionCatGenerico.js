
import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const QUERY_CATALOGO_GENERICO_BY_ID = gql`
	query CatGenericoById($identificador: ID) {
		CatGenericoById(identificador:$identificador){
			cge_descripcion
		}
	}
`;

const DescripcionCatGenerico = (props) => {
    
    let idPrioritario = props.id === '' ? 0 : props.id;
    let descripcion = '';
    
    const { data, loading } = useQuery(QUERY_CATALOGO_GENERICO_BY_ID, {
        variables: { 
            identificador: Number(idPrioritario)
            },
    });

    if(loading) return 'Cargando...';

    if(data !== undefined) {  

        const { CatGenericoById } = data;
        descripcion = CatGenericoById.cge_descripcion;
    }

    return (        
        <label> {descripcion} </label>
     );
}

export default DescripcionCatGenerico;
