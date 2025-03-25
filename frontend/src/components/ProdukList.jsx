// src/components/ProdukList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editHarga, setEditHarga] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/produk')
      .then((response) => {
        setProduk(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const confirmDelete = (id, nama) => {
    setDeleteConfirm({ id, nama });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDelete = (id, nama) => {
    setDeleteConfirm(null);
    
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
        setNotification({
          type: 'success',
          message: `Produk "${nama}" berhasil dihapus.`,
          timestamp: new Date()
        });
      })
      .catch(err => {
        console.error(err);
        setNotification({
          type: 'error',
          message: `Gagal menghapus produk "${nama}". Silakan coba lagi.`,
          timestamp: new Date()
        });
      });
  };

  const handleUpdate = (id, nama, harga) => {
    setEditId(id);
    setEditNama(nama);
    setEditHarga(harga);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:3001/produk/${id}`, { nama: editNama, harga: editHarga })
      .then(response => {
        setProduk(produk.map(p => p.id === id ? response.data : p));
        setEditId(null);
        setEditNama("");
        setEditHarga("");
        setNotification({
          type: 'success',
          message: `Produk "${editNama}" berhasil diperbarui.`,
          timestamp: new Date()
        });
      })
      .catch(err => {
        console.error(err);
        setNotification({
          type: 'error',
          message: 'Gagal memperbarui produk. Silakan coba lagi.',
          timestamp: new Date()
        });
      });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>Product List</h2>
        <span className="badge">{produk.length} Items</span>
      </div>
      
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-icon">
            {notification.type === 'success' ? '✓' : '⚠️'}
          </div>
          <div className="notification-content">
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </div>
          </div>
          <button 
            className="notification-close" 
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Konfirmasi Penghapusan</h3>
            </div>
            <div className="modal-content">
              <p>Apakah anda yakin ingin menghapus produk "{deleteConfirm.nama}"?</p>
              <p className="text-warning">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={cancelDelete}
              >
                Batal
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.nama)}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : produk.length === 0 ? (
        <div className="empty-state">
          <p>No products available</p>
        </div>
      ) : (
        <div className="product-list">
          {produk.map((item) => (
            <div key={item.id} className="product-item">
              {editId === item.id ? (
                <div className="edit-form">
                  <h2>Edit Product</h2>
                  <span className="edit-badge">Editing</span>
                  
                  <div className="form-group">
                    <label htmlFor={`edit-name-${item.id}`}>Product Name</label>
                    <input 
                      id={`edit-name-${item.id}`}
                      className="form-control"
                      type="text" 
                      value={editNama} 
                      onChange={(e) => setEditNama(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`edit-price-${item.id}`}>Price</label>
                    <div className="input-currency">
                      <span className="currency-prefix">Rp</span>
                      <input 
                        id={`edit-price-${item.id}`}
                        className="form-control"
                        type="number" 
                        value={editHarga} 
                        onChange={(e) => setEditHarga(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="edit-actions">
                    <button className="btn btn-secondary" onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={() => handleSave(item.id)}>
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-status">
                    <span className="status-badge">In Stock</span>
                    <div className="product-id">ID: {item.id}</div>
                  </div>
                  <div className="product-title">{item.nama}</div>
                  <div className="product-price">{formatCurrency(item.harga)}</div>
                  <div className="product-actions">
                    <button 
                      className="btn btn-outline" 
                      onClick={() => handleUpdate(item.id, item.nama, item.harga)}
                    >
                      <span className="btn-icon">✎</span> Edit
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => confirmDelete(item.id, item.nama)}
                    >
                      <span className="btn-icon">✕</span> Delete
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
