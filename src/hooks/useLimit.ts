import React from "react";

const useLimit = (isLimited: boolean, limits: {
    year: number,
    month: number,
    day: number,
  } | null) => {
  type Dates = {
    year: number,
    month: number,
    day: number,
  }

  const date = new Date();
  const [dates, setDates] = React.useState<Dates>({
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDate(),
  });

  React.useEffect(() => {
    if(isLimited) {
      const newDates: Dates = {
        year: limits!.year,
        month: limits!.month,
        day: limits!.day,
      };
      setDates(newDates)
    }
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue:number;

      if(Number(e.currentTarget.value)){
        newValue = Number(e.currentTarget.value);
        const newDates: Dates = {
          year: newValue,
          month: dates.month,
          day: dates.day,
        }
        setDates(newDates);
      }
      else {
        const newDates: Dates = {
          year: 0,
          month: dates.month,
          day: dates.day,
        }
        setDates(newDates);
      }
    };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue:number;

      if(Number(e.currentTarget.value)){
        newValue = Number(e.currentTarget.value);
        const newDates: Dates = {
          year: dates.year,
          month: newValue,
          day: dates.day,
        }
        setDates(newDates); 
        
      }
      else {
        const newDates: Dates = {
          year: dates.year,
          month: 0,
          day: dates.day,
        }
        setDates(newDates); 
      }
    };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue:number;

      if(Number(e.currentTarget.value)){
        newValue = Number(e.currentTarget.value);
        const newDates: Dates = {
          year: dates.year,
          month: dates.month,
          day: newValue,
        }
        setDates(newDates);
      }
      else {
        const newDates: Dates = {
          year: dates.year,
          month: dates.month,
          day: 0,
        }
        setDates(newDates);
      }
    };

  const handleArrowChange = (type:string , target:string) => {
    let value: number;
    if(type === "up") {
      value = -1;
    }
    else {
      value = 1;
    }

    let newDates: Dates = {
      year: dates.year,
      month: dates.month,
      day: dates.day,
    }

    switch (target) {
      case "year":
        newDates.year += value;
        setDates(newDates);
        break;
      case "month":
        newDates.month += value;
        setDates(newDates);
        break;
      case "day":
        newDates.day += value;
        setDates(newDates);
        break;
    }
  };
  
  //日付が正確かどうか確認する関数
  //仕様書と異なる実装であるが、getTImeの仕様がなんか違うので致し方ない
  const checkUsableDates = (year: number, month: number, day: number) => {
      const yyyy = ('0000' + String(year)).slice(-4);
      const MM = ('00' + String(month)).slice(-2);
      const dd = ('00' + String(day)).slice(-2);
      const checkDates = new Date(yyyy + '-' + MM + '-' + dd);
      console.log(checkDates.getDate());

      //末尾チェック
      if(month !== 12){
        const endDayInstance = new Date(year, month, 0);
        const thisMonthEndday = endDayInstance.getDate();
        console.log(thisMonthEndday);

        // 該当付きの末尾より、日付が大きかった(例:4月は30日までしかないのに、
        // 31日が指定されてた場合)
        if(day > thisMonthEndday){
          return true;
        }
      }

      return (isNaN(checkDates.getDate()) || year === 0);
    };

  return {
    dates,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleArrowChange,
    checkUsableDates,
  };
};

export default useLimit