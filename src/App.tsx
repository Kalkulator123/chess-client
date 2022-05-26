import './App.css';
import Chessboard from './components/Chessboard/Chessboard';
import { ServerChess} from './services/chess-server.service';
import { BetterFen } from "./BetterFen";
let server = new ServerChess();
let gameId = "62656968ecd2f2c6adcd33a8";
function App() {
  return (
    <div id="app">
      <Chessboard/>
    </div>
  );
}

export default App;
