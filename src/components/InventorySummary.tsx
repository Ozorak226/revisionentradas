import React from 'react';
import { InventorySummary } from '../types/inventory';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InventorySummaryProps {
  summary: InventorySummary;
}

const InventorySummaryComponent: React.FC<InventorySummaryProps> = ({ summary }) => {
  const { 
    totalQuantity, 
    totalCount, 
    totalDifference, 
    itemsWithDiscrepancy, 
    totalItems 
  } = summary;
  
  const accuracyPercentage = totalItems > 0 
    ? Math.round(((totalItems - itemsWithDiscrepancy) / totalItems) * 100) 
    : 0;

  const SummaryCard = ({ 
    title, 
    value, 
    description, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    description?: string;
    color: string;
  }) => (
    <div className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${color}`}>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
    </div>
  );

  return (
    <div className="mt-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Inventario</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total de Productos" 
          value={totalItems}
          description="Cantidad de SKUs en el inventario"
          color="border-blue-500"
        />
        
        <SummaryCard 
          title="Precisión del Inventario" 
          value={`${accuracyPercentage}%`}
          description={`${totalItems - itemsWithDiscrepancy} de ${totalItems} SKUs correctos`}
          color="border-green-500"
        />
        
        <SummaryCard 
          title="Discrepancias" 
          value={itemsWithDiscrepancy}
          description={itemsWithDiscrepancy > 0 ? "Requieren atención" : "¡Sin discrepancias!"}
          color={itemsWithDiscrepancy > 0 ? "border-red-500" : "border-green-500"}
        />
        
        <SummaryCard 
          title="Diferencia Total" 
          value={totalDifference}
          description={totalDifference === 0 
            ? "Inventario balanceado" 
            : (totalDifference > 0 ? "Excedente" : "Faltante")}
          color={totalDifference === 0 
            ? "border-green-500" 
            : (totalDifference > 0 ? "border-blue-500" : "border-red-500")}
        />
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center mb-2">
          {totalDifference === 0 && itemsWithDiscrepancy === 0 ? (
            <>
              <CheckCircle size={20} className="text-green-500 mr-2" />
              <h3 className="text-green-700 font-medium">Inventario Verificado</h3>
            </>
          ) : (
            <>
              <AlertCircle size={20} className="text-amber-500 mr-2" />
              <h3 className="text-amber-700 font-medium">Atención Requerida</h3>
            </>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row text-sm text-gray-500 mt-2">
          <div className="sm:w-1/2 mb-2 sm:mb-0">
            <p>Total en sistema: <span className="font-semibold">{totalQuantity}</span></p>
            <p>Total contado: <span className="font-semibold">{totalCount}</span></p>
          </div>
          <div className="sm:w-1/2">
            <p>Diferencia: <span className={`font-semibold ${
              totalDifference === 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>{totalDifference}</span></p>
            <p>SKUs con discrepancias: <span className="font-semibold">{itemsWithDiscrepancy}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummaryComponent;