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
