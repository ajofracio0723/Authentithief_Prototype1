import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import Header from '../components/Header';

const QRScanner = () => {
  const [scannedResult, setScannedResult] = useState('');
  const [scanSuccess, setScanSuccess] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const successMessageTimeoutRef = useRef(null);
  const successSoundRef = useRef(null); // Ref for the audio element

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(scanQRCode);
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });

    const scanQRCode = () => {
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setScannedResult(code.data);
          setScanSuccess(true);
          clearTimeout(successMessageTimeoutRef.current);
          successMessageTimeoutRef.current = setTimeout(() => setScanSuccess(false), 5000);
          // Play the success sound
          successSoundRef.current.play();
        } else {
          setScanSuccess(false);
        }
      }

      requestAnimationFrame(scanQRCode);
    };

    return () => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const canvasContext = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          canvasContext.drawImage(img, 0, 0, img.width, img.height);
          const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setScannedResult(code.data);
            setScanSuccess(true);
            clearTimeout(successMessageTimeoutRef.current);
            successMessageTimeoutRef.current = setTimeout(() => setScanSuccess(false), 5000);
            // Play the success sound
            successSoundRef.current.play();
          } else {
            setScanSuccess(false);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={backgroundStyle}>
      <Header />
      <div style={containerStyle}>
        <h1>QR Code Scanner</h1>
        <div style={scannerStyle}>
          <video ref={videoRef} style={videoStyle} />
          {scanSuccess && (
            <div style={successMessageStyle} className="alert alert-success" role="alert">
              Scan Successful!
            </div>
          )}
        </div>
        <div style={scannedResultContainerStyle}>
          <p style={scannedResultStyle}>Scanned Result:</p>
          <p style={scannedResultValueStyle}>{scannedResult}</p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <button onClick={() => fileInputRef.current.click()}>Upload QR Code Image</button>
      </div>
      {/* Audio element for success sound */}
      <audio ref={successSoundRef} src="/1.mp3" />
    </div>
  );
};

const backgroundStyle = {
  backgroundImage: "url('/images/2.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 50px)', // Adjusted to remove the black space on the top
};

const scannerStyle = {
  position: 'relative',
};

const videoStyle = {
  width: '100%',
  height: 'auto',
};

const successMessageStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#d4edda',
  color: '#155724',
  border: '1px solid #c3e6cb',
  padding: '1rem',
  borderRadius: '0.25rem',
};

const scannedResultContainerStyle = {
  marginTop: '1rem', // Add margin for separation from other elements
};

const scannedResultStyle = {
  backgroundColor: '#333', // Dark background color
  color: '#fff', // White text color
  fontWeight: 'bold', // Bold font
  padding: '0.5rem 1rem', // Add padding for better appearance
  textAlign: 'center', // Center align text
  marginBottom: '0.5rem', // Add margin bottom for separation
};

const scannedResultValueStyle = {
  backgroundColor: '#555', // Darker background color
  color: '#fff', // White text color
  padding: '0.5rem 1rem', // Add padding for better appearance
  textAlign: 'center', // Center align text
  borderRadius: '0.25rem', // Rounded corners
};

export default QRScanner;
