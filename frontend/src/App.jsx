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
      if (window.innerWidth > 991) {
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
      case 'dashboard': return 'Dashboard Overview';
      case 'products': return 'Product Management';
      case 'orders': return 'Order Management';
      case 'customers': return 'Customer Data';
      case 'categories': return 'Category Management';
      default: return 'E-Commerce Admin';
    }
  };

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Animated Background - positioned outside the app container to ensure full coverage */}
      <div className="animated-background">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="side-decorations">
        {/* Left Side Decorations */}
        <div className="left-decorations">
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="rgba(67, 97, 238, 0.6)" strokeWidth="2" />
              <path d="M30 30 L70 30 L70 70 L30 70 Z" fill="none" stroke="rgba(114, 9, 183, 0.4)" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(58, 12, 163, 0.5)" strokeWidth="2" />
            </svg>
          </div>
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(67, 97, 238, 0.5)" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(114, 9, 183, 0.4)" strokeWidth="2" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(58, 12, 163, 0.6)" strokeWidth="2" />
            </svg>
          </div>
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 L50 10 L90 50 L50 90 Z" fill="none" stroke="rgba(67, 97, 238, 0.5)" strokeWidth="2" />
              <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="none" stroke="rgba(114, 9, 183, 0.5)" strokeWidth="2" />
              <path d="M25 25 L75 25 L75 75 L25 75 Z" fill="none" stroke="rgba(58, 12, 163, 0.4)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        {/* Right Side Decorations */}
        <div className="right-decorations">
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(67, 97, 238, 0.5)" strokeWidth="2" />
              <circle cx="70" cy="70" r="25" fill="none" stroke="rgba(114, 9, 183, 0.4)" strokeWidth="2" />
              <line x1="30" y1="30" x2="70" y2="70" stroke="rgba(58, 12, 163, 0.5)" strokeWidth="2" />
            </svg>
          </div>
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="rgba(67, 97, 238, 0.5)" strokeWidth="2" />
              <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="rgba(114, 9, 183, 0.4)" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(58, 12, 163, 0.6)" strokeWidth="2" />
            </svg>
          </div>
          <div className="decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20 C 40 0, 60 0, 80 20 S 100 60, 80 80 S 40 100, 20 80 S 0 40, 20 20" fill="none" stroke="rgba(67, 97, 238, 0.5)" strokeWidth="2" />
              <path d="M30 50 C 50 30, 50 70, 70 50" fill="none" stroke="rgba(114, 9, 183, 0.5)" strokeWidth="2" />
              <path d="M50 30 C 30 50, 70 50, 50 70" fill="none" stroke="rgba(58, 12, 163, 0.5)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="app-container">
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
                  onClick={(e) => {e.preventDefault(); setActiveMenu('dashboard');}}
                >
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeMenu === 'products' ? 'active' : ''}
                  onClick={(e) => {e.preventDefault(); setActiveMenu('products');}}
                >
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeMenu === 'orders' ? 'active' : ''}
                  onClick={(e) => {e.preventDefault(); setActiveMenu('orders');}}
                >
                  <span>Orders</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeMenu === 'customers' ? 'active' : ''}
                  onClick={(e) => {e.preventDefault(); setActiveMenu('customers');}}
                >
                  <span>Customers</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeMenu === 'categories' ? 'active' : ''}
                  onClick={(e) => {e.preventDefault(); setActiveMenu('categories');}}
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
                  <h2>Dashboard Statistics</h2>
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
                  <div className="stat-card">
                    <h3>New Customers</h3>
                    <div className="value">8</div>
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
                  <div className="column" style={{ maxWidth: '400px' }}>
                    <TambahProduk />
                  </div>
                  <div className="column" style={{ flex: '2' }}>
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
                  <span className="badge">Coming Soon</span>
                </div>
                <div className="empty-state">
                  <p>This feature is currently under development</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;