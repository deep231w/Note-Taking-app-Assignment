import axios from "axios"
export const SignUp =async (name:string, email:string, password:string)=>{
    try{
        const response= await axios.post("/api/user/signup",{
        name,
        email,
        password
        },{
            withCredentials:true,
        })
        if(response.status==201){
            const {user}= response.data;
            localStorage.setItem("user", JSON.stringify(user));
            console.log("user -",user);
            return response;
        }
        return response;
    }catch(e){
        console.log("erroe during signup:",SignUp);
        return null
    }
}