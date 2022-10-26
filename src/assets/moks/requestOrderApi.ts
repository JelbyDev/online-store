import { Order } from "@/types/index";
import { DELAY_API_RESPONSE } from "@/assets/moks/constants";

export function addOrderRequest(orderInfo: Order): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), DELAY_API_RESPONSE);
  });
}
