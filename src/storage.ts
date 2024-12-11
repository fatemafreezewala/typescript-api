import { ItemsGroupedByType, Product, Service, Subscription } from "./types";

const items: ItemsGroupedByType = {
  product: [],
  service: [],
  subscription: [],
};

// Get items grouped by type
export const getItems = (): ItemsGroupedByType => items;

// Add a product
export const addProduct = (product: Product): void => {
  items.product.push(product);
};

// Add a service
export const addService = (service: Service): void => {
  items.service.push(service);
};

// Add a subscription
export const addSubscription = (subscription: Subscription): void => {
  items.subscription.push(subscription);
};
