'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CustomForm from '@/components/common/CustomForm/CustomForm';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { RouteConstants } from '@/constants/routes.constants';
import Loading from '@/app/loading';
import useProfile from '../hooks/useProfile';

const EditProfileDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const {
    isUserDataLoading,
    userData,
    isUserDataError,
    mutateProfile,
    isMutateProfilePending,
  } = useProfile();

  if (isUserDataLoading) {
    return <Loading />;
  }

  if (isUserDataError) {
    redirect(RouteConstants.NOT_FOUND);
  }

  const initialValues = {
    name: userData?.name ?? '',
    email: userData?.email ?? '',
    bio: userData?.bio ?? '',
  };

  const editProfileFormSchema = z.object({
    name: z.string().min(2, 'Username must be of at least 2 characters'),
    email: z.string().email(),
    bio: z
      .string()
      .min(10, 'Min 10 characters are required')
      .max(50, "Can't enter more than 50 characters"),
  });

  const onSubmit = async (data: z.infer<typeof editProfileFormSchema>) => {
    mutateProfile({ name: data.name, bio: data.bio });

    if (!isMutateProfilePending) {
      setOpen(!open);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <CustomForm
          initialValues={initialValues}
          formSchema={editProfileFormSchema}
          onSubmit={onSubmit}
          elements={[
            {
              label: 'Username',
              placeholder: 'username',
              element: 'input',
              key: 'name',
            },
            {
              label: 'Email',
              placeholder: 'dhruv@example.complaceholder',
              element: 'email',
              key: 'email',
              disabled: true,
            },
            {
              label: 'Bio',
              placeholder: 'Bio',
              element: 'textarea',
              key: 'bio',
            },
          ]}
        >
          <Button>{isMutateProfilePending ? 'Updating...' : 'Update'}</Button>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
