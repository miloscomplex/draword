import './App.css';
import Header from './containers/Header.js'
import CanvasContainer from './containers/CanvasContainer'
import ChatBox from './containers/ChatBox'
import Footer from './containers/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
      <CanvasContainer />
      <ChatBox />
      <Footer />
    </div>
  );
}

export default App
