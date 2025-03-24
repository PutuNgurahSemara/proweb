// src/components/ProdukList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editHarga, setEditHarga] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
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
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Daftar Produk</h2>
      <table>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item.id}>
              {editId === item.id ? (
                <>
                  <td>
                    <input 
                      type="text" 
                      value={editNama} 
                      onChange={(e) => setEditNama(e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={editHarga} 
                      onChange={(e) => setEditHarga(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.nama}</td>
                  <td>Rp{item.harga}</td>
                  <td>
                    <button onClick={() => handleUpdate(item.id, item.nama, item.harga)} style={{ marginLeft: '10px' }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProdukList;
