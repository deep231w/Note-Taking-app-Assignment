import axios from "axios";

export const signIn = async (email: string, password: string) => {
    try {
      const Response = await axios.post("api/auth/signin",{
        email,
        password
      },{
        withCredentials:true
      })
  
      if(Response.status==200){
        const {user}= Response.data;
        localStorage.setItem("user",JSON.stringify(user));
        console.log("user after signin= ",user);
      }
      return {
        type: 'CredentialsSignin',
        error: null,
      };
    } catch (error) {
      console.error('Sign-in failed:', error);
      return {
        type: 'CredentialsSignin',
        error: 'Something went wrong. Try again.',
      };
    }
  };
  