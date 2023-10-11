import React, { useState } from "react";
//styles
import "./scss/emotionAnalysisConversation.scss";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setMode,
} from "../../store/slice/demoEmotionAnalysisSlice";
//assets - gifs
import {
  GIF_MONO_LOADING,
  GIF_MONO_LOADING_2,
  GIF_MONO_LOADING_ANALIZING,
  GIF_MONO_LOADING_BOCA,
} from "../../assets/loadings/loadings";
const EmotionAnalysisConversation = () => {
  const { singleEmotionAnalysis, loadingAnalysis } = useSelector(
    (store) => store.demoEmotionAnalysisReducer
  );
  const dispatch = useDispatch();

  const handleSelectMode = (mode) => {
    dispatch(setMode(mode));
  };

  return (
    <section className="emotionAnalysisConversation__main">
      <EmotionAnalysisConversationHeader/>

      <article className="emotionAnalysisConversation__container">
        <div className="emotionAnalysisConversation__container_analysis">
          <EmotionAnalysisConversationSingleLifeMessage
            loadingAnalysis={loadingAnalysis}
            singleEmotionAnalysis={singleEmotionAnalysis}
          />
        </div>
      </article>
    </section>
  );
};

const EmotionAnalysisConversationHeader = () => {
  return (
    <header
      className="emotionAnalysisConversation__header"
    >
      <h3>Analysis</h3>
      <img
        className="emotionAnalysisConversation__header_icon"
      />
    </header>
  );
};

const EmotionAnalysisConversationSingleLifeMessage = ({
  loadingAnalysis,
  singleEmotionAnalysis,
}) => {
  return (
    <>
      {loadingAnalysis ? (
        <h2>Loading...</h2>
      ) : (
        singleEmotionAnalysis && (
          <>
            <li>
              <h3>Resumen:</h3>
              <p>{singleEmotionAnalysis.client.summary}</p>
            </li>
            {singleEmotionAnalysis.client?.rating && (
              <li>
                <h3>Rating:</h3>
                <p>{singleEmotionAnalysis.client?.rating}%</p>
              </li>
            )}
            <li>
              <h3>Indice de satisfacción:</h3>
              <p>{singleEmotionAnalysis.client?.satisfaction_index}</p>
            </li>
            <li>
              <h3>Emociones:</h3>
              <p>
                {singleEmotionAnalysis.client?.emotions?.map(
                  (emotion, i, arr) =>
                    arr[i + 1] ? emotion + ", " : emotion + "."
                )}
              </p>
            </li>
            <li>
              <h3>Palabras clave:</h3>
              <p>
                {singleEmotionAnalysis.client?.keywords?.map(
                  (emotion, i, arr) =>
                    arr[i + 1] ? emotion + ", " : emotion + "."
                )}
              </p>
            </li>
          </>
        )
      )}
    </>
  );
};

export default EmotionAnalysisConversation;
