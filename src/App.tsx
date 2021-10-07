import React from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <h1>🧠 Sliding puzzle game 🧠</h1>
      <Board />
      <Footer />
    </div>
  );
}

export default App;
