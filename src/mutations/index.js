import gql from 'graphql-tag';


export const REGISTRAR_PONDERADOR = gql`
    mutation crearActualizarPonderador($PonderadorInput: PonderadorInput) { 
        crearActualizarPonderador(input: $PonderadorInput) 
        {
            id
        }
    }
`;
