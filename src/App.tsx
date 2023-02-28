import React from 'react';
import { Route, Routes } from 'react-router';

import { Sidebar } from './components'
import Login from './containers/Login';
import Player from './containers/Player'

function App() {
  return (
    <div className="flex md:flex-row flex-col h-screen">
      <Routes>
        <Route path="/*" element={(
          <>
            <div className="w-full h-full overflow-scroll md:overflow-visible">
              <Routes>
                <Route path="/*" element={<Player />} />
                <Route path="/player" element={<Player />} />
              </Routes>
            </div>
            <Sidebar />
          </>
        )} />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
