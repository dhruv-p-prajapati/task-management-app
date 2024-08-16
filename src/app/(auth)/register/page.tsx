'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import CustomForm from '@/components/common/CustomForm/CustomForm';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { RouteConstants } from '@/constants/routes.constants';

const RegisterPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

  const signUpFormSchema = z
    .object({
      name: z.string().min(1, 'Username is required'),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
      password: z
        .string()
        .regex(
          passwordRules,
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        ),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    });

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    const res = await signIn('credentials', {
      name: data.name,
      email: data.email,
      password: data.password,
      redirect: false,
      endPoint: RouteConstants.REGISTER,
    });

    if (res?.error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: res.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      description: 'User registered successfully!',
      variant: 'success',
    });
    router.replace('/');
  };

  const handleLoginGoogle = async () => {
    signIn('google');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-[min(24rem,85vw)] flex-col items-start justify-start">
        <div className="mx-auto mb-5 max-w-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-semibold">
              Welcome To{' '}
              <span className="font-extrabold italic text-primary">
                TaskMaster
              </span>
            </h1>
            <p className="text-foreground">Manage your tasks efficiently.</p>
          </div>
        </div>

        <div className="w-96">
          <CustomForm<z.infer<typeof signUpFormSchema>>
            formSchema={signUpFormSchema}
            onSubmit={onSubmit}
            elements={[
              {
                element: 'input',
                label: 'Username',
                placeholder: 'Dhruv224',
                key: 'name',
              },
              {
                element: 'email',
                label: 'Email',
                placeholder: 'dhruv@example.com',
                key: 'email',
              },
              {
                element: 'password',
                label: 'Password',
                placeholder: 'password123@',
                key: 'password',
              },
              {
                element: 'password',
                label: 'Confirm Password',
                placeholder: 'password123@',
                key: 'confirmPassword',
              },
            ]}
          >
            <Button type="submit" className="w-full">
              Register to TaskMaster
            </Button>
          </CustomForm>
        </div>

        <div className="w-full">
          <div className="my-4 flex items-center">
            <hr className="w-full" />
            <span className="mx-4">OR</span>
            <hr className="w-full" />
          </div>
          <Button
            type="button"
            variant={'outline'}
            className="flex w-full gap-2 bg-foreground text-background hover:bg-foreground/90 hover:text-background"
            onClick={handleLoginGoogle}
          >
            <FcGoogle className="text-2xl" />
            <span>Login with Google</span>
          </Button>
        </div>

        <div className="mt-3 text-base text-secondary-foreground">
          Already have an account?{' '}
          <Link href={'/login'} className="text-primary">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
