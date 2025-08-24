import React from 'react'
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';

const LoginPage = () => {
  const [logindata, setLoginData] = React.useState({
    email : "",
    password : "",
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(logindata);
  };
  
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Chatter
            </span>
          </div>

          { /* error message */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'></h2>
                <p className='text-sm opacity-70'>
                  Sign in to your account to continue your language journey.
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='form-control w-full space-y-2'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder='Enter your email'
                    className='input input-bordered w-full'
                    value={logindata.email}
                    onChange={(e) => setLoginData({ ...logindata, email: e.target.value })}
                    required
                  />
                </div>
              </div>  
            </div>
          </form>
        </div>
      </div>
    </div> 
  )
}

export default LoginPage
