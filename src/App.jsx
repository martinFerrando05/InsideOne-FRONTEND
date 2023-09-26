import "./App.scss";

import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";

function App() {
  return (
    <main className="app__main">
      <div>
        <Reports />
        <EmotionAnalysis />
      </div>
    </main>
  );
}

export default App;
