import { Filters } from './helpers';

export interface Delivery {
  totalDistance: number;
  deliveryTime: number;
  isCompleted: boolean;
  payout: {
    amount: number;
    refunded: boolean;
    type: string;
    email: string;
    service: string;
    currencyCode: string;
    description: string;
  };
  tips: {
    amount: number;
    refunded: boolean;
    type: string;
    email: string;
    service: string;
    currencyCode: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryPagination {
  sub: string;
  page?: number;
  perPage?: number;
  search?: string;
  sortField?: string;
  order?: string;
  period?: number;
}

export interface DeliveryState {
  deliveries: any[];
  delivery: Delivery;
  filters: Filters;
  meta: { totalCount: number; filteredCount: number };
  overview: { totalFees: number; totalTips: number };
}
