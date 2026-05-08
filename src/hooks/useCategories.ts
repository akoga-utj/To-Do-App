import React from "react";

const useCategories = () => {
  const [categories, setCategories] = React.useState([
    { id: 0, name: "All" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ]);

  const [nameChangeCategoryId, setNameChangeCategoryId] = React.useState<number|null>(null);

  const [nowSelectedCategoryId, setSelectedCategoryId] = React.useState(0);

  const timerRef = React.useRef<number | null>(null);

  //表示カテゴリー変更時の処理
  const handleCategorySelected = (id: number) => {
    //alert(id);
    setSelectedCategoryId(id);
  };

  const handleLongPress = (id: number) => {
    if(id !== 0){
    timerRef.current = setTimeout(() => {
        setNameChangeCategoryId(id); 
      }, 500);
    }
  };

  const timerStop = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
  };

  const renameCategory = (newName: string, id: number) => {
    const newCategories = categories.map((category) => {
      if(category.id === id) {
        return {
          id: id,
          name: newName,
        };
      } 
      else {
        return category;
      }
    });
    
    setCategories(newCategories);
    setNameChangeCategoryId(null);
  }

  return {
    categories,
    nameChangeCategoryId,
    nowSelectedCategoryId,
    handleCategorySelected,
    renameCategory,
    handleLongPress,
    timerStop,
  };
};

export default useCategories;
