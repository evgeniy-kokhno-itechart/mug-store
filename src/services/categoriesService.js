export const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", title: "Mugs" },
  { _id: "5b21ca3eeb7f6fbccd471814", title: "Plates" },
  { _id: "5b21ca3eeb7f6fbccd471820", title: "Notepads" },
  { _id: "5b21ca3eeb7f6fbccd471851", title: "T-shirts" }
];

export function getCategories() {
  return categories.filter(g => g);
}
