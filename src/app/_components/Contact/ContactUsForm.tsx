import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(1, "Message is required"),
})
const initialValues = {
  name: "",
  email:"",
  phone:"",
  message:"",
    
}
const ContactUsForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:initialValues
  })

  const onSubmit = (data:z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form  {...form}  >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  " >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Email " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea  rows={7}  className='resize-none'  placeholder="Your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>Send Message</span>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactUsForm