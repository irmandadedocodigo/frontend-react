import api from "@/app/utils/api";
import LoginDTO from "../dtos/LoginDTO";
import { AxiosResponse } from "axios";
import CreateUserDto from "../dtos/CreateUserDTO";


class AuthEndPoints {
    static async Login(data: LoginDTO) {
        const reponse: AxiosResponse<{ token: string }> = await api.post('/auth/login', data);
        return reponse.data;
    }

    static async Register(data: CreateUserDto) {
        const reponse: AxiosResponse = await api.post('/auth/register', data);
        return reponse.data;
    }
}

export default AuthEndPoints;