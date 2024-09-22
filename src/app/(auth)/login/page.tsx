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
  email: z.string().email({ message: "Email inválido" }),
  password: passwordSchema
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full md:max-w-lg border-0 md:border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Entrar na conta</CardTitle>
          <CardDescription>
            Seja bem-vindo(a) de volta a Irmandade do Código
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" type="email"  {...field} />
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

              <div>
                <span className="text-sm"> Ainda não possui uma conta? <Link href="/register" className="underline underline-offset-2 hover:text-primary transition">Clique aqui</Link></span>

              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Entrar</Button>

            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}