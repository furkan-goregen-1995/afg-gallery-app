import { useState,useEffect, useContext } from "react";
import { db, storage } from "../firebase";
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext"


export default function ProgressBar({file,setFile}) {
  
    const [progress,setProgress]=useState(0)
    const [error,setError]=useState(null)
    const [url,setUrl]=useState(null)
    const [iptal,setIptal]=useState(false)
    const {email} = useContext(AuthContext);
   

    useEffect(()=>{
        const storageRef=ref(storage,file.name)
        const uploadTask= uploadBytesResumable(storageRef,file)
        const collectionRef = collection(db,"resimler");
       
        uploadTask.on('state_changed', 
            (snapshot) => {
                
                let yuzdelik = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(!iptal){
                    setProgress(yuzdelik)
                }     
            }, 
            (err) => {
                if(!iptal){
                    setError(err)
                }  
            }, 
            () => {
                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if(!iptal){
                        setUrl(downloadURL)
                    }
                    
                });
            }
        );

        if(url){
                addDoc(collectionRef,{url:url,tarih:serverTimestamp(),email:email})
                console.log(url)
                setFile(null)    
            
           
        }

        return ()=>setIptal(true)

    },[url,setFile])

    return (
        <div className="progress-bar" style={{width:progress + '%'}}>
            
        </div>
  )
}
