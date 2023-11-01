"use client";
import LoginDTO from "@/app/auth/dtos/LoginDTO";
import { useForm } from "react-hook-form";
import styles from "../auth.module.css";
import AuthEndPoints from "../endpoints";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Validator from "@/app/validators";
import Cookies from "@/app/utils/cookie";

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
        const validade = Validator.validatePassword(data.password)
        if (validade) {
            setError('password', {
                type: 'manual',
                message: validade
            })
            return;
        }
        try {
            const response = await AuthEndPoints.Login(data);
            await Cookies.set('token', response.token, {
                httpOnly: true,
                expires: new Date().getTime() + 60 * 60 * 24 * 7,
                path: '/',
                secure: true,
                sameSite: 'strict'
            });

            router.push("/feed");
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: 'Usuário ou senha incorretos'
            });
            console.error(error);
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
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'E-mail inválido'
                                    }
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
                            <p className="text-red-400 text-center">{errors.root?.message}</p>
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <Link href="/auth/register" className="text-sm transition hover:text-[--tertiary]">Ainda não tenho uma conta</Link>
                        <Link href="" className="text-sm transition hover:text-[--tertiary]">Esqueci minha senha</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
