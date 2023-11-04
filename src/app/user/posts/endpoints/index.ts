
import api from "@/app/utils/api";
import { AxiosResponse } from "axios";
import CreatePostDTO from "../dtos/CreatePostDTO";
import { IPost } from "../interfaces/PostInterface";



class PostsEndPoints {
    constructor(
        private readonly prefix: string = '/posts'
    ) { }
    async CreatePost(post: CreatePostDTO) {
        const reponse: AxiosResponse = await api.post(`${this.prefix}`, post);
        return reponse.data;
    }

    async GetUserPosts() {
        const reponse: AxiosResponse<IPost[]> = await api.get(`/users/posts/my`);
        return reponse.data;
    }
}

export default new PostsEndPoints();