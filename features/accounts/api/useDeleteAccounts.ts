import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from "hono";
import { toast } from 'sonner';

import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.accounts.delete.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.delete.$post>["json"];


export const useDeleteAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.delete.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });

    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;

};
