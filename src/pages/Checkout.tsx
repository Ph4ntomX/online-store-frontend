import { AppBar } from "@/components/app-bar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CartProduct } from "@/types/skill";
import { useState } from "react";
import { toast } from "sonner";
import { createOrder } from "@/lib/order-api";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Checkout() {
    const [cart] = useLocalStorage<CartProduct[]>('cart', [])
    const [loading, setLoading] = useState(false)

    const form = useForm({
        defaultValues: {
            customerName: '',
            customerEmail: '',
            products: cart
        },
    })

    const onSubmit = (data: any) => {
        if (!data.customerName || !data.customerEmail) {
            toast.error('Please enter customer name and email')
            return
        }

        // verify email with regex

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.customerEmail)) {
            toast.error('Please enter a valid email')
            return
        }

        setLoading(true)

        console.log(data)
        createOrder(data).then((data) => {
            if (data) {
                window.location.href = data.billplz_url
            } else {
                setLoading(false)
                toast.error('Failed to create order')
            }
        })
    }

    const productTotal = (product: CartProduct) => Math.round(product.price * product.quantity * 100) / 100

    const total = Math.round(cart.reduce((total, product) => total + productTotal(product), 0) * 100) / 100

    return loading ? <div className="flex justify-center items-center h-screen"><Spinner className="h-16 w-16" /></div> : (
        <>
            <AppBar />

            <main className="container mx-auto py-8 px-6 lg:px-32">
                <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

                <div className="flex gap-12 justify-between">
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="customerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <Input {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customerEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-10" type="submit">Checkout</Button>
                            </form>
                        </Form>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>${product.price}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>${productTotal(product)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead>${total}</TableHead>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </main>
        </>
    )
}

