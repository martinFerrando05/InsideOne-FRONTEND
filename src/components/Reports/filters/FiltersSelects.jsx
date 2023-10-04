import { useState } from "react";
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
//icons
import arrowDown from "../../../assets/icons/chevron-down.svg";

const satisfactionIndexArr = ["Alto", "Medio", "Bajo"];
const FiltersSelects = ({ filters, setFilters , setShowEmotions , showEmotions }) => {


  //satisfactionIndex
  const handleSatisfactionIndex = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, indexSatisfaction: value });
  };
  //emotions
  const handleAddEmotion = (event, emotion) => {
    event.stopPropagation();
    const includesEmotion = filters.emotion.includes(emotion);

    if (!includesEmotion) {
      const newArrayOfEmotions = filters.emotion;
      newArrayOfEmotions.push(emotion);

      setFilters({ ...filters, emotion: newArrayOfEmotions });
    }else{
      const newEmotionsList = filters.emotion.filter(
        (e) => e !== emotion
      );
  
      setFilters({ ...filters, emotion: newEmotionsList });
    }

    return;
  };

  return (
    <div className="filterSelect__main">
      <select
        className="filterSelect__select index-select"
        name="satisfaction-index"
        value={filters.indexSatisfaction}
        onChange={handleSatisfactionIndex}
      >
        <option value="index">Índice de satisfacción</option>
        {satisfactionIndexArr.map((indexSatisfaction, i) => (
          <option value={indexSatisfaction} key={i}>
            {indexSatisfaction}
          </option>
        ))}
      </select>

      <div
        onClick={(e) =>{
            e.stopPropagation()
           setShowEmotions(!showEmotions)
          }}
        className="filterSelect__cont_emotions"
      >
        <p>Emociones</p>
        <figure>
          <img src={arrowDown} />
        </figure>
        <ul
          style={showEmotions ? { display: "block" } : { display: "none" }}
          className="filterSelect__select emotion_select_ul"
          name="select-emotion"
        >
          {emotionsArr.map((emotion, i) => {
            const includesEmotion = filters.emotion.includes(emotion);

            return (
              <li
                onClick={(event) => handleAddEmotion(event, emotion)}
                className={
                  !includesEmotion
                    ? "emotion_select_ul_li"
                    : "emotion_select_ul_li emotion_select_ul_li_active"
                }
                key={i}
                value={emotion}
              >
                <p>{emotion}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FiltersSelects;
