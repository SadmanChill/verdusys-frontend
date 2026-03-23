import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // Estado para guardar las verduras (vacío al inicio)
  const [verduras, setVerduras] = useState([]);
  const [vistaActual, setVistaActual] = useState('inventario');
  const [verduraSeleccionada, setVerduraSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // URL de la API (donde está corriendo el backend)
  const API_URL = 'http://localhost:3000/api/verduras';

  // Esta función se ejecuta automáticamente al cargar la página
  useEffect(() => {
    cargarVerduras();
  }, []);

  // Función para traer los datos de la API
  const cargarVerduras = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL);
      setVerduras(respuesta.data.data);  // Guardar los datos
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

    // Agregar nueva verdura
  const agregarVerdura = async (nuevaVerdura) => {
    try {
      await axios.post(API_URL, nuevaVerdura);
      alert('✅ Verdura agregada');
      cargarVerduras();  // Recargar la lista
      setVistaActual('inventario');
    } catch (error) {
      alert('❌ Error al agregar');
    }
  };

  // Actualizar verdura
  const actualizarVerdura = async (verduraActualizada) => {
    try {
      await axios.put(`${API_URL}/${verduraActualizada.id}`, verduraActualizada);
      alert('✅ Verdura actualizada');
      cargarVerduras();
      setVerduraSeleccionada(null);
      setVistaActual('inventario');
    } catch (error) {
      alert('❌ Error al actualizar');
    }
  };

  // Eliminar verdura
  const eliminarVerdura = async (id) => {
    if (window.confirm('¿Eliminar esta verdura?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('✅ Verdura eliminada');
        cargarVerduras();
      } catch (error) {
        alert('❌ Error al eliminar');
      }
    }
  };

  // Editar verdura (seleccionar para editar)
  const editarVerdura = (verdura) => {
    setVerduraSeleccionada(verdura);
    setVistaActual('formulario');
  };

  // Cambiar de vista
  const cambiarVista = (vista) => {
    setVistaActual(vista);
    setVerduraSeleccionada(null);
};
  // Mostrar mensaje de carga
  if (cargando) {
    return <div className="loading-container">Cargando inventario...</div>;
  }

  // Mostrar error si hay problemas
  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
        <button onClick={cargarVerduras}>Reintentar</button>
      </div>
    );
  }

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