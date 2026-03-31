import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';

const useLogin = () => {
    const queryClient = useQueryClient();

    const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { isPending, error, loginMutation };
};

export default useLogin
