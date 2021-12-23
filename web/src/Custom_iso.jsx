import Button from "@mui/material/Button";
import axios from "axios";



const handleUpload = (e) => {
  e.preventDefault();
      
      let file = e.target.files[0];
      console.log(file);
      const formdata = new FormData();
      formdata.append('file', file);
          
      for (var value of formdata.values()) {
          console.log(value);
      }
      
      const url = 'http://127.0.0.1:8000/file_upload';
      console.log(formdata);
      fetch(url, {
          method: 'POST',
          files: formdata,
          headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin":"*"
          },
          mode: 'no-cors'
      }).then(response =>{ return response.json();})
        .catch(error => console.log(error));
  };

export default function Custom_iso() {
  return (
    // <div>
    //   <form action="/uploadImg" method="post" enctype="multipart/form-data">
    //     <h2>单图上传</h2>
    //     <input type="file" name="logo" />
    //     <input type="submit" value="提交" />
    //   </form>
    // </div>
    <input type="file" onChange={handleUpload}/>
  );
}
