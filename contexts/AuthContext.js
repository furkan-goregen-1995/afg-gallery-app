import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import Login from "../components/Login";

export const AuthContext = createContext();


export default function AuthContextProvider({children}){
    
    const [googleUser,setGoogleUser] = useState(true);
    const [email,setEmail] = useState("");

    useEffect(()=>{
        return auth.onIdTokenChanged(async(user)=>{
            if(!user){
                console.log("kullanıcı bulunamadı")
                setGoogleUser(null);
                return;
            }
         
                const token = await user.getIdToken();
                console.log("token:"+token)
                setGoogleUser(user);
                setEmail(user.email);
                console.log("user:" + user)
              
            
            
        })

    },[])
  
    if(!googleUser){
        return <Login/>
    }
    else{
        return <AuthContext.Provider value={{googleUser,email}}>
                {children}
                </AuthContext.Provider>
    }

}