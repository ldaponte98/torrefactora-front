
export const GetTasksException = (error) => {
    let response = { success: false, message: "", data: null }
    let status = error.response ? error.response.status : null;
    switch (status) {
        case 400:
            return {...response, message: "Ocurrio un error al consultar el listado de actividades del dia, porfavor intentalo mas tarde"}
        case 401:
            return {...response, message: "Su sesion ha finalizado"}
        default:
            return {...response, message: "Ocurrio un error desconocido, intentalo nuevamente"}
    }
}
