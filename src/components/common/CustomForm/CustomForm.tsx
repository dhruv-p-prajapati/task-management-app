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
import { Textarea } from '@/components/ui/textarea';

interface IFormElement<T> {
  label: string;
  placeholder?: string;
  element: 'input' | 'email' | 'password' | 'textarea';
  key: keyof T;
  disabled?: boolean;
}

interface ICustomFormProp<T extends FieldValues> {
  formSchema: z.ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  initialValues?: T;
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
    defaultValues: initialValues ?? {},
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
                        disabled={element.disabled}
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
                    <FormLabel>{element.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={element?.placeholder}
                        disabled={element.disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
            );
          }

          if (element.element === 'textarea') {
            return (
              <FormField
                key={index}
                control={form.control}
                name={element.key as string}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{element.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        disabled={element.disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <Input
                      placeholder={element?.placeholder}
                      disabled={element.disabled}
                      {...field}
                    />
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
