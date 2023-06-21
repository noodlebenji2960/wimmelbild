import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

import "./gamePage.css"

import Cursor from "../components/cursor"
import SelectionBox from "../components/selectionBox";
import ContextMenu from "../components/contextMenu";
import BackgroundImage from "../components/backgroundImage";
import Minimap from "../components/minimap";

const GamePage = forwardRef(function Gamepage(props,ref){
    const gamePageRef = useRef()
    const cursorRef = useRef()
    const imgRef = useRef()
    const selectionBoxRef = useRef()
    const contextMenuRef = useRef()
    useImperativeHandle(
        ref,
        ()=>{
            return contextMenuRef.current
        }
    )

    useEffect(()=>{
        document.addEventListener("mousemove", (e)=>{
            let x = e.clientX/window.innerWidth;
            let y = (e.clientY-35)/window.innerHeight;

            scroll(document.body.scrollWidth*x, document.body.scrollHeight*y)
        })
    },[])

    const functionList = {
        cursor:cursorRef,
        setScore:props.functionList.setScore
    }

    const refList = {
        headerRef:props.refList.headerRef,
        selectionCoordinatesRef:props.refList.selectionCoordinatesRef,
        imgRef:imgRef,
        gamePageRef:gamePageRef,
        score:props.score
    }

    useEffect(()=>{
    })

    return (
        <>
        <div ref={gamePageRef} className="gamePage">
            <div className="gameContainer">
                <Minimap refList={refList}/>
                <div className="imageContainer">
                    <SelectionBox
                        ref={selectionBoxRef} 
                        functionList={functionList} 
                        refList={refList}
                    />
                    <ContextMenu
                        db={props.db}
                        ref={contextMenuRef}
                        refList={refList}
                        functionList={functionList}
                    />
                    <Cursor ref={cursorRef}/>
                    <BackgroundImage ref={imgRef}/>
                </div>
            </div>
        </div>
        </>
    )
})

export default GamePage;