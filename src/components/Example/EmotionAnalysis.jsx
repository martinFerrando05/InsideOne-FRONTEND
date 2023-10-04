import "./emotionAnalysis.scss";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import axios from "axios";
import {
  GIF_MONO_LOADING,
  GIF_MONO_LOADING_2,
  GIF_MONO_LOADING_ANALIZING,
  GIF_MONO_LOADING_BOCA,
} from "../../assets/loadings/loadings";
import {
  imgLogoGalicia,
  imgLogoInsideOne,
  imgLogoPlataforma5,
} from "../../assets/imgs_logo/imgs";

function EmotionAnalysis() {
  const [state, setSatete] = useState(null);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const botAnalize = await axios.post(
        "http://localhost:5000/prueba-97c35/us-central1/getEmotionsAnalysis",
        { text: input }
      );
      const { data } = botAnalize;
      const queryRef = collection(db, "respuestas-reportes");
      setSatete(data);
      setQuestion(input);
      setLoading(false);
      addDoc(queryRef, {
        ...data,
        question: input,
        date: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="emotionAnalysis__main">
      <h1>Análisis de satisfacción</h1>

      <div className="emotionAnalysis__cont_logo">
        <img
          className="emotionAnalysis__logo"
          src={imgLogoGalicia}
          alt="logo-galicia"
        />
        <h2>+</h2>
        <img
          className="emotionAnalysis__logo"
          src={imgLogoInsideOne}
          alt="logo-inside-one"
        />
      </div>

      <img
        className="emotionAnalysis__logo_p5"
        src={imgLogoPlataforma5}
        alt="logo-p5"
      />

      <div className="emotionAnalysis__cont_text">
        {loading ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <img src={GIF_MONO_LOADING_2} alt="loading" />
            <img src={GIF_MONO_LOADING_ANALIZING} alt="loading" />
            <img src={GIF_MONO_LOADING} alt="loading" />
            <img src={GIF_MONO_LOADING_BOCA} alt="loading" />
          </div>
        ) : !state ? (
          <h3>DEMO</h3>
        ) : (
          <>
            <p>
              <span>Reseña:</span> {question}
            </p>
            <p>
              <span>Resumen:</span> {state?.client.summary}
            </p>
            <p>
              <span>Emociones:</span> {state?.client.emotions}
            </p>
            <p>
              <span>Indice de satisfacción:</span>{" "}
              {state && state?.client.rating + "%"}
            </p>
          </>
        )}
      </div>

      <form className="emotionAnalysis__form" onSubmit={handleSubmit}>
        <textarea
          cols={50}
          rows={10}
          value={input}
          onChange={handleChange}
          type="text"
        />
        <button type="submit">Analiza</button>
      </form>
    </main>
  );
}

export default EmotionAnalysis;
