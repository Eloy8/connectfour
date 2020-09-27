import React from 'react';
// import Computer from './utils/Computer';
import AppHeader from './components/AppHeader';
import GameGrid from './components/GameGrid';
import './scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <GameGrid />
    </div>
  );
}
                                          
export default App;
