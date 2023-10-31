"use client";
import LoginDTO from "@/app/auth/dtos/LoginDTO";
import { useForm } from "react-hook-form";
import styles from "../auth.module.css";
import AuthEndPoints from "../endpoints";
import { useRouter } from "next/navigation";

interface CatchError {
    response: {
        data: {
            message: 'Not Found' | 'Unauthorized'
        }
    }
}

export default function Login() {
    const form = useForm<LoginDTO>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = form

    const submit = async (data: LoginDTO) => {
        try {
            await AuthEndPoints.Login(data);
            router.push("/home");
        } catch (error: CatchError | any) {
            if (error.response.data.message === 'Not Found') {
                setError('email', {
                    type: 'manual',
                    message: 'E-mail não cadastrado'
                });
            }

            if (error.response.data.message === 'Unauthorized') {
                setError('password', {
                    type: 'manual',
                    message: 'Senha incorreta'
                });
            }

            if (error.response.data.message.includes('password is not strong enough')) {
                setError('password', {
                    type: 'manual',
                    message: 'Senha inválida - A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula , 1 número e 1 caractere especial'
                });
            }

            console.error(error.response.data.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-full flex-col">
            <div className={`${styles.Card}`}>
                <div className="container mx-auto p-10 flex gap-5 flex-col">
                    <h1 className="text-4xl text-center font-bold">LOGIN</h1>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="rounded border border-gray-400 p-2 text-black"
                                {...register("email", {
                                    required: 'Campo obrigatório',
                                })}
                            />
                            <p className="text-red-400">{errors.email?.message}</p>
                            <input
                                type="password"
                                placeholder="Senha"
                                className="rounded border border-gray-400 p-2 text-black"
                                {...register("password", {
                                    required: 'Campo obrigatório',
                                })}
                            />
                            <p className="text-red-400">{errors.password?.message}</p>
                            <button
                                type="submit"
                                className="bg-[--secondary] rounded text-white p-2 hover:bg-[--tertiary] transition duration-300 "
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <a href="/auth/register" className="text-sm transition hover:text-[--tertiary]">Ainda não tenho uma conta</a>
                        <a href="" className="text-sm transition hover:text-[--tertiary]">Esqueci minha senha</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
