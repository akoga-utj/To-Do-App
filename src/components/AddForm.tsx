import React from "react";
import "../style.css";

const AddForm = (props: any) => {
  //新しく追加するアイテムのタスク名
  const [title, setTitle] = React.useState<string>("");

  //新しく追加するアイテムに付与するカテゴリーのId
  const [categoryId, setCategoryId] = React.useState<number>(
    props.nowSelectedCategoryId,
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  //画面に表示しているカテゴリーが変更されたとき、カテゴリー指定の初期値を追従
  React.useEffect(() => {
    setCategoryId(props.nowSelectedCategoryId);
  }, [props.nowSelectedCategoryId]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    //htmlのイベントリスター同様、ブラウザ制御のための引数が用意されている。
    e.preventDefault();
    props.onSubmit(title, categoryId);
    setTitle("");
    inputRef.current!.focus();
  };

  //ドロップダウンリストの選択項目が変化したら、それをstateに反映
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTextChange}
          ref={inputRef}
        />
        <button>Add</button>
      </form>
      <p>カテゴリーを選択してください</p>
      <select value={String(categoryId)} onChange={handleCategoryChange}>
        <option value="0">未定義</option>
        <option value="1">{props.categories[1].name}</option>
        <option value="2">{props.categories[2].name}</option>
        <option value="3">{props.categories[3].name}</option>
      </select>
    </>
  );
};

export default AddForm;
