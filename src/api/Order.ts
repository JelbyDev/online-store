import { Order } from "@/types/index";
import { addOrderRequest } from "@/moks/requestOrderApi";

export function addOrder(orderInfo: Order): Promise<boolean> {
  return addOrderRequest(orderInfo);
}
