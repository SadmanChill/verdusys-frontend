import React from 'react';

function Header({ cambiarVista, vistaActual }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>🥬 VERDUSYS</h1>
        <p>Sistema de Inventario de Verduras</p>
      </div>
      
      <nav className="nav-menu">
        <button 
          className={vistaActual === 'inventario' ? 'active' : ''}
          onClick={() => cambiarVista('inventario')}
        >
          📋 Inventario
        </button>
        
        <button 
          className={vistaActual === 'formulario' ? 'active' : ''}
          onClick={() => cambiarVista('formulario')}
        >
          ➕ Agregar
        </button>
        
        <button 
          className={vistaActual === 'dashboard' ? 'active' : ''}
          onClick={() => cambiarVista('dashboard')}
        >
          📊 Dashboard
        </button>
      </nav>
    </header>
  );
}

export default Header;