import { Grid,Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {

    const handleClick=()=>{
        signInWithPopup(auth,provider);
    }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight:'100vh'}} >
        <Button onClick={handleClick} variant="contained" startIcon={<GoogleIcon/>}>GOOGLE İLE GİRİŞ YAP</Button>
    </Grid>
  )
}
