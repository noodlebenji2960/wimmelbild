import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "./App.css"

import GamePage from "./pages/gamePage"

import { getFirestore, query, doc, getDoc, getDocs, collection } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

import Header from "./components/header.jsx";
import Throbber from "./components/throbber";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBNE7tMZA5Bzhbp6F7GOZDADuC92TZV9wU",
    authDomain: "wimmelbild.firebaseapp.com",
    projectId: "wimmelbild",
    storageBucket: "wimmelbild.appspot.com",
    messagingSenderId: "273982092726",
    appId: "1:273982092726:web:851382ce445c24cd2cfd17"
});

export const db = getFirestore(firebaseApp);

const App =()=>{
    const [loading, setLoading] = useState(false)
    const [randomChars, setRandomChars] = useState([])
    const [score, setScore] = useState(0)
    const headerRef = useRef()
    const gamePageRef = useRef()
    
    async function getCollectionList() {
        try {
            const q = query(collection(db, "image1"));
            const querySnapshot = await getDocs(q);
            let charList = []
            querySnapshot.forEach((doc) => {
              charList.push(doc.id)
            });
            return charList
        }
        catch(error) {
          console.error('Error reading Firebase Database', error);
        }
    }
    
    async function getRandomChars(charList){
        charList = await charList
        let randomThreeChars =[]
        for(let i=0;i<3;i++){
            const randomIndex = Math.floor(Math.random()*charList.length)
            randomThreeChars.push(charList[randomIndex])
        }
        setLoading(false)
        return randomThreeChars
    }

    const handleStart = async (e) => {
        setLoading(true)
        headerRef.current.functionList.timer.startTimer()
        e.target.style.display = "none"
        const charList = await getCollectionList();
        const randomChars = await getRandomChars(charList)
        setRandomChars(randomChars);
        gamePageRef.current.setCharList(randomChars)
    };

    return (
        <>
            {loading == true ? <Throbber/> : <></>}
                <div className="App">
                    <Header 
                        ref={headerRef} 
                        randomChars={randomChars}
                        score={score}
                        functionList={{handleStart, setLoading}}
                    />
                    <main>
                        <GamePage
                            db={db}
                            ref={gamePageRef}
                            score={score}
                            refList={{headerRef:headerRef.current}}
                            functionList={{setScore}}
                        />
                    </main>
                </div>
        </>
    )
}

export default App;