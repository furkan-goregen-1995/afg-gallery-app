import { useState } from "react"
import ProgressBar from "./ProgressBar";

export default function UploadForm() {

    const [file,setFile] = useState(null);
    const [error,setError] = useState(null);
    const imagetype = ["image/jpeg","image/png"];
    const handleChange = (e) =>{
        let target = e.target.files[0];
        if(target && imagetype.includes(target.type)){
            setFile(target);
            setError(null);
        }else{
            setError("jpeg/jpg veya png uzantılı bir dosya seçiniz.");
            setFile(null);
        }
        
    }
  
return (
    <form className="form">
        <label className="label">
            <input type="file" onChange={handleChange}/>
            <span className="">+</span>
        </label>
      
        <div className="output">
        {error && <div className="error">{error}</div>}
	    {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      
     
    </form>
    
  )
}
