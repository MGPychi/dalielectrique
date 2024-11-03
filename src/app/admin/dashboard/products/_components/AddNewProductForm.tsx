"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "../actions";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FILES, MAX_FILE_SIZE } from "@/constants";

// Define a proper form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  images: z
    .array(z.any())
    .min(1, "At least one image is required")
    .max(MAX_FILES, `Maximum ${MAX_FILES} images allowed`)
    .optional()
    .nullable(),
});

type FormValues = z.infer<typeof formSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file: File;
};

const initialValues: FormValues = {
  description: "",
  name: "",
  images: [],
};

const AddNewProductForm = () => {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Check if adding new files would exceed the limit
    if (imagePreviews.length + files.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Maximum ${MAX_FILES} images allowed`,
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    // Create new previews
    const newPreviews = validFiles.map((file) => {
      return new Promise<ImagePreview>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: Math.random().toString(36).substring(7),
            url: reader.result as string,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((previews) => {
      setImagePreviews((prev) => [...prev, ...previews]);
      form.setValue(
        "images",
        [...imagePreviews, ...previews].map((p) => p.file)
      );
    });
  };

  const removeImage = (id: string) => {
    setImagePreviews((prev) => prev.filter((p) => p.id !== id));
    form.setValue(
      "images",
      imagePreviews.filter((p) => p.id !== id).map((p) => p.file)
    );
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);

      // Append each image with a unique key
      imagePreviews.forEach((preview, index) => {
        formData.append(`images`, preview.file);
      });

      const response = await createProduct(formData);

      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Product has been created",
        });
        form.reset();
        setImagePreviews([]);
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {imagePreviews.map((preview) => (
                          <div key={preview.id} className="relative">
                            <img
                              src={preview.url}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeImage(preview.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {imagePreviews.length < MAX_FILES && (
                        <>
                          <Upload className="w-8 h-8 text-gray-400" />
                          <div className="text-center">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                document
                                  .getElementById("image-upload")
                                  ?.click();
                              }}
                            >
                              Choose Images
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            PNG, JPG up to 10MB (Maximum {MAX_FILES} images)
                          </p>
                        </>
                      )}

                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                        {...field}
                      />
                    </CardContent>
                  </Card>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex px-8 gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>Create</span>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNewProductForm;
