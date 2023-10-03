export function indexDataChart(items, date) {
    let filteredItems = items
    const length = filteredItems?.length;

    if (items && date) {
        const specificDate = new Date(date)

        filteredItems = items?.filter((el) => {
            const itemDate = new Date(el.date)
            
            return itemDate.getFullYear() === specificDate.getFullYear() && itemDate.getMonth() === specificDate.getMonth() && 
            itemDate.getDate() === specificDate.getDate()
        })
    }

    const counts = {
        Alto: 0,
        Medio: 0,
        Bajo: 0,
    };

    filteredItems?.forEach((el) => {
        if (el.client?.satisfaction_index in counts) {
            counts[el.client?.satisfaction_index]++;
        }
    });

    const percentages = {
        Alto: (counts.Alto / length) * 100,
        Medio: (counts.Medio / length) * 100,
        Bajo: (counts.Bajo / length) * 100,
    };

    const data = {
        labels: ['0% - 39%', '40% - 69%', '70% - 100%'],
        datasets: [
            {
                data: [percentages.Bajo, percentages.Medio, percentages.Alto],
                backgroundColor: ['rgba(237,110,133,255)', 'rgba(248,206,107,255)', 'rgba(108,190,191,255)'],
            },
        ],
    };

    return data;
}
