import { dateFormater } from "./dateFormater";

export function interactionsDataChart(items) {
    const currentDate = new Date(); 
    const weekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1); 
    const weekEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 5); 
    const formatedWeekendDate = dateFormater(weekEndDate)
    const formatedStartDate = dateFormater(weekStartDate)


    const interactionsThisWeek = items?.filter((interaction) => {
      const interactionDate = interaction?.dateFormated
      return interactionDate >= formatedStartDate && interactionDate < formatedWeekendDate;
    });
  
    const interactionsByDay = {};
  
    interactionsThisWeek?.forEach((interaction) => {
      const interactionDate = new Date(interaction?.date);
      const dayKey = interactionDate.toLocaleDateString();
  
      if (interactionsByDay[dayKey]) {
        interactionsByDay[dayKey]++;
      } else {
        interactionsByDay[dayKey] = 1;
      }
    });
   
    const labels = Object.keys(interactionsByDay);
    const data = Object.values(interactionsByDay); 

    const fechasOrdenadas = labels.sort((a, b) => {
        const fechaA = new Date(
          a.split('/').reverse().join('-') 
        );
        const fechaB = new Date(
          b.split('/').reverse().join('-') 
        );
        return fechaA - fechaB; 
      });

    const chartData = {
        labels: [...fechasOrdenadas],
        datasets: [
          {
            label: "Interacciones semanales",
            data: data,
            backgroundColor: ["rgba(108, 190, 191, 0.7)", "rgba(248, 206, 107, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgba(108, 190, 191, 1)", "rgba(248, 206, 107, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1
          }
        ]
    };
  
    return chartData;
  }