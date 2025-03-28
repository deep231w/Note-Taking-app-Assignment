import axios from "axios";

export const signIn = async (email: string, password: string) => {
    try {
      const Response = await axios.post("/api/user/signin",{
        email,
        password
      },{
        withCredentials:true
      })
  
    //   if(Response.status==200){
    //     const {user}= Response.data;
    //     localStorage.setItem("user",JSON.stringify(user));
    //     console.log("user after signin= ",user);
    //   }
      return {
        type: 'CredentialsSignin',
        error: undefined,
      };
    } catch (error) {
      console.error('Sign-in failed:', error);
      return {
        type: 'CredentialsSignin',
        error: 'Something went wrong. Try again.',
      };
    }
  };
  