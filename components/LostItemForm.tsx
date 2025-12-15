"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { LostItemFormData, lostItemSchema } from "@/lib/validations/lostitem";

interface LostItemFormProps {
  onSubmit?: (data: LostItemFormData) => Promise<void>;
  defaultValues?: Partial<LostItemFormData>;
}

export function LostItemForm({ onSubmit, defaultValues }: LostItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LostItemFormData>({
    resolver: zodResolver(lostItemSchema),
    defaultValues: {
      description: "",
      busCompany: "",
      busColor: "",
      busRegPlate: "",
      rewardCash: 1000,
      lostItemOn: undefined,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: LostItemFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit?.(data);
      toast.success("Your lost item has been posted");
      form.reset();
    } catch {
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-full">
        <h3 className="text-2xl font-semibold">Report lost item</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Provide clear details to help recovery
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-8 w-full grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6"
          >
            {/* Description */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Item description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none"
                        placeholder="Describe the lost item in as much detail as possible"
                      />
                    </FormControl>
                    <FormDescription>
                      Include color, size, and identifying details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date lost */}
            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="lostItemOn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Date lost <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(d) =>
                            d > new Date() || d < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Bus info */}
            <div className="col-span-full">
              <Separator />
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="busCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus company (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="busColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus color (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="busRegPlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration plate (Optional)</FormLabel>
                    <FormControl>
                      <Input className="uppercase" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Rewards */}
            <div className="col-span-full">
              <Separator />
            </div>

            <div className="col-span-full">
              <FormField
                control={form.control}
                name="rewardCash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cash reward (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="col-span-full">
              <Separator className="my-6" />
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Post lost item
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
