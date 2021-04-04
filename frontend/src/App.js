import './App.css';
import CanvasContainer from './containers/CanvasContainer'
import ChatWindow from './containers/ChatWindow'
import Navigation from './containers/Navigation'
import ToolBox from './containers/ToolBox'
import Footer from './components/Footer'


function App() {
  return (
    <div className='App'>
      <Navigation />
      <CanvasContainer />
      <ToolBox />
      <ChatWindow />
      <Footer />
    </div>
  );
}

export default App;
