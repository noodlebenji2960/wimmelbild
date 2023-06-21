import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"
import {doc, getDoc} from 'firebase/firestore/lite';

import "./contextMenu.css"

import tickIcon from "../../assets/tickIcon.svg"

const ContextMenu = forwardRef(function ContextMenu(props, ref){
    const [isOpen, setIsOpen] = useState(false)
    const [charList, setCharList] = useState([])
    const [found, setFound] = useState([false,false,false])
    const contextMenuRef = useRef()

    useImperativeHandle(
        ref,
        ()=>{
        return {
            setCharList
        }
    })

    async function getSpiderman(choice){
        const docRef = doc(props.db, "image1", choice)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    }

    const handleChoice = async (event) => {
        let choice = event.target.textContent.toLowerCase()
        const charObj = await getSpiderman(choice);
        let {x1, y1, x2, y2} = charObj
        if ((event.pageX >= x1 && event.pageX <= x2)&&(event.pageY >= y1 && event.pageY <= y2)) {
            const index = charList.indexOf(event.target.textContent)
            const nextCounters = found.map((e, i) => {
                if (i === index) {
                    return !found[i];
                } else {
                    return found[i];
                }
            });
              setFound(nextCounters);
              props.functionList.setScore(props.refList.score+1)
          } else {
            alert(`TRY AGAIN!`)
          }
    };

    useEffect(()=>{
        document.addEventListener("contextmenu", (e)=>{
            e.preventDefault()
            let xClick = e.pageX
            let yClick = e.pageY
            props.functionList.cursor.current.animateCollapse()
            setIsOpen(!isOpen)
            contextMenuRef.current.style.top = yClick+"px"
            if(yClick<=document.body.scrollHeight-200){
                contextMenuRef.current.style.bottom = "unset"
                contextMenuRef.current.style.top = yClick+"px"
            }else{
                contextMenuRef.current.style.top = "unset"
                contextMenuRef.current.style.bottom = document.documentElement.clientHeight-yClick+"px"
            }
            if(xClick<=document.body.scrollWidth/2){
                contextMenuRef.current.style.right = "unset"
                contextMenuRef.current.style.left = xClick+"px"
            }else{
                contextMenuRef.current.style.left = "unset"
                contextMenuRef.current.style.right = document.documentElement.clientWidth-xClick+"px"
            }
            contextMenuRef.current.classList.add("contextMenu-expand")
            document.addEventListener("mousemove", closeOnAbandon)
            document.addEventListener("click", ()=>{
                setIsOpen(!isOpen)
                props.functionList.cursor.current.animateExpand()
                contextMenuRef.current.classList.remove("contextMenu-expand")
                document.removeEventListener("mousemove", closeOnAbandon)
            },{once:true})

            function closeOnAbandon(e){
                let distance = 100
                if(
                    (e.target.classList=="imageContainer")&&
                    ((e.pageX>xClick+distance||e.pageX<xClick-distance)||(e.pageY>yClick+distance||(e.pageY<yClick-distance)))
                ){
                    props.functionList.cursor.current.animateExpand()
                    contextMenuRef.current.classList.remove("contextMenu-expand")
                    document.removeEventListener("mousemove", closeOnAbandon)
                    setIsOpen(!isOpen)
                }
            }
        })
    },[])

    useEffect(()=>{
        if(found.every((e)=>e==true)){
            console.log("YOU WIN")
            setCharList([])
            setFound([false, false, false])
        }
    })

    return <div ref={contextMenuRef} className="contextMenu">
        <ul>
            {charList.map((e, i)=>{
                return <li 
                    key={crypto.randomUUID()} 
                    onClick={(e)=>{handleChoice(e)}}
                    style={{backgroundImage:`url(${found[i]==true ? tickIcon : ""})`}}
                >
                    <p>{e}</p>
                </li>
            })}
        </ul>
    </div>
})

export default ContextMenu