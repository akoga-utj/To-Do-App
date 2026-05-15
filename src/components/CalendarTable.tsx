const CalenderTable = (props: any) => {
  let rows = [];
  let prevDay = 1;
  let nextMonthDay = 1;
  let beforeMonthDay =
    props.calendarRefs.lastDate - props.calendarRefs.firstDay + 1;

  const dispTodos = props.todos.filter((todo: any) => {
    //Todoに期限が設定されており、カレンダーの表示期限内で、属するカテゴリーが表示対象なら追加する。
    return (
      todo.isLimited === true &&
      todo.limits.year === props.dispPeriod.year &&
      todo.limits.month === props.dispPeriod.month &&
      props.dispCategory[todo.refCategoryId].disp
    );
  });

  for (let i = 0; i < props.calendarRefs.weeks; i++) {
    let cols = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < props.calendarRefs.firstDay) {
        cols.push(
          <td key={i * 7 + j} className="other-disp-period-day">
            {beforeMonthDay}
          </td>,
        );
        beforeMonthDay++;
      } else if (prevDay > props.calendarRefs.lastDate) {
        cols.push(
          <td key={i * 7 + j} className="other-disp-period-day">
            {nextMonthDay}
          </td>,
        );
        nextMonthDay++;
      } else {
        let content: any = [];

        const today = new Date();
        if (
          prevDay === today.getDate() &&
          props.dispPeriod.month === today.getMonth() + 1 &&
          props.dispPeriod.year === today.getFullYear()
        ) {
          content.push(
            <div
              key={`day_${prevDay}`}
              style={{
                fontSize: "16px",
                color: "white",
                backgroundColor: "red",
              }}
            >
              {prevDay}
            </div>,
          );
        } else if (
          props.thisMonthHolidays.includes(("0" + String(prevDay)).slice(-2))
        ) {
          content.push(
            <div
              key={`day_${prevDay}`}
              style={{ fontSize: "16px", color: "red" }}
            >
              {prevDay}
            </div>,
          );
        } else if (j === 0) {
          content.push(
            <div
              key={`day_${prevDay}`}
              style={{ fontSize: "16px", color: "red" }}
            >
              {prevDay}
            </div>,
          );
        } else if (j === 6) {
          content.push(
            <div
              key={`day_${prevDay}`}
              style={{ fontSize: "16px", color: "blue" }}
            >
              {prevDay}
            </div>,
          );
        } else {
          content.push(
            <div key={`day_${prevDay}`} style={{ fontSize: "16px" }}>
              {prevDay}
            </div>,
          );
        }
        let todoCount = 0;
        dispTodos.forEach((todo: any) => {
          if (todo.limits.day === prevDay) {
            if (todoCount < 4) {
              let colorString: string = "";
              let taskName = todo.title;

              switch (todo.refCategoryId) {
                case 0: {
                  colorString = "#d4e1f5";
                  break;
                }
                case 1: {
                  colorString = "#ffe4e1";
                  break;
                }
                case 2: {
                  colorString = "#e0ffe0";
                  break;
                }
                case 3: {
                  colorString = "#ffffe0";
                  break;
                }
              }

              if (taskName.length >= 7) {
                taskName = taskName.slice(0, 6) + "...";
              }
              content.push(
                <div
                  key={todo.id}
                  className="calendar-item"
                  style={{ backgroundColor: colorString }}
                >
                  {taskName}
                </div>,
              );
            }
            todoCount++;
          }
        });
        if (todoCount >= 5) {
          const dispOverlimitTodos = todoCount - 4;
          content.push(
            <div key={`day_${prevDay}_overTasks`} style={{ fontSize: "10px" }}>
              +{dispOverlimitTodos}
            </div>,
          );
        }

        cols.push(<td key={i * 7 + j}>{content}</td>);
        prevDay++;
      }
    }
    rows.push(<tr key={`row_${i}`}>{cols}</tr>);
  }
  return rows;
};

export default CalenderTable;
