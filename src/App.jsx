import './App.scss';

import EmotionAnalysis from './components/Example/EmotionAnalysis';
import Reports from './components/Reports/Reports';
import Filters from './components/Reports/Filters'

function App() {
    return (
        <main className="app__main">
            <EmotionAnalysis />
            <Reports />
            {/* <Filters /> */}
        </main>
    );
}

export default App;
