export const PRODUCTS_PER_PAGE = 9;

const minResponseDelay = 500;
const maxResponseDelay = 1200;
export const DELAY_API_RESPONSE =
  Math.random() * (maxResponseDelay - minResponseDelay) + minResponseDelay;
