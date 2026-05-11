import "../style.css";
import React from "react";

const Todo = (props: any) => {
  //ドロップダウンリストの値を受け取り、カテゴリー更新のトリガーとなるstate
  const [categoryId, setCategoryId] = React.useState<number>(
    props.todo.refCategoryId,
  );

  //ドロップダウンリストの値が更新された際に発火。
  //・ドロップダウンリストの選択項目
  //・Todoアイテムの属するカテゴリー
  //の両方を更新する。
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
    //本当はcategoryIdを渡したいけど、値が反映されないため直渡しする
    props.onCategoryChange(props.todo.id, Number(e.target.value));
  };

  const limitDisplayHandling = () => {
    if(props.todo.isLimited) {
      return (
        <>
        <p>{props.todo.limits.year}</p>
        </>
      );
    }else {
      return (
        <>
        <p>期限未設定</p>
        </>
      );
    }
  };
  

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={props.todo.isCompleted}
          onChange={() => {
            props.onCheckboxChange(props.todo.id);
          }}
        />
        <span>{props.todo.title}</span>
      </label>
      {limitDisplayHandling()}
      <select value={String(categoryId)} onChange={handleCategoryChange}>
        <option value="0">未定義</option>
        <option value="1">{props.categories[1].name}</option>
        <option value="2">{props.categories[2].name}</option>
        <option value="3">{props.categories[3].name}</option>
      </select>
      <button
        onClick={() => {
          props.onDeleteClick(props.todo.id);
        }}
      >
        削除
      </button>
    </li>
  );
};

export default Todo;
