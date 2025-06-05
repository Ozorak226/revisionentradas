import React, { useState } from 'react';
import { InventoryItem } from '../types/inventory';
import { ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';

interface InventoryTableProps {
  items: InventoryItem[];
  onSort: (column: keyof InventoryItem, direction: 'asc' | 'desc') => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onSort }) => {
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem>('sku');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof InventoryItem) => {
    const direction = column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
    onSort(column, direction);
  };

  const renderSortIcon = (column: keyof InventoryItem) => {
    if (column !== sortColumn) return null;
    
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="inline-block ml-1" /> : 
      <ChevronDown size={16} className="inline-block ml-1" />;
  };
  
  const SortableHeader = ({ column, label }: { column: keyof InventoryItem, label: string }) => (
    <th 
      className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center">
        {label}
        {renderSortIcon(column)}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader column="quantity" label="Cantidad" />
            <SortableHeader column="sku" label="SKU" />
            <SortableHeader column="product" label="Producto" />
            <SortableHeader column="count" label="Conteo" />
            <SortableHeader column="difference" label="Diferencia" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  item.difference !== 0 ? 'bg-red-50' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.sku}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.product}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.count}</td>
                <td className={`px-4 py-3 text-sm font-medium flex items-center ${
                  item.difference === 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {item.difference !== 0 && (
                    <AlertTriangle size={16} className="mr-1 text-amber-500" />
                  )}
                  {item.difference}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;