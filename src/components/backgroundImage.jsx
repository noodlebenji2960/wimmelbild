import React, {forwardRef} from "react"

import image from "../../assets/1.jpg"

const BackgroundImage = forwardRef(function BackgroundImage(props, reference){

    return <img ref={reference} src={image}></img>
})

export default BackgroundImage