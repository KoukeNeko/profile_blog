import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Key } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({
    message: "請輸入有效的電子郵件地址。",
  }),
  password: z.string().min(8, {
    message: "密碼必須至少 8 個字元。",
  }),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Handle login logic here
    console.log(values)
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>登入</CardTitle>
          <CardDescription>
            使用您的電子郵件和密碼登入您的帳戶。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={16} />
                        <Input 
                          placeholder="your@email.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
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
                    <FormLabel>密碼</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={16} />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                登入
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
          <Button variant="link" className="text-zinc-500 hover:text-zinc-400">
            忘記密碼？
          </Button>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <Button variant="link" className="text-zinc-500 hover:text-zinc-400">
            註冊新帳戶
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}