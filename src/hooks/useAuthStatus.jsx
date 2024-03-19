import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react'

export function useAuthStatus() {
  
    //creating two hooks for checking login status
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true);
            }
            setCheckingStatus(false);
        })
    } , [])
  
    return { loggedIn, checkingStatus}
}
