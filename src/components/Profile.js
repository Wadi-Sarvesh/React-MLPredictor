import React, { useState } from 'react'
import Webcam from 'react-webcam'

const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {

   var base64 = [];
   const[queryImage, qImg] = useState('');
   
 
  //const[images, setImages] = useState([]);
 
  function onImageChange(e) {
    
    //setImages(URL.createObjectURL(e.target.files[0]));
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
     
      let readerR = reader.result;
      qImg(readerR)
      
    } 
  }
  
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
  const pictureSrc = webcamRef.current.getScreenshot()
  setPicture(pictureSrc)


  })
  return (
    <div>

      <h2 className="mb-5 text-center">
        Capture or Upload Photo
      </h2>
      <div>
      <input type = "file" accept = "image/*" onChange = {onImageChange}/>
      <div style= {{paddingBottom: '10px'}}>
      <img src={queryImage} />
      </div>
      <div>
      {queryImage != '' ?
      (<button onClick = {() => { 
  fetch("https://api.apilayer.com/image_to_text/upload", {method: "POST",  redirect: "follow",
headers: {'Content-Type': 'application/json', 'apikey': 'za82j9wDAgPdklAlkcfzLWpwzil375MW'},
body: JSON.stringify(queryImage)
})
.then(res => res.json())
.then(data => {
       console.log(data)
     })      
   }}  className="btn btn-primary">Upload
   </button>):<div/>}
   </div>
      
     
      </div>
      <div>
      {queryImage == '' ?
      <div>
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <div>
          <img src={picture} />
          <div style = {{paddingTop: "10px"}}>
          <button
 onClick = {() => { 
  fetch("https://api.apilayer.com/image_to_text/upload", {method: "POST",  redirect: "follow",
headers: {'Content-Type': 'application/json', 'apikey': 'za82j9wDAgPdklAlkcfzLWpwzil375MW'},
body: JSON.stringify(picture)
})
.then(res => res.json())
.then(data => {
       console.log(data)
     })      
   }}  className="btn btn-primary">Upload
   </button>
   <button style = {{marginLeft: "10px"}}
            onClick={(e) => {
              e.preventDefault()
              setPicture(null)
              window.location.reload(false);

            }}
            className="btn btn-primary"
          >
            Retake
          </button>
   </div>
   </div>

        )}
      </div>
      <div>
        {picture != '' ? ( <div/>
          
        ) : (
          <button 
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    
      </div>
    :(<div/>)}
    </div>
     
    </div>
  )
}
export default Profile