import { AppBar } from "@/components/app-bar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react";
import type { Category } from "@/types/skill";
import { useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/categories-api";
import { toast } from "sonner";

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [input, setInput] = useState('')
    const [editInput, setEditInput] = useState('')

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])

    const addCategory = (category: Category) => {
        createCategory(category).then((data) => {
            if (data) {
                toast.success('Category added successfully')
                setCategories([...categories, data])
            } else {
                toast.error('Category not added')
            }
        })
    }

    const processDeleteCategory = (id: string) => {
        deleteCategory(id).then((data) => {
            if (data) {
                setInput('')
                toast.success('Category deleted successfully')
                setCategories(categories.filter(category => category._id !== id))
            } else {
                toast.error('Category not deleted')
            }
        })
    }

    const editCategory = (category: Category) => {
        updateCategory(category).then((data) => {
            if (data) {
                toast.success('Category edited successfully')
                setCategories(categories.map(specificCategory => specificCategory._id === category._id ? category : specificCategory))
            } else {
                toast.error('Category not edited')
            }
        })
    }

    return (
        <>
            <AppBar />
            <main className="container mx-auto py-8 px-6 lg:px-32">
                <h2 className="text-2xl font-semibold mb-6 text-center">Categories</h2>

                <div className="flex gap-2 px-10">
                    <Input placeholder="Category name" value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button onClick={() => addCategory({ name: input } as Category)}>Add Category</Button>
                </div>

                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map(category => (
                            <TableRow key={category._id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => setEditInput(category.name)}>Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                    <DialogDescription>Make changes to your category here.</DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Input id="name-1" name="name" defaultValue={editInput} onChange={(e) => setEditInput(e.target.value)} />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => {
                                                            editCategory({ ...category, name: editInput } as Category)
                                                        }}>Save changes</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>

                                    <Button variant="destructive" onClick={() => processDeleteCategory(category._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </>
    )
}