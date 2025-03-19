// src/components/ProdukList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([
    { id: 1, nama: 'Victus 15', harga: 13000000, stok: 10 },
    { id: 2, nama: 'Acer Nitro 5', harga: 13500000, stok: 5 },
    { id: 3, nama: 'Asus Vivobook 15', harga: 12000000, stok: 8 }
  ]);
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editHarga, setEditHarga] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editStok, setEditStok] = useState("");
  const [editKategori, setEditKategori] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uncomment ini jika API sudah tersedia
    // fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/produk');
      setProduk(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data produk');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        // await axios.delete(`http://localhost:3001/produk/${id}`);
        setProduk(produk.filter((p) => p.id !== id));
      } catch (err) {
        console.error(err);
        setError('Gagal menghapus produk');
      }
    }
  };

  const handleEdit = (id, nama, harga) => {
    setEditId(id);
    setEditNama(nama);
    setEditHarga(harga);
  };

  const handleUpdate = async (id) => {
    try {
      // const response = await axios.put(`http://localhost:3001/produk/${id}`, { 
      //   nama: editNama, 
      //   harga: editHarga 
      // });
      
      // Simulasi response
      const response = {
        data: { id, nama: editNama, harga: Number(editHarga) }
      };
      
      setProduk(produk.map(p => p.id === id ? response.data : p));
      setEditId(null);
      setEditNama("");
      setEditHarga("");
    } catch (err) {
      console.error(err);
      setError('Gagal memperbarui produk');
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditNama("");
    setEditHarga("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Memuat data produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>Daftar Produk</h2>
        <span className="badge">{produk.length} Produk</span>
      </div>

      {produk.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada produk yang ditambahkan</p>
        </div>
      ) : (
        <div className="product-list">
          {produk.map((item) => (
            <div key={item.id} className="product-item">
              {editId === item.id ? (
                <div className="edit-form">
                  <h2>Edit Produk</h2>
                  <span className="edit-badge">Editing</span>
                  <div className="form-group">
                    <label>Nama Produk</label>
                    <input
                      type="text"
                      value={editNama}
                      onChange={(e) => setEditNama(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Harga</label>
                    <div className="input-currency">
                      <span className="currency-prefix">Rp</span>
                      <input
                        type="number"
                        value={editHarga}
                        onChange={(e) => setEditHarga(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="edit-actions">
                    <button 
                      onClick={() => handleUpdate(item.id)} 
                      className="btn btn-success"
                    >
                      <i className="icon">✓</i> Simpan Perubahan
                    </button>
                    <button 
                      onClick={handleCancel} 
                      className="btn btn-secondary"
                    >
                      <i className="icon">×</i> Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-title">{item.nama}</div>
                  <div className="product-price">
                    Rp{item.harga.toLocaleString('id-ID')}
                  </div>
                  <div className="product-status">
                    <span className="status-badge">Tersedia</span>
                  </div>
                  <div className="product-actions">
                    <button
                      onClick={() => handleEdit(item.id, item.nama, item.harga)}
                      className="btn btn-outline"
                    >
                      <i className="icon">✏️</i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="icon">🗑️</i> Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdukList;