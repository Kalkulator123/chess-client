import React from 'react';
import './App.css';
import Board from './Board';
import { ServerChess} from './services/chess-server.service';

function App() {


  const db = new ServerChess();
  db.getOne('62656a41ab792941c329a52c');

  return (
    <div>
      <button onClick={() => {
        console.log("gg")
      }}>ff</button>
    <Board/>
    </div>
  )
  }
export default App;
