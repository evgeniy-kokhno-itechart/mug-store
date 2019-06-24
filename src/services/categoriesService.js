export const categories = [
  { _id: '1', name: 'Mugs' },
  { _id: '2', name: 'Plates' },
  { _id: '3', name: 'Notepads' },
  { _id: '4', name: 'T-shirts' },
];

export function getCategories() {
  return categories.filter(g => g);
}
