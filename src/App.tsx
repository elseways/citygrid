import React from 'react';
import MapGrid from './MapGrid';
import './App.css';

function App() {
  return (
    <div className="mainPage">
      <header className="header">
        City of Elseways Map
      </header>
      <main>
        <MapGrid rows={18} cols={25} tileSize={16} />
      </main>
    </div>
  );
}

export default App;
