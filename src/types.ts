export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
}

export type Item = Product | Service | Subscription;

export interface ItemsGroupedByType {
  product: Product[];
  service: Service[];
  subscription: Subscription[];
}
