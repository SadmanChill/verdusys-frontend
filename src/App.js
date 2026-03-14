import React, { useState } from 'react';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [verduras, setVerduras] = useState([
    { id: 1, nombre: 'Tomate', cantidad: 50, precio: 2500, proveedor: 'Proveedor A', stock_minimo: 10 },
    { id: 2, nombre: 'Cebolla', cantidad: 8, precio: 1800, proveedor: 'Proveedor B', stock_minimo: 10 },
    { id: 3, nombre: 'Zanahoria', cantidad: 5, precio: 1200, proveedor: 'Proveedor A', stock_minimo: 10 },
    { id: 4, nombre: 'Lechuga', cantidad: 25, precio: 1500, proveedor: 'Proveedor C', stock_minimo: 8 },
    { id: 5, nombre: 'Papa', cantidad: 100, precio: 2000, proveedor: 'Proveedor B', stock_minimo: 15 },
  ]);

  const [vistaActual, setVistaActual] = useState('inventario');
  const [verduraSeleccionada, setVerduraSeleccionada] = useState(null);

  const agregarVerdura = (nuevaVerdura) => {
    const nuevaId = verduras.length + 1;
    setVerduras([...verduras, { ...nuevaVerdura, id: nuevaId }]);
    alert('✅ Verdura agregada');
    setVistaActual('inventario');
  };

  const actualizarVerdura = (verduraActualizada) => {
    const nuevasVerduras = verduras.map(v => 
      v.id === verduraActualizada.id ? verduraActualizada : v
    );
    setVerduras(nuevasVerduras);
    alert('✅ Verdura actualizada');
    setVerduraSeleccionada(null);
    setVistaActual('inventario');
  };

  const eliminarVerdura = (id) => {
    if (window.confirm('¿Eliminar esta verdura?')) {
      const nuevasVerduras = verduras.filter(v => v.id !== id);
      setVerduras(nuevasVerduras);
      alert('✅ Verdura eliminada');
    }
  };

  const editarVerdura = (verdura) => {
    setVerduraSeleccionada(verdura);
    setVistaActual('formulario');
  };

  const cambiarVista = (vista) => {
    setVistaActual(vista);
    setVerduraSeleccionada(null);
  };

  return (
    <div className="App">
      <Header cambiarVista={cambiarVista} vistaActual={vistaActual} />
      
      <main className="container">
        {vistaActual === 'inventario' && (
          <InventoryList 
            verduras={verduras} 
            onEditar={editarVerdura}
            onEliminar={eliminarVerdura}
          />
        )}
        
        {vistaActual === 'formulario' && (
          <ProductForm 
            onSubmit={verduraSeleccionada ? actualizarVerdura : agregarVerdura}
            verduraInicial={verduraSeleccionada}
            onCancel={() => cambiarVista('inventario')}
          />
        )}
        
        {vistaActual === 'dashboard' && (
          <Dashboard verduras={verduras} />
        )}
      </main>
    </div>
  );
}

export default App;