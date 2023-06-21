import React, { useEffect,useRef,forwardRef } from "react"

import BackgroundImage from "../components/backgroundImage"

import "./minimap.css"

const Minimap = forwardRef(function Minimap(props, ref){
    const backgroundImageRef = useRef()
    const miniCursorRef = useRef()
    const miniMapRect = useRef()
    const miniMapRef = useRef()

    const handleOnHover=(e)=>{
        miniMapRef.current.style.right = miniMapRect.current.left+"px"
        miniMapRect.current = backgroundImageRef.current.getBoundingClientRect()
    }

    useEffect(()=>{
        miniMapRect.current = backgroundImageRef.current.getBoundingClientRect()

        window.addEventListener("mousemove", (e)=>{
            let x = miniMapRect.current.width*(e.clientX/window.innerWidth)
            let y = backgroundImageRef.current.clientHeight*(e.clientY-35)/(window.innerHeight-35)
            miniCursorRef.current.style.top = `${y+35}px`
            miniCursorRef.current.style.left = `${x+miniMapRect.current.left}px`
        })
        window.addEventListener("resize", ()=>{
            miniMapRect.current = backgroundImageRef.current.getBoundingClientRect()
        })
    },[])

    useEffect(()=>{
    })

    return <div ref={miniMapRef} className="miniMap" onMouseEnter={(e)=>handleOnHover(e)}>
        <div ref={miniCursorRef} className="miniCursor"/>
        <BackgroundImage ref={backgroundImageRef}/>
    </div>
})

export default Minimap