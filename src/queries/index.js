
import gql from "graphql-tag";

export const QUERY_CATALOGO_MATERIA = gql`
	query CatListaMateriasByIdProfesor($id_profesor: Int) {
		CatListaMateriasByIdProfesor(id_profesor:$id_profesor){
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

export const QUERY_CATALOGO_GRUPO = gql`
	query CatListaGruposByMateria($id_profesor: Int, $id_materia: Int) {
		CatListaGruposByMateria(id_profesor:$id_profesor, id_materia:$id_materia ){
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

export const QUERY_CATALOGO_PARCIAL = gql`
	query CatListaParciales{
		CatListaParciales{
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;

export const QUERY_CATALOGO_ALUMNOS = gql`
	query CatListaAlumnosByGrupo($id_grupo: Int) {
		CatListaAlumnosByGrupo(id_grupo:$id_grupo){
			matricula      
			nombre         
			fechaalta        
			fechamodificacion
			estatus 
		}
	}
`;

export const QUERY_ASISTENCIA_PARCIAL = gql`
	query CatListaAsistenciaByGrupoProfMat(
											$id_parcial: Int,
											$id_periodo: Int,
											$id_profesor: Int,
											$id_materia: Int,
											$id_grupo:   Int,
											$id_alumno: Int
										) {
			CatListaAsistenciaByGrupoProfMat(
											id_parcial:  $id_parcial, 
											id_periodo:  $id_periodo,
											id_profesor: $id_profesor, 
											id_materia:  $id_materia,
											id_grupo:    $id_grupo, 
											id_alumno:   $id_alumno
										){
			id             
			id_parcial_periodo
			dia 
			asistencia   
			id_alumno   			
		}
	}
`;

export const QUERY_ACTIVIDAD_BY_ALUMNO = gql`
	query CatListaActividadesAlumnosByPonderador(
											$id_parcial:   	Int,
											$id_periodo:   	Int,
											$id_ponderador:	Int,
											$id_alumno:    	Int

											$id_profesor:  Int,
											$id_materia:   Int,
											$id_grupo:     Int,
										) {
			CatListaActividadesAlumnosByPonderador(
											id_parcial:   	$id_parcial, 
											id_periodo:   	$id_periodo,
											id_ponderador:	$id_ponderador, 
											id_alumno:    	$id_alumno,

											id_profesor:	$id_profesor,
											id_materia:		$id_materia,
											id_grupo:  		$id_grupo
										){
			id              
			id_parcial_periodo
			id_ponderador   
			descripcion      
			id_alumno       
			calificacion     			
		}
	}
`;

export const QUERY_CATALOGO_PONDERADOR = gql`
	query CatListaPonderador{
		CatListaPonderador{
			id          
			descripcion  
			fechaalta       
			fechamodificacion
			estatus
		}
	}
`;















export const QUERY_CATALOGO_GENERICO = gql`
	query CatGenericoListByCat($catalogo: String) {
		CatGenericoListByCat(catalogo:$catalogo){
			id              
			clave          
			orden         
			descripcion  
			catalogo    
			fechaalta    
			fechamodificacion
			estatus      
			id_padre    
		}
	}
`;

export const QUERY_LISTA_MATERIAS_BY_PROFESOR = gql`
	query CatListaMateriasByIdProfesor($id_profesor: Int) {
		CatListaMateriasByIdProfesor(id_profesor:$id_profesor){
			id              
			clave          
			orden         
			descripcion  
			catalogo    
			fechaalta    
			fechamodificacion
			estatus      
			id_padre    
		}
	}
`;

export const QUERY_LISTA_GRUPOS_BY_MATERIA = gql`
	query CatListaGruposByIdMateria($id_materia: Int) {
		CatListaGruposByIdMateria(id_materia:$id_materia){
			id              
			clave          
			orden         
			descripcion  
			catalogo    
			fechaalta    
			fechamodificacion
			estatus      
			id_padre    
		}
	}
`;

export const QUERY_CATALOGO_DESCRIPCION = gql`
	query CatGenericoById($id: ID) {
		CatGenericoById(id:$id){
			descripcion
		}
	}
`;

export const QUERY_ALUMNOS = gql`
	query CoreAlumnoByIdGrupo($id_grupo: Int) {
		CoreAlumnoByIdGrupo(id_grupo:$id_grupo){
			matricula   
			nombre     
			fechaalta
			fechamodificacion
			estatus  
		}
	}
`;

export const QUERY_ACTIVIDADES_BY_ALUMNO = gql`
	query CoreActividadesByAlumno(
			$matricula:		Int,
			$id_parcial:  	Int,
			$id_materia:   	Int,
			$id_grupo:     	Int,
			$id_ponderador:	Int) {
		CoreActividadesByAlumno(
			matricula:		$matricula,    
			id_parcial:  	$id_parcial, 
			id_materia:   	$id_materia,
			id_grupo:     	$id_grupo,
			id_ponderador:	$id_ponderador){
			id            
			descripcion
			calificacion  
		}
	}
`;

export const QUERY_ASISTENCIA_BY_ALUMNO = gql`
	query CoreAsistenciaByAlumno($matricula: Int, $id_parcial: Int, $id_materia_grupo: Int) {
		CoreAsistenciaByAlumno(matricula: $matricula, id_parcial: $id_parcial, id_materia_grupo: $id_materia_grupo){
			id              
			id_materia_grupo
			id_parcial  
			dia      
			asistio  
		}
	}
`;
