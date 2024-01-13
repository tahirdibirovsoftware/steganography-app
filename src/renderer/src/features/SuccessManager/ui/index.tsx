import { CheckCircleOutlined, FileImageOutlined, FileTextOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import style from './SuccessManager.module.scss'
import { FC } from 'react'

interface ISuccessManager {
  message?: string
}

export const SuccessManager: FC<ISuccessManager> = ({ message }): JSX.Element => {
  const isImage = true

  return (
    <Space className={style.Manager}>
      <CheckCircleOutlined style={{ fontSize: '4rem', color: 'green' }} />
      <Typography style={{ color: 'green', fontSize: '1rem' }}>{message}</Typography>
      {isImage ? (
        <Button
          icon={<FileImageOutlined style={{ fontSize: '1.5rem' }} />}
          className={style.FileReady}
        >
          Şəkli götür
        </Button>
      ) : (
        <Button
          icon={<FileTextOutlined style={{ fontSize: '1.5rem' }} />}
          className={style.FileReady}
        >
          Faylı götür
        </Button>
      )}
    </Space>
  )
}
