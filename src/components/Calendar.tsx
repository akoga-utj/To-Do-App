const Calendar = (props: any) => {
  return (
    <>
      <div className="modal">
        <div className={`modal-msgspace ${props.isOpen ? "open" : ""} calendar `} >
          <div className="disp-period-change-place">
            <img src="../../img/keyboard_double_arrow_left.png" onClick={() => {props.onArrowClicked("double_arrow_left")}}></img>
            <img src="../../img/keyboard_arrow_left.png" onClick={() => {props.onArrowClicked("single_arrow_left")}}></img>
            <h1>{props.dispPeriod.year}年 {props.dispPeriod.month}月</h1>
            <img src="../../img/keyboard_arrow_right.png" onClick={() => {props.onArrowClicked("single_arrow_right")}}></img>
            <img src="../../img/keyboard_double_arrow_right.png" onClick={() => {props.onArrowClicked("double_arrow_right")}}></img>
          </div>
          <div className="disp-task-change-place">
                チェックボックス群挿入スペース
          </div>
          <div style={{display:"flex", flex: 1, justifyContent: "flex-end"}}>
            <button
              onClick={() => {
                props.onClose();
              }}
              style={{padding: "8px", width: "auto", margin: 0}}
              >
            閉じる
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;