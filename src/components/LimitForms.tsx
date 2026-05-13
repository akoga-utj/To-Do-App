const LimitForms = (props: any) => {
  const isNonZero = (prop: number) => {
    return prop > 1;
  };

  const isOverLimit = (prop: number, type: string) => {
    if (type === "month") {
      return prop < 12;
    } else {
      return prop < 31;
    }
  };

  return (
    <>
      <div className="limit-forms">
        <div className="limit-form">
          <img
            src="../../img/keyboard_arrow_up.png"
            onClick={() => {
              isNonZero(props.year) && props.handleArrowChange("up", "year");
            }}
          />
          <input
            type="text"
            value={props.year}
            onChange={props.handleYearChange}
          ></input>
          <img
            src="../../img/keyboard_arrow_down.png"
            onClick={() => {
              props.handleArrowChange("down", "year");
            }}
          />
        </div>
        <p>年</p>
        <div className="limit-form">
          <img
            src="../../img/keyboard_arrow_up.png"
            onClick={() => {
              isNonZero(props.month) && props.handleArrowChange("up", "month");
            }}
          />
          <input
            type="text"
            value={props.month}
            onChange={props.handleMonthChange}
          ></input>
          <img
            src="../../img/keyboard_arrow_down.png"
            onClick={() => {
              isOverLimit(props.month, "month") &&
                props.handleArrowChange("down", "month");
            }}
          />
        </div>
        <p>月</p>
        <div className="limit-form">
          <img
            src="../../img/keyboard_arrow_up.png"
            onClick={() => {
              isNonZero(props.day) && props.handleArrowChange("up", "day");
            }}
          />
          <input
            type="text"
            value={props.day}
            onChange={props.handleDayChange}
          ></input>
          <img
            src="../../img/keyboard_arrow_down.png"
            onClick={() => {
              isOverLimit(props.day, "day") &&
                props.handleArrowChange("down", "day");
            }}
          />
        </div>
        <p>日</p>
      </div>
    </>
  );
};

export default LimitForms;
