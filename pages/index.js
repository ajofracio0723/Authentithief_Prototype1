import React from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleAddProductClick = () => {
    router.push('/add-product');
  };

  const handleQRScannerClick = () => {
    router.push('/qrscanner');
  };

  return (
    <div style={containerStyle}>
      <video autoPlay loop muted style={backgroundVideoStyle}>
        <source src="/videos/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <div style={centerContent}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>Welcome to Authentithief</h1>
          <p style={textStyle}>Revolutionizing anti-counterfeit with blockchain technology.</p>
          <div style={buttonContainerStyle}>
            <button onClick={handleAddProductClick} style={buttonStyle}>Manufacturer</button>
            <button onClick={handleQRScannerClick} style={buttonStyle}>Consumer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  position: 'relative',
};

const backgroundVideoStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
};

const centerContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px)', // Adjust this to account for the header height
};

const contentStyle = {
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
};

const titleStyle = {
  fontWeight: 'bold',
  marginTop: '2rem', // Move the title higher
  color: '#ffffff'
};

const textStyle = {
  fontSize: '1.2rem',
  marginBottom: '2rem', // Add space below the text
  color: '#ffffff'
};

const buttonContainerStyle = {
  marginTop: '1rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  marginBottom: '20rem', // Add space below the text
  fontWeight: 'bold',
  margin: '0.5rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default Home;
