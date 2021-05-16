import { RouteProps } from 'react-router-dom';

export type SelectItem = Array<{
  value: number | string;
  label: number | string;
}>;

export type AppRouteProps = RouteProps & {
  redirect: string;
  noAuth?: boolean;
  layout?: any;
};
