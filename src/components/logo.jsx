import React, { useState, useEffect, useRef} from "react";

import "./logo.css"

const Logo = function Logo(props ,ref){
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [startGame, setStartGame] = useState(false)
    const counter = useRef(0)

    const imageList = importAll(require.context('../../assets/logo', false, /\.(png|webp|jpe?g|avif|svg)$/))

    function importAll(require) {
        let imageList = []
        require.keys().map(require).forEach((e, i)=>{
            let name = require.keys()[i].slice(2, -1).toLowerCase()
            imageList.push(
            {
                fileName:name.substring(0, name.indexOf('.')),
                url:e
            }
        )})
        return imageList
      }

      const intervalTiming = [26,20,15,11,8]
      let interval;

      useEffect(() => {
        interval = setInterval(() => {
            setCurrentImageIndex(currentImageIndex+1)
            if(currentImageIndex==imageList.length-1){
                setCurrentImageIndex(0)
                if(counter.current!==intervalTiming.length-1){
                    counter.current++
                }
            }
        }, 10*intervalTiming[counter.current]);
      
        return () => clearInterval(interval);
      });

    return (
        <>
            {startGame==false ?
                <div className="intro-wrapper">
                    <div className="flipping-images">
                        <img src={imageList[currentImageIndex].url}/>
                    </div>
                    <div className="logo">
                        <span>
                        <p>MARVEL</p>
                        <button className="startButton"
                                onClick={(e)=>{
                                    setStartGame(true)
                                    props.functionList.handleStart(e)
                                    props.refList.headerRef.current.style.height = 35+"px"
                                }
                            }
                        >
                            START GAME
                        </button>
                        </span>
                    </div>
                    <button className="skipButton"
                        onClick={(e)=>{
                            setStartGame(true)
                            props.functionList.handleStart(e)
                            props.refList.headerRef.current.style.height = 35+"px"
                        }}
                    >
                        SKIP INTRO
                    </button>
                </div>
            : <></>}
        </>
    )
}

export default Logo;