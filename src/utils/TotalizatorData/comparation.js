export const comparationIndexes = (first, second, third) => {
  if(first > second && first > third) return "Bajo"
  if (second > first && second > third) return "Medio"
  if(third > first && third > second) return "Alto"
  if(first === second && second === third && third === first || third === first && second === first && second === third) return "Todos los indices tienen igual valor"
  if(first === second) return "Indices Bajos y Medios Iguales"
  if(second === third) return "Indices Medios y Altos Iguales"
  if(third === first) return "Indices Bajos y Altos Iguales"
}