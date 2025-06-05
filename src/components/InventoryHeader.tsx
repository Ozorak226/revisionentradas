import React, { useState } from 'react';
import { Search, FileDown, RefreshCw } from 'lucide-react';

interface InventoryHeaderProps {
  onSearch: (term: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  title: string;
  date: string;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onSearch,
  onRefresh,
  onExport,
  title,
  date
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-5 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500">Fecha: {date}</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <button 
            onClick={onRefresh}
            className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition duration-200"
          >
            <RefreshCw size={18} className="mr-1" />
            <span>Actualizar</span>
          </button>
          <button 
            onClick={onExport}
            className="flex items-center px-3 py-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition duration-200"
          >
            <FileDown size={18} className="mr-1" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por SKU o producto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default InventoryHeader;