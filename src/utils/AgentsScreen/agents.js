export const specificAgentData = (items) => {
  let agents_stats = {};
  let agents = {};
  const arr = []

  items?.map((el) => {
    if (!agents[el.agent]) agents[el.agent] = [];
    agents[el.agent].push(el);
  });

  for (const name in agents) {
    let suma = 0;
    let valuesRating = agents[name]?.map((el) => el.client.rating);
    valuesRating.forEach((rating) => (suma += rating));
    let largo = agents[name].length;

    agents_stats[name] = { agentName: name}
    agents_stats[name] = { ...agents_stats[name], promediumTotalRating: Math.ceil(suma / largo) };
    agents_stats[name] = {...agents_stats[name], totalInteractions: largo};
    agents_stats[name].promediumTotalRating < 40
      ? (agents_stats[name] = {
          ...agents_stats[name],
          satisfactionPromediumIndex: "Bajo",
        })
      : agents_stats[name].promediumTotalRating >= 40 &&
        agents_stats[name].promediumTotalRating < 70
      ? (agents_stats[name] = {
          ...agents_stats[name],
          satisfactionPromediumIndex: "Medio",
        })
      : (agents_stats[name] = {
          ...agents_stats[name],
          satisfactionPromediumIndex: "Alto",
        });

      arr.push(agents_stats[name])
  }

  return arr;
};
