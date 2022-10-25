export const PRODUCTS_PER_PAGE = 9;

const minResponseDelay = 800;
const maxResponseDelay = 1500;
export const API_RESPONSE_DELAY =
  Math.random() * (maxResponseDelay - minResponseDelay) + minResponseDelay;
