import React from 'react';

function ActionButtons({ verdura, onEditar, onEliminar }) {
  return (
    <div className="action-buttons">
      <button 
        className="btn-edit"
        onClick={() => onEditar(verdura)}
      >
        ✏️ Editar
      </button>
      
      <button 
        className="btn-delete"
        onClick={() => onEliminar(verdura.id)}
      >
        🗑️ Eliminar
      </button>
    </div>
  );
}

export default ActionButtons;