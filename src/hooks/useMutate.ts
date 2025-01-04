import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CError_TP } from '../types';
import { useIsRTL } from './useIsRTL';

type useMutateProps_TP<response_T> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: response_T) => void;
  onError?: (err: CError_TP) => void;
  formData?: boolean;
  onMutate?: (err?: unknown) => void;
  method?: 'post' | 'delete'; // Add the method property
};

export function useMutate<response_T>({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = 'post', // Set a default value for the method
}: useMutateProps_TP<response_T>) {
  const user_token = Cookies.get('token');
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const isRTL = useIsRTL();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { data, isLoading, isSuccess, mutate, failureReason, isError } =
    useMutation({
      mutationKey,
      mutationFn: (values) => {
        const requestConfig = {
          method: method.toUpperCase(), // Use the specified method
          url: `${baseUrl}/${endpoint}`,
          data: values,
          headers: formData
            ? {
                'Content-Type': 'multipart/form-data',
                Authorization: authorizationHeader,
                'Accept-Language': isRTL ? 'ar' : 'en',
              }
            : {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: authorizationHeader,
                'Accept-Language': isRTL ? 'ar' : 'en',
              },
        };

        return axios(requestConfig);
      },
      onSuccess,
      onError,
      onMutate,
    });
  return { data, isLoading, isSuccess, mutate, failureReason, isError };
}
