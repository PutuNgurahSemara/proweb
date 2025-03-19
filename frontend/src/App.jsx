// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import TambahProduk from './components/TambahProduk';
import ProdukList from './components/ProdukList';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('products');

  // Set sidebar terbuka di layar besar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fungsi untuk mendapatkan title halaman berdasarkan menu aktif
  const getPageTitle = () => {
    switch(activeMenu) {
      case 'dashboard': return 'Dashboard';
      case 'products': return 'Product Management';
      case 'orders': return 'Order Management';
      case 'customers': return 'Customer Data';
      case 'categories': return 'Category Management';
      case 'reports': return 'Reports';
      case 'settings': return 'Settings';
      default: return 'E-Commerce Admin';
    }
  };

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>E-Commerce Admin</h2>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <a 
                href="#" 
                className={activeMenu === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveMenu('dashboard')}
              >
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeMenu === 'products' ? 'active' : ''}
                onClick={() => setActiveMenu('products')}
              >
                <span>Products</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeMenu === 'orders' ? 'active' : ''}
                onClick={() => setActiveMenu('orders')}
              >
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeMenu === 'customers' ? 'active' : ''}
                onClick={() => setActiveMenu('customers')}
              >
                <span>Customers</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeMenu === 'categories' ? 'active' : ''}
                onClick={() => setActiveMenu('categories')}
              >
                <span>Categories</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            <h1>{getPageTitle()}</h1>
          </div>
          <div className="header-user">
            <span>Admin</span>
            <button onClick={toggleSidebar} className="menu-button">
              Menu
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeMenu === 'dashboard' && (
          <div className="dashboard-content">
            <div className="card-container">
              <div className="card-header">
                <h2>Dashboard Overview</h2>
              </div>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <div className="value">150</div>
                </div>
                <div className="stat-card">
                  <h3>New Orders</h3>
                  <div className="value">12</div>
                </div>
                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <div className="value">Rp 15.2M</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Management */}
        {activeMenu === 'products' && (
          <div className="content-wrapper">
            <div className="product-management">
              <div className="product-columns">
                <div className="column">
                  <TambahProduk />
                </div>
                <div className="column">
                  <ProdukList />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Other Pages */}
        {(activeMenu !== 'products' && activeMenu !== 'dashboard') && (
          <div className="content-wrapper">
            <div className="card-container">
              <div className="card-header">
                <h2>{getPageTitle()}</h2>
              </div>
              <div className="empty-state">
                <p>This feature is currently under development</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;