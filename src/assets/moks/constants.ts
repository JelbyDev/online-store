export const PRODUCTS_PER_PAGE = 9;

const minResponseDelay = 800;
const maxResponseDelay = 1500;
export const DELAY_API_RESPONSE =
  Math.random() * (maxResponseDelay - minResponseDelay) + minResponseDelay;
