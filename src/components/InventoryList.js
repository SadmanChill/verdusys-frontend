import React from 'react';
import StockAlert from './StockAlert';

function InventoryList({ verduras, onEditar, onEliminar }) {
  
  if (!verduras || verduras.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No hay verduras en el inventario</p>
        <button onClick={() => window.location.href = '#/formulario'}>
          Agregar la primera verdura
        </button>
      </div>
    );
  }

  return (
    <div className="inventory-container">
      <h2>Inventario de Verduras</h2>
      
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Proveedor</th>
            <th>Stock Mín</th>
            <th>Valor Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {verduras.map((verdura) => (
            <StockAlert 
              key={verdura.id} 
              verdura={verdura}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;