//redux
import { useDispatch } from "react-redux";
import { setData } from "../../../store/slice/firestore/firestoreSlice";
//styles
import "./scss/filterButtons.scss";
//Firestore
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
//utils
import { dateFormater } from "../../../utils/dateFormater";

const FilterButtons = ({ filters, setFilters, filtersInitialValues }) => {
  const dispatch = useDispatch();
  const handleFilter = () => {
    let queryRef;
    const validations = {
      hasRating: filters.rating !== filtersInitialValues.rating,
      hasIndexSatisfaction:
        filters.indexSatisfaction !== filtersInitialValues.indexSatisfaction,
      hasEmotions: filters.emotion !== filtersInitialValues.emotion,
      hasInitialDate: filters.date.start !== filtersInitialValues.date.start,
      hasFinalDate: filters.date.end !== filtersInitialValues.date.end,
      hasPhoneNumber: filters.phoneNumber !== filtersInitialValues.phoneNumber,
      hasDni: filters.dni !== filtersInitialValues.dni,
      hasAgent: filters.agent !== filtersInitialValues.agent,
    };
    let queryConditions = [];

    if (validations.hasPhoneNumber) {
      queryConditions.push(
        where("client.phone_number", "==", filters.phoneNumber)
      );
    }
    if (validations.hasDni) {
      console.log(filters.dni);
      queryConditions.push(where("client.dni", "==", parseInt(filters.dni)));
    }
    if (validations.hasAgent) {
      queryConditions.push(where("agent", "==", filters.agent));
    }
    if (validations.hasRating) {
      queryConditions.push(
        where(
          "client.rating",
          "==",
          parseInt(filters.rating),
          where("client.rating", "<", parseInt(filters.rating) + 10)
        )
      );
    }

    if (validations.hasInitialDate) {
      queryConditions.push(
        where("date", ">=", filters.date.start),
        where("date", "<=", filters.date.end)
      );
    }
    if (validations.hasRating) {
      queryConditions.push(
        where(
          "client.rating",
          ">=",
          parseInt(filters.rating),
          where("client.rating", "<", parseInt(filters.rating) + 10)
        )
      );
    }
    if (validations.hasIndexSatisfaction) {
      queryConditions.push(
        where("client.satisfaction_index", "==", filters.indexSatisfaction)
      );
    }
    if (validations.hasEmotions) {
      queryConditions.push(
        where("client.emotions", "array-contains-any", [filters.emotion])
      );
    }
    if (queryConditions.length > 0) {
      queryRef = query(
        collection(db, "respuestas-reportes"),
        ...queryConditions
      );
    } else {
      queryRef = collection(db, "respuestas-reportes");
    }

    getDocs(queryRef)
      .then((res) => {
        const data = res.docs;
        const docs = data.map((doc) => {
          const timestamp = doc.data().date;
          const date = new Date(
            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
          ).toString();

          return {
            ...doc.data(),
            id: doc.id,
            date,
            dateFormated: dateFormater(new Date(date)),
          };
        });
        queryConditions = [];
        dispatch(setData(docs));
      })
      .catch((error) => {
        console.error("Error al obtener los documentos:", error);
      });
  };

  const handleCleanFilter = () => {
    setFilters({...filtersInitialValues , emotion: []});
  };

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
