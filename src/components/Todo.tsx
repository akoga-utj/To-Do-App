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
    let date = "";
    if(props.todo.isLimited) {
      const yyyy = ('0000' + String(props.todo.limits.year)).slice(-4);
      const MM = ('00' + String(props.todo.limits.month)).slice(-2);
      const dd = ('00' + String(props.todo.limits.year)).slice(-2);
      date = yyyy + "/" + MM + "/" + dd;
    }
    return (
      <div className="date-place">
        {date}
      </div>
    );
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
      <img src="../../img/edit_calendar_icon.png" />
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
