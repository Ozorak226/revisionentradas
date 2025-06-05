import { InventoryItem, InventorySummary } from '../types/inventory';

export const calculateSummary = (items: InventoryItem[]): InventorySummary => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const totalDifference = items.reduce((sum, item) => sum + item.difference, 0);
  const itemsWithDiscrepancy = items.filter(item => item.difference !== 0).length;
  
  return {
    totalQuantity,
    totalCount,
    totalDifference,
    itemsWithDiscrepancy,
    totalItems: items.length
  };
};

export const sortInventory = (
  items: InventoryItem[],
  sortBy: keyof InventoryItem,
  sortDirection: 'asc' | 'desc'
): InventoryItem[] => {
  return [...items].sort((a, b) => {
    // Handle string or number comparisons
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // For numeric values
    const numA = Number(valueA);
    const numB = Number(valueB);
    
    return sortDirection === 'asc' ? numA - numB : numB - numA;
  });
};

export const filterInventory = (
  items: InventoryItem[],
  searchTerm: string
): InventoryItem[] => {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase().trim();
  
  return items.filter(item => 
    item.sku.toLowerCase().includes(term) ||
    item.product.toLowerCase().includes(term)
  );
};