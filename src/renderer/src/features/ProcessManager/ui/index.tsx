import { LoadingOutlined } from "@ant-design/icons"
import { Space, Typography } from "antd"
import { FC } from "react"
import style from './ProcessManager.module.scss'

interface IProcessManager {
    message?: string,
    size: string,
    color: string
}

export const ProcessManager:FC<IProcessManager> = ({message, size, color}):JSX.Element => {
    return(
    <Space className={style.Manager}> 
        <LoadingOutlined rotate={180} style={{fontSize: size, color}}/>
        <Typography style={{fontSize: `calc(${size}/5)`, color}}>{message}</Typography>
    </Space>
    )
}