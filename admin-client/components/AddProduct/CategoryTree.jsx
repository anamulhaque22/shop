import { useCategories } from "../context/CategoryContext";

const CategoryTree = ({ categories }) => {
  const renderCategories = (categories, level = 0) => {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            {category.subCategory &&
              renderCategories(category.subCategory, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Category Tree</h2>
      {renderCategories(categories)}
    </div>
  );
};

const CategoryTreeWrapper = () => {
  const { categories } = useCategories();

  return <CategoryTree categories={categories} />;
};

export default CategoryTreeWrapper;
