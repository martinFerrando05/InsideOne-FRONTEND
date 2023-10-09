import { useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { thunkDemoEmotionAnalysis } from "../../store/slice/demoEmotionAnalysisSlice";
import { setCoversation } from "../../store/slice/demoEmotionAnalysisSlice";
//styles
import "./scss/emotionAnalysisChatBot.scss";
//assets - icons
import sendIcon from "../../assets/icons/send.svg";

const EmotionAnalysisChatBot = () => {
  const dataBot = useSelector((store) => store.demoEmotionAnalysisReducer);
  const [messageToSend, setMessageToSend] = useState("");
  const dispatch = useDispatch();

  // const settings = JSON.parse(localStorage.getItem('settings'));
  const settings = useSelector((store) => store.settingsReducer.value);
  console.log('SETTINGS --->', settings);

  const handleChangeText = (e) => {
    const value = e.target.value;
    setMessageToSend(value);
  };



  const handleReset = () => {
    const TYPE = "chatbot";
    dataBot.mode 
    dispatch(thunkDemoEmotionAnalysis(messageToSend, TYPE, true));
    dispatch(setCoversation([{
      role: 'system',
      content: 'Eres un asistente por chat de Galicia Seguros que brinda atención al cliente por chat para dar respuesta a preguntas sobre seguros. Podes dar información sobre tipos de seguros, hacer cotizaciones, ayudarte con trámites y responder preguntas comunes. Es como hablar con un experto en seguros en línea para obtener ayuda rápida y fácil.'
    }]));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const typeChatbot = "chatbot";
    const mode = dataBot.mode 
    dispatch(setCoversation({role: 'user', content: messageToSend}))
    const conversation = [...dataBot.conversation]
    
    conversation.push({role: 'user', content: messageToSend})
    let conversationJoined = conversation.slice(1).map(({role, content})=>`${role}: ${content}`).join('\n');

    
    const modes = {
      singleMessage: messageToSend,
      duringTheConversation: conversationJoined,
      toFinishTheChat: "Analisis al finalizar el chat",
    };


    dispatch(thunkDemoEmotionAnalysis(conversation, typeChatbot));
    dispatch(thunkDemoEmotionAnalysis(modes[mode], "emotionAnalysis" , false , settings));
    setMessageToSend("");

  };




  return (
    <section className="emotionAnalysisChatBot__main">
      <header className="emotionAnalysisChatBot__cont_assistant_name">
        <div className="emotionAnalysisChatBot__cont_assistant_name_icon"></div>
        <div className="emotionAnalysisChatBot__cont_assistant_name_desc">
          <h3>Asistente</h3>
          <p>En línea</p>
        </div>
        <button onClick={handleReset}>Reiniciar</button>
      </header>
      <ul className="emotionAnalysisChatBot__chat">
        {dataBot.conversation &&
          dataBot.conversation?.slice(1).map((e, i) => {
            const role = e.role;
            const message = e.content;

            const changeRoleToEnglish = {
              user: "client",
              assistant: "assistant",
            };

            return (
              <li
                key={i}
                className={
                  "emotionAnalysisChatBot__chat_single_message_" +
                  changeRoleToEnglish[role]
                }
              >
                <p>{message}</p>
              </li>
            );
          })}
      </ul>

      <form className="emotionAnalysisChatBot__form" onSubmit={handleSubmit}>
        <textarea
          cols={50}
          rows={10}
          value={messageToSend}
          onChange={handleChangeText}
          type="text"
        />
        <button type="submit">
          <img src={sendIcon} />
        </button>
      </form>
    </section>
  );
};

export default EmotionAnalysisChatBot;
