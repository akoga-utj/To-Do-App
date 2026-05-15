import "../style.css";
import useLimit from "../hooks/useLimit";
import LimitForms from "./LimitForms";

const ChangeLimitModal = (props: any) => {
  if (props.limitChangeItemId === null) {
    setTimeout(() => {
      return null;
    }, 500);
  }

  const targetItem = props.todos.filter((todo: any) => {
    return todo.id === props.limitChangeItemId;
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
        <div className={`modal-msgspace ${props.isOpen ? "open" : ""}  `}>
          日付を選択してください
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
            <button
              id="cancel"
              onClick={() => {
                props.onSubmit(null, dates);
              }}
            >
              キャンセル
            </button>
            <button
              id="save"
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

export default ChangeLimitModal;
