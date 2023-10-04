import { useEffect, useState } from "react";
//redux
import { useDispatch , useSelector } from "react-redux";
import { setData } from "../../../store/slice/firestore/firestoreSlice";
//styles
import "./scss/filterButtons.scss";
//utils
import { dateFormater } from "../../../utils/dateFormater";

const FilterButtons = ({ filters, setFilters, filtersInitialValues }) => {
  const dataFirestore = useSelector(store=> store.firestoreReducer)
  const [data , setData] = useState(null)
  
  const handleFilter = () => {
    const validations = {
      hasRating: filters.rating !== filtersInitialValues.rating,
      hasIndexSatisfaction:
        filters.indexSatisfaction !== filtersInitialValues.indexSatisfaction,
      hasEmotions:  filters.emotion.length >= 1 ? true : false ,
      hasInitialDate: filters.date.start !== filtersInitialValues.date.start,
      hasFinalDate: filters.date.end !== filtersInitialValues.date.end,
      hasPhoneNumber: filters.phoneNumber !== filtersInitialValues.phoneNumber,
      hasDni: filters.dni !== filtersInitialValues.dni,
      hasAgent: filters.agent !== filtersInitialValues.agent,
    };

    const dataFiltered= data.filter((obj , i , array)=>{
      const date =  new Date(obj.date)
      const dni = obj.client.dni
      const phoneNumber = obj.client.phone_number
      const emotions = obj.client.emotions
      const rating = obj.client.rating
      const satisfactionIndex = obj.client.satisfaction_index
      const agent = obj.agent
      const filterForRating = rating >= filters.rating.min && rating <= filters.rating.max

      const conditions = [filterForRating]

      if(validations.hasInitialDate){
        const filterDateStart = new Date(filters.date.start) 
        const filterDateEnd = new Date(filters.date.end)
        conditions.push(date >= filterDateStart && date <= filterDateEnd)
      }

       if(validations.hasEmotions){
        const filterEmotionsArray = filters.emotion
        const validateEmotions = []
        for (const emotion of emotions) {
          let emotionWithOutComma = emotion.replace(/,/g, '');

          validateEmotions.push(filterEmotionsArray.includes(emotionWithOutComma))
        }
        const hasSomeEmotion = validateEmotions.some(bolean => bolean === true)

        conditions.push(hasSomeEmotion)
      }

      if(validations.hasIndexSatisfaction){
        const filterIndexSatisfaction = filters.indexSatisfaction
        conditions.push(filterIndexSatisfaction === satisfactionIndex)
      }

      if(validations.hasPhoneNumber){
        const numberWithOutPlusSign = phoneNumber.replace(/\+/g, '');
        const filterPhoneNumber = filters.phoneNumber

        conditions.push(numberWithOutPlusSign.indexOf(filterPhoneNumber) !== -1)
      }

      if(validations.hasDni){
        const filterDni = filters.dni
        
        conditions.push(dni.indexOf(filterDni) !== -1)
      }

      if(validations.hasAgent){
        const filterAgent = filters.agent.toLowerCase()
        conditions.push(agent.indexOf(filterAgent) !== -1)
      }

     

      return  conditions.every(boolean=> boolean === true)
    })
    console.log(dataFiltered)
  }

  const handleCleanFilter = () => {
    setFilters({...filtersInitialValues , emotion: []});
  };


  useEffect(()=>{
     setData(JSON.parse(localStorage.getItem('data')))

  },[dataFirestore.data])
  return (
    <div className="filterButtons__main">
      <button onClick={handleFilter} className="filterButtons__buttons">
        Filtrar
      </button>
      <button
        onClick={handleCleanFilter}
        className="filterButtons__buttons clear"
      >
        Limpiar
      </button>
    </div>
  );
};

export default FilterButtons;
