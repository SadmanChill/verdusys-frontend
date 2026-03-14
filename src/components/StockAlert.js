import React from 'react';
import ActionButtons from './ActionButtons';

function StockAlert({ verdura, onEditar, onEliminar }) {
  const stockBajo = verdura.cantidad <= verdura.stock_minimo;
  const valorTotal = verdura.cantidad * verdura.precio;

  return (
    <tr className={stockBajo ? 'stock-bajo' : ''}>
      <td>{verdura.id}</td>
      <td>{verdura.nombre}</td>
      <td>{verdura.cantidad}</td>
      <td>${verdura.precio?.toLocaleString()}</td>
      <td>{verdura.proveedor || 'N/A'}</td>
      <td>{verdura.stock_minimo}</td>
      <td>${valorTotal?.toLocaleString()}</td>
      <td>
        {stockBajo ? (
          <span className="badge alerta">⚠️ Stock Bajo</span>
        ) : (
          <span className="badge ok">✅ Normal</span>
        )}
      </td>
      <td>
        <ActionButtons 
          verdura={verdura}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      </td>
    </tr>
  );
}

export default StockAlert;