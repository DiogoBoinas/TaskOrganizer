import React, { useState } from 'react';
import './App.css'
import AppRouter from './Routes/AppRouter';
import UnauthNavBar from './NavBar/UnauthNavBar';
import AuthNavBar from './NavBar/AuthNavBar';
import { app } from './config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'



function App() {

  const [uid, setUid] = useState("loading")

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid)
    }else{
      setUid(null)
    }
  })

  return (
    <div>
      {uid ?
        <AuthNavBar />
        :
          (uid!=="loading" ? 
            <UnauthNavBar/>
              :
                null)}
      <AppRouter />
    </div>
  )



}

export default App;
