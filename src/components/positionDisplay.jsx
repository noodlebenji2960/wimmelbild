import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react"

import "./positionDisplay.css"

const PositionDisplay = forwardRef(function PositionDisplay(props, ref){
    const coordinatesRefX = useRef()
    const coordinatesRefY = useRef()

    useImperativeHandle(
        ref,
        ()=>{
        return {

        }
    })


    useEffect(()=>{
        document.addEventListener("mousemove", (e)=>{
            coordinatesRefX.current.textContent = `x${Math.floor(e.pageX).toLocaleString('en-US', {
                minimumIntegerDigits: 5,
                useGrouping: false
              })}`;
            coordinatesRefY.current.textContent = `y${Math.floor(e.pageY).toLocaleString('en-US', {
                minimumIntegerDigits: 5,
                useGrouping: false
              })}`;
        })
        document.addEventListener("mouseleave", ()=>{
            coordinatesRefX.current.textContent = ""
            coordinatesRefY.current.textContent = ""
        })
    },[])

    useEffect(()=>{
    })

    return <span className="coordinates">
        <p ref={coordinatesRefX}> </p>
        <p ref={coordinatesRefY}> </p>
    </span>
})

export default PositionDisplay