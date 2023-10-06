import React from "react";
//styles
import "./scss/emotionAnalysisHeader.scss";
//assets - log
import {
  imgLogoGalicia,
  imgLogoInsideOne,
  imgLogoPlataforma5,
} from "../../assets/imgs_logo/imgs";
const EmotionAnalysisHeader = () => {
  return (
    <header className="emotionAnalysisHeader__main">
      <h1>Análisis de satisfacción</h1>

      <div className="emotionAnalysisHeader__cont_logo">
        <img
          className="emotionAnalysisHeader__logo"
          src={imgLogoGalicia}
          alt="logo-galicia"
        />
        <h2>+</h2>
        <img
          className="emotionAnalysisHeader__logo"
          src={imgLogoInsideOne}
          alt="logo-inside-one"
        />
      </div>

      <img
        className="emotionAnalysisHeader__logo_p5"
        src={imgLogoPlataforma5}
        alt="logo-p5"
      />
    </header>
  );
};

export default EmotionAnalysisHeader;
