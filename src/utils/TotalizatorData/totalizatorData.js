import { store } from "../../store/store";
import { dateFormater } from "../dateFormater";
import { comparationIndexes } from "./comparation";
const formatedCurrentDate = dateFormater(new Date()).split(" ")[0];

export const todayInteractionsData = () => {
  const allItems = store.getState().firestoreReducer.data;
  const interactionsOfToday = allItems?.filter((item) => {
    return item?.dateFormated.split(" ")[0] == formatedCurrentDate;
  });

  return interactionsOfToday;
};

export const weekInteractionsData = () => {
  const allItems = store.getState().firestoreReducer.data;

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

  const interactionsThisWeek = allItems?.filter((interaction) => {
    const interactionDate = interaction?.dateFormated;
    return (
      interactionDate >= formatedStartDate &&
      interactionDate < formatedWeekendDate
    );
  });

  return interactionsThisWeek;
};

export const predominantSatisfactionIndexWeek = () => {
  const allItems = store.getState().firestoreReducer.data;

  const currentDate = new Date();
  let weekStartDate;
  let weekEndDate;
  
  let lowIndex = 0
  let mediumIndex = 0
  let highIndex = 0

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

  const interactionsThisWeek = allItems?.filter((interaction) => {
    const interactionDate = interaction?.dateFormated;
    return (
      interactionDate >= formatedStartDate &&
      interactionDate < formatedWeekendDate
    );
  });

  interactionsThisWeek?.map((interaction)=>{
    interaction.client.satisfaction_index === "Bajo" ? lowIndex += 1 :interaction.client.satisfaction_index === "Medio" ? mediumIndex += 1 : highIndex += 1
  })

  return comparationIndexes(lowIndex, mediumIndex, highIndex)
};

export const predominantSatisfactionIndexDay = () => {
  const allItems = store.getState().firestoreReducer.data;

  let lowIndex = 0
  let mediumIndex = 0
  let highIndex = 0

  const interactionsOfToday = allItems?.filter((item) => {
    return item?.dateFormated.split(" ")[0] == formatedCurrentDate;
  });

  interactionsOfToday?.map((interaction)=>{
    interaction.client.satisfaction_index === "Bajo" ? lowIndex += 1 :interaction.client.satisfaction_index === "Medio" ? mediumIndex += 1 : highIndex += 1
  })

  return comparationIndexes(lowIndex, mediumIndex, highIndex)
};