
class CreateUserDto {
    fullName!: string;
    email!: string;
    password!: string;
    constructor(data: CreateUserDto) {
        Object.assign(this, data)
    }
}

export default CreateUserDto;