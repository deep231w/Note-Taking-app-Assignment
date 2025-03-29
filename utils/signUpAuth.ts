import axios from "axios"
export const SignUp =async (name:string, email:string, password:string)=>{
    try{
        const Response= await axios.post("/api/user/signup",{
        name,
        email,
        password
        },{
            withCredentials:true,
        })
        if(Response.status==200){
            const {user}= Response.data;
            localStorage.setItem("user", JSON.stringify(user));
            console.log("user -",user);
        }

    }catch(e){
        console.log("erroe during signup:",SignUp);
    }
}