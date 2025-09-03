
import { AppBar } from "@/components/app-bar";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { signUp } from "@/lib/auth-api";

export default function Signup() {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)

        if (data.email === '' || data.password === '' || data.confirmPassword === '') {
          toast.error('All fields are required')
          return
        }

        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        signUp(data).then(data => {
            if (data) {
                console.log(data)

                toast.success('Successfully signed up')
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
            <h2 className="text-2xl font-semibold mb-6 text-center">Signup and create an account</h2>

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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input type="password" {...field} placeholder="Confirm password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full mt-2">
                  Sign Up
                </Button>
              </form>
            </Form>
            </Card>
          </main>
        </>
        )
}