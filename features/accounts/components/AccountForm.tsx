import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/db/schema";

// define form schema
const formSchema = insertAccountSchema.pick({
  name: true,
});

export type FormAccountValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormAccountValues;
  onSubmit: (values: FormAccountValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({ defaultValues, disabled, id, onDelete, onSubmit }: Props) => {
  const form = useForm<FormAccountValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormAccountValues) => {
    console.log({ values });
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Cash, Bank, CreditCard" disabled={disabled} {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-x-2">
          <Button className="w-full" disabled={disabled} type="submit">
            {id ? "Save" : "Create"}
          </Button>
          {!!id && (
            <Button variant="outline" onClick={handleDelete} disabled={disabled} type="button">
              <Trash className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
