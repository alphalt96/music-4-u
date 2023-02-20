import React from 'react';
import { Route, Routes } from 'react-router';

import { Sidebar } from './components'
import Player from './containers/Player'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <Routes>
          <Route path="/*" element={ <Player /> } />
          <Route path="/player" element={ <Player/> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
