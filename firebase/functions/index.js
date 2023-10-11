const { onRequest } = require("firebase-functions/v2/https");
const { arrEmotions, agents } = require("./data");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const apiKey = process.env.APIKEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

exports.getEmotionsAnalysis = onRequest({ cors: true }, async (req, res) => {
  const { text  } = req.body;

  const singleAnalysis = [
     {
            role: "system",
            content:
              "Eres un asistente de la empresa Galicia Seguros, el cual analiza mensajes que recibe de los usuarios y descubre, en base a éstos, las emociones que están sintiendo. A su vez, brindas una breve reseña del por qué dichos usuarios se sienten de tal manera. Te voy a pasar un mensaje, y necesito que en castellano, me devuelvas: Emotions:(Detectá en el mensaje algunos de estos sentimientos " +
              arrEmotions.map((word) => word + ", ") +
              ". Donde tu respuesta sea tan especifica que unicamente quiero ver los sentimientos que encontraste separados por comas). Summary: (un breve resumen de la situacion). Rating: (un indice de satisfaccion de la persona entre 1 y 100 donde 1 son emociones negativas y 100 son emociones positivas, en tu respuesta me devuelves solo el número, y siempre necesito un valor). Keywords: (listado de palabras clave separadas por coma y con la primera letra en mayúscula. No incluyas palabras como el, la, de, en, y, o, pero, aunque, porque, si, cuando, mientras, después, antes, durante, desde, hasta, entre, por, para, según, como, así, además, incluso, tanto, también, sin embargo, por lo tanto, por otro lado. Si los datos no son suficientes, devolve el campo que no pudiste determinar con null)",
          },
          {
            role: "user",
            content: text ,
          },
  ]

  try {
    const creatingQuery = await openai.chat.completions.create({
      messages: singleAnalysis,
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 200,
    });
    const message = creatingQuery.choices[0].message.content;
    const messageArr = message.split("\n");
    let obj = { client: {} };
    let random = Math.floor(Math.random() * (agents.length -1));

    messageArr.forEach((ele) => {
      const clave = ele.split(":")[0]?.trim().toLowerCase();
      let value = ele.split(":")[1]?.trim();
      if (value === 'null') {
        value = null
      }
      clave === "emotions" || clave === "keywords"
        ? (obj.client[clave] = value ? value.split(", ") : null)
        : clave === "rating"
        ? (obj.client[clave] = value ? parseInt(value) : null)
        : (obj.client[clave] = value);
    });

    console.log(agents[random].agent);
    obj["agent"] = agents[random]?.agent;
    obj["channel"] = "Texto";
    obj.client["dni"] = agents[random]?.dni;
    obj.client["phone_number"] = agents[random]?.phone_number;
    obj.client["satisfaction_index"] =
      obj["client"].rating < 40
        ? "Bajo"
        : obj["client"].rating >= 40 && obj["client"].rating < 70
        ? "Medio"
        : "Alto";

    res.send(obj);
  } catch (error) {
    console.error(error);
  }
});

// — 06/10/2023 9:10
exports.chatAssistantBotGalicia = onRequest({ cors: true }, async (req, res) => {
  const { text: conversation , reset = false } = req.body;

    openai.chat.completions
      .create({
        messages:conversation,
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 100,
      })
      .then((completion) => {
        const message = completion.choices[0].message.content;
        
      res.send( message ) 
      })
      .catch((err) => console.error(err));

});