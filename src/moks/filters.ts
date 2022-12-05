import { FilteringElements } from "@/types";

const FILTERING_ELEMENTS: FilteringElements = {
  category: {
    title: "Категория",
    type: "checkbox",
    values: ["Джем", "Горный", "Клиар", "Ориджинал"],
  },
  size: {
    title: "Размер",
    type: "checkbox",
    values: ["100", "200", "300", "400"],
  },
  color: {
    title: "Цвет",
    type: "checkbox",
    values: ["Красный", "Зеленый", "Синий", "Желтый"],
  },
  price: {
    title: "Цена",
    type: "range",
    values: ["170", "490"],
  },
  popular: {
    title: "Популярные товары",
    type: "switch",
  },
};

export default FILTERING_ELEMENTS;
