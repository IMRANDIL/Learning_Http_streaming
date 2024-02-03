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
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      } else {
        // Start the camera stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Create a MediaRecorder instance to record the video stream
          mediaRecorderRef.current = new MediaRecorder(stream);

          // Handle data available events
          mediaRecorderRef.current.ondataavailable = handleDataAvailable;

          // Start recording
          if (mediaRecorderRef.current.state === 'inactive') {
            mediaRecorderRef.current.start();
          }
        }
      }

      // Toggle the camera state
      setIsCameraOn((prev) => !prev);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleDataAvailable = async(event) => {
    console.log('event>>>>>>>>>>>>>>>>>>>>>>', event);
    if (event.data.size > 0) {
     // Handle the recorded video data
    const videoBlob = event.data;

    // Create a FormData object to send the video as part of the request payload
    const formData = new FormData();
    formData.append('video', videoBlob, 'recorded-video.webm');
    try {
      // Send the video data to the backend using fetch or another HTTP client
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('response>>>>>>>>>>>>>>>>>>>',response)
      // Check the response from the server
      if (response.ok) {
        console.log('Video successfully sent to the backend.');
      } else {
        console.error('Error sending video to the backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending video to the backend:', error);
    }


    }
  };

  return (
    <>
      <button className={!isCameraOn ? 'start-button' : 'close-button'} onClick={toggleCamera}>
        {!isCameraOn ? `Start Recording` : `Stop Recording`}
      </button>
      <div className="camera-stream-container">
        <h1 className="header">Camera Streaming</h1>
        <video ref={videoRef} className="camera-stream" autoPlay playsInline></video>
      </div>
    </>
  );
};

export default CameraStream;
