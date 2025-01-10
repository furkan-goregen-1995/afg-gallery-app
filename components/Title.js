import { Button } from "@mui/material";
import {auth} from "../firebase"
import { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext"

export default function Title() {
  const {googleUser} = useContext(AuthContext);
  
  
  return (
    <div className="title">
        <div>
        <h1>AFG Galeri App</h1>
        <p>Hosgeldin {googleUser.displayName}</p>
        <Button variant="outlined" color="primary" onClick={()=>auth.signOut()}>Çıkış</Button>
        </div>
        <h2>Bütün Resimler</h2>
        <p>Resim galerinize hoşgeldiniz!</p>
      
    </div>
  )
}
