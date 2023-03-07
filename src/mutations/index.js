
import gql from 'graphql-tag';

export const REGISTRAR_ACTIVIDAD = gql`
    mutation crearActualizarActividad($ActividadInput: ActividadInput) { 
        crearActualizarActividad(input: $ActividadInput) 
        {
            id
        }
    }
`;

export const REGISTRAR_ACTIVIDAD_ALUMNO = gql`
    mutation crearActualizarActividadAlumno($ActividadAlumnoInput: ActividadAlumnoInput) { 
        crearActualizarActividadAlumno(input: $ActividadAlumnoInput) 
        {
            id
        }
    }
`;

export const REGISTRAR_ASISTENCIA_ALUMNO = gql`
    mutation crearActualizarAsistencia($AsistenciaInput: AsistenciaInput) { 
        crearActualizarAsistencia(input: $AsistenciaInput) 
        {
            id
        }
    }
`;
