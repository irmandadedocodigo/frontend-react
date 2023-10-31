"use client"
import Validator from "@/app/validators";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "../auth.module.css";
import CreateUserDto from "../dtos/CreateUserDTO";
import AuthEndPoints from "../endpoints";

export default function Register() {
    const form = useForm<CreateUserDto>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = form

    const submit = async (data: CreateUserDto) => {
        const validatePassword = Validator.validatePassword(data.password, data.passwordConfirmation)

        if (validatePassword) {
            setError('password', {
                type: 'manual',
                message: validatePassword
            })
            return;
        }

        try {
            await AuthEndPoints.Register(data);
            router.push("/auth/login");
        } catch (error) {
            console.error(error);
            if ((error as AxiosError).response?.status === 422) {
                setError('email', {
                    type: 'manual',
                    message: 'E-mail já cadastrado'
                })
                return;
            }

            setError('root', {
                type: 'manual',
                message: 'Erro ao criar conta'
            })
        }
    }


    return (
        <div className="flex justify-center items-center h-full flex-col">
            <div className={`${styles.Card}`}>
                <div className="container mx-auto p-10 flex gap-5 flex-col">
                    <h1 className="text-4xl text-center font-bold">CRIE SUA CONTA</h1>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="Nome completo"
                                placeholder="Nome completo"
                                className="rounded border border-gray-400 p-2 text-black"
                                {...register("fullName", {
                                    required: "Campo obrigatório"
                                })}
                            />
                            <p className="text-red-400">{errors.fullName?.message}</p>
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="rounded border border-gray-400 p-2 text-black"
                                {...register("email", {
                                    required: "Campo obrigatório",
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
                                    required: "Campo obrigatório"
                                })}
                            />
                            <p className="text-red-400">{errors.password?.message}</p>
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                className="rounded border border-gray-400 p-2 text-black"
                                {...register("passwordConfirmation", {
                                    required: "Campo obrigatório"
                                })}
                            />
                            <p className="text-red-400">{errors.passwordConfirmation?.message}</p>
                            <button
                                type="submit"
                                className="bg-[--secondary] rounded text-white p-2 hover:bg-[--tertiary] transition duration-300 "
                            >
                                Criar conta
                            </button>
                            <p className="text-red-400 text-center">{errors.root?.message}</p>
                        </div>
                    </form>
                    <div className="flex justify-end">
                        <Link href="/auth/login" className="text-sm transition hover:text-[--tertiary]">Já tenho uma conta</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}