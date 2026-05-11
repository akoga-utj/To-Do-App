import React from "react";

const useLimit = () => {
  type Dates = {
    year: number,
    month: number,
    day: number,
  }

  const date = new Date();
  const [dates, setDates] = React.useState<Dates>({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  });

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

  return {
    dates,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleArrowChange,
  };
};

export default useLimit