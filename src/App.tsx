import React from 'react';
import './App.css';
import Board from './Board';
import { ServerChess} from './services/chess-server.service';

function App() {

  // let server = new ServerChess();
  // server.updateGame("62725b7da1284a9bfce5ad18", "e2e4");

  return (
    <Board/>
  )
  }
export default App;
