"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { z } from "zod"

const passwordSchema = z.string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/\d/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[\W_]/, { message: "A senha deve conter pelo menos um caractere especial" });

const formSchema = z.object({
    username: z.string()
        .min(3, { message: "Seu nome de usuário deve ter pelo menos 3 caracteres" })
        .max(20, { message: "Seu nome de usuário deve ter no maúximo 20 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full md:max-w-lg border-0 md:border">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
                    <CardDescription>
                        Junte-se à Irmandade do Código
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome de Usuário</FormLabel>
                                        <FormControl>
                                            <Input maxLength={20} type="text" placeholder="Digite seu nome de usuário" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite sua senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirme sua senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <span className="text-sm"> Já possui uma conta? <Link href="/login" className="underline underline-offset-2 hover:text-primary transition">Clique aqui</Link></span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Registrar</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
