import { CloseCircleOutlined } from "@ant-design/icons"
import { Space, Typography } from "antd"
import { FC } from "react"
import style from './FailManager.module.scss'

interface IFailManager {
    message?: string
}

export const FailManager:FC<IFailManager> = ({message}):JSX.Element => {
    return(
        <Space className={style.Manager}>
            <CloseCircleOutlined style={{fontSize: '6rem', color: 'red'}}/>
            <Typography style={{color: 'red', fontSize: '1.5rem'}}>{message}</Typography>
        </Space>
    )
}