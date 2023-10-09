import React, { useState } from "react";
//styles
import "./scss/emotionAnalysisConversation.scss";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../../store/slice/demoEmotionAnalysisSlice";
//assets - gifs
import {
  GIF_MONO_LOADING,
  GIF_MONO_LOADING_2,
  GIF_MONO_LOADING_ANALIZING,
  GIF_MONO_LOADING_BOCA,
} from "../../assets/loadings/loadings";
//icons
import iconArrowDown from "../../assets/icons/chevron-down-white.svg";

const EmotionAnalysisConversation = () => {
  const { mode, singleEmotionAnalysis, loadingAnalysis } = useSelector(
    (store) => store.demoEmotionAnalysisReducer
  );
  const [openSelect, setOpenSelect] = useState(false);
  const dispatch = useDispatch();
  const modes = {
    singleMessage: "Analisis en vivo por mensaje individual",
    duringTheConversation: "Analisis en vivo de toda la conversación",
    toFinishTheChat: "Analisis al finalizar el chat",
  };

  const handleOpenSelectMode = () => {
    setOpenSelect(!openSelect);
  };
  const handleSelectMode = (mode) => {
    dispatch(setMode(mode));
  };

  const switchModes = {
    singleMessage: (
      <EmotionAnalysisConversationSingleLifeMessage
        loadingAnalysis={loadingAnalysis}
        singleEmotionAnalysis={singleEmotionAnalysis}
      />
    ),
    duringTheConversation: <EmotionAnalysisConversationDuringConversation  loadingAnalysis={loadingAnalysis}
    singleEmotionAnalysis={singleEmotionAnalysis}/>,
    toFinishTheChat:<EmotionAnalysisConversationToFinishTheChat />,
  };

  return (
    <section className="emotionAnalysisConversation__main">
      <EmotionAnalysisConversationHeader
        handleSelectMode={handleSelectMode}
        modes={modes}
        mode={mode}
        openSelect={openSelect}
        handleOpenSelectMode={handleOpenSelectMode}
      />

      <article className="emotionAnalysisConversation__container">
        <div className="emotionAnalysisConversation__container_analysis">
          {switchModes[mode]}
        </div>
      </article>
    </section>
  );
};

const EmotionAnalysisConversationHeader = ({
  modes,
  mode,
  openSelect,
  handleOpenSelectMode,
  handleSelectMode,
}) => {
  const modesNameArr = Object.keys(modes);
  return (
    <header
      onClick={handleOpenSelectMode}
      className="emotionAnalysisConversation__header"
    >
      <h3>{modes[mode]}</h3>
      <img
        className="emotionAnalysisConversation__header_icon"
        src={iconArrowDown}
      />
      <ul
        style={openSelect ? { display: "flex" } : { display: "none" }}
        className="emotionAnalysisConversation__header_select"
      >
        {modesNameArr.map((key, i) => {
          return (
            mode !== key && (
              <li
                key={i}
                onClick={() => handleSelectMode(key)}
                className="emotionAnalysisConversation__header_select_list"
              >
                <h3>{modes[key]}</h3>
              </li>
            )
          );
        })}
      </ul>
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
                {singleEmotionAnalysis.client?.emotions.map((emotion, i, arr) =>
                  arr[i + 1] ? emotion + ", " : emotion + "."
                )}
              </p>
            </li>
            <li>
              <h3>Palabras clave:</h3>
              <p>
                {singleEmotionAnalysis.client?.keywords?.map((emotion, i, arr) =>
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

const EmotionAnalysisConversationToFinishTheChat = ({
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
                {singleEmotionAnalysis.client?.emotions.map((emotion, i, arr) =>
                  arr[i + 1] ? emotion + ", " : emotion + "."
                )}
              </p>
            </li>
            <li>
              <h3>Palabras clave:</h3>
              <p>
                {singleEmotionAnalysis.client?.keywords?.map((emotion, i, arr) =>
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

const EmotionAnalysisConversationDuringConversation = ({
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
                {singleEmotionAnalysis.client?.emotions.map((emotion, i, arr) =>
                  arr[i + 1] ? emotion + ", " : emotion + "."
                )}
              </p>
            </li>
            <li>
              <h3>Palabras clave:</h3>
              <p>
                {singleEmotionAnalysis.client?.keywords?.map((emotion, i, arr) =>
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
