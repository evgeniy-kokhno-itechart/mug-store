export const categories = [
  { _id: "1", title: "Mugs" },
  { _id: "2", title: "Plates" },
  { _id: "3", title: "Notepads" },
  { _id: "4", title: "T-shirts" }
];

export function getCategories() {
  return categories.filter(g => g);
}
