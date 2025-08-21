import { AppBar } from "@/components/app-bar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getProducts, deleteProduct } from "@/lib/product-api";
import type { Product, CartProduct } from "@/types/skill";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Products() {
    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [page, setPage] = useState(1)

    const [currentPage, setCurrentPage] = useState<Product[]>([])
    const [nextPage, setNextPage] = useState<Product[]>([])

    const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', [])

    const setCategory = (category: string) => {
      setSelectedCategory(category)
      setPage(1)
    }

    const deleteReload = (id: string) => {
      deleteProduct(id).then(data => {
        toast.success('Product deleted successfully')
        setPage(1)

        setCart(cart.filter(item => item._id !== id))
      })
    }

    const addToCart = (product: Product) => {
      toast.success('Product added to cart')

      let quantity = 1;
      let currentProduct = cart.find(item => item._id === product._id)

      if (currentProduct) {
        currentProduct.quantity += 1
        setCart([...cart])
      } else {
        setCart([...cart, { ...product, quantity: quantity}])
      }
    }

    useEffect(() => {
        getProducts(selectedCategory, page).then(data => setCurrentPage(data))
        getProducts(selectedCategory, page + 1).then(data => setNextPage(data))
    }, [page, selectedCategory])

    return (  
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <main className="container mx-auto py-8 px-6 lg:px-32">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">Products</h2>

        <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={() => navigate('/product')}>Add Product</Button>
        </div>

        <Select
            value={selectedCategory}
            onValueChange={setCategory}
            >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Games">Games</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Consoles">Consoles</SelectItem>
            </SelectContent>
        </Select>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPage.map(product => {
            return (
            <Card className="h-full" key={product._id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between gap-2">
                <Badge className="bg-green-100 text-green-600">${product.price}</Badge>
                <Badge className="bg-orange-100 text-orange-600">{product.category}</Badge>
              </div>
            </CardContent>
            <CardFooter className="block">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => addToCart(product)}>Add to Cart</Button>

              <div className="flex justify-between gap-2 mt-5">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={() => navigate(`/product/${product._id}`)}>Edit</Button>

                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Deleting this product cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteReload(product._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
          )
          })}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>

          <span className="text-gray-600">Page {page}</span>

          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={nextPage.length === 0}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
    )
}