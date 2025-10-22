// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import InventarioPage from './pages/InventarioPage';

// --- Página de Inicio (sin cambios) ---
function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Prueba de Syncfusion</h1>
      <p>¡Layout arreglado! Ahora tenemos un menú lateral.</p>
      <ButtonComponent type="button" isPrimary={true}>
        Botón de Prueba (Estilo Bootstrap 5)
      </ButtonComponent>
    </div>
  );
}


// --- Componente App (Aquí está la magia) ---
function App() {
  return (
    <BrowserRouter>
      {/* 1. Contenedor principal con Flexbox */}
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>

        {/* 2. Sidebar (Menú Lateral) */}
        <nav style={{
          width: '250px',
          background: '#f8f9fa', // Un gris claro de Bootstrap
          padding: '20px',
          borderRight: '1px solid #dee2e6'
        }}>
          <h2 style={{ marginBottom: '30px' }}>Menú</h2>
          {/* Hacemos que los links se vean como bloques */}
          <Link 
            to="/" 
            style={{ display: 'block', marginBottom: '15px', fontSize: '18px', textDecoration: 'none' }}
          >
            Inicio (Prueba)
          </Link>
          <Link 
            to="/inventario" 
            style={{ display: 'block', fontSize: '18px', textDecoration: 'none' }}
          >
            Inventario
          </Link>
        </nav>

        {/* 3. Área de Contenido Principal */}
        <main style={{
          flex: 1, // <-- Esto hace que ocupe todo el espacio restante
          padding: '20px',
          overflowY: 'auto' // Añade scroll si el contenido es muy largo
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventario" element={<InventarioPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App;