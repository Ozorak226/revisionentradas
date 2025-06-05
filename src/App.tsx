import React, { useState, useEffect } from 'react';
import InventoryHeader from './components/InventoryHeader';
import InventoryTable from './components/InventoryTable';
import InventorySummaryComponent from './components/InventorySummary';
import InventoryFormatView from './components/InventoryFormat';
import Footer from './components/Footer';
import { inventoryData } from './data/mockData';
import { InventoryItem } from './types/inventory';
import { calculateSummary, sortInventory, filterInventory } from './utils/inventoryUtils';

function App() {
  const [items, setItems] = useState<InventoryItem[]>(inventoryData);
  const [displayedItems, setDisplayedItems] = useState<InventoryItem[]>(inventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'comparison' | 'format'>('comparison');
  const [currentDate] = useState(new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const handleSort = (column: keyof InventoryItem, direction: 'asc' | 'desc') => {
    const sorted = sortInventory(displayedItems, column, direction);
    setDisplayedItems(sorted);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = filterInventory(items, term);
    setDisplayedItems(filtered);
  };

  const handleRefresh = () => {
    const refreshedData = items.map(item => {
      if (Math.random() > 0.7) {
        const adjustment = Math.floor(Math.random() * 5) - 2;
        const newCount = Math.max(0, item.count + adjustment);
        return {
          ...item,
          count: newCount,
          difference: newCount - item.quantity
        };
      }
      return item;
    });
    
    setItems(refreshedData);
    setDisplayedItems(filterInventory(refreshedData, searchTerm));
  };

  const handleExport = () => {
    alert('Informe exportado correctamente');
  };

  const summary = calculateSummary(displayedItems);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <InventoryHeader
          title="Informe de Comparación de Inventario"
          date={currentDate}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comparison'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Comparación
              </button>
              <button
                onClick={() => setActiveTab('format')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'format'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Formato UPC-SKU
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'comparison' ? (
          <>
            <InventorySummaryComponent summary={summary} />
            <InventoryTable 
              items={displayedItems}
              onSort={handleSort}
            />
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">
                Mostrando {displayedItems.length} de {items.length} elementos
                {searchTerm && ` (filtrado por: "${searchTerm}")`}
              </p>
            </div>
          </>
        ) : (
          <InventoryFormatView />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;