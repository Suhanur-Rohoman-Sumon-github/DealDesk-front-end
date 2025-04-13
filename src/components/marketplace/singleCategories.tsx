const SingleCategories = Array.from({ length: 3 }, (_, index) => ({
  category: `Single Category ${index + 1}`,
  subCategories: [
    `Single Subcategory ${index + 1}A`,
    `Single Subcategory ${index + 1}B`,
  ],
  stockLimit: Math.floor(Math.random() * 100),
}));

export default SingleCategories;
export const ComboCategories = Array.from({ length: 3 }, (_, index) => ({
  category: `Combo Category ${index + 1}`,
  subCategories: [
    `Combo Subcategory ${index + 1}A`,
    `Combo Subcategory ${index + 1}B`,
  ],
  stockLimit: Math.floor(Math.random() * 100),
}));
