export interface SalesData {
  product: string;
  revenue: number;
  category: string;
}

export interface AnalyticsResponse {
  totalProducts: number;
  totalRevenue: number;
  data: SalesData[];
}
