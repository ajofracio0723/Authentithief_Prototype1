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
    <div style={backgroundStyle}>
      <Header />
      <div style={containerStyle}>
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

const backgroundStyle = {
  backgroundImage: "url('/images/1.gif')", // Use an absolute path without '/images/' prefix
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const contentStyle = {
  textAlign: 'center',
  marginBottom: '20rem',
};

const titleStyle = {
  fontWeight: 'bold', // Make the title bolder
};

const textStyle = {
  fontSize: '1.2rem', // Increase the font size of the text below the title
};

const buttonContainerStyle = {
  marginTop: '1rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
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
