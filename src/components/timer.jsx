import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

import "./timer.css"

const Timer = forwardRef(function Timer(props, ref){
    const [runTimer, setRunTimer] = useState(false)
    const [hours, setHours] = useState(
        Number(0).toLocaleString(undefined,{minimumIntegerDigits: 2})
    );
    const [minutes, setMinutes] = useState(
        Number(0).toLocaleString(undefined,{minimumIntegerDigits: 2})
    );
    const [seconds, setSeconds] = useState(
        Number(0).toLocaleString(undefined,{minimumIntegerDigits: 2})
    );
    useImperativeHandle(
        ref,
        () => {
          return{
            startTimer:()=>{
                setRunTimer(true);
            },
            stopTimer:()=>{
                setRunTimer(false);
            },
            pauseTimer:()=>{
                setRunTimer(!runTimer)
            },
            resetTimer:()=>{
                setRunTimer(false)
                setSeconds(0);
                setMinutes(0);
                setHours(0);
            }
        }
      }
    )

    useEffect((e)=>{
        let interval;
        if(runTimer==true){
            interval = setInterval(()=>{
                if(parseInt(seconds)+1==60){
                    setSeconds(
                        Number(0).toLocaleString(undefined,{minimumIntegerDigits: 2})
                    )
                    if(parseInt(minutes)+1==60){
                        setMinutes(
                            Number(0).toLocaleString(undefined,{minimumIntegerDigits: 2})
                        )
                        if(parseInt(hours)+1==99){
                            //stop timer at 99
                            setRunTimer(!runTimer)
                            console.log("Timer has maxed out!")
                        }else{
                            setHours((prevHours)=>
                                Number(parseInt(prevHours)+1).toLocaleString(undefined,{minimumIntegerDigits: 2})
                            )
                        }
                    }else{
                        setMinutes((prevMinutes)=>
                            Number(parseInt(prevMinutes)+1).toLocaleString(undefined,{minimumIntegerDigits: 2})
                        )
                    }
                }else{
                    setSeconds((prevSeconds)=>
                        Number(parseInt(prevSeconds)+1).toLocaleString(undefined,{minimumIntegerDigits: 2})
                    )
                }
            },1000)
        }
        return () => clearInterval(interval);
    })

    return (
        <div ref={ref} className="timer">
            {hours}:{minutes}:{seconds}
        </div>
    )
})

export default Timer;