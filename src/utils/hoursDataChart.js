export function hoursDataChart(items) {
  const length = items?.length;

  const counts = {
    EnHorario: 0,
    FueraDeHorario: 0,
  };

  let hours = items?.map((item) => {
    return item.date.split(" ")[1].slice(0, 2);
  });

  hours?.forEach((el) => {
    if (el >= 10 && el < 19) {
      counts["EnHorario"]++;
    } else {
      counts["FueraDeHorario"]++;
    }
  });

  const percentages = {
    EnHorario: (counts.EnHorario / length) * 100,
    FueraDeHorario: (counts.FueraDeHorario / length) * 100,
  };

  const data = {
    labels: ["En Horario", "Fuera de Horario"],
    datasets: [
      {
        data: [percentages.EnHorario, percentages.FueraDeHorario],
        backgroundColor: ["rgba(108,190,191,255)", "rgba(248,206,107,255)"],
      },
    ],
  };

  return data;
}
