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
import { createQandA } from "../actions";
import { insertQandASchema } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";

// Define initial values based on insertQandASchema
const initialValues: z.infer<typeof insertQandASchema> = {
  question: "",
  answer: "",
};

const AddNewQandAForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertQandASchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: z.infer<typeof insertQandASchema>) => {
    const response = await createQandA({
      ...data,
    });
    if (response?.data?.success) {
      toast({
        title: "Created",
        description: "The Q&A entry has been created",
      });
      form.reset();
    } else {
      toast({
        title: "Failed to create Q&A",
        description: "Could not create Q&A entry",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Enter question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none"
                    placeholder="Enter answer"
                    {...field}
                  />
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

export default AddNewQandAForm;
