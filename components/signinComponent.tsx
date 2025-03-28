import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { signIn as handleSignin } from '@/utils/signInAuth';
const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn: (
  provider: AuthProvider,
  formData?: FormData,
) => Promise<AuthResponse> | void = async (provider, formData) => {

  const email = formData?.get('email') as string | undefined;
  const password = formData?.get('password') as string | undefined;
  if(!email || !password){
    return{
      type: 'CredentialsSignin',
      error: 'Email and password are required.',

    }
  }
  return handleSignin(email,password);
  
};

export function NotificationsSignInPageError() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    // preview-end
  );
}
