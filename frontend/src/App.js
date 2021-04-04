import './App.css';
import Header from './containers/Header.js'
import CanvasContainer from './containers/CanvasContainer'
import ChatWindow from './containers/ChatWindow'
import Footer from './components/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
      <CanvasContainer />
      <ChatWindow />
      <Footer />
    </div>
  );
}

export default App
