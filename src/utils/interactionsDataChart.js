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
            backgroundColor: ["rgb(255, 123, 0)"],
            borderColor: ["rgb(255, 123, 0)"],
            borderWidth: 1
          }
        ]
    };
  
    return chartData;
  }