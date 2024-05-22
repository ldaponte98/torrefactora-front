import http from "../../axios-http-caller";
import { CreateTaskException } from "./exceptions/CreateTaskException";
import { GetTasksException } from "./exceptions/GetTasksException";
import { UpdateTaskException } from "./exceptions/UpdateTaskException";
import enviroment from "../../../../enviroment.json"
class TaskServices{
    
    findAll = async () => {
        let url = enviroment.REACT_APP_GET_TASKS
        try {
            const response = await http(url, 'GET');
            return { success: true, data: response.data }
        } catch (error) {
            console.log({error: error})
            return GetTasksException(error)
        }        
    }

    create = async (request) => {
        let url = enviroment.REACT_APP_CREATE_TASK
        try {
            const response = await http(url, 'POST', request);
            return { success: true, data: response.data, message: "Actividad registrada exitosamente" }
        } catch (error) {
            return CreateTaskException(error)
        }  
    }

    update = async (id, request) => {
        let url = `${enviroment.REACT_APP_UPDATE_TASK}${id}`
        try {
            const response = await http(url, 'PUT', request);
            return { success: true, data: response.data, message: "Actividad actualizada exitosamente" }
        } catch (error) {
            return UpdateTaskException(error)
        }        
    }
}

export default new TaskServices();