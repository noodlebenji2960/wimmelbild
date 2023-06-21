import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react"

import "./selectionBox.css"

const SelectionBox = forwardRef(function SelectionBox(props, ref){
    const selectionRectangleRef = useRef()
    const x1 = useRef(0)
    const y1 = useRef(0)
    const x2 = useRef(0)
    const y2 = useRef(0)

    useImperativeHandle(
        ref,
        ()=>{
            {x1,y1,x2,y2}
        }
    )

    const reCalcSelectionRect =()=>{
        let x3 = Math.min(x1.current,x2.current);
        let x4 = Math.max(x1.current,x2.current);
        let y3 = Math.min(y1.current,y2.current);
        let y4 = Math.max(y1.current,y2.current);
        selectionRectangleRef.current.style.left = x3 + 'px';
        selectionRectangleRef.current.style.top = y3 + 'px';
        selectionRectangleRef.current.style.width = x4 - x3 + 'px';
        selectionRectangleRef.current.style.height = y4 - y3 + 'px'
    }

    const reCalc =(e)=>{
        selectionRectangleRef.current.style.display = "block"
        x2.current = e.pageX;
        y2.current = e.pageY;
        reCalcSelectionRect()
        selectionRectangleRef.current.classList.add("darken")
    }

    const handleMouseDown =(e)=>{
        if(e.button==0){
            props.functionList.cursor.current.animateCollapse()
            selectionRectangleRef.current.style.display = "none"
            x1.current = e.pageX;
            y1.current = e.pageY;
            reCalcSelectionRect();
            document.addEventListener("mousemove", reCalc)
        }
    };

    const handleMouseUp =(e)=>{
        if(e.button==0){
            props.functionList.cursor.current.animateExpand()
            x2.current = e.pageX;
            y2.current = e.pageY;
            if(x1.current>x2.current){
                [x1.current, x2.current] = [x2.current, x1.current]
            }
            if(y1.current>y2.current){
                [y1.current, y2.current] = [y2.current, y1.current]
            }

            document.removeEventListener("mousemove", reCalc)
        }
    };

    useEffect(()=>{
        props.refList.gamePageRef.current.addEventListener("mousedown", handleMouseDown)
        props.refList.gamePageRef.current.addEventListener("mouseup", handleMouseUp)
    },[])

    useEffect(()=>{
    })

    return <div ref={selectionRectangleRef} className="selectionRectangle"></div>
})

export default SelectionBox