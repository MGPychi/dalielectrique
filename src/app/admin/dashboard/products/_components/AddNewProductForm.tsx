"use client";
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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "../actions";
import { insertProductSchema } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";
const initialValues: z.infer<typeof insertProductSchema> = {
  description: "",
  name: "",
  isActive: true,
};
const AddNewProductForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertProductSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: z.infer<typeof insertProductSchema>) => {
    const response = await createProduct({
      ...data,
    });
    if (response?.data?.success) {
      toast({
        title: "Created",
        description: "the product has been created",
      });
      form.reset();
    } else {
      toast({
        title: "Failed to create the product",
        description: "can't create this product",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
        <div className="grid grid-cols-1  gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
                <FormLabel>Description </FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>active</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} */}
          {/* /> */}
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex px-8 gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>create</span>
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
