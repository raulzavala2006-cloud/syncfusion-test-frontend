// src/pages/InventarioPage.tsx

import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Inject, 
  Page, 
  Edit, 
  Toolbar 
} from '@syncfusion/ej2-react-grids';

// --- ¡NUEVAS IMPORTACIONES! ---
// DataManager maneja la lógica de la API
// UrlAdaptor sabe cómo hablar con una API RESTful estándar
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

// --- ¡YA NO NECESITAMOS LOS DATOS DE PRUEBA! ---
// const inventoryData = [ ... ]; // <-- Borramos esto

// --- 1. DEFINIMOS LA URL DE NUESTRO BACKEND ---
const BASE_API_URL = import.meta.env.VITE_API_URL + '/api/inventario'; // <-- Back to the full path

// --- NEW DataManager Configuration ---
const dataManager = new DataManager({
  url: BASE_API_URL,        // URL for GET (Read)
  insertUrl: BASE_API_URL,  // URL for POST (Create)
  updateUrl: BASE_API_URL,  // URL for PUT (Update) - Adaptor WILL add /id
  removeUrl: BASE_API_URL,  // URL for DELETE (Delete) - Adaptor WILL add /id
  adaptor: new WebApiAdaptor(),
  // --- THIS IS THE CRITICAL ADDITION ---
  // Explicitly tell the DataManager which field is the ID.
  // It needs this to construct the PUT and DELETE URLs correctly (e.g., /api/inventario/3).
  id: 'id' 
});

// La configuración de edición y barra de herramientas no cambia
const editSettings = { 
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Dialog'
};
const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

// --- 3. EL COMPONENTE (CON UN CAMBIO MUY IMPORTANTE) ---
export default function InventarioPage() {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Gestión de Inventario (¡Conectado a la API!)</h2>
      <GridComponent 
        // --- 4. LE PASAMOS EL DATAMANAGER ---
        dataSource={dataManager} // <-- Ya no usa los datos de prueba
        
        editSettings={editSettings}
        toolbar={toolbarOptions}
        allowPaging={true}
        height={300}
      >
        <ColumnsDirective>
          {/* --- 5. ¡CAMBIO CRÍTICO DE MAYÚSCULAS! ---
            Tu API de Node.js + PostgreSQL devuelve el JSON con claves
            en minúsculas (ej: "id", "nombre"). El 'field' de Syncfusion
            DEBE coincidir EXACTAMENTE con el nombre de la clave del JSON.
          */}
          <ColumnDirective field='id' headerText='ID' width='100' textAlign="Right" isPrimaryKey={true} isIdentity={true}   
  allowEditing={false} />
          <ColumnDirective field='nombre' headerText='Nombre de Prenda' width='150' />
          <ColumnDirective field='tipo' headerText='Tipo' width='100' />
          <ColumnDirective field='cantidad' headerText='Cantidad' width='100' textAlign="Right" />
          <ColumnDirective field='precio' headerText='Precio' width='100' format="C2" textAlign="Right" />
        </ColumnsDirective>
        
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
}