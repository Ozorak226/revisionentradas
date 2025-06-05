export interface InventoryItem {
  id: string;
  quantity: number;
  sku: string;
  product: string;
  count: number;
  difference: number;
}

export interface InventorySummary {
  totalQuantity: number;
  totalCount: number;
  totalDifference: number;
  itemsWithDiscrepancy: number;
  totalItems: number;
}

export interface InventoryFormat {
  upc: string;
  sku: string;
  description: string;
}