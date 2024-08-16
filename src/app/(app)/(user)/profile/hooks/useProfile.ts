import useCustomSession from '@/hooks/useCustomSession';
import { getUserById, updateProfile } from '@/lib/utils';
import { IAPIResponse } from '@/types/APIResponse.types';
import { IUser } from '@/types/user.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useProfile = () => {
  const queryClient = useQueryClient();

  const { userId } = useCustomSession();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery<IAPIResponse<IUser>, unknown, IUser>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId!),
    select: (response) => response.data,
    staleTime: Infinity,
  });

  const { mutate: mutateProfile, isPending: isMutateProfilePending } =
    useMutation({
      mutationFn: ({ name, bio }: { name: string; bio: string }) =>
        updateProfile(userId!, name, bio),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user', userId] });
      },
    });

  return {
    userData,
    isUserDataLoading,
    isUserDataError,
    mutateProfile,
    isMutateProfilePending,
  };
};

export default useProfile;
