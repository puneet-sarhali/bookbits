"use client";

import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import localFont from "next/font/local";
const cabinet = localFont({
  src: "../public/CabinetGrotesk-Variable.ttf",
});
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function Newsletter() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>, e: any) {
    const res = await fetch("https://bookbit.vercel.app/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    if (res.ok) {
      toast({
        title: "Thank you for subscribing!",
        description: "Added you to the list.",
      });
    } else {
      toast({
        title: "An error occurred while submitting the form.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <div
        className={`${cabinet.className} relative isolate overflow-hidden bg-neutral-200 dark:bg-neutral-900 py-16 sm:py-16 rounded-xl my-16 mx-4`}
      >
        <div className="mx-auto max-w-7xl px-6 ">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 ">
            <div className="max-w-xl ">
              <dl className="flex flex-col gap-x-6 gap-y-6">
                <div className="flex items-center">
                  <div className="rounded-md bg-white/5 p-2 ring-1 dark:ring-white/10 ring-neutral-300">
                    <HandRaisedIcon
                      className="h-6 w-6 dark:text-neutral-400 text-neutral-600"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="ml-4 dark:text-neutral-400 text-neutral-600">
                    No spam
                  </dt>
                </div>
                <div className="flex items-center">
                  <div className="rounded-md bg-white/5 p-2 ring-1 dark:ring-white/10 ring-neutral-300">
                    <CalendarDaysIcon
                      className="h-6 w-6 dark:text-neutral-400 text-neutral-600"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="ml-4 dark:text-neutral-400 text-neutral-600">
                    1-2 articles per month
                  </dt>
                </div>
              </dl>
              <h2
                className={` text-2xl font-bold tracking-tight dark:text-white text-neutral-950 mt-8`}
              >
                Subscribe to the newsletter.
              </h2>

              <div className="mt-4 flex max-w-md gap-x-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col sm:flex-row"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter you email"
                              {...field}
                              className="w-64 border-0 border-neutral-400 bg-neutral-50 dark:bg-white/5 text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="sm:ml-4 w-fit mt-4 sm:mt-0"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
