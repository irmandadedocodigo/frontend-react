import api from "@/app/utils/api";
import LoginDTO from "../dtos/LoginDTO";
import { AxiosResponse } from "axios";
import CreateUserDto from "../dtos/CreateUserDTO";
import { IProfile } from "../interfaces/ProfileInterface";


class AuthEndPoints {
    constructor(
        private readonly prefix: string = '/auth'
    ) { }
    async postLogin(data: LoginDTO) {
        const reponse: AxiosResponse<{ token: string }> = await api.post(`${this.prefix}/login`, data);
        return reponse.data;
    }

    async postRegister(data: CreateUserDto) {
        const reponse: AxiosResponse = await api.post(`${this.prefix}/register`, data);
        return reponse.data;
    }

    async getProfile() {
        const reponse: AxiosResponse<IProfile> = await api.get(`${this.prefix}/profile`);
        return reponse.data;
    }
}

export default new AuthEndPoints();