import "../style.css";
import useLimit from "../hooks/useLimit";
import LimitForms from "./LimitForms";

const ChangeLimit = (props: any) => {
  const targetItem = props.todos.filter((todo: any) => {
    return todo.id === props.limitChangeItemId
  });

  const {
    dates,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleArrowChange,
  } = useLimit(targetItem[0].isLimited, targetItem[0].limits);

  return (
    <>
      <div className="modal">
        <div className="modal-msgspace">
          新しいカテゴリー名を入力してください
          <LimitForms 
          year={dates.year}
          month={dates.month}
          day={dates.day}
          handleYearChange={handleYearChange}
          handleMonthChange={handleMonthChange}
          handleDayChange={handleDayChange}
          handleArrowChange={handleArrowChange}
          />
          <div className="form-button-place">
          <button id="cancel"
            onClick={() => {
              props.onSubmit(null, dates);
            }}
          >
            キャンセル
          </button>
          <button id="save"
            onClick={() => {
              props.onSubmit(props.limitChangeItemId, dates);
            }}
          >
            保存
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeLimit;