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
import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "./use-register"

const registerSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z.string("Password required").min(6, "Minimum password length is 6"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { register, isPending, errorMessage } = useRegister()

  const onSubmit = form.handleSubmit(register)

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
        <FormField
          name="confirmPassword"
          control={form.control}
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

        <Button variant="outline" disabled={isPending} type="submit">
          Register
        </Button>
      </form>
    </Form>
  )
}
