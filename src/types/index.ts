export interface Product {
  id: number;
  name: string;
  img: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  isPopular: boolean;
  description: string;
}

export interface CartProduct extends Product {
  cartQuantity: number;
  cartTotalPrice: number;
}

export interface Customer {
  firstName: string;
  email: string;
}

export interface OrderProduct {
  id: number;
  quantity: number;
}

export interface Order {
  products: OrderProduct[];
  customer: Customer;
}

export interface SortingElement {
  title: string;
  value: string;
}

interface FilteringElementCheckbox {
  title: string;
  type: "checkbox";
  values: string[];
}
interface FilteringElementSwitch {
  title: string;
  type: "switch";
}
interface FilteringElementRange {
  title: string;
  type: "range";
  values: string[];
}
export type FilteringElements = {
  [index: string]:
    | FilteringElementCheckbox
    | FilteringElementSwitch
    | FilteringElementRange;
};

export interface SelectedFilters {
  [index: string]: number[] | string[] | boolean;
}
