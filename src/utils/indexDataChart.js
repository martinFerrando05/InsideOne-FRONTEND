export function indexDataChart(items) {
    const length = items?.length;

    const counts = {
        Alto: 0,
        Medio: 0,
        Bajo: 0,
    };

    items?.forEach((el) => {
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
