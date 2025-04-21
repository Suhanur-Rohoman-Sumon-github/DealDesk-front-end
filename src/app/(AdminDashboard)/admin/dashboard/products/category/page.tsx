/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Edit, Trash2, PlusCircle, Package } from "lucide-react";
import { useGetCategoryQuery } from "@/hooks/Products.hook";

// Mock data for demonstration
const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    productCount: 45,
  },
  {
    id: 2,
    name: "Clothing",
    description: "Apparel and fashion items",
    productCount: 78,
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Household items and appliances",
    productCount: 34,
  },
  {
    id: 4,
    name: "Books",
    description: "Books, e-books, and publications",
    productCount: 120,
  },
  {
    id: 5,
    name: "Beauty",
    description: "Cosmetics and personal care",
    productCount: 56,
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

const Categories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: allCategory } = useGetCategoryQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    form.reset({
      name: category.name,
      description: category.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...values }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        name: values.name,
        description: values.description || "",
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
    }

    setIsDialogOpen(false);
    setEditingCategory(null);
    form.reset();
  }

  const openNewCategoryDialog = () => {
    setEditingCategory(null);
    form.reset({
      name: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div>
      {/* Category Section Header */}
      <section className="mb-6 space-y-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
          <p className="text-muted-foreground text-sm">
            View and manage your product categories. You can add, edit, or
            delete categories from here.
          </p>
        </div>
        <Button
          onClick={openNewCategoryDialog}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Category
        </Button>
      </section>

      {/* Category Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allCategory?.map((category:any) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {category.name}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {category.productCount}{" "}
                {category.productCount === 1 ? "product" : "products"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(category)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category details below."
                : "Fill in the details to create a new product category."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input
                        placeholder="Enter category description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
