import "./App.css";
import StopwatchHooks from './StopwatchHooks';


function App() {
  return (
    <div className="App" id="root">
     <StopwatchHooks initialSeconds={0}/>
    </div>
  );
}

export default App;
