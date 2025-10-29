import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card"

export type AuthConfig = {
  form: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  footerText: React.ReactNode
}

export const AuthLayout = ({ form, title, description, footerText }: AuthConfig) => {
  return (
    <main className="grow flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
