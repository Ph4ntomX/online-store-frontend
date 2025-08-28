import { AppBar } from "@/components/app-bar";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product, CartProduct, Category } from "@/types/skill";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProduct, updateProduct, addProduct } from "@/lib/product-api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { getCategories } from "@/lib/categories-api";



export default function ProductCreation() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [loaded, setLoaded] = useState(false)
    const [productExists, setProductExists] = useState(true);

    const [categories, setCategories] = useState<Category[]>([])

    const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', [])
  
    // Initialize form with react-hook-form
    const form = useForm<Product>({
    defaultValues: {
      name: '',
      price: 5,
      description: '',
      category: '',
      _id: '',
    }
    });

  const onSubmit = (data: Product) => {
    console.log(data)

    if (id) {
      updateProduct(data).then(() => {
          toast.success('Product updated successfully')

          let cartProduct = cart.find(item => item._id === data._id)
          if (cartProduct) {
            cartProduct.name = data.name
            cartProduct.price = data.price
            cartProduct.description = data.description
            cartProduct.category = data.category

            setCart([...cart])
          }

          navigate('/')
      })
    } else {
      addProduct(data).then(data => {
         if (data) {
          toast.success('Product added successfully')
          navigate('/')
        } else {
          toast.error('Product not added')
        }
      })
    }
  };


  useEffect(() => {
    if (id) {
      getProduct(id).then(data => {
        if (data) {

          setLoaded(true)
          form.setValue('name', data.name);
          form.setValue('price', data.price);
          form.setValue('description', data.description);
          form.setValue('category', data.category);
          form.setValue('_id', data._id);
        } else {
          setProductExists(false);
        }
      });

      getCategories().then(data => setCategories(data))
    } else {
      setLoaded(true)
    }
  }, [id]);

  return (
    <>
      <AppBar />
      <main className="container mx-auto py-8 px-6 lg:px-32">
        <h2 className="text-2xl font-semibold mb-6 text-center">{id ? (productExists ? 'Edit Product' : 'Product Not Found') : 'Add Product'}</h2>

        {loaded && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <Input {...field} placeholder="Enter product name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" {...field} placeholder="Enter price" />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Enter product description" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </form>
        </Form>
        )}
      </main>
    </>
    )
}
