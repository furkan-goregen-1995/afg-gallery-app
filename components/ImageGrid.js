import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { db } from "../firebase";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ImageGrid({setSelectedImage}) {
    const [docs,setDocs] = useState(null);
    const {email} = useContext(AuthContext);

    const handleClick=async(id)=>{
      const ref = doc(db,"resimler",id);
      const delDoc = await deleteDoc(ref);    
  }

    useEffect(()=>{
        const ref = collection(db,"resimler");
        const q = query(ref,where("email","==",email),orderBy("tarih","desc"));
        onSnapshot(q,snap=>{
            let documents = [];
            snap.forEach(doc=>{
                documents.push({...doc.data(),id:doc.id});
            })
            setDocs(documents);
        })

    },[email])
  return (
    <div className="img-grid">
      {docs && docs.map(doc=>(
        <div  key={doc.id}>
          
        <motion.div style={{marginTop:10}} className="img-wrap" layout whileHover={{opacity:1}} onClick={()=>setSelectedImage(doc.url)}>
            <motion.img initial={{opacity:0}} animate={{opacity:1}} src={doc.url} alt="yuklendi"/>
        </motion.div>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
            <IconButton onClick={()=>handleClick(doc.id)} edge="middle" aria-label="delete">
            <Delete/>
            </IconButton>
            </Grid>
        
       
        </div>
           
    ))}
    </div>
  )
}
