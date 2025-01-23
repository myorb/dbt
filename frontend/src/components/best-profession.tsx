"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getBestProfession } from "@/services/adminService"
import { Separator } from "@/components/ui/separator"

const FormSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  limit: z.coerce.number().nonnegative(),
})

export function BestProfession() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      limit: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { startDate, endDate, limit } = data
    const response = await getBestProfession(
      {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        limit,
      }
    );
    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
          <h3 className="mt-4 text-md font-bold">Response:</h3>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(response, null, 2)}</code>
          </pre>
        </>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Best Profession</h1>
        <Separator />
        <div className="flex-1">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date:</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date:</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limit:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
