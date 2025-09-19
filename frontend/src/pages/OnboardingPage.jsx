import React from 'react'
import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser.js';
import { CameraIcon,ShuffleIcon,MapPinIcon, ShipWheelIcon, LoaderIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api.js';
import { useQueryClient } from '@tanstack/react-query';
import { LANGUAGES } from '../constants/index.js';

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleOnboarding = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => { 
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar }); 
    toast.success("Random avatar generated!"); 
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-center p-4'>
      <div className='card bg-base-200 w-full h- max-w-xl lg:max-w-2xl shadow-xl'>
        <div className='card-body p-4 sm:p-6'>
          <h1 className='flex items-center justify-center text-3xl font-bold text-white'>Complete your profile</h1>
          <form onSubmit={handleOnboarding} className='space-y-6'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                <img src={formState.profilePic} alt="Profile Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <CameraIcon className='size-12 text-base-content opacity-40' />
                </div>
              )}
              </div>
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar 
                </button>
              </div>
            </div>
            {/* full name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input
                  type='text'
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className='input input-bordered w-full'
                  required
                  placeholder='your full name'
                />
              </div>
              {/* bio */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className='textarea textarea-bordered w-full'
                  placeholder='tell about yourself to others'
                />
            </div>
            {/* languages */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              { /* native language */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >  
                  <option value="">
                    Select your native language
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                  </select>
              </div>
              {/* learning language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">
                    Select the language you are learning
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>  

            {/* location */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className="absolute top-1/3 transform-translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type='text'
                  name = "location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='city,country'
                />
              </div>  
            </div>

            {/* submit button */}
            
            <button 
              className='btn btn-primary w-full' 
              disabled={isPending} 
              type='submit'
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-5 mr-2' /> 
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2' />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage