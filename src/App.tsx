import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie'

import client from './utils/client'
import { useAppDispatch, useAppSelector } from './shared/hooks'
import { Sidebar } from './components'
import Login from './containers/Login';
import Player from './containers/Player'
import { setCurrentUser } from './shared/reducers/authSlice';

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loggedIn = jsCookie.get('logged_in')
  const currentUser = useAppSelector(state => state.auth.user)

  useEffect(() => {
    if (loggedIn && !currentUser) {
      const currentUserId = jsCookie.get('current_user_id')
      if (currentUserId) {
        client.getUser(+currentUserId).then(data => {
          dispatch(setCurrentUser(data))
        })
      } else {
        navigate('/login')
      }
    }
  })
  

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
