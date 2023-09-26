import "./App.scss";
import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";
import Table from "./components/Reports/Tables/Table";
import Filters from "./components/Reports/Filters";

function App() {
  return (
    <main className="app__main">
      {/*     <EmotionAnalysis /> */}
      <Filters />
      <Reports />
    </main>
  );
}

export default App;
