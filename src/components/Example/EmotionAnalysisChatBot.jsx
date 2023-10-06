import { useState } from "react";
//redux
import { useDispatch , useSelector } from "react-redux";
import { thunkDemoEmotionAnalysis } from "../../store/slice/demoEmotionAnalysisSlice";
import { setCoversation } from "../../store/slice/demoEmotionAnalysisSlice";
//styles
import "./scss/emotionAnalysisChatBot.scss";
//assets - icons
import sendIcon from "../../assets/icons/send.svg";

const EmotionAnalysisChatBot = () => {
  const dataBot = useSelector(store=> store.demoEmotionAnalysisReducer)
  const [messageToSend, setMessageToSend] = useState("");
  // const settings = JSON.parse(localStorage.getItem('settings'));
  const settings = useSelector((store) => store.settingsReducer.value);
  console.log('SETTINGS --->', settings);
 
  const dispatch = useDispatch()
  const handleChangeText = (e) => {
    const value = e.target.value;
    console.log(value);
    setMessageToSend(value);
  };

  const handleReset = () =>{
    const TYPE = 'chatbot'
    dispatch(thunkDemoEmotionAnalysis( messageToSend ,  TYPE , true))
    
    dispatch(setCoversation(null))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const TYPE = 'chatbot'
    dispatch(thunkDemoEmotionAnalysis( messageToSend ,  TYPE ))
    dispatch(thunkDemoEmotionAnalysis(messageToSend, 'emotionAnalysis', false, settings))
    setMessageToSend('')
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
        {
        dataBot.conversation &&
        dataBot.conversation?.map((e, i) => {
          const role = e.role
          const message = e.content

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
           
          )
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
