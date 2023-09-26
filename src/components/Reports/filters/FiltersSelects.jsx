//styles
import "./scss/filtersSelects.scss";
//data
const emotionsArr = [
  "Felicidad",
  "Tristeza",
  "Enojo",
  "Miedo",
  "Sorpresa",
  "Amor",
  "Alegría",
  "Preocupación",
  "Ansiedad",
  "Desesperación",
  "Culpa",
  "Vergüenza",
  "Aburrimiento",
  "Confusión",
  "Gratitud",
  "Entusiasmo",
  "Indiferencia",
  "Aprecio",
  "Empatía",
  "Orgullo",
  "Inseguridad",
  "Alivio",
  "Hostilidad",
  "Esperanza",
  "Asombro",
  "Incredulidad",
  "Irritación",
  "Soledad",
  "Confianza",
  "Inquietud",
];
const satisfactionIndexArr = ["Alto", "Medio", "Bajo"];
const FiltersSelects = ({ filters, setFilters }) => {
  //satisfactionIndex
  const handleSatisfactionIndex = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, indexSatisfaction: value });
  };
  //emotions
  const handleSelectEmotionChange = (event) => {
    const value = event === "Emociones" ? "Emociones" : event.target.value;
    setFilters({ ...filters, emotion: value });
  };

  return (
    <div className="filterSelect__main">
      <select
        className="filterSelect__select index-select"
        name="satisfaction-index"
        value={filters.indexSatisfaction}
        onChange={handleSatisfactionIndex}
      >
        <option value="">Índice de satisfacción</option>
        {satisfactionIndexArr.map((indexSatisfaction, i) => (
          <option value={indexSatisfaction.toLowerCase()} key={i}>
            {indexSatisfaction}
          </option>
        ))}
      </select>

      <select
        className="filterSelect__select emotion-select"
        name="select-emotion"
        value={filters.emotion}
        onChange={handleSelectEmotionChange}
      >
        <option value="emociones">Emociones</option>
        {emotionsArr.map((emotion, i) => (
          <option key={i} value={emotion.toLowerCase()}>
            {emotion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltersSelects;
