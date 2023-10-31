import API_BASE_URL from "@/app/utils/ApiBaseUrl";
import LoginDTO from "../dtos/LoginDTO";
import { AxiosResponse } from "axios";


class AuthEndPoints {
    static async Login(data: LoginDTO) {
        const reponse: AxiosResponse = await API_BASE_URL.post('/auth/login', data);
        return reponse.data;
    }
}

export default AuthEndPoints;