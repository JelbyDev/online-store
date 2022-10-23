import { Order } from "@/types/index";
import { API_RESPONSE_DELAY } from "@/assets/moks/constants";

export function addOrderRequest(orderInfo: Order): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), API_RESPONSE_DELAY);
  });
}
