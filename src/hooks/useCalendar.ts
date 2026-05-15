import { useReducer, useState, useEffect } from "react";
import "../style.css";

//練習目的も兼ねて、一部stateをReducerを用いて実装
const dispDateReducer = (dispDate: any, action: any) => {
  switch (action.type) {
    case "single_arrow_left": {
      if (dispDate.month === 1) {
        return {
          year: dispDate.year - 1,
          month: 12,
        };
      } else {
        return {
          year: dispDate.year,
          month: dispDate.month - 1,
        };
      }
    }
    case "single_arrow_right": {
      if (dispDate.month === 12) {
        return {
          year: dispDate.year + 1,
          month: 1,
        };
      } else {
        return {
          year: dispDate.year,
          month: dispDate.month + 1,
        };
      }
    }
    case "double_arrow_left": {
      return {
        year: dispDate.year - 1,
        month: dispDate.month,
      };
    }
    case "double_arrow_right": {
      return {
        year: dispDate.year + 1,
        month: dispDate.month,
      };
    }
  }
};

const useCalendar = () => {
  //Calendarコンポーネントの表示/非表示を管理するstate
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);

  //Calendarコンポーネントのアニメーション状況を管理するstate
  const [isCalendarModalAnimate, setCalendarModalAnimate] = useState(false);

  //現在表示する日付を扱うstate
  const nowDate = new Date();
  const [dispPeriod, dispatch] = useReducer(dispDateReducer, {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
  });

  //現在表示するタスクを扱うstate
  const [dispCategory, setDispCategory] = useState([
    { id: 0, disp: true },
    { id: 1, disp: true },
    { id: 2, disp: true },
    { id: 3, disp: true },
  ]);

  //カレンダーの週数を扱うstate
  const [calendarRefs, setCalendarRefs] = useState({
    firstDay: 0,
    lastDate: 31,
    beforeMonthLastDate: 31,
    weeks: 5,
  });

  //祝日情報(年単位)を扱うstate
  const [holidays, setHolidays] = useState(initialHolidays);

  //祝日情報(月単位)を扱うstate
  const [thisMonthHolidays, setThisMonthHolidays] = useState<any[]>([]);

  //祝日APIをfetch
  useEffect(() => {
    checkHolidays();
  }, [dispPeriod!.year]);

  //表示期間変更時、カレンダーを更新
  useEffect(() => {
    checkWeeks();
  }, [dispPeriod]);

  //初回実行時も週数、祝日情報を確認
  useEffect(() => {
    checkHolidays();
    checkWeeks();
  }, []);

  //祝日確認関数
  const checkHolidays = async () => {
    try {
      const targetYear = ("0000" + String(dispPeriod!.year)).slice(-4);
      const fetchData = await fetch(`api/${targetYear}`);
      const resData = await fetchData.json();

      let newHolidays = structuredClone(initialHolidays);
      resData.forEach((prev: any) => {
        const holidayDate = prev.date.split("-");
        newHolidays = newHolidays.map((temp: any) => {
          if (temp.month === Number(holidayDate[1])) {
            return {
              month: temp.month,
              dates: [...temp.dates, holidayDate[2]],
            };
          } else {
            return temp;
          }
        });
      });
      setHolidays(newHolidays);

      newHolidays.forEach((prev: any) => {
        if (prev.month === dispPeriod!.month) {
          setThisMonthHolidays(prev.dates);
        }
      });
    } catch (err) {
      console.error("祝日取得に失敗しました。");
      console.log(err);
      setHolidays(initialHolidays);
    }
  };

  //週数確認関数
  const checkWeeks = () => {
    const thisMonthFirstDayInstance = new Date(
      dispPeriod!.year,
      dispPeriod!.month - 1,
      1,
    );
    const thisMonthFirstDay = thisMonthFirstDayInstance.getDay();
    const thisMonthLastDayInstance = new Date(
      dispPeriod!.year,
      dispPeriod!.month,
      0,
    );
    const thisMonthLastDate = thisMonthLastDayInstance.getDate();
    const beforeMonthLastDateInstance = new Date(
      dispPeriod!.year,
      dispPeriod!.month - 2,
      0,
    );
    const beforeMonthLastDate = beforeMonthLastDateInstance.getDate();

    if (
      dispPeriod!.month === 2 &&
      thisMonthFirstDay === 0 &&
      thisMonthLastDate === 28
    ) {
      //2月の場合 うるう年ではなく、1日が日曜日の場合のみ表記4週
      setCalendarRefs({
        firstDay: thisMonthFirstDay,
        lastDate: thisMonthLastDate,
        weeks: 4,
        beforeMonthLastDate: beforeMonthLastDate,
      });
    } else if (thisMonthLastDate === 30 && thisMonthFirstDay === 6) {
      setCalendarRefs({
        firstDay: thisMonthFirstDay,
        lastDate: thisMonthLastDate,
        weeks: 6,
        beforeMonthLastDate: beforeMonthLastDate,
      });
    } else if (thisMonthLastDate === 31 && thisMonthFirstDay > 4) {
      setCalendarRefs({
        firstDay: thisMonthFirstDay,
        lastDate: thisMonthLastDate,
        weeks: 6,
        beforeMonthLastDate: beforeMonthLastDate,
      });
    } else {
      setCalendarRefs({
        firstDay: thisMonthFirstDay,
        lastDate: thisMonthLastDate,
        weeks: 5,
        beforeMonthLastDate: beforeMonthLastDate,
      });
    }

    holidays.forEach((prev: any) => {
      if (prev.month === dispPeriod!.month) {
        setThisMonthHolidays(prev.dates);
      }
    });
  };

  //コンポーネントの表示状況、アニメーション状況を制御する
  const handleCalendarDisp = () => {
    if (isCalendarModalVisible) {
      setCalendarModalAnimate(false);
      setTimeout(() => {
        setCalendarModalVisible(false);
      }, 600);
    } else {
      setCalendarModalVisible(true);
      setTimeout(() => {
        setCalendarModalAnimate(true);
      }, 10);
    }
  };

  //表示年月変更を制御する
  const handleDispPeriodChange = (clickedIcon: string) => {
    dispatch({
      type: clickedIcon,
    });
  };

  const handleDispCategoryChange = (CategoryId: number) => {
    const newDispCategory = dispCategory.map((prev) => {
      if (prev.id === CategoryId) {
        return {
          id: prev.id,
          disp: !prev.disp,
        };
      } else {
        return prev;
      }
    });

    setDispCategory(newDispCategory);
  };

  return {
    isCalendarModalVisible,
    isCalendarModalAnimate,
    dispPeriod,
    handleCalendarDisp,
    handleDispPeriodChange,
    dispCategory,
    handleDispCategoryChange,
    calendarRefs,
    thisMonthHolidays,
  };
};

const initialHolidays: any[] = [];
for (let i = 1; i <= 12; i++) {
  initialHolidays.push({
    month: i,
    dates: [],
  });
}

export default useCalendar;
