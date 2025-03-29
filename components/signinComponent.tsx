'use client';

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { signIn as handleSignin } from '@/utils/signInAuth';
import { useRouter } from 'next/navigation'; // ✅ Use from next/navigation

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (
  provider: AuthProvider,
  formData?: FormData,
  router?: ReturnType<typeof useRouter>
): Promise<AuthResponse> => {
  const email = formData?.get('email') as string | undefined;
  const password = formData?.get('password') as string | undefined;

  if (!email || !password) {
    return {
      type: 'CredentialsSignin',
      error: 'Email and password are required.',
    };
  }

  const response = await handleSignin(email, password);

  if (response?.success === 'true' && router) {
    router.push('/dashboard');
  }

  return response;
};

export function NotificationsSignInPageError() {
  const theme = useTheme();
  const router = useRouter(); // ✅ Now works without error

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, router)}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
