export function indexDataChart(items) {

  const length = items?.length;
  
  const counts = {
        Alto: 0,
        Medio: 0,
        Bajo: 0,
    };

    items?.forEach((el) => {
        if (el.client?.satisfaction_index in counts) {
            counts[el.client?.satisfaction_index]++
        }
    })
    
    const percentages = {
        Alto: (counts.Alto / length) * 100,
        Medio: (counts.Medio / length) * 100,
        Bajo: (counts.Bajo / length) * 100,
    }

    const data = {
        labels: ['Alto', 'Medio', 'Bajo'],
        datasets: [
            {
                data: [percentages.Alto, percentages.Medio, percentages.Bajo],
                backgroundColor: ['rgba(108,190,191,255)', 'rgba(248,206,107,255)', 'rgba(237,110,133,255)'],
            },
        ],
    };

    return data
}