import React from "react"

const Throbber = () => {
    const rotate = `
    @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    `;
  
    return (
        <>
            <style children={rotate}/>
            <div style={{
                position: "fixed",
                top: 40+"%",
                left: 50+"%",
                width: 50+"px",
                height: 50+"px",
                border: "8px solid #000000",
                borderTop: "8px solid #FFFFFF",
                borderRadius: 50+"%",
                boxSizing: "border-box",
                margin: 0,
                padding: 0,
                animation: "spinner 1.5s linear infinite"
                }}
            />
        </>
    ) 
  }
  
export default Throbber