import { Routes, Route } from "react-router";
import "./App.scss";
import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";


function App() {
  return (
    <main className="app__main">
      <Routes>
      <Route path="/individual" element={<Reports/>}/>
      {/*     <EmotionAnalysis /> */}
    
      <Reports />
      </Routes>
    </main>
  );
}

export default App;
