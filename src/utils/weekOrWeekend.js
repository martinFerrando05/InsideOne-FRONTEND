import { dateFormater } from "./dateFormater";

export const setWeekStartAndEndDates = () => {
  const currentDate = new Date();
  let weekStartDate;
  let weekEndDate;

  if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
    weekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - 6
    );
    weekEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - 1
    );
  } else {
    weekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 1
    );
    weekEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 6
    );
  }

  const formatedWeekendDate = dateFormater(weekEndDate);
  const formatedStartDate = dateFormater(weekStartDate);

  return { formatedStartDate, formatedWeekendDate };
};
