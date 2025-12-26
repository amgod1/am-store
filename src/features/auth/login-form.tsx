import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/shared/ui/kit/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form"
import { Input } from "@/shared/ui/kit/input"
import { useLogin } from "./use-login"

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password required")
    .min(6, "Minimum password length is 6"),
})

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  })

  const { login, isPending, errorMessage } = useLogin()

  const onSubmit = form.handleSubmit(login)

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          name="email"
          control={form.control}
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}

        <Button variant="default" disabled={isPending} type="submit">
          Login
        </Button>
      </form>
    </Form>
  )
}
