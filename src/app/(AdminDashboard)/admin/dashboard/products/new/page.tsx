"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";

import { useUser } from "@/context/userProvider";

import { Category } from "@/types";

import DForm from "@/components/DForm/DForm";
import DInput from "@/components/DForm/DInput";
import DSelect from "@/components/DForm/DSelect";
import DTextArea from "@/components/DForm/DTextArea";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
} from "@/hooks/Products.hook";
import Loading from "@/components/ui/Loading";

const CreateProductPage = () => {
  const { user } = useUser();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { mutate: handleCreateProduct, isPending } = useCreateProductMutation();
  const { data: categories } = useGetCategoryQuery();

  

  // Transform category data for options
  const categoriesOptions =
    categories?.map((category: Category) => ({
      key: category._id,
      label: category.name,
    })) || [];

  // Transform shop data for options

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      // Generate image previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: FieldValues): void => {
   
    const formData = new FormData();

    // Add product data
    formData.append("data", JSON.stringify(data));

    // Add image files
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

   

    handleCreateProduct(formData);
  };

  return (
    <div>
      {isPending && <Loading />}
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-8xl p-8  rounded-lg ">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create Product
          </h2>

          {/* Image Uploader Section */}
          <div className="mb-6 text-center">
            <label
              htmlFor="image-upload"
              className="inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-lg shadow-md focus:ring-2 cursor-pointer"
            >
              <AiOutlineUpload className="mr-2 text-lg" />
              Upload Images
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {imagePreview.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      alt={`Preview ${index + 1}`}
                      className="border-2 border-dashed h-32 rounded"
                      height={100}
                      src={image}
                      width={100}
                    />
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DForm onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Inputs */}
              <DInput label="Product Name" name="title" type="text" />
              <DInput label="Price" name="price" type="number" />
              <DInput label="Stock Quantity" name="stock" type="number" />
              <DInput
                label="Discount Price"
                name="discount_price"
                type="number"
              />

              {/* Category & Shop Selects */}
              <DSelect
                options={categoriesOptions}
                name="category"
                label="Category"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <DTextArea label="Description" name="description" />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                className={`w-full button-primary ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Product"}
              </button>
            </div>
          </DForm>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
