export default function CategoryList({ categories, onDelete, onEdit }) {
  const findParentCategory = (category) => {
    const parentCategory = categories.find(
      (c) => c.id === category.parentCategory.id
    );
    return parentCategory
      ? `${parentCategory.id}. ${parentCategory.name}`
      : "N/A";
  };

  return (
    <div className="overflow-x-auto w-full text-text">
      <table className="table w-full">
        <thead>
          <tr className="text-text border-bc">
            <th>ID</th>
            <th>Category Name</th>
            <th>Show In Menu</th>
            <th>Parent Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id} className="hover:bg-[#8b33fd21] !border-bc">
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.isVisibleInMenu ? "Yes" : "No"}</td>
              <td>
                {!!category?.parentCategory && findParentCategory(category)}
              </td>
              <td>
                <div className="flex gap-1">
                  <button
                    className="btn btn-primary text-text btn-xs"
                    onClick={() => onEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary text-text btn-xs"
                    onClick={() => onDelete(category.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
