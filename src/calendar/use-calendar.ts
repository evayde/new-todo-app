import { useState } from "react";

const useCalendar = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  const gotoNextDay = () => {
    currentDay.setDate(currentDay.getDate() + 1);
    setCurrentDay(new Date(currentDay));
  }

  const gotoPreviousDay = () => {
    currentDay.setDate(currentDay.getDate() - 1);
    setCurrentDay(new Date(currentDay));
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  return { currentDay, gotoNextDay, gotoPreviousDay, isSameDay }
}

export default useCalendar;