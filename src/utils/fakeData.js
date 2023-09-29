//firestore
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const dataResponses = [
  {
    date: "19/09/2023 19:05:04",
    agent: "Ana Noelia Martinez",
    channel: "Audio",
    survey: "Encuesta Telefonica",
    campaign: "Postventa",
    client: {
      dni: 23899244,
      phone_number: "1140405555",
      satisfaction_index: "Alto",
      rating: 90,
      emotions: ["Felicidad"],
      keywords: "Hoy, Feliz",
      summary: "La persona se encuentra feliz.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "20/09/2023 14:30:22",
    agent: "Luis Gonzalez",
    channel: "Audio",
    survey: "Encuesta Telefonica",
    campaign: "Atención al Cliente",
    client: {
      dni: 30678901,
      phone_number: "1150505500",
      satisfaction_index: "Alto",
      rating: 95,
      emotions: ["Satisfacción"],
      keywords: "Producto, Servicio",
      summary: "La persona está muy satisfecha con el producto y servicio.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "21/09/2023 16:45:10",
    agent: "Pedro García",
    channel: "Audio",
    survey: "Encuesta Telefonica",
    campaign: "Marketing",
    client: {
      dni: 40987654,
      phone_number: "1166778899",
      satisfaction_index: "Medio",
      rating: 60,
      emotions: ["Neutral"],
      keywords: "Experiencia, Información",
      summary:
        "La persona tiene una experiencia neutral y busca más información.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "18/09/2023 12:15:05",
    agent: "Maria Rodriguez",
    channel: "Audio",
    survey: "Encuesta Telefonica",
    campaign: "Postventa",
    client: {
      dni: 87654321,
      phone_number: "1155443322",
      satisfaction_index: "Bajo",
      rating: 20,
      emotions: ["Frustración"],
      keywords: "Problema, Atención",
      summary:
        "La persona está insatisfecha y ha experimentado problemas con el servicio.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "22/09/2023 09:30:15",
    agent: "Carolina Gomez",
    channel: "Audio",
    survey: "Encuesta Telefonica",
    campaign: "Ventas",
    client: {
      dni: 50123456,
      phone_number: "1122334455",
      satisfaction_index: "Alto",
      rating: 85,
      emotions: ["Felicidad"],
      keywords: "Compra, Satisfacción",
      summary: "La persona está feliz y agradecida por su compra.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "30/09/2023 10:15:35",
    agent: "Carlos Gonzalez",
    channel: "Chat",
    survey: "Encuesta Online",
    campaign: "Soporte Técnico",
    client: {
      dni: 32564879,
      phone_number: "1199887766",
      satisfaction_index: "Alto",
      rating: 90,
      emotions: ["Alegría", "Felicidad", "Comodidad"],
      keywords: "Técnico, Solución",
      summary:
        "La persona está muy satisfecha con la solución proporcionada por el técnico.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "01/10/2023 14:45:20",
    agent: "Laura Martinez",
    channel: "Teléfono",
    survey: "Encuesta Telefónica",
    campaign: "Atención al Cliente",
    client: {
      dni: 43876521,
      phone_number: "1122334455",
      satisfaction_index: "Medio",
      rating: 60,
      emotions: ["Preocupación", "Incomodidad"],
      keywords: "Producto, Ayuda",
      summary: "La persona está preocupada por el funcionamiento del producto.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "02/10/2023 11:30:15",
    agent: "María Rodriguez",
    channel: "Email",
    survey: "Encuesta por Correo",
    campaign: "Satisfacción del Cliente",
    client: {
      dni: 56781234,
      phone_number: "1155998877",
      satisfaction_index: "Alto",
      rating: 95,
      emotions: ["Felicidad"],
      keywords: "Experiencia, Servicio",
      summary:
        "La persona está muy feliz con la experiencia y el servicio brindado.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "03/10/2023 16:20:55",
    agent: "Pablo Gomez",
    channel: "Chat",
    survey: "Encuesta Online",
    campaign: "Soporte Técnico",
    client: {
      dni: 98765432,
      phone_number: "1166554433",
      satisfaction_index: "Bajo",
      rating: 30,
      emotions: ["Frustración"],
      keywords: "Problema, Ayuda",
      summary:
        "La persona está muy frustrada debido a un problema no resuelto.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "04/10/2023 09:55:45",
    agent: "Lucía Fernandez",
    channel: "Teléfono",
    survey: "Encuesta Telefónica",
    campaign: "Atención al Cliente",
    client: {
      dni: 54321678,
      phone_number: "1177889900",
      satisfaction_index: "Bajo",
      rating: 20,
      emotions: ["Descontento", "Preocupacion"],
      keywords: "Atención, Servicio",
      summary:
        "La persona está descontenta con la atención y el servicio recibido.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "05/10/2023 13:10:30",
    agent: "Carlos Sanchez",
    channel: "Email",
    survey: "Encuesta por Correo",
    campaign: "Satisfacción del Cliente",
    client: {
      dni: 87654321,
      phone_number: "1188223344",
      satisfaction_index: "Bajo",
      rating: 35,
      emotions: ["Desesperación", "Incomodidad"],
      keywords: "Problema, Solución",
      summary:
        "La persona está desesperada por una solución a su problema no resuelto.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "06/10/2023 17:45:50",
    agent: "Mariana López",
    channel: "Chat",
    survey: "Encuesta Online",
    campaign: "Soporte Técnico",
    client: {
      dni: 76543210,
      phone_number: "1166778899",
      satisfaction_index: "Medio",
      rating: 45,
      emotions: ["Indiferencia"],
      keywords: "Técnico, Resolución",
      summary:
        "La persona muestra indiferencia hacia la resolución del problema técnico.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "07/10/2023 10:30:40",
    agent: "Julieta Ramirez",
    channel: "Teléfono",
    survey: "Encuesta Telefónica",
    campaign: "Atención al Cliente",
    client: {
      dni: 12457898,
      satisfaction_index: "Medio",
      phone_number: "1199556677",
      rating: 65,
      emotions: ["Confusión", "Preocupacion"],
      keywords: "Información, Claridad",
      summary:
        "La persona está confundida y busca mayor claridad en la información proporcionada.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
  {
    date: "08/10/2023 14:20:55",
    agent: "Federico Ortiz",
    channel: "Email",
    survey: "Encuesta por Correo",
    campaign: "Satisfacción del Cliente",
    client: {
      dni: 33332222,
      phone_number: "1122334455",
      satisfaction_index: "Medio",
      rating: 60,
      emotions: ["Inquietud", "Incomodidad"],
      keywords: "Servicio, Respuesta",
      summary:
        "La persona muestra inquietud ante la demora en la respuesta del servicio.",
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  },
];


/*  const queryRef = collection(db, 'respuestas-reportes');
 export default dataResponses.forEach((doc)=>{
  return addDoc(queryRef, { ...doc });
 })  */

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
