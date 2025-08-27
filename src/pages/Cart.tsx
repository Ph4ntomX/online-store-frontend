import { AppBar } from "@/components/app-bar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CartProduct } from "@/types/skill";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Cart() {
  
  const navigate = useNavigate()
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', [])

  const removeOneProduct = (id: string) => {
    const product = cart.find((item) => item._id === id)
    if (product) {
      product.quantity -= 1
      setCart([...cart])

      if (product.quantity === 0) {
        setCart(cart.filter((item) => item._id !== id))
      }
    }

    toast.success('Removed one item from cart')
  }

  // round to 2 decimal places
  const productTotal = (product: CartProduct) => Math.round(product.price * product.quantity * 100) / 100

  const total = Math.round(cart.reduce((total, product) => total + productTotal(product), 0) * 100) / 100

  return (
    <>
      <AppBar />

      <main className="container mx-auto py-8 px-6 lg:px-32">
        <h2 className="text-2xl font-semibold mb-6 text-center">Cart</h2>

        <Table>
          {cart.length === 0 && (
            <TableCaption>You have no items in your cart.</TableCaption>
          )}

          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${productTotal(product)}</TableCell>
                <TableCell>
                  <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => removeOneProduct(product._id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead>${total}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="flex justify-end mt-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => {
            if (cart.length === 0) {
              toast.error('Please add products to cart')
              return
            }

            navigate('/checkout')
          }}>Checkout</Button>
        </div>
      </main>
    </>
  )
}