import React, {useRef, useImperativeHandle, forwardRef} from "react";

import "./header.css"

import Timer from "./timer";
import PositionDisplay from "./positionDisplay";

import noImage from "../../assets/No-Image-Placeholder.png"
import Logo from "./logo";

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

export const imageList = importAll(require.context('../../assets/characters', false, /\.(png|webp|jpe?g|svg)$/));

const Header = forwardRef(function Header(props ,ref){
    const headerRef = useRef()
    const timerRef = useRef()
    const charSpanRef = useRef()

    useImperativeHandle(
        ref,
        ()=>{
            return (
                {
                    functionList:{timer:timerRef.current}
                }
            )
        }
    )

    return (
        <header 
            ref={headerRef}
        >
            <Logo refList={{headerRef}} functionList={props.functionList}/>
            <span>
                <span>
                    <Timer ref={timerRef}/>
                    <p>Score: {props.score}</p>
                </span>
                <span 
                    ref={charSpanRef} 
                    className="toFind"
                >
                    {props.randomChars.map((ele1)=>{
                        let imageUrl = imageList.find((ele2)=>{
                            if(ele1.replace(/\s/g, '')==ele2.fileName){
                                return true
                            }
                        })
                        if(imageUrl==undefined){
                            imageUrl = noImage
                        }else{
                            imageUrl = imageUrl.url
                        }
                        return <div 
                            key={crypto.randomUUID()} 
                            onMouseEnter={(e)=>{
                                let imgNode = e.target.parentNode.querySelector("img")
                                if(imgNode!==null){
                                    imgNode.style.display="flex"
                                }
                            }}
                            onMouseOut={(e)=>{
                                let imgNode = e.target.parentNode.querySelector("img")
                                if(imgNode!==null){
                                    imgNode.style.display="none"
                                }
                            }}
                        >
                            <p>{ele1}</p>
                            <img src={imageUrl}/>
                        </div>
                    })}
                </span>
                <PositionDisplay/>
            </span>
        </header>
    )
})

export default Header;