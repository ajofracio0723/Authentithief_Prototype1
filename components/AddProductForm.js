import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Header from './Header';

const AddProductForm = ({ onAdd }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [products, setProducts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !description || !uniqueIdentifier) {
      alert('Please fill in all fields');
      return;
    }
    const newProduct = {
      productName,
      description,
      uniqueIdentifier
    };
    onAdd(newProduct);
    const data = JSON.stringify(newProduct);
    setQRCodeData(data);
    setProducts([...products, newProduct]);
    setProductName('');
    setDescription('');
    setUniqueIdentifier('');
  };

  return (
    <div style={backgroundStyle}>
      <Header />
      <div className="container-fluid pt-4"> {/* Adjusted padding-top to 4 */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Add Product to Blockchain</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <strong><label htmlFor="productName" className="form-label">Product Name</label></strong>
                    <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <strong><label htmlFor="description" className="form-label">Description</label></strong>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <strong><label htmlFor="uniqueIdentifier" className="form-label">Unique Identifier</label></strong>
                    <input type="text" className="form-control" id="uniqueIdentifier" value={uniqueIdentifier} onChange={(e) => setUniqueIdentifier(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
                {qrCodeData && (
                  <div className="text-center mt-4">
                    <h2 className="mb-3">QR Code</h2>
                    <QRCode value={qrCodeData} size={256} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h2 className="text-center">Added Products</h2>
            <div style={scrollableContainerStyle}>
              <div className="row">
                {products.map((product, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text"><strong>Product {index + 1}</strong></p>
                        <p className="card-text"><strong>Product Name:</strong> {product.productName}</p>
                        <p className="card-text"><strong>Description:</strong> {product.description}</p>
                        <p className="card-text"><strong>Unique Identifier:</strong> {product.uniqueIdentifier}</p>
                        <QRCode value={JSON.stringify(product)} size={128} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const backgroundStyle = {
  backgroundImage: "url('/images/2.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'hidden', // Added overflow hidden to prevent scrollbars due to background image
  backgroundAttachment: 'fixed' // Make the background image fixed
};


const scrollableContainerStyle = {
  maxHeight: '400px', // Set the maximum height of the container
  overflowY: 'auto', // Add vertical scrollbar when content overflows
};

export default AddProductForm;
