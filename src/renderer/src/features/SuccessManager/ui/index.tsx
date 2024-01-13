import { CheckCircleOutlined } from "@ant-design/icons"
import { Space } from "antd"
import style from './SuccessManager.module.scss'

export const SuccessManager  = ():JSX.Element => {
    return(
        <Space className={style.Manager}>
            <CheckCircleOutlined style={{fontSize: '6rem', color: 'green'}}/>
        </Space>
    )
}