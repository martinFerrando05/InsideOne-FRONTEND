
//styles
import "./scss/emotionAnalysis.scss";
//components
import EmotionAnalysisHeader from "./EmotionAnalysisHeader";
import EmotionAnalysisChatBot from "./EmotionAnalysisChatBot";
import EmotionAnalysisConversation from "./EmotionAnalysisConversation";

function EmotionAnalysis() {


  return (
    <main className="emotionAnalysis__main">
        <EmotionAnalysisHeader />

      <div className="emotionAnalysis__container">
        <EmotionAnalysisChatBot />
        <EmotionAnalysisConversation />
      </div>


    </main>
  );
}

export default EmotionAnalysis;
