import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card"

export type AuthConfig = {
  form: React.ReactNode
  title: React.ReactNode
  footerText: React.ReactNode
}

export const AuthLayout = ({ form, title, footerText }: AuthConfig) => {
  return (
    <main className="grow flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm underline">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
