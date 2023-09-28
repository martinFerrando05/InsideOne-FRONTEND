//redux
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../store/slice/filtersSlice/filtersSlice';
//styles
import './scss/filterButtons.scss'
//Firestore
import { collection,  getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
//utils
import { dateFormater } from '../../../utils/dateFormater';

const FilterButtons = ({ filters, setFilters, filtersInitialValues }) => {
  const dispatch = useDispatch()
  const handleFilter =()=>{    

    let queryRef ;
    const hasRating = filters.rating !== filtersInitialValues.rating;
    const hasIndexSatisfaction = filters.indexSatisfaction !== filtersInitialValues.indexSatisfaction;
    const hasEmotions = filters.emotion !== filtersInitialValues.emotion;
    const hasInitialDate = filters.date.start !== filtersInitialValues.date.start;
    const hasFinalDate = filters.date.end !== filtersInitialValues.date.end;
    let queryConditions = [];
  
    if(hasInitialDate){
      console.log(dateFormater(filters.date.start))

      queryConditions.push(where('date', '>=', dateFormater(filters.date.start)) , 
      where('date', '<=', dateFormater(filters.date.end))
      );
    }
    if (hasRating) {
      queryConditions.push(where('client.rating', '==', filters.rating));
    }

    if (hasIndexSatisfaction) {

      queryConditions.push(where('client.satisfaction_index', '==', filters.indexSatisfaction));
    }

    if (hasEmotions) {
      queryConditions.push(where('client.emotions', '==', filters.emotion));
    }

    if (queryConditions.length > 0) {
        queryRef = query(
        collection(db, "respuestas-reportes"),
        ...queryConditions 
      )}
      else{
        queryRef = collection(db, "respuestas-reportes");
      }

    getDocs(queryRef)
      .then((res) => {
        const data = res.docs;
        const docs = data.map((doc) => {
          return {
            ...doc.data()
          };
        });
        queryConditions = []

        console.log(docs);
      
      })
      .catch((error) => {
        console.error('Error al obtener los documentos:', error);
      });

    // dispatch(setFilter(filters))
    }

  //clear
  const handleCleanFilter = () => {
      setFilters(filtersInitialValues);
  };

  return (
      <div className="filterButtons__main">
          <button onClick={handleFilter} className="filterButtons__buttons">
              Filtrar
          </button>
          <button onClick={handleCleanFilter} className="filterButtons__buttons clear">
              Limpiar
          </button>
      </div>
  );
};


export default FilterButtons;