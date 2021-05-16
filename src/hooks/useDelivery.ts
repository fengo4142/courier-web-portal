import { useStores } from '../store';
import { DeliveryPagination } from '../interfaces';
import { getDeliveries, getDeliveryOverview } from '../store/actions/delivery';

export default function useDelivery() {
  const { deliveryStore } = useStores();

  return {
    ...deliveryStore.getState(),
    getDeliveries: (data: DeliveryPagination) => getDeliveries(data),
    getDeliveryOverview: (data: DeliveryPagination) => getDeliveryOverview(data)
  };
}
