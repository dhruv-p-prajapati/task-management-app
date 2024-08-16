'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import CustomAvatar from '@/components/common/CustomAvatar/CustomAvatar';
import useProfile from './hooks/useProfile';
import { RouteConstants } from '@/constants/routes.constants';
import EditProfileDialog from './components/EditProfileDialog';
import SummaryCard from './components/SummaryCard';

const ProfilePage = () => {
  const { isUserDataLoading, userData, isUserDataError } = useProfile();

  if (isUserDataLoading) {
    return <Loading />;
  }

  if (isUserDataError) {
    redirect(RouteConstants.NOT_FOUND);
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 py-16">
      <div className="flex w-full flex-col items-start justify-start md:w-[50vw] md:gap-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center md:gap-4">
            <div>
              <CustomAvatar
                imgUrl={userData?.imgUrl}
                name={userData?.name}
                className="md:size-16"
              />
            </div>
            <div>
              <h1 className="font-bold md:text-2xl">{userData?.name}</h1>
              <p className="mt-1 text-sm">{userData?.email}</p>
            </div>
          </div>
          <div>
            <EditProfileDialog>
              <Button>Edit profile</Button>
            </EditProfileDialog>
          </div>
        </div>
        <p className="text-justify">{userData?.bio}</p>
      </div>

      <div>
        {/* Project Summary */}
        <div>
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Summary of Projects
          </h1>
        </div>
        <div className="grid w-full grid-cols-2 flex-wrap gap-x-10 gap-y-4 md:w-[50vw]">
          <SummaryCard
            noOfItems={10}
            title="Assigned Projects"
            borderColor="border-primary"
          />
          <SummaryCard
            noOfItems={2}
            title="Completed Projects"
            borderColor="border-green-700"
          />
        </div>

        {/* Tasks Summary */}
        <div className="mt-14">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Summary of Tasks
          </h1>
        </div>
        <div className="grid w-full grid-cols-2 flex-wrap gap-x-10 gap-y-4 md:w-[50vw]">
          <SummaryCard
            noOfItems={10}
            title="Assigned Tasks"
            borderColor="border-primary"
          />
          <SummaryCard
            noOfItems={2}
            title="Completed Tasks"
            borderColor="border-green-700"
          />
          <SummaryCard
            noOfItems={5}
            title="In progress Tasks"
            borderColor="border-orange-400"
          />
          <SummaryCard
            noOfItems={45}
            title="Pending Tasks"
            borderColor="border-destructive"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
