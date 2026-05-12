import React from "react";
import "../style.css";
import LimitForms from "./LimitForms";
import useLimit from "../hooks/useLimit"

const AddForm = (props: any) => {
  //新しく追加するアイテムのタスク名
  const [title, setTitle] = React.useState<string>("");

  //新しく追加するアイテムに付与するカテゴリーのId
  const [categoryId, setCategoryId] = React.useState<number>(
    props.nowSelectedCategoryId,
  );

  //期限設定フォームの表示/非表示
  const [isLimitFormDisplayed, setLimitFormDisplayed] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  //フォームの入力内容を反映
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  //期限設定コンポーネントに渡すロジックをインポート
  const {
    dates,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleArrowChange,
  } = useLimit(false, null);

  //画面に表示しているカテゴリーが変更されたとき、カテゴリー指定の初期値を追従
  React.useEffect(() => {
    setCategoryId(props.nowSelectedCategoryId);
  }, [props.nowSelectedCategoryId]);

  //Form内容をTodoリストに反映
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    //htmlのイベントリスター同様、ブラウザ制御のための引数が用意されている。
    console.log(dates);
    e.preventDefault();
    if(isLimitFormDisplayed){
      props.onSubmit(title, categoryId, isLimitFormDisplayed, dates);
    }
    else {
      props.onSubmit(title, categoryId, isLimitFormDisplayed, null);
    }
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
        <button>追加</button>
      </form>
      <div className="add-item-options">
      <input
      type="checkbox"
      checked={isLimitFormDisplayed}
      onChange={() => {setLimitFormDisplayed(!isLimitFormDisplayed)}}
      />
      <p>期限を設定する</p>
      <p>カテゴリーを選択してください</p>
      <select value={String(categoryId)} onChange={handleCategoryChange}>
        <option value="0">未定義</option>
        <option value="1">{props.categories[1].name}</option>
        <option value="2">{props.categories[2].name}</option>
        <option value="3">{props.categories[3].name}</option>
      </select>
      </div>
      {isLimitFormDisplayed && 
      <>
      <p>日付を選択してください</p>
      <LimitForms 
        year={dates.year}
        month={dates.month}
        day={dates.day}
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        handleDayChange={handleDayChange}
        handleArrowChange={handleArrowChange}
        />
        </>}
    </>
  );
};

export default AddForm;
