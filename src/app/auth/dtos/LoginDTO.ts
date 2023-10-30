
class LoginDTO {
    email!: string
    password!: string
    constructor(data: LoginDTO) {
        Object.assign(this, data)
    }
}

export default LoginDTO