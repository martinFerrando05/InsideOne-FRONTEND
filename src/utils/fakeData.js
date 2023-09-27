//firestore
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const dataResponses = [
  {
    fecha: "19/09/2023 19:05:04",
    numero: "1140405555",
    dni: "23899244",
    agente: "Ana Noelia Martinez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Alto",
      rating: "90",
      emotions: "Felicidad, Alegria",
      keywords: "Hoy, Feliz",
      summary: "La persona se encuentra feliz.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
  },
  {
    fecha: "20/09/2023 14:30:12",
    numero: "1150506666",
    dni: "12345678",
    agente: "Juan Perez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Siniestros",
    datos: {
      indice: "Medio",
      rating: "40",
      emotions: "Sorpresa",
      keywords: "Hoy",
      summary:
        "El usuario está anticipando que el día de hoy será inusual o extraño.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
  },
  {
    fecha: "21/09/2023 10:20:30",
    numero: "1160607777",
    dni: "98765432",
    agente: "Ana Noelia Martinez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Alto",
      rating: "100",
      emotions: "Amor",
      keywords: "Amo, Yani",
      summary: "El usuario expresa su amor por Yani.",
      question: "amo a yani ",
    },
  },
  {
    fecha: "22/09/2023 08:45:22",
    numero: "1170708888",
    dni: "54321098",
    agente: "Luis Garcia",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Siniestros",
    datos: {
      indice: "Bajo",
      rating: "10",
      emotions: "Tristeza",
      keywords: "Triste, Siento",
      summary: "La persona se siente muy triste.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "23/09/2023 16:12:50",
    numero: "1180809999",
    dni: "87654321",
    agente: "Luis Garcia",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Medio",
      rating: "50",
      emotions: "Indiferencia",
      keywords: "Normal",
      summary:
        "El usuario se siente en un estado neutral o sin emociones destacadas.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "24/09/2023 11:08:17",
    numero: "1190910111",
    dni: "11122333",
    agente: "María Rodriguez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Siniestros",
    datos: {
      indice: "Bajo",
      rating: "20",
      emotions: "Tristeza, Decepción",
      keywords: "Película, Spiderman, Decepción, Artistas, Música, Desastrosa",
      summary:
        "El usuario expresa su descontento y decepción con la película de Spiderman debido a la actuación de los artistas y la música.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "25/09/2023 09:27:05",
    numero: "1201011121",
    dni: "44455566",
    agente: "Luis Garcia",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Bajo",
      rating: "30",
      emotions: "Tristeza, Preocupación, Indiferencia",
      keywords: "Tristeza, Preocupación, Indiferencia.",
      summary:
        "El usuario se siente triste y preocupado, pero también muestra cierta indiferencia hacia la situación.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "26/09/2023 13:40:33",
    numero: "1211112133",
    dni: "77788899",
    agente: "David Gonzalez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Siniestros",
    datos: {
      indice: "Bajo",
      rating: "10",
      emotions: "Tristeza",
      keywords: "Tristeza, Preocupación.",
      summary: "El usuario se siente mal, pero no se especifica la razón.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "27/09/2023 20:15:42",
    numero: "1221213144",
    dni: "12131415",
    agente: "Luis Garcia",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Bajo",
      rating: "10",
      emotions: "Tristeza",
      keywords: "Tristeza, Preocupación.",
      summary: "El usuario se siente mal, pero no se especifica la razón.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "28/09/2023 18:10:19",
    numero: "1231314155",
    dni: "16171819",
    agente: "Laura Fernandez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Siniestros",
    datos: {
      indice: "Alto",
      rating: "80",
      emotions: "Felicidad",
      keywords: "Mañana, Dia, Buenisimo.",
      summary: "El usuario expresa felicidad",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
  {
    fecha: "29/09/2023 14:55:27",
    numero: "1241415166",
    dni: "20212223",
    agente: "Ana Noelia Martinez",
    canal: "Audio",
    encuesta: "Encuesta Telefonica",
    campaña: "Postventa",
    datos: {
      indice: "Alto",
      rating: "80",
      emotions: "Felicidad, Hambre",
      keywords: "hoy, bien, hambre",
      summary: "El usuario se siente bien pero tiene hambre.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
    },
  },
];

/* 
const queryRef = collection(db, 'respuestas-reportes');
export default dataResponses.forEach((doc)=>{
  return addDoc(queryRef, { ...doc });
}) */

export const conversacion = [
  "Cliente: Buenas tardes. Estoy buscando información sobre los diferentes tipos de seguros que ofrecen para hogar y automóvil.",
  "Agente: Buenas tardes. Claro, estaré encantado de ayudarte con eso. Para empezar, ¿podrías decirme cuál es la cobertura que tienes en mente para tu hogar y tu vehículo?",
  "Cliente: Para mi hogar, estoy interesado en una cobertura que incluya daños por incendio, robo y posibles daños naturales. En cuanto al automóvil, necesito una cobertura completa que incluya daños por accidentes y robo.",
  "Agente: Entendido. Tenemos una variedad de opciones de cobertura para ambos casos. Para tu hogar, te podemos ofrecer una póliza que incluye cobertura contra incendios, robos y daños por fenómenos naturales como inundaciones o terremotos. ¿Te gustaría saber más sobre los detalles de esta cobertura?",
  "Cliente: Sí, por favor. ¿Podrías explicarme más sobre los límites de la cobertura y los costos asociados?",
  "Agente: Claro. La cobertura para daños por incendio incluye la reparación o reconstrucción de tu hogar en caso de que sufra daños por un incendio. La cobertura contra robo cubre la pérdida o daño de tus pertenencias debido a un robo. Y la cobertura por daños naturales incluye los daños causados por desastres naturales. Los costos y límites de la cobertura pueden variar según el valor de tu hogar y tus necesidades específicas. Podemos personalizar la póliza según lo que mejor se adapte a ti.",
  "Cliente: Excelente. En cuanto al seguro para mi automóvil, ¿qué tipo de cobertura ofrecen para daños por accidentes y robo?",
  "Agente: Para la cobertura de daños por accidentes, ofrecemos una cobertura completa que incluye el costo de reparación o reemplazo de tu vehículo en caso de accidentes, ya sea por colisión o vuelco. También cubrimos gastos médicos y responsabilidad civil. Respecto al robo, nuestra cobertura garantiza la compensación por la pérdida de tu vehículo en caso de robo. Los costos y deducibles pueden variar según el modelo y valor del automóvil. ¿Te gustaría recibir una cotización personalizada?",
  "Cliente: Sí, por favor. ¿Podrías proporcionarme una cotización aproximada para ambas pólizas?",
  "Agente: Por supuesto. Para tu hogar, la cotización aproximada sería de $800 al año, dependiendo de los detalles y la ubicación de tu vivienda. Para el seguro de tu automóvil, la cotización sería de aproximadamente $1200 al año, considerando el modelo y tu historial de manejo. Estas son estimaciones y pueden variar según factores específicos. ¿Te gustaría proceder con alguna de estas pólizas o necesitas más detalles?",
];