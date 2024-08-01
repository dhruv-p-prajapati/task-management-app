import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

interface IFormElement<T> {
  label: string;
  placeholder?: string;
  element: 'input' | 'email' | 'password';
  key: keyof T;
}

interface ICustomFormProp<T extends FieldValues> {
  formSchema: z.ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  initialValues: any;
  elements: IFormElement<T>[];
  children: React.ReactNode;
}

const CustomForm = <T extends FieldValues>({
  formSchema,
  onSubmit,
  initialValues,
  elements,
  children,
}: ICustomFormProp<T>) => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="space-y-4"
      >
        {elements?.map((element: IFormElement<T>, index: number) => {
          if (element.element === 'email') {
            return (
              <FormField
                key={index}
                control={form.control}
                name={element.key as string}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="">{element.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={element?.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
            );
          }

          if (element.element === 'password') {
            return (
              <FormField
                key={index}
                control={form.control}
                name={element.key as string}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="">{element.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={element?.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
            );
          }

          return (
            <FormField
              key={index}
              control={form.control}
              name={element.key as string}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="">{element.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={element?.placeholder} {...field} />
                  </FormControl>
                  <FormMessage className="font-semibold" />
                </FormItem>
              )}
            />
          );
        })}

        {children}
      </form>
    </Form>
  );
};

export default CustomForm;
