import api from '../../api';
import { DeliveryPagination } from '../../interfaces';

export const getDeliveries = (data: DeliveryPagination) => {
  return api.getDeliveries(data);
};

export const getDeliveryOverview = (data: DeliveryPagination) => {
  return api.getDeliveryOverview(data);
};
