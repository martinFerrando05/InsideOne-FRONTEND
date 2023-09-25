import "./App.scss";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState } from "react";
import axios from "axios";

function App() {
  const [state, setSatete] = useState(null);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        "http://localhost:5000/prueba-97c35/us-central1/getEmotionsAnalysis",
        { text: input }
      )
      .then(({ data }) => {
        console.log(data);
        setSatete(data);
        setQuestion(input);
        setInput("");
        setLoading(false);
        const queryRef = collection(db, "pruebas-p5");
        addDoc(queryRef, data);
      })
      .catch((err) => console.error(err));
  };

  const imgLogoGalicia =
    "https://www.galiciaseguros.com.ar/media-library/Templates/images/logo.png";
  const imgLogoInsideOne =
    "https://i.postimg.cc/R0RvH3TJ/insideone-isologo.png";
  const imgLogoPlataforma5 =
    "https://www.plataforma5.la/static/media/LogoP5Mobile.a55e0d3ded6702e47da325ac762d2f5d.svg";

  const GIF_MONO_LOADING =
    "https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif";

  return (
    <main className="app__main">
      <h1>Análisis de satisfacción</h1>

      <div className="app__cont_logo">
        <img className="app__logo" src={imgLogoGalicia} alt="logo-galicia" />
        <h2>+</h2>
        <img
          className="app__logo"
          src={imgLogoInsideOne}
          alt="logo-inside-one"
        />
      </div>

      <img className="app__logo_p5" src={imgLogoPlataforma5} alt="logo-p5" />

      <div className="app__cont_text">
        {loading ? (
          <img src={GIF_MONO_LOADING} alt="loading" />
        ) : !state ? (
          <h3>DEMO</h3>
        ) : (
          <>
            <p>
              <span>Reseña:</span> {question}
            </p>
            <p>
              <span>Resumen:</span> {state?.summary}
            </p>
            <p>
              <span>Emociones:</span> {state?.emotions}
            </p>
            <p>
              <span>Indice de satisfacción:</span>{" "}
              {state && state?.rating + "%"}
            </p>
            <p>
              <span>Indice:</span> {state?.indice}
            </p>
            <p>
              <span>Palabras clave:</span> {state?.keywords}
            </p>
          </>
        )}
      </div>

      <form className="app__form" onSubmit={handleSubmit}>
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

export default App;
