 // src/components/TambahProduk.jsx
 import React, { useState } from 'react';
 import axios from 'axios';
function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      return;
    }
    setError('');
    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        console.log('Produk berhasil ditambah:', res.data);
        setNama('');
        setHarga('');
      })
      .catch((err) => {
        console.error('Error menambah produk:', err);
      });
  };
  return (
    <div>
      <h2>Tambah Produk</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Nama Produk: </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Harga: </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
        <button type="submit">Simpan</button>

      </form>
    </div>
  );
}
 export default TambahProduk;
