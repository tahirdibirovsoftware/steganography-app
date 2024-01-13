import { FileImageOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"
import { Button, Space, Upload } from "antd"
import style from './decDataManager.module.scss'

export const DecDataManager = ():JSX.Element => {
    return(
        <Space className={style.Manager}>
            <UnlockOutlined style={{color: 'white', fontSize: '3rem'}}/>
            <Upload>
                <Button className={style.imageSelector} icon={<FileImageOutlined style={{fontSize: "40px",}}/>}>
                    Şəkli seç
                    </Button>
            </Upload>
            <Button icon={
                <LockOutlined/>
            } style={{background: 'red', color: 'white', border: 'unset'}}>Şifrələ</Button>
        </Space>
    )
}