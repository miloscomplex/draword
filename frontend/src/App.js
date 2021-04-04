import './App.css';
import CanvasContainer from './containers/CanvasContainer'
import ChatWindow from './containers/ChatWindow'
import Navigation from './containers/Navigation'
import Options from './containers/Options'


function App() {
  return (
    <div className='App'>
      <Navigation />
      <CanvasContainer />
      <Options />
      <ChatWindow />
    </div>
  );
}

export default App;
