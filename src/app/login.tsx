import { useRouter } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit = (data: any) => {
    console.log('Login successful with data:', data);

    // Example: you might save the tokens here, or send them to your backend
    signIn({ access: data.accessToken, refresh: 'refresh-token' });

    // Navigate to the home page after successful login
    router.push('/');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
