import React from 'react';
// import Mechanism from './utils/mechanism';
import GameGrid from './components/GameGrid';
import './scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App--title">Connect four!</h1>
      </header>
      <GameGrid />
    </div>
  );
}
                                          
export default App;
