import React, { useRef, useState } from 'react';


const CameraStream = () => {
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);


const toggleCamera = async () => {
    try {
      if (isCameraOn) {
        // Stop the camera stream and recording
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        mediaRecorderRef.current.stop();
      } else {
        // Start the camera stream and recording
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Create a MediaRecorder instance to record the video stream
          mediaRecorderRef.current = new MediaRecorder(stream);

          // Handle data available events
          mediaRecorderRef.current.ondataavailable = handleDataAvailable;

          // Start recording
          mediaRecorderRef.current.start();
        }
      }

      // Toggle the camera state
      setIsCameraOn((prev) => !prev);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      // Handle the recorded video data, e.g., send it to the server
      // In this example, we log the data to the console
      console.log('Recorded data:', event.data);
    }
  };

  return (
    <>
    <button className={!isCameraOn ? 'start-button' : 'close-button'} onClick={toggleCamera}>
        {!isCameraOn ? `Start Camera` : `Off Camera`}
      </button>
    <div className="camera-stream-container">
      <h1 className="header">Camera Streaming</h1>
      
      <video ref={videoRef} className="camera-stream" autoPlay playsInline></video>
    </div>
    </>
  );
};

export default CameraStream;
