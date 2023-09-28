  const addZeros = (value) => {
    return value < 10 ? `0${value}` : value;
  };

export function dateFormater (date , bolean = true){
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Formatear los componentes de la fecha y hora
  if(bolean){
  const completeDateFormated = `${addZeros(day)}/${addZeros(month)}/${addZeros(year)} ${addZeros(hour)}:${addZeros(minutes)}:${addZeros(seconds)}`;
  
  return completeDateFormated
}else{
  return `${addZeros(day)}/${addZeros(month)}/${year}`
}

}