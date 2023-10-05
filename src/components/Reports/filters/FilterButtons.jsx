import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setCurrentPage,
} from "../../../store/slice/firestore/firestoreSlice";

//styles
import "./scss/filterButtons.scss";
//utils

const FilterButtons = ({
  filters,
  setFilters,
  filtersInitialValues,
  setShowFilter,
}) => {
  const dataFirestore = useSelector((store) => store.firestoreReducer);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const handleFilter = () => {
    const validations = {
      hasRating: filters.rating !== filtersInitialValues.rating,
      hasIndexSatisfaction:
        filters.indexSatisfaction !== filtersInitialValues.indexSatisfaction,
      hasEmotions: filters.emotion.length >= 1 ? true : false,

      hasPhoneNumber: filters.phoneNumber !== filtersInitialValues.phoneNumber,
      hasDni: filters.dni !== filtersInitialValues.dni,
      hasAgent: filters.agent !== filtersInitialValues.agent,
    };
    const filterDateStart = filters.date.start && new Date(filters.date.start);
    const filterDateEnd = filters.date.end && new Date(filters.date.end);

    const dataFiltered = data.filter((obj, i, array) => {
      const date = new Date(obj.date);
      const dni = obj.client.dni;
      const phoneNumber = obj.client.phone_number;
      const emotions = obj.client.emotions;
      const rating = obj.client.rating;
      const satisfactionIndex = obj.client.satisfaction_index;
      const agent = obj.agent
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filterForRating =
        rating >= filters.rating.min && rating <= filters.rating.max;

      const conditions = [filterForRating];

      if (filterDateStart) {
        // Crear nuevas fechas solo con el año, mes y día de la fecha original
        const dateYearMonthDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const filterDateStartYearMonthDay = new Date(
          filterDateStart.getFullYear(),
          filterDateStart.getMonth(),
          filterDateStart.getDate()
        );
        const filterDateEndYearMonthDay =
          filters.date.end &&
          new Date(
            filterDateEnd.getFullYear(),
            filterDateEnd.getMonth(),
            filterDateEnd.getDate()
          );

        // Compara solo el año, mes y día de las fechas

        console.log(dateYearMonthDay == filterDateStartYearMonthDay);
        conditions.push(
          filterDateEnd
            ? dateYearMonthDay >= filterDateStartYearMonthDay &&
                dateYearMonthDay <= filterDateEndYearMonthDay
            : dateYearMonthDay >= filterDateStartYearMonthDay &&
                dateYearMonthDay <= filterDateStartYearMonthDay
        );
      }

      if (validations.hasEmotions) {
        const filterEmotionsArray = filters.emotion;
        const validateEmotions = [];
        for (const emotion of emotions) {
          let emotionWithOutComma = emotion.replace(/,/g, "");

          validateEmotions.push(
            filterEmotionsArray.includes(emotionWithOutComma)
          );
        }
        const hasSomeEmotion = validateEmotions.some(
          (bolean) => bolean === true
        );

        conditions.push(hasSomeEmotion);
      }

      if (validations.hasIndexSatisfaction) {
        const filterIndexSatisfaction = filters.indexSatisfaction;
        conditions.push(filterIndexSatisfaction === satisfactionIndex);
      }

      if (validations.hasPhoneNumber) {
        const numberWithOutPlusSign = phoneNumber.replace(/\+/g, "");
        const filterPhoneNumber = filters.phoneNumber;
        const phoneNumberStartWith = numberWithOutPlusSign.startsWith(filterPhoneNumber);
        conditions.push(
          numberWithOutPlusSign.indexOf(filterPhoneNumber) !== -1 && phoneNumberStartWith
        );
      }

      if (validations.hasDni) {
        const filterDni = filters.dni;
        const dniStartWith = dni.startsWith(filterDni);
        conditions.push(dni.indexOf(filterDni) !== -1 && dniStartWith);
      }

      if (validations.hasAgent) {
        const filterAgent = filters.agent.toLowerCase();

        conditions.push(agent.indexOf(filterAgent) !== -1);
      }

      return conditions.every((boolean) => boolean === true);
    });

    if (dataFirestore.data.length === dataFiltered.length) {
      dispatch(setFilter(null));
      setShowFilter(false);
    } else {
      dispatch(setFilter(dataFiltered));
      setShowFilter(false);
    }
  };
  const handleCleanFilter = () => {
    setFilters({ ...filtersInitialValues, emotion: [] });
    setShowFilter(false);
    dispatch(setFilter(null));
  };

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
  }, [dataFirestore.data]);
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
