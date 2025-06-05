import React, { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, Trash2 } from 'lucide-react';
import { read, utils } from 'xlsx';
import { InventoryFormat } from '../types/inventory';

const STORAGE_KEY = 'inventory-formats';

const InventoryFormatView: React.FC = () => {
  const [formats, setFormats] = useState<InventoryFormat[]>(() => {
    const savedFormats = localStorage.getItem(STORAGE_KEY);
    return savedFormats ? JSON.parse(savedFormats) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formats));
  }, [formats]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json<InventoryFormat>(worksheet);

    setFormats(prevFormats => [...prevFormats, ...jsonData]);
    event.target.value = ''; // Reset input to allow uploading the same file again
  };

  const handleDelete = (index: number) => {
    setFormats(formats.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todos los registros?')) {
      setFormats([]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Formato de Inventario UPC-SKU</h2>
          <div className="flex gap-2">
            {formats.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition duration-200"
              >
                <Trash2 size={18} className="mr-2" />
                Eliminar Todo
              </button>
            )}
            <label className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition duration-200 cursor-pointer">
              <Upload size={18} className="mr-2" />
              Importar Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <FileSpreadsheet size={16} className="mr-2" />
          Sube un archivo Excel con las columnas: UPC, SKU, Descripción
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">UPC</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formats.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No hay datos importados
                </td>
              </tr>
            ) : (
              formats.map((format, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{format.upc}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{format.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{format.description}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryFormatView;