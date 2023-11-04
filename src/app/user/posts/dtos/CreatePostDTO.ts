
class CreatePostDTO {
    title!: string;
    content!: string;
    constructor(data: CreatePostDTO) {
        Object.assign(this, data)
    }
}

export default CreatePostDTO;