import { ICopy } from "@renderer/shared/types/copy.types"
import { Typography } from "antd"
import { FC } from "react"


const Copyright:FC<ICopy> = ({text, color}):JSX.Element => {
    return(
        <Typography style={{color}}>{text} &copy; {new Date().getFullYear()}</Typography>
    )
}

export {
    Copyright 
}