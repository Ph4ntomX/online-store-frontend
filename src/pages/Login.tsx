
import { AppBar } from "@/components/app-bar";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { logIn } from "@/lib/auth-api";

export default function Login() {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)

        if (data.email === '' || data.password === '') {
            toast.error('All fields are required')
            return
        }

        logIn(data).then(data => {
            if (data) {
                console.log(data)

                toast.success('Successfully logged in')
                navigate('/')
            } else {
                toast.error('Invalid email or password')
            }
        })
    }

    return (
        <>
          <AppBar />
          <main className="container mx-auto py-8 px-6 lg:px-32">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login to an existing account</h2>

            <Card className="w-full max-w-lg mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} placeholder="Enter email" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" {...field} placeholder="Enter password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full mt-2">
                  Login
                </Button>
              </form>
            </Form>
            </Card>
          </main>
        </>
        )
}