import React from "react";

const useCategories = () => {
  const [categories, setCategories] = React.useState([
    { id: 0, name: "All" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ]);

  const [nowSelectedCategoryId, setSelectedCategoryId] = React.useState(0);

  //表示カテゴリー変更時の処理
  const handleCategorySelected = (id: number) => {
    //alert(id);
    setSelectedCategoryId(id);
  };

  return {
    categories,
    nowSelectedCategoryId,
    handleCategorySelected,
  };
};

export default useCategories;
