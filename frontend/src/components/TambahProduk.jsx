// src/components/TambahProduk.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      return;
    }

    setError('');
    setSuccess(false);
    setLoading(true);

    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        console.log('Produk berhasil ditambah:', res.data);
        setNama('');
        setHarga('');
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error menambah produk:', err);
        setError('Gagal menambahkan produk. Coba lagi.');
        setLoading(false);
      });
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>Add New Product</h2>
      </div>
      <div className="form-simple">
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <div className="alert-title">Error</div>
              <div className="alert-message">{error}</div>
            </div>
          </div>
        )}

        {success && (
          <div className="alert" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <div className="alert-icon">✓</div>
            <div className="alert-content">
              <div className="alert-title" style={{ color: 'var(--success-color)' }}>Success</div>
              <div className="alert-message">Product added successfully!</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              className="form-control"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="product-price">Price</label>
            <div className="input-currency">
              <span className="currency-prefix">Rp</span>
              <input
                id="product-price"
                className="form-control"
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahProduk;
