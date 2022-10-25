import { SortingElement } from "@/types";

const SORTING_ELEMENTS: SortingElement[] = [
  { title: "Названию А-Я", value: "name--ASC" },
  { title: "Названию Я-A", value: "name--DESC" },
  { title: "Цене ▲", value: "price--ASC" },
  { title: "Цене ▼", value: "price--DESC" },
];

export default SORTING_ELEMENTS;
