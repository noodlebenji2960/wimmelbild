import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"

import "./cursor.css"

const Cursor = forwardRef(function Cursor(props, ref){
    const [animationClass, setAnimationClass] = useState("")
    const pagePosRef = useRef({x:0,y:0})
    const windowPosRef = useRef({x:0, y:0})
    const targetAreaRef = useRef()

    useImperativeHandle(
        ref,
        ()=>{
        return {
            targetAreaRef:targetAreaRef.current,
            show,
            hide,
            animateCollapse,
            animateExpand,
            reset
        }
    })

    const show=()=>{
        targetAreaRef.current.style.display="block"
    }
    const hide=()=>{
        targetAreaRef.current.style.display = "none";
    }
    const animateCollapse=()=>{
        if(animationClass==""){
            setAnimationClass("cursorCollapse")
        }
    }
    const animateExpand=()=>{
        if(animationClass=="cursorCollapse"){
            setAnimationClass("cursorExpand")
            onAnimationEnd()
        }
    }
    const reset=()=>{
        targetAreaRef.current.classList.remove(animationClass)
    }
    const onAnimationEnd=()=>{
        targetAreaRef.current.addEventListener("animationend", (e) => {
            targetAreaRef.current.classList.remove(animationClass)
            setAnimationClass("")
        },{once:true})
    }

    useEffect(()=>{
        document.addEventListener("mousemove", (e)=>{
            pagePosRef.current.x = e.pageX
            pagePosRef.current.y = e.pageY

            windowPosRef.current.x = e.clientX
            windowPosRef.current.y = e.clientY

            targetAreaRef.current.style.top = `${e.clientY-27.5}px`
            targetAreaRef.current.style.left = `${e.clientX-27.5}px`
        })
        document.addEventListener("mouseleave", ()=>{
            hide()
        })
        document.addEventListener("mouseenter", ()=>{
            show()
        })
    },[])

    useEffect(()=>{
        targetAreaRef.current.classList = `targetArea ${animationClass}`
    })

    return <div ref={targetAreaRef} className="targetArea"></div>
})

export default Cursor