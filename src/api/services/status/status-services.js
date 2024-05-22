import http from "../../axios-http-caller";
import { GetStatusException } from "./exceptions/GetStatusException";
import enviroment from "../../../../enviroment.json"

class StatusServices{
    
    findAll = async () => {
        let url = enviroment.REACT_APP_GET_STATUS
        try {
            const response = await http(url, 'GET');
            return { success: true, data: response.data }
        } catch (error) {
            return GetStatusException(error)
        }        
    }
}

export default new StatusServices();