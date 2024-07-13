import { apiFirestore } from '@/services/apiFirestore';
import { useMutationState, useQuery } from '@tanstack/react-query';

export const useGetPost = () => {
  const [data] = useMutationState({
    filters: {
      mutationKey: ['login'],
    },
    select: (mutation) => mutation.state.data,
  });

  console.log('UsePost: ', data?.idToken);

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return apiFirestore.get('/documents/posts', {
        headers: {
          Authorization: `Bearer ${data.idToken}`,
        },
      });
    },
    enabled: !!data?.idToken,
  });
};
