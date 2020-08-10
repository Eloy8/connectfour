import React from 'react';
// import Computer from './utils/Computer';
import GameGrid from './components/GameGrid';
import './scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App--title">
          C
          <div className='circle--title circle--title-yellow' />
          nnect f
          <div className='circle--title circle--title-red' />
          ur!
        </h1>
      </header>
      <GameGrid />
    </div>
  );
}
                                          
export default App;
