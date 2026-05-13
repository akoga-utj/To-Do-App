import React from "react";

const useCategories = () => {
  type Category_data = {
    id: number;
    name: string;
  };

  const [categories, setCategories] = React.useState<Category_data[]>([
    { id: 0, name: "All" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ]);

  React.useEffect(() => {
    let saved = localStorage.getItem("categories");

    if (saved !== null) {
      setCategories(JSON.parse(saved));
    }
  }, []);

  const [nameChangeCategoryId, setNameChangeCategoryId] = React.useState<
    number | null
  >(null);

  const [nowSelectedCategoryId, setSelectedCategoryId] = React.useState(0);

  const timerRef = React.useRef<number | null>(null);

  //アニメーション管理のため、UIに紐づくstateをこっちで扱う
  const [isRenameModalVisible, setRenameModalVisible] = React.useState(false);
  const [isRenameModalAnimate, setRenameModalAnimate] = React.useState(false);

  //紐づいている処理が広範となっているため、UI遷移用の一時IDstateを用意する
  const [tempId, setTempId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (tempId === null) {
      setRenameModalAnimate(false);
      setTimeout(() => {
        setRenameModalVisible(false);
        setNameChangeCategoryId(null);
      }, 600);
    } else {
      setNameChangeCategoryId(tempId);
      setRenameModalVisible(true);
      setTimeout(() => {
        setRenameModalAnimate(true);
      }, 10);
    }
  }, [tempId]);

  //表示カテゴリー変更時の処理
  const handleCategorySelected = (id: number) => {
    //alert(id);
    setSelectedCategoryId(id);
  };

  const handleLongPress = (id: number) => {
    if (id !== 0) {
      timerRef.current = setTimeout(() => {
        setTempId(id);
      }, 500);
    }
  };

  const timerStop = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
  };

  const renameCategory = (newName: string, id: number) => {
    //id=0で呼び出されたときは何もせずウィンドウを閉じる(id=0はAll用だが、Allを対象にこの関数が呼ばれることはないため)
    if (id === 0) {
      setTempId(null);
      return;
    }

    //新しいカテゴリー名がNULLだったらalertを出して更新拒否
    if (newName === "") {
      alert("カテゴリー名は空白にできません");
      return;
    }

    //すでに使われているカテゴリー名だったらalertを出して更新拒否
    //forEachではreturnしてもループを抜けるどまりなので、関数としてreturnもしれくれるforを使う
    for (const category of categories) {
      if (category.name === newName) {
        alert("名前が他のカテゴリーと重複しています");
        return;
      }
    }

    const newCategories = categories.map((category) => {
      if (category.id === id) {
        return {
          id: id,
          name: newName,
        };
      } else {
        return category;
      }
    });

    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setTempId(null);
  };

  return {
    categories,
    nameChangeCategoryId,
    nowSelectedCategoryId,
    handleCategorySelected,
    renameCategory,
    handleLongPress,
    timerStop,
    isRenameModalAnimate,
    isRenameModalVisible,
  };
};

export default useCategories;
