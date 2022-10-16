export const FILTERING_ELEMENTS = {
  price: {
    title: "Цена",
    type: "range",
    values: ["170", "490"],
  },
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
  popular: {
    title: "Популярные товары",
    type: "switch",
  },
};

export const SORTING_ELEMENTS = [
  { title: "Названию А-Я", value: "name--ASC" },
  { title: "Названию Я-A", value: "name--DESC" },
  { title: "Цене ▲", value: "price--ASC" },
  { title: "Цене ▼", value: "price--DESC" },
];
