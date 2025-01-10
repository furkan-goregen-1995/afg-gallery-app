import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { db } from "../firebase";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";

export default function ImageGrid({setSelectedImage}) {
    const [docs,setDocs] = useState(null);
    const {email} = useContext(AuthContext);

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

    },[])
  return (
    <div className="img-grid">
      {docs && docs.map(doc=>(
        <motion.div className="img-wrap" key={doc.id} layout whileHover={{opacity:1}} onClick={()=>setSelectedImage(doc.url)}>
            <motion.img initial={{opacity:0}} animate={{opacity:1}} src={doc.url} alt="yuklendi"/>
        </motion.div>
    ))}
    </div>
  )
}
