

class Validator {
    public static validatePassword(password: string, passwordConfirmation?: string) {
        const verifyOptions: {
            [key: number]: string | boolean
        } = {
            0: passwordConfirmation ? password !== passwordConfirmation && "As senhas não se coincidem" : false,
            1: password.length < 8 && "A senha deve conter no mínimo 8 caracteres",
            2: !password.match(/[a-z]/g) && "A senha deve conter no mínimo uma letra minúscula",
            3: !password.match(/[A-Z]/g) && "A senha deve conter no mínimo uma letra maiúscula",
            4: !password.match(/[0-9]/g) && "A senha deve conter no mínimo um número",
            5: !password.match(/[^a-zA-Z\d]/g) && "A senha deve conter no mínimo um caractere especial",
        }

        for (const verify in verifyOptions) {
            if (verifyOptions[verify]) {
                return verifyOptions[verify].toString();
            }
        }
    }
}

export default Validator;