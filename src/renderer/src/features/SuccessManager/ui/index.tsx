import { CheckCircleOutlined, FileImageOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import style from './SuccessManager.module.scss'
import { FC } from 'react'
import { useAppSelector } from '@renderer/app/store/hooks'
import TextArea from 'antd/es/input/TextArea'

interface ISuccessManager {
  message?: string
}

export const SuccessManager: FC<ISuccessManager> = ({ message }): JSX.Element => {
  const { filePath, privateMessage } = useAppSelector((state) => state.app)
  const isImage = filePath.length > 1
  const isFile = privateMessage.length > 0
  console.log({ filePath, privateMessage })

  return (
    <Space className={style.Manager}>
      <CheckCircleOutlined style={{ fontSize: '4rem', color: 'green' }} />
      <Typography style={{ color: 'green', fontSize: '1rem' }}>
        {isImage ? message : 'Sizin məxfi mesajınız'}
      </Typography>
      {isImage && (
        <Button
          onClick={() => {
            window.api.showTheFile(filePath)
          }}
          icon={<FileImageOutlined style={{ fontSize: '1.5rem' }} />}
          className={style.FileReady}
        >
          Şəkli göstər
        </Button>
      )}
      {isFile && (
        <TextArea
         style={{height: '12rem',width: '30rem', borderRadius: '.5rem', border: '1px solid gray', background: 'unset', color: 'white'}}
         value={privateMessage} 
        />
      )}
    </Space>
  )
}
