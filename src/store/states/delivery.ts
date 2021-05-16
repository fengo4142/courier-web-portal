import { DeliveryState } from '../../interfaces';

export function initDelivery(): DeliveryState {
  return {
    deliveries: [],
    delivery: {
      deliveryTime: 0,
      totalDistance: 0,
      isCompleted: false,
      payout: {
        amount: 0,
        refunded: false,
        type: '',
        email: '',
        service: '',
        currencyCode: '',
        description: ''
      },
      tips: {
        amount: 0,
        refunded: false,
        type: '',
        email: '',
        service: '',
        currencyCode: '',
        description: ''
      },
      createdAt: '',
      updatedAt: ''
    },
    filters: {
      sortField: '',
      page: 0,
      search: '',
      order: 'asc'
    },
    meta: { totalCount: 0, filteredCount: 0 },
    overview: { totalFees: 0, totalTips: 0 }
  };
}
