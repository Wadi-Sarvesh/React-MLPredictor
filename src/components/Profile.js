import React, { useState } from 'react'
import Webcam from 'react-webcam'

const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const[images, setImages] = useState([]);
  function onImageChange(e) {
    
    setImages(URL.createObjectURL(e.target.files[0]));
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
      <img src={images} />
      {images != '' ?(
      <a href= {images}>Click to download</a>):<div/>}
     
      </div>
      <div>
      {images == '' ?
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
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture(null)
              window.location.reload(false);

            }}
            className="btn btn-primary"
          >
            Retake
          </button>
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