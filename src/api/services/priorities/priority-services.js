import http from "../../axios-http-caller";
import { GetPrioritiesException } from "./exceptions/GetPrioritiesException";
import enviroment from "../../../../enviroment.json"

class PriorityServices{
    
    findAll = async () => {
        let url = enviroment.REACT_APP_GET_PRIORITIES
        try {
            const response = await http(url, 'GET');
            return { success: true, data: response.data }
        } catch (error) {
            return GetPrioritiesException(error)
        }        
    }
}

export default new PriorityServices();