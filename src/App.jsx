import './App.scss';
import EmotionAnalysis from './components/Example/EmotionAnalysis';
import Reports from './components/Reports/Reports';
import Table from './components/Reports/Tables/Table';

function App() {
    return (
        <main className="app__main">
            {/* <EmotionAnalysis /> */}
             <Reports />
        </main>
    );
}

export default App;
