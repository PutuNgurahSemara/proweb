// src/components/TambahProduk.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      return;
    }
    setError('');
    
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('harga', harga);
    
    axios.post('http://localhost:3001/produk', formData)
      .then((res) => {
        console.log('Produk berhasil ditambah:', res.data);
        setNama('');
        setHarga('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => {
        console.error('Error menambah produk:', err);
        setError('Terjadi kesalahan saat menambah produk');
      });
  };

  const handleReset = () => {
    setNama('');
    setHarga('');
    setError('');
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>Tambah Produk</h2>
        <span className="badge">New</span>
      </div>

      {error && (
        <div className="alert alert-error">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <div className="alert-title">Nama dan Harga wajib diisi</div>
            <div className="alert-message">Mohon periksa kembali form isian Anda</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-simple">
        <div className="form-group">
          <label htmlFor="nama">Nama Produk</label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama produk"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="harga">Harga</label>
          <div className="input-currency">
            <span className="currency-prefix">Rp</span>
            <input
              id="harga"
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="0"
              min="0"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <span className="btn-icon">+</span>
            Tambah Produk
          </button>
        </div>
      </form>
    </div>
  );
}

export default TambahProduk;