// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { registerLicense } from '@syncfusion/ej2-base';

// import './index.css' // <-- Borrado
registerLicense('Ngo9BigBOggjHTQxAR8/V1JFaF5cXGRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWH9ccXVcR2VZWUFzXkBWYEg=');

// --- CSS DE SYNCFUSION (La lista completa y correcta) ---
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-buttons/styles/bootstrap5.css';
import '@syncfusion/ej2-react-grids/styles/bootstrap5.css';
import '@syncfusion/ej2-react-inputs/styles/bootstrap5.css'; // Para los formularios
import '@syncfusion/ej2-react-popups/styles/bootstrap5.css'; // Para los pop-ups de edición
import '@syncfusion/ej2-react-navigations/styles/bootstrap5.css'; // Para la barra de herramientas
// --------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)