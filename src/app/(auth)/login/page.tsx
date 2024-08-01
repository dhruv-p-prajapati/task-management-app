'use client';

import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import CustomForm from '@/components/common/CustomForm';
import { useToast } from '@/components/ui/use-toast';
import { EndPoints } from '@/types/endpoints.types';

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const initialValues = {
    email: '',
    password: '',
  };

  const loginFormSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    const res = await signIn('credentials', {
      email: data?.email,
      password: data?.password,
      redirect: false,
      endPoint: EndPoints.LOGIN,
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
      description: 'Logged In Successfully!',
      variant: 'success',
    });
    router.replace('/');
  };

  const handleLoginGoogle = async () => {
    signIn('google');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-start justify-start">
        <div className="mx-auto mb-5 max-w-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">
              Welcome To{' '}
              <span className="font-extrabold italic text-primary">
                TaskMaster
              </span>
            </h1>
            <p className="text-foreground">Manage your tasks efficiently.</p>
          </div>
        </div>

        <CustomForm<z.infer<typeof loginFormSchema>>
          initialValues={initialValues}
          formSchema={loginFormSchema}
          onSubmit={onSubmit}
          elements={[
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
          ]}
        >
          <Button type="submit" className="w-full">
            Login to TaskMaster
          </Button>
        </CustomForm>

        <div className="w-full">
          <div className="my-4 flex items-center">
            <hr className="w-full" />
            <span className="mx-4">OR</span>
            <hr className="w-full" />
          </div>
          <Button
            variant={'outline'}
            className="flex w-full gap-2 bg-foreground text-background hover:bg-foreground/90 hover:text-background"
            onClick={handleLoginGoogle}
          >
            <FcGoogle className="text-2xl" />
            <span>Login with Google</span>
          </Button>
        </div>

        <div className="mt-3 text-base text-secondary-foreground">
          New to platform?{' '}
          <Link href={'/register'} className="text-primary">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
