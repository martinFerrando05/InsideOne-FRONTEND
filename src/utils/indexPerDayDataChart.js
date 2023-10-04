import { dateFormater } from "./dateFormater";

export function indexPerDayDataChart(items) {
  const currentDate = new Date();
    let weekStartDate;
    let weekEndDate;

    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
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

    const formatedWeekEndDate = dateFormater(weekEndDate);
    const formatedStartDate = dateFormater(weekStartDate);

    const interactionsThisWeek = items?.filter((interaction) => {
      const interactionDate = interaction?.dateFormated;
      return interactionDate >= formatedStartDate && interactionDate <= formatedWeekEndDate;
  });

  const averageRatingByDay = {};

  interactionsThisWeek?.forEach((interaction) => {
      const interactionDate = new Date(interaction?.date);
      const dayKey = interactionDate.toLocaleDateString('es-ES');

      if (averageRatingByDay[dayKey]) {
          averageRatingByDay[dayKey].totalRating += (interaction.client?.rating || 0);
          averageRatingByDay[dayKey].totalInteractions++;
      } else {
          averageRatingByDay[dayKey] = {
              totalRating: (interaction.client?.rating || 0),
              totalInteractions: 1
          };
      }
  });


  Object.keys(averageRatingByDay).forEach((day) => {
      averageRatingByDay[day].averageRating = (
          averageRatingByDay[day].totalRating / averageRatingByDay[day].totalInteractions
      );
  });

  const labels = [];
  const data = [];

  Object.entries(averageRatingByDay).forEach(([date, ratingData]) => {
      labels.push(date);
      data.push(ratingData.averageRating.toFixed());
  });

  const chartData = {
      labels,
      datasets: [
          {
            label: 'Promedio de rating por día (%)',
            data,
            backgroundColor: data.map(value => value > 50 ? 'rgba(108,190,191,255)' : value > 0 < 40 ? 'rgba(248,206,107,255)' : 'rgba(237,110,133,255)')
          },
      ],
  };

  return chartData;
}