const { onRequest } = require("firebase-functions/v2/https");
const { arrEmotions } = require("./data");
const OpenAI = require("openai");
const dotenv = require("dotenv")
dotenv.config()

const apiKey = process.env.APIKEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

exports.getEmotionsAnalysis = onRequest({ cors: true }, (req, res) => {
  const { text } = req.body;
  openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente de la empresa Galicia Seguros, el cual analiza mensajes que recibe de los usuarios y descubre, en base a éstos, las emociones que están sintiendo. A su vez, brindas una breve reseña del por qué dichos usuarios se sienten de tal manera. Te voy a pasar un mensaje, y necesito que en castellano, me devuelvas: Emotions:(Detectá en el mensaje algunos de estos sentimientos " +
            arrEmotions.map((word) => word + ", ") +
            ". Donde tu respuesta sea tan especifica que unicamente quiero ver los sentimientos que encontraste separados por comas). Summary: (un breve resumen de la situacion). Rating: (un indice de satisfaccion de la persona entre 1 y 100 donde 1 son emociones negativas y 100 son emociones positivas, en tu respuesta me devuelves solo el número, y siempre necesito un valor)",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 200,
    })
    .then((completion) => {
      let timestamp = completion.created; // El horario viene en formato UNIX
      let date = new Date(timestamp * 1000); // Multiplicamos por 1000 para convertir segundos en milisegundos
      const message = completion.choices[0].message.content;
      const messageArr = message.split("\n");

      let obj = { fecha: date };
      messageArr.forEach((ele) => {
        const clave = ele.split(":")[0].trim().toLowerCase();
        const value = ele.split(":")[1].trim();
        obj[clave] = value;
      });
      res.send(obj);
    })
    .catch((err) => console.error(err));
});
