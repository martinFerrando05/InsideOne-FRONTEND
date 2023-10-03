  import { dateFormater } from "./dateFormater";

export function interactionsDataChart(items) {
    const currentDate = new Date(); 
    let weekStartDate;
    let weekEndDate;

    if(currentDate.getDay() == 0 || currentDate.getDay() == 6){
      weekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 6); 
      weekEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 1);
    }else{
      weekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
      weekEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
    }

    const formatedWeekendDate = dateFormater(weekEndDate)
    const formatedStartDate = dateFormater(weekStartDate)
    
    const interactionsThisWeek = items?.filter((interaction) => {
      const interactionDate = interaction?.dateFormated 
      return interactionDate >= formatedStartDate && interactionDate < formatedWeekendDate;
    });

    const interactionsByDay = {};
    
    interactionsThisWeek?.forEach((interaction) => {
      const interactionDate = new Date(interaction?.date);
      const dayKey = interactionDate.toLocaleDateString('es-ES');
      
      if (interactionsByDay[dayKey]) {
        interactionsByDay[dayKey]++;
      } else {
        interactionsByDay[dayKey] = 1;
      }
    });

    // [["20/09/2023", 2], ["21/09/2023", 45]]
    const datesAndInteractions = Object.entries(interactionsByDay).sort((a, b) => {
      const fechaA = new Date(
        a[0].split('/').reverse().join('-') 
      );
      const fechaB = new Date(
        b[0].split('/').reverse().join('-') 
      );
      return fechaA - fechaB; 
    });

    let labels = [];
    let data = []; 

    datesAndInteractions.forEach(([date, interactions])=>{
      labels.push(date)
      data.push(interactions)
    })

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Interacciónes semanales',
                data,
                backgroundColor: ['#ffb34a'],
            },
        ],
    };

    return chartData;
}

