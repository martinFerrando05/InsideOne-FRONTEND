//redux
import { useDispatch } from 'react-redux';
import { setData } from '../../../store/slice/firestore/firestoreSlice'; 
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
      console.log(filters.date.start)

      queryConditions.push(where('date', '>=', filters.date.start) , 
      where('date', '<=', filters.date.end)
      );
    }

    if (hasRating) {
      queryConditions.push(where('client.rating', '==', parseInt(filters.rating) , where('client.rating', '<', parseInt(filters.rating) + 10)));
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
          const timestamp = doc.data().date
              const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toString();
              
                return {
                    ...doc.data(),
                    id: doc.id,  
                    date,
                    dateFormated: dateFormater(new Date(date))
                };
        });
        queryConditions = []
        dispatch(setData(docs))
        console.log(docs);
      })
      .catch((error) => {
        console.error('Error al obtener los documentos:', error);
      });
    }

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