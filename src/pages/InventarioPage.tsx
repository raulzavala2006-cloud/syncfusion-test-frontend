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
// --- Unused imports Query and AdaptorOptions removed ---
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

// --- URL Base Completa ---
const BASE_API_URL = import.meta.env.VITE_API_URL + '/api/inventario';

// --- 1. DEFINE EL ADAPTADOR PERSONALIZADO (CORREGIDO y LIMPIO) ---
class CustomWebApiAdaptor extends WebApiAdaptor {

    // Sobrescribimos 'update' con la firma correcta
    // Added underscore to _tableName as it's unused
    public update(dm: DataManager, keyField: string, value: Object, _tableName?: string | undefined): Object {
        // Construimos la URL correcta añadiendo el ID (que está en el objeto 'value')
        const updateUrl = `${dm.dataSource.url}/${(value as any)[keyField]}`;

        // Devolvemos el objeto que describe la petición AJAX para DataManager
        return {
            type: 'PUT',
            url: updateUrl,
            data: JSON.stringify(value),
            contentType: 'application/json; charset=utf-8'
        };
    }

    // Sobrescribimos 'remove' con la firma correcta
    // Added underscore to _tableName as it's unused
    // NOTA: El 'value' aquí es el ID directamente, no el objeto completo
    public remove(dm: DataManager, _keyField: string, value: number | string, _tableName?: string | undefined): Object {
        // Construimos la URL correcta añadiendo el ID (que es 'value' aquí)
        const removeUrl = `${dm.dataSource.url}/${value}`;

        // Devolvemos el objeto que describe la petición AJAX
        return {
            type: 'DELETE',
            url: removeUrl
        };
    }
}

// --- 2. CONFIGURA EL DATAMANAGER (Simple) ---
const dataManager = new DataManager({
    adaptor: new CustomWebApiAdaptor(), // <-- Usamos NUESTRO adaptador corregido
    url: BASE_API_URL,
    key: 'id'
});

// --- Configuración de edición y barra de herramientas (sin cambios) ---
const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
};
const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

// --- 3. EL COMPONENTE ---
export default function InventarioPage() {
    return (
        <div style={{ margin: '20px' }}>
            <h2>Gestión de Inventario (¡Conectado a la API!)</h2>
            <GridComponent
                dataSource={dataManager} // <-- Usa el DataManager
                editSettings={editSettings}
                toolbar={toolbarOptions}
                allowPaging={true}
                height={300} // Puedes ajustar la altura según necesites
            >
                <ColumnsDirective>
                    {/* Define las columnas */}
                    <ColumnDirective
                        field='id'
                        headerText='ID'
                        width='100'
                        textAlign="Right"
                        isPrimaryKey={true} // <-- Vital
                        isIdentity={true}
                        allowEditing={false}
                    />
                    <ColumnDirective
                        field='nombre'
                        headerText='Nombre de Prenda'
                        width='150'
                        validationRules={{ required: true }} // <-- Validación
                    />
                    <ColumnDirective
                        field='tipo'
                        headerText='Tipo'
                        width='100'
                    />
                    <ColumnDirective
                        field='cantidad'
                        headerText='Cantidad'
                        width='100'
                        textAlign="Right"
                        editType='numericedit' // <-- Edición numérica
                        format='N0'            // <-- Formato entero
                        validationRules={{ required: true, number: true }} // <-- Validación
                    />
                    <ColumnDirective
                        field='precio'
                        headerText='Precio'
                        width='100'
                        format="C2"            // <-- Formato moneda
                        textAlign="Right"
                        editType='numericedit' // <-- Edición numérica
                        validationRules={{ required: true, number: true }} // <-- Validación
                    />
                </ColumnsDirective>

                {/* Inyecta los servicios necesarios */}
                <Inject services={[Page, Edit, Toolbar]} />
            </GridComponent>
        </div>
    );
}