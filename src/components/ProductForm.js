import React, { useState } from 'react';

function ProductForm({ onSubmit, verduraInicial, onCancel }) {
  
  const [formData, setFormData] = useState({
    nombre: verduraInicial?.nombre || '',
    cantidad: verduraInicial?.cantidad || '',
    precio: verduraInicial?.precio || '',
    proveedor: verduraInicial?.proveedor || '',
    stock_minimo: verduraInicial?.stock_minimo || 10
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.nombre || formData.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.cantidad || formData.cantidad <= 0) {
      nuevosErrores.cantidad = 'La cantidad debe ser mayor a 0';
    }
    
    if (!formData.precio || formData.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const datosEnviar = {
        ...formData,
        cantidad: parseInt(formData.cantidad),
        precio: parseFloat(formData.precio),
        stock_minimo: parseInt(formData.stock_minimo)
      };
      
      if (verduraInicial) {
        datosEnviar.id = verduraInicial.id;
      }
      
      onSubmit(datosEnviar);
    }
  };

  return (
    <div className="form-container">
      <h2>{verduraInicial ? 'Editar Verdura' : 'Agregar Nueva Verdura'}</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <span className="error-message">{errores.nombre}</span>}
        </div>
        
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="0"
          />
          {errores.cantidad && <span className="error-message">{errores.cantidad}</span>}
        </div>
        
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          {errores.precio && <span className="error-message">{errores.precio}</span>}
        </div>
        
        <div className="form-group">
          <label>Proveedor:</label>
          <input
            type="text"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Stock Mínimo:</label>
          <input
            type="number"
            name="stock_minimo"
            value={formData.stock_minimo}
            onChange={handleChange}
            min="1"
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {verduraInicial ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;