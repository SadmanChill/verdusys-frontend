import React from 'react';

function Dashboard({ verduras }) {
  
  const totalProductos = verduras.length;
  const totalUnidades = verduras.reduce((sum, v) => sum + v.cantidad, 0);
  const valorTotal = verduras.reduce((sum, v) => sum + (v.cantidad * v.precio), 0);
  const stockBajo = verduras.filter(v => v.cantidad <= v.stock_minimo).length;
  
  const productoMayorStock = verduras.reduce((max, v) => 
    v.cantidad > (max?.cantidad || 0) ? v : max, null);
  
  const productoMasCaro = verduras.reduce((max, v) => 
    v.precio > (max?.precio || 0) ? v : max, null);

  return (
    <div className="dashboard">
      <h2>📊 Dashboard del Inventario</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Productos</h3>
          <p className="stat-value">{totalProductos}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Unidades</h3>
          <p className="stat-value">{totalUnidades}</p>
        </div>
        
        <div className="stat-card">
          <h3>Valor Total</h3>
          <p className="stat-value">${valorTotal.toLocaleString()}</p>
        </div>
        
        <div className="stat-card alerta">
          <h3>Stock Bajo</h3>
          <p className="stat-value">{stockBajo}</p>
        </div>
      </div>
      
      <div className="details-grid">
        {productoMayorStock && (
          <div className="detail-card">
            <h3>📈 Mayor Stock</h3>
            <p><strong>{productoMayorStock.nombre}</strong></p>
            <p>{productoMayorStock.cantidad} unidades</p>
          </div>
        )}
        
        {productoMasCaro && (
          <div className="detail-card">
            <h3>💰 Más Caro</h3>
            <p><strong>{productoMasCaro.nombre}</strong></p>
            <p>${productoMasCaro.precio.toLocaleString()} c/u</p>
          </div>
        )}
      </div>
      
      {stockBajo > 0 && (
        <div className="alerta-stock">
          <h3>⚠️ Productos con Stock Bajo</h3>
          <ul>
            {verduras
              .filter(v => v.cantidad <= v.stock_minimo)
              .map(v => (
                <li key={v.id}>
                  {v.nombre}: {v.cantidad} unidades (mínimo {v.stock_minimo})
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;