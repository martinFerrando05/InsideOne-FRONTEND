import { useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { thunkDemoEmotionAnalysis } from "../../store/slice/demoEmotionAnalysisSlice";
import { setCoversation ,setIdConversation , resetConversation } from "../../store/slice/demoEmotionAnalysisSlice";
//styles
import "./scss/emotionAnalysisChatBot.scss";
//assets - icons
import sendIcon from "../../assets/icons/send.svg";
import { toast } from "react-toastify";

const EmotionAnalysisChatBot = () => {
  const dataBot = useSelector((store) => store.demoEmotionAnalysisReducer);
  const [messageToSend, setMessageToSend] = useState("");
  const dispatch = useDispatch();

  // const settings = JSON.parse(localStorage.getItem('settings'));
  const settings = useSelector((store) => store.settingsReducer.value);

  const handleChangeText = (e) => {
    const value = e.target.value;
    setMessageToSend(value);
  };

  const handleReset = () => {
    dispatch(resetConversation());
  };
  const handleAnalyzeConversation = ()=>{
    const idConversation = dataBot.idConversation
    const conversationLength = dataBot.conversation.length
    if(conversationLength > 1 && idConversation){
      const conversation = [...dataBot.conversation]
      const idConversation = dataBot.idConversation
      const analyzeAllConversation = true
      conversation.push({role: 'user', content: messageToSend,  rating:null})
      let conversationJoined = conversation.slice(1).map(({role, content})=>`${role}: ${content}`).join('\n');
      dispatch(thunkDemoEmotionAnalysis(conversationJoined ,  conversation, settings , idConversation , analyzeAllConversation))
    }else{
      toast.info('debes iniciar una conversación')
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idConversation = dataBot.idConversation
    dispatch(setCoversation({role: 'user', content: messageToSend, rating:null}))

    const conversation = [...dataBot.conversation]
    
    conversation.push({role: 'user', content: messageToSend,  rating:null})

    dispatch(thunkDemoEmotionAnalysis( messageToSend, conversation, settings , idConversation));
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
        <button onClick={handleAnalyzeConversation}>Analizar</button>
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
