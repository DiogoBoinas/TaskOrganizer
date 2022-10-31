import React, {useState, useEffect} from 'react';
import {app} from '../config/firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';


const auth = getAuth(app)

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (user) =>
        setCurrentUser(user)
      );
      return unSubscribe;
    }, []);
    return currentUser;
  }
  