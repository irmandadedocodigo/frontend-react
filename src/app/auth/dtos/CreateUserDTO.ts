
class CreateUserDto {
    fullName!: string;
    email!: string;
    password!: string;
    passwordConfirmation!: string;
    constructor(data: CreateUserDto) {
        Object.assign(this, data)
    }
}

export default CreateUserDto;