import { useReducer, useState, useEffect } from "react";
import "../style.css";
//練習目的も兼ねて、一部stateをReducerを用いて実装

const dispDateReducer = (dispDate: any, action: any) => {
  switch(action.type) {
    case "single_arrow_left": {
      if(dispDate.month === 1) {
        return {
          year: dispDate.year-1,
          month: 12,
        };
      }
      else {
        return {
          year: dispDate.year,
          month: dispDate.month-1,
        };
      }
    }
    case "single_arrow_right": {
      if(dispDate.month === 12) {
        return {
          year: dispDate.year+1,
          month: 1,
        };
      }
      else {
        return {
          year: dispDate.year,
          month: dispDate.month+1,
        };
      }
    }
    case "double_arrow_left": {
      return {
        year: dispDate.year-1,
        month: dispDate.month,
      };
    }
    case "double_arrow_right": {
      return {
        year: dispDate.year+1,
        month: dispDate.month,
      };
    }
  }
}

const useCalendar = () => {
  //Calendarコンポーネントの表示/非表示を管理するstate
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  
  //Calendarコンポーネントのアニメーション状況を管理するstate
  const [isCalendarModalAnimate, setCalendarModalAnimate] = useState(false);

  //現在表示する日付を扱うstate
  const nowDate = new Date();
  const [dispPeriod, dispatch] = useReducer(dispDateReducer, {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth()+1,
  });

  useEffect(() => {
    console.log("年が変更されたので祝日APIをfetchします");
  }, [dispPeriod!.year])

  //コンポーネントの表示状況、アニメーション状況を制御する
  const handleCalendarDisp = () => {
    if(isCalendarModalVisible) {
      setCalendarModalAnimate(false);
      setTimeout(() => {
        setCalendarModalVisible(false)
      }, 600)
    }
    else {
      setCalendarModalVisible(true);
      setTimeout(() => {
        setCalendarModalAnimate(true);
      }, 10)
    }
  };

  //表示年月変更を制御する
  const handleDispPeriodChange = (clickedIcon: string) => {
    dispatch({
      type: clickedIcon,
    });
  };

  return {
    isCalendarModalVisible,
    isCalendarModalAnimate,
    dispPeriod,
    handleCalendarDisp,
    handleDispPeriodChange,
  };
};

export default useCalendar;