
import { gql } from "@apollo/client";


export const GET_CAT_MATERIA = gql `
query CatProfesion {
    CatMateria :CatListaMateriasByIdProfesor(id_profesor :$id_profesor) {
        value: id
        label: descripcion 
    }
}`;



export const GET_DEPENDENCIAS =  gql `
query Dependencias {
    Dependenciasdb : CatGenericoListByCat(cge_catalogo : "CAT_DEPENDENCIAS") {
        value: identificador
        label: cge_descripcion 
    }
}`;


export const GET_NOMBRE_ESTRUCTURAL_PUESTO = gql `
query NombreEstPuesto {
    NombreEstPuestodb : CatNombreEstructuralPuestoList {
        value: identificador
        label: cne_descripcion 
    }
}`;


export const GET_ESTATUS_PLAZAS =  gql `
query EstatusPlazas {
    EstatusPlazasdb : CatGenericoListByCat(cge_catalogo : "CAT_ESTATUS_PLAZA") {
        value: identificador
        label: cge_descripcion 
    }
}`;


export const PLAZA_JEFE = gql `
query PlazaJefe {
    PlazaJefedb : PlazasList {
        value: identificador
        label: plz_cve 
    }
}`;


export const AREA_ADSCRIPCION = gql `
query AreasAdscripcion {
    AreasAdscripciondb : CatAreasAdscripcionList {
        value: identificador
        label: caa_descripcion 
    }
}`;


export const GET_CURVA_SECTOR_CENTRAL =  gql `
query CurvaSectorCentral {
    CurvaSectorCentraldb : CatGenericoListByCat(cge_catalogo : "CAT_CURVA_SALARIAL_CENTRAL") {
        value: identificador
        label: cge_descripcion 
    }
}`;


export const GET_CURVA_ESPECIFICA =  gql `
query CurvaEspecifica {
    CurvaEspecificadb : CatGenericoListByCat(cge_catalogo : "CAT_CURVA_SALARIAL_ESPECIFICA") {
        value: identificador
        label: cge_descripcion 
    }
}`;


export const GET_TIPO_PLAZA =  gql ` 
query TipoPlaza {
    TipoPlazadb : CatGenericoListByCat(cge_catalogo : "CAT_TIPO_PLAZA") {
        value: identificador
        label: cge_descripcion 
    }
}`;


export const GET_GRUPO_PERSONAL =  gql ` 
query GrupoPersonal {
    GrupoPersonaldb : CatGenericoListByCat(cge_catalogo : "CAT_GRUPO_PERSONAL") {
        value: identificador
        label: cge_descripcion 
    }
}`;

export const GET_CAT_PROFESION = gql `
query CatProfesion {
    CatProfesion :CatGenericoListByCat(cge_catalogo : "CAT_PROFESION") {
        value: identificador
        label: cge_siglas 
    }
}`;

export const GET_CAT_SEXO = gql `
query CatSexo {
    CatSexo :CatGenericoListByCat(cge_catalogo : "CAT_SEXO") {
        value: identificador
        label: cge_descripcion 
    }
}`;

export const GET_CAT_NIVEL_ESTUDIO = gql `
query CatNivelEstudio {
    CatNivelEstudio :NivelEstudioList {
        value: identificador
        label: ces_descripcion 
    }
}`;

export const GET_CAT_AVANCE_ESTUDIO = gql `
query CatAvanceEstudio {
    CatAvanceEstudio :CatGenericoListByCat(cge_catalogo : "CAT_AVANCE_ESCOLARIDAD") {
        value: identificador
        label: cge_descripcion 
    }
}`;

export const GET_CAT_TIPO_EMPLEO = gql `
query CatTipoEmpleo {
    CatTipoEmpleo :CatTipoEmpleoList {
        value: identificador
        label: kte_descripcion 
    }
}`;


export const PLAZAS = gql `
query CorePlazas {
    CorePlazas : PlazasList {
        value: identificador
        label: plz_cve 
    }
}`;
