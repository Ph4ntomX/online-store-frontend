import { AppBar } from "@/components/app-bar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
}


export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    // fetch products from api

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('http://localhost:5123/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (  
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <main className="container mx-auto py-8 px-6 lg:px-32">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">Products</h2>

        <Button className="bg-green-700 hover:bg-green-800 text-white">Add Product</Button>
        </div>

        <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="games">Games</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="consoles">Consoles</SelectItem>
            </SelectContent>
        </Select>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => {
            if (selectedCategory !== 'all' && product.category !== "null" && product.category.toLowerCase() !== selectedCategory) {
                return;
            }

            return (
            <Card className="h-full">
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
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Add to Cart</Button>

              <div className="flex justify-between gap-2 mt-5">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">Edit</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
              </div>
            </CardFooter>
          </Card>
          )
          })}
        </div>
      </main>
    </div>
    )
}